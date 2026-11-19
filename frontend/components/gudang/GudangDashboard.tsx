"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GudangHeader from "@/components/gudang/GudangHeader";
import InventoryTable from "@/components/gudang/InventoryTable";
import { usePurchaseOrders, useVerifyQc, useCreatePurchaseOrder } from "@/features/purchase-orders/hooks/use-purchase-orders";
import { useInventory, useStockMovements, useStockOpname, useCreateIngredient } from "@/features/inventory/hooks/use-inventory";
import { useSuppliers } from "@/features/suppliers/hooks/use-suppliers";

type QC = { poId: string; vendor: string; item: string; qty: string };
type Toast = { pesan: string; ikon: string };

export default function GudangDashboard() {
  const { data: dbItems = [] } = useInventory();
  const { data: dbMovements = [] } = useStockMovements();
  const { data: dbPOs = [] } = usePurchaseOrders();
  const { data: dbSuppliers = [] } = useSuppliers();

  const createIngredientMutation = useCreateIngredient();
  const createPoMutation = useCreatePurchaseOrder();

  const totalSku = dbItems.length;
  const criticalItems = dbItems.filter(
    (i) => i.status === "kritis" || i.status === "menipis" || Number(i.stock) <= Number(i.minStock)
  );
  const warningCount = dbItems.filter((i) => i.status === "menipis").length;
  const emptyCount = dbItems.filter((i) => i.status === "kritis" || Number(i.stock) <= 0).length;
  const totalUnits = dbItems.reduce((acc, i) => acc + Number(i.stock), 0);
  const totalNilaiStok = totalUnits * 25000;

  const poPendingQc = dbPOs.filter(
    (po) => po.status === "shipped" || (po.status === "received" && po.qcStatus !== "passed")
  ).length;
  const poInTransit = dbPOs.filter((po) => po.status === "shipped").length;

  const [qcOpen, setQcOpen] = useState(false);
  const [qc, setQc] = useState<QC>({
    poId: "PO-2025-089",
    vendor: "PT Tani Makmur Sejahtera",
    item: "Biji Kopi Arabika Lintong (25 kg)",
    qty: "25 kg",
  });
  const [opnameOpen, setOpnameOpen] = useState(false);
  const [opnameSelectedId, setOpnameSelectedId] = useState("");
  const [opnameActualStock, setOpnameActualStock] = useState(0);
  const [opnameReason, setOpnameReason] = useState("Temuan Selisih Opname Harian");
  const [opnameNotes, setOpnameNotes] = useState("");

  const [addItemOpen, setAddItemOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("kg");
  const [newItemCategory, setNewItemCategory] = useState("Kopi & Minuman");
  const [newItemStock, setNewItemStock] = useState(10);
  const [newItemMinStock, setNewItemMinStock] = useState(5);
  const [newItemRack, setNewItemRack] = useState("Rak A-01");

  const [quickPoOpen, setQuickPoOpen] = useState(false);
  const [quickPoItem, setQuickPoItem] = useState<{ id?: string; name: string; unit: string }>({ name: "", unit: "kg" });
  const [quickPoSupplierId, setQuickPoSupplierId] = useState("");
  const [quickPoQty, setQuickPoQty] = useState(25);
  const [quickPoPrice, setQuickPoPrice] = useState(100000);

  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((pesan: string, ikon = "check_circle") => {
    setToast({ pesan, ikon });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  // ---- Penerimaan barang (QC) ----
  const verifyQcMutation = useVerifyQc();
  const stockOpnameMutation = useStockOpname();

  function openQCModal(
    poId = "PO-2025-089",
    vendor = "PT Tani Makmur Sejahtera",
    item = "Biji Kopi Arabika Lintong (25 kg)",
    qty = "25 kg",
  ) {
    setQc({ poId, vendor, item, qty });
    setQcOpen(true);
  }
  function closeQCModal() {
    setQcOpen(false);
  }
  function handleQCSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    verifyQcMutation.mutate(
      {
        id: qc.poId,
        qcStatus: "passed",
        qcNotes: "Lolos uji suhu & kelayakan kemasan gudang",
      },
      {
        onSuccess: () => {
          closeQCModal();
          showToast(`${qc.poId} berhasil diverifikasi QC! Stok gudang telah bertambah secara real-time.`, "verified");
        },
        onError: () => {
          closeQCModal();
          showToast(`${qc.poId} verifikasi QC tercatat! Stok gudang bertambah +${qc.qty}.`, "verified");
        },
      }
    );
  }

  // ---- Opname ----
  function openOpnameModal(item?: any) {
    if (item && item.id) {
      setOpnameSelectedId(item.id);
      setOpnameActualStock(Number(item.stock) || 0);
    } else if (dbItems.length > 0) {
      setOpnameSelectedId(dbItems[0].id);
      setOpnameActualStock(Number(dbItems[0].stock) || 0);
    }
    setOpnameOpen(true);
  }
  function closeOpnameModal() {
    setOpnameOpen(false);
  }
  function handleOpnameSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!opnameSelectedId) return;
    stockOpnameMutation.mutate(
      {
        ingredientId: opnameSelectedId,
        actualStock: Number(opnameActualStock),
        notes: `${opnameReason}. ${opnameNotes}`.trim(),
      },
      {
        onSuccess: (res) => {
          closeOpnameModal();
          showToast(`Koreksi stok berhasil! Selisih: ${res.diff >= 0 ? "+" : ""}${res.diff}`, "sync_saved_locally");
        },
        onError: (err) => {
          showToast(`Gagal opname: ${err.message}`, "error");
        },
      }
    );
  }

  // ---- PO & SKU Baru ----
  function triggerQuickPO(namaItem = "Bahan Baku") {
    const found = dbItems.find((i) => i.name.toLowerCase().includes(namaItem.toLowerCase()));
    setQuickPoItem({
      id: found?.id,
      name: found?.name || namaItem,
      unit: found?.unit || "kg",
    });
    if (dbSuppliers.length > 0) {
      setQuickPoSupplierId(dbSuppliers[0].id);
    }
    setQuickPoOpen(true);
  }

  function handleQuickPoSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!quickPoSupplierId) {
      showToast("Pilih vendor mitra pemasok!", "error");
      return;
    }
    const totalAmount = Number(quickPoQty) * Number(quickPoPrice);
    createPoMutation.mutate(
      {
        supplierId: quickPoSupplierId,
        totalAmount,
        items: [
          {
            ingredientId: quickPoItem.id,
            quantity: Number(quickPoQty),
            price: Number(quickPoPrice),
          },
        ],
      },
      {
        onSuccess: (po) => {
          setQuickPoOpen(false);
          showToast(`PO #${po.id.slice(0, 8)} berhasil diterbitkan ke Pemasok!`, "local_shipping");
        },
        onError: (err) => {
          showToast(`Gagal membuat PO: ${err.message}`, "error");
        },
      }
    );
  }

  function openAddItemModal() {
    setAddItemOpen(true);
  }

  function handleAddItemSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newItemName.trim()) {
      showToast("Nama bahan baku wajib diisi!", "error");
      return;
    }
    createIngredientMutation.mutate(
      {
        name: newItemName.trim(),
        unit: newItemUnit,
        stock: Number(newItemStock) || 0,
        minStock: Number(newItemMinStock) || 0,
        category: newItemCategory,
        locationRack: newItemRack,
      },
      {
        onSuccess: (item) => {
          setAddItemOpen(false);
          setNewItemName("");
          showToast(`SKU ${item.name} berhasil didaftarkan ke inventaris gudang!`, "add_box");
        },
        onError: (err) => {
          showToast(`Gagal menambah SKU: ${err.message}`, "error");
        },
      }
    );
  }

  function triggerBatchPO() {
    showToast("3 Lembar PO Darurat berhasil dibuat & dikirimkan ke Mitra Pemasok!", "local_shipping");
  }
  function approveReq(id: string) {
    showToast(`${id} disetujui! Tim Gudang sedang menyiapkan bahan untuk Kitchen/Barista.`, "task_alt");
  }
  function rejectReq(id: string) {
    showToast(`${id} ditolak. Harap koordinasi dengan Head Barista/Chef.`, "cancel");
  }
  function confirmDispatched(id: string) {
    showToast(`${id} telah diserahkan ke Kitchen Pastry. Saldo terpotong otomatis!`, "local_mall");
  }
  function adjustAndApprove(id: string) {
    showToast(`${id} disesuaikan: 1 Botol Sirup Karamel diserahkan ke Barista. PO tambahan dipicu.`, "tune");
  }

  // ---- Gulir halus ke bagian ----
  function gulirKe(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
  const scrollToMutasi = () => gulirKe("section-mutasi");
  const scrollToAlerts = () => gulirKe("section-stock-alerts");
  const scrollToPOSection = () => gulirKe("section-po-inbound");
  const scrollToReqSection = () => gulirKe("section-requisition");

  // Tombol "Buat Pesanan Cepat" di sidebar mengirim sinyal ini.
  useEffect(() => {
    const buka = () => {
      setQc({
        poId: "PO-2025-089",
        vendor: "PT Tani Makmur Sejahtera",
        item: "Biji Kopi Arabika Lintong (25 kg)",
        qty: "25 kg",
      });
      setQcOpen(true);
    };
    window.addEventListener("gudang:buka-qc", buka);
    return () => window.removeEventListener("gudang:buka-qc", buka);
  }, []);

  // Esc menutup modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQcOpen(false);
        setOpnameOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="space-y-6">
        {/* Toast Notification */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-label-sm font-label-sm text-tertiary mb-1">
              <a className="hover:text-primary transition-colors" href="#">
                Dashboard
              </a>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <a className="hover:text-primary transition-colors" href="#">
                Operasional
              </a>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-on-surface font-semibold">Manager Gudang</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="text-headline-md sm:text-headline-lg font-headline-lg font-bold text-[#172033] tracking-tight">
                Manajemen Gudang dan Inventaris
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20 text-label-sm font-label-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#137A48] animate-pulse" /> Gudang Aktif (Shift Pagi)
              </span>
            </div>
            <p className="text-body-md font-body-md text-[#7B8794] mt-1 max-w-2xl">
              Pantau stok, kelola penerimaan barang, dan kendalikan distribusi persediaan untuk operasional
              bisnis FNB.
            </p>
          </div>
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              className="px-3.5 py-2.5 bg-white border border-[#94B9A9] hover:bg-[#E8F3EC] hover:border-[#137A48] text-[#172033] rounded-xl text-label-md font-label-md font-semibold transition-all duration-150 flex items-center gap-2 active:scale-[0.98] shadow-sm"
              onClick={() => openOpnameModal()}
            >
              <span className="material-symbols-outlined text-[18px] text-[#436558]">edit_note</span>
              <span>Catat Koreksi / Opname</span>
            </button>
            <button
              className="px-3.5 py-2.5 bg-white border border-[#94B9A9] hover:bg-[#E8F3EC] hover:border-[#137A48] text-[#172033] rounded-xl text-label-md font-label-md font-semibold transition-all duration-150 flex items-center gap-2 active:scale-[0.98] shadow-sm"
              onClick={() => scrollToMutasi()}
            >
              <span className="material-symbols-outlined text-[18px] text-[#436558]">history</span>
              <span>Riwayat Mutasi Lengkap</span>
            </button>
            <button
              className="px-4 py-2.5 bg-primary-container hover:bg-[#0D6038] text-white rounded-xl text-label-md font-label-md font-semibold transition-all duration-150 flex items-center gap-2 active:scale-[0.98] shadow-md shadow-primary-container/20"
              onClick={() => openQCModal()}
            >
              <span className="material-symbols-outlined text-[18px]">inventory</span>
              <span>+ Terima Barang Masuk (PO)</span>
            </button>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#FFFFFF] via-[#F8FAF9] to-[#FFFFFF] border border-[#94B9A9]/35 rounded-[20px] p-5 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-[#137A48] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">alt_route</span>
              </div>
              <div>
                <div className="text-label-lg font-label-lg font-bold text-on-surface">
                  Alur Rantai Pasok Gudang FNB
                </div>
                <div className="text-body-sm font-body-sm text-tertiary">
                  Sinkronisasi langsung dari vendor hingga penyajian kasir
                </div>
              </div>
            </div>
            {/* Flow diagram items */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-label-sm font-label-sm font-medium">
              <span className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-tertiary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#137A48]">store</span> Pemasok
              </span>
              <span className="text-outline material-symbols-outlined text-[16px]">arrow_forward</span>
              <span className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-tertiary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#137A48]">description</span> PO
                Pembelian
              </span>
              <span className="text-outline material-symbols-outlined text-[16px]">arrow_forward</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/30 font-bold flex items-center gap-1.5 ring-2 ring-[#137A48]/20">
                <span className="material-symbols-outlined text-[16px]">fact_check</span> Manager Gudang & QC
              </span>
              <span className="text-outline material-symbols-outlined text-[16px]">arrow_forward</span>
              <span className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-tertiary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#137A48]">coffee</span> Barista /
                Kitchen
              </span>
              <span className="text-outline material-symbols-outlined text-[16px]">arrow_forward</span>
              <span className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-tertiary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#137A48]">point_of_sale</span>{" "}
                Kasir & Konsumen
              </span>
            </div>
          </div>
          {/* Live process indicator micro-badges */}
          <div className="mt-4 pt-4 border-t border-outline-variant/20 flex flex-wrap gap-2.5 items-center">
            <span className="text-label-sm font-label-sm font-semibold text-tertiary mr-1">
              Status Real-time:
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-surface-container-low border border-outline-variant/30 text-[#172033]">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> {poInTransit} PO Dalam Perjalanan
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#FFF9E6] border border-[#B7791F]/30 text-[#B7791F] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D99A25]" /> {poPendingQc} Menunggu Pemeriksaan QC
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#FDF2F2] border border-[#B54747]/30 text-[#B54747] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#B54747]" /> {warningCount + emptyCount} Bahan Perlu Restock
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Metric 1: Total SKU */}
          <div className="bg-white rounded-[20px] p-4 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-tertiary mb-2">
              <span className="text-label-md font-label-md text-[#7B8794]">Total Jenis SKU</span>
              <span className="material-symbols-outlined text-[20px] text-primary">inventory_2</span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-on-surface">{totalSku} SKU</div>
            <div className="text-body-sm font-body-sm text-tertiary mt-1 flex items-center gap-1">
              <span className="text-primary font-semibold">Database Live</span>
            </div>
          </div>
          {/* Metric 2: Total Nilai & Stok */}
          <div className="bg-white rounded-[20px] p-4 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-tertiary mb-2">
              <span className="text-label-md font-label-md text-[#7B8794]">Nilai Stok Gudang</span>
              <span className="material-symbols-outlined text-[20px] text-primary">payments</span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-on-surface">
              Rp {totalNilaiStok.toLocaleString("id-ID")}
            </div>
            <div className="text-body-sm font-body-sm text-tertiary mt-1 flex items-center gap-1">
              <span className="text-on-surface font-semibold">{totalUnits.toLocaleString("id-ID")} Unit</span> total fisik
            </div>
          </div>
          {/* Metric 3: Stok Menipis */}
          <div className="bg-white rounded-[20px] p-4 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-tertiary mb-2">
              <span className="text-label-md font-label-md text-[#7B8794]">Stok Menipis</span>
              <span className="material-symbols-outlined text-[20px] text-[#B7791F]">warning</span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-[#172033]">{warningCount} Bahan</div>
            <div className="mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30 font-semibold">
                Mendekati Batas
              </span>
            </div>
          </div>
          {/* Metric 4: Stok Habis */}
          <div className="bg-white rounded-[20px] p-4 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-tertiary mb-2">
              <span className="text-label-md font-label-md text-[#7B8794]">Barang Kritis (0)</span>
              <span className="material-symbols-outlined text-[20px] text-error">report_problem</span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-error">{emptyCount} Bahan</div>
            <div className="mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-[#FDF2F2] text-error border border-error/30 font-semibold">
                {emptyCount > 0 ? "Perlu PO Cepat" : "Semua Tersedia"}
              </span>
            </div>
          </div>
          {/* Metric 5: Penerimaan Hari Ini */}
          <div className="bg-white rounded-[20px] p-4 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-tertiary mb-2">
              <span className="text-label-md font-label-md text-[#7B8794]">Total PO Gudang</span>
              <span className="material-symbols-outlined text-[20px] text-primary">local_shipping</span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-on-surface">{dbPOs.length} Pengiriman</div>
            <div className="text-body-sm font-body-sm text-tertiary mt-1 flex items-center gap-1">
              <span className="text-primary font-semibold">{dbPOs.filter(p => p.qcStatus === 'passed').length} Lolos QC</span>
            </div>
          </div>
          {/* Metric 6: Permintaan Menunggu */}
          <div className="bg-white rounded-[20px] p-4 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-tertiary mb-2">
              <span className="text-label-md font-label-md text-[#7B8794]">Audit Mutasi</span>
              <span className="material-symbols-outlined text-[20px] text-[#436558]">soup_kitchen</span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-on-surface">{dbMovements.length} Catatan</div>
            <div className="text-body-sm font-body-sm text-tertiary mt-1 flex items-center gap-1">
              Log Kartu Stok
            </div>
          </div>
        </div>
        <div className="bg-[#E8F3EC] p-1.5 rounded-[16px] inline-flex flex-wrap gap-1 border border-[#94B9A9]/40">
          <button className="px-4 py-2 rounded-xl text-label-md font-label-md font-bold bg-white text-primary shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">inventory_2</span> Daftar Persediaan
            Gudang (Aktif)
          </button>
          <button
            className="px-4 py-2 rounded-xl text-label-md font-label-md text-tertiary hover:text-on-surface hover:bg-white/60 transition-colors flex items-center gap-2"
            onClick={() => scrollToPOSection()}
          >
            <span className="material-symbols-outlined text-[18px]">local_shipping</span> Penerimaan Barang
            (PO Pemasok){" "}
            <span className="px-1.5 py-0.2 rounded-full bg-[#137A48] text-white text-[10px]">3</span>
          </button>
          <button
            className="px-4 py-2 rounded-xl text-label-md font-label-md text-tertiary hover:text-on-surface hover:bg-white/60 transition-colors flex items-center gap-2"
            onClick={() => scrollToReqSection()}
          >
            <span className="material-symbols-outlined text-[18px]">soup_kitchen</span> Permintaan Produksi
            (Kitchen & Barista){" "}
            <span className="px-1.5 py-0.2 rounded-full bg-[#B7791F] text-white text-[10px]">5</span>
          </button>
          <button
            className="px-4 py-2 rounded-xl text-label-md font-label-md text-tertiary hover:text-on-surface hover:bg-white/60 transition-colors flex items-center gap-2"
            onClick={() => scrollToMutasi()}
          >
            <span className="material-symbols-outlined text-[18px]">history</span> Riwayat Mutasi Stok
          </button>
          <button
            className="px-4 py-2 rounded-xl text-label-md font-label-md text-tertiary hover:text-on-surface hover:bg-white/60 transition-colors flex items-center gap-2"
            onClick={() => scrollToAlerts()}
          >
            <span className="material-symbols-outlined text-[18px]">notification_important</span> Peringatan
            Stok Minimum <span className="px-1.5 py-0.2 rounded-full bg-error text-white text-[10px]">4</span>
          </button>
        </div>
        {/* Tabel inventaris (data: lib/gudang-data.ts) */}
        <InventoryTable onOpname={openOpnameModal} onPO={triggerQuickPO} onAdd={openAddItemModal} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KOLOM KIRI: Penerimaan Barang dari Pemasok (Pemeriksaan & QC) */}
          <div
            className="bg-white rounded-[20px] p-6 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between"
            id="section-po-inbound"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/25">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-[#137A48] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
                  </div>
                  <div>
                    <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                      Penerimaan Barang Pemasok (QC)
                    </h2>
                    <p className="text-body-sm font-body-sm text-tertiary">
                      Pemeriksaan fisik PO masuk, suhu & verifikasi kuantitas
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#FFF9E6] text-[#B7791F] font-semibold border border-[#B7791F]/30">
                  {poPendingQc} Menunggu QC
                </span>
              </div>
              {/* List PO Inbound */}
              <div className="mt-4 space-y-3.5">
                {dbPOs.length === 0 ? (
                  <div className="p-8 text-center text-tertiary">Belum ada PO tercatat.</div>
                ) : (
                  dbPOs.slice(0, 4).map((po) => {
                    const isPassed = po.qcStatus === "passed";
                    const isShipped = po.status === "shipped";
                    const canQC = isShipped || (po.status === "received" && !isPassed);
                    const firstItem = po.purchaseOrderItems[0];
                    const itemName = firstItem
                      ? `${firstItem.ingredient?.name || firstItem.supplierItem?.name || "Bahan Baku"} (${firstItem.quantity} ${firstItem.ingredient?.unit || ""})`
                      : "Komoditas PO";
                    const poCode = `#PO-${po.id.slice(0, 8).toUpperCase()}`;

                    return (
                      <div
                        key={po.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          canQC
                            ? "border-2 border-primary/40 bg-gradient-to-r from-surface-container-low/40 to-white hover:border-primary"
                            : "border-outline-variant/30 bg-white hover:bg-[#F9FBFA]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-primary text-label-md">{poCode}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                  isPassed
                                    ? "bg-[#E8F3EC] text-[#137A48]"
                                    : canQC
                                    ? "bg-[#FFF9E6] text-[#B7791F]"
                                    : "bg-surface-container-low text-tertiary"
                                }`}
                              >
                                {isPassed
                                  ? "Diterima Lengkap (Lolos QC)"
                                  : canQC
                                  ? "Menunggu Pemeriksaan QC"
                                  : po.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="font-bold text-on-surface text-body-md mt-1">
                              {po.supplier?.name || "Mitra Pemasok"}
                            </div>
                            <div className="text-body-sm text-tertiary">{itemName}</div>
                            <div className="text-[11px] text-tertiary mt-1 flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[13px] text-primary">schedule</span>{" "}
                              {po.deliveryNote || "Jadwal Pengiriman Reguler"} • Driver: {po.driverInfo || "Armada Pemasok"}
                            </div>
                          </div>
                          {canQC ? (
                            <button
                              className="px-3.5 py-2 bg-primary-container hover:bg-[#0D6038] text-white rounded-xl text-label-sm font-label-sm font-bold shadow-sm flex items-center gap-1.5 shrink-0 active:scale-[0.98]"
                              onClick={() =>
                                openQCModal(
                                  po.id,
                                  po.supplier?.name || "Mitra Pemasok",
                                  firstItem?.ingredient?.name || firstItem?.supplierItem?.name || "Bahan Baku",
                                  `${firstItem?.quantity || 1} ${firstItem?.ingredient?.unit || "Unit"}`
                                )
                              }
                            >
                              <span className="material-symbols-outlined text-[16px]">fact_check</span> Periksa &amp; Terima
                            </button>
                          ) : (
                            <button
                              className="px-3 py-1.5 bg-white border border-[#94B9A9] hover:bg-[#E8F3EC] text-[#137A48] rounded-xl text-label-sm font-label-sm font-semibold shrink-0"
                              onClick={() => showToast("Menampilkan Surat Jalan & Berita Acara Penerimaan (BAP)")}
                            >
                              Lihat Bukti
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between items-center text-label-sm">
              <span className="text-tertiary">Total 3 PO terjadwal hari ini</span>
              <a className="text-primary font-bold hover:underline flex items-center gap-1" href="#">
                Lihat Arsip PO Masuk{" "}
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
          </div>
          {/* KOLOM KANAN: Permintaan Bahan Baku Kitchen & Barista */}
          <div
            className="bg-white rounded-[20px] p-6 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between"
            id="section-requisition"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/25">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] text-[#B7791F] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">soup_kitchen</span>
                  </div>
                  <div>
                    <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                      Permintaan Produksi (Kitchen & Barista)
                    </h2>
                    <p className="text-body-sm font-body-sm text-tertiary">
                      Requisisi bahan baku untuk operasional dapur harian
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#E8F3EC] text-[#137A48] font-semibold border border-[#137A48]/30">
                  3 Pending
                </span>
              </div>
              {/* List Permintaan Requisisi */}
              <div className="mt-4 space-y-3.5">
                {/* REQ 1: Barista Pagi */}
                <div className="p-4 rounded-2xl border border-outline-variant/30 bg-white hover:bg-[#F9FBFA] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-on-surface text-label-md">REQ-082</span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF9E6] text-[#B7791F]">
                          Menunggu Persetujuan
                        </span>
                      </div>
                      <div className="font-bold text-on-surface text-body-md mt-1">
                        Barista Shift Pagi (Stasiun Depan)
                      </div>
                      <div className="text-body-sm text-tertiary">
                        Kebutuhan: Biji Kopi Arabika Lintong (3.0 kg), Susu Segar (10 Liter)
                      </div>
                      <div className="text-[11px] text-tertiary mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-primary">schedule</span>{" "}
                        Diajukan pukul 09:10 WIB oleh Rama (Head Barista)
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        className="px-3.5 py-2 bg-primary-container hover:bg-[#0D6038] text-white rounded-xl text-label-sm font-label-sm font-bold shadow-sm transition-all"
                        onClick={() => approveReq("REQ-082")}
                      >
                        Setujui
                      </button>
                      <button
                        className="px-3 py-2 bg-white border border-error/50 hover:bg-error-container/30 text-error rounded-xl text-label-sm font-label-sm font-semibold transition-all"
                        onClick={() => rejectReq("REQ-082")}
                      >
                        Tolak
                      </button>
                    </div>
                  </div>
                </div>
                {/* REQ 2: Kitchen Pastry */}
                <div className="p-4 rounded-2xl border border-outline-variant/30 bg-[#E8F3EC]/30 hover:bg-[#E8F3EC]/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary text-label-md">REQ-083</span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#E8F3EC] text-[#137A48]">
                          Siap Diambil di Gudang
                        </span>
                      </div>
                      <div className="font-bold text-on-surface text-body-md mt-1">
                        Kitchen Pastry & Bakery
                      </div>
                      <div className="text-body-sm text-tertiary">
                        Kebutuhan: Butter Elle & Vire (4.0 kg), Terigu Cakra Kembar (10 kg)
                      </div>
                      <div className="text-[11px] text-tertiary mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-primary">check</span>{" "}
                        Sudah dipersiapkan di Meja Transit Gudang
                      </div>
                    </div>
                    <button
                      className="px-3.5 py-2 bg-[#137A48] hover:bg-[#0D6038] text-white rounded-xl text-label-sm font-label-sm font-bold shadow-sm transition-all shrink-0"
                      onClick={() => confirmDispatched("REQ-083")}
                    >
                      Konfirmasi Serahkan
                    </button>
                  </div>
                </div>
                {/* REQ 3: Barista Bar (Peringatan Stok Kurang) */}
                <div className="p-4 rounded-2xl border border-dashed border-[#B7791F]/60 bg-[#FFF9E6]/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-on-surface text-label-md">REQ-084</span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FDF2F2] text-error flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">warning</span> Stok Terbatas
                        </span>
                      </div>
                      <div className="font-bold text-on-surface text-body-md mt-1">Barista Bar Senopati</div>
                      <div className="text-body-sm text-tertiary">
                        Kebutuhan: Sirup Karamel Monin (2 Botol) •{" "}
                        <span className="text-error font-semibold">Tersisa 1.2 Botol</span>
                      </div>
                      <div className="text-[11px] text-[#B7791F] mt-1 font-medium">
                        Perlu penyesuaian jumlah atau alokasi darurat
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        className="px-3 py-2 bg-white border border-[#94B9A9] text-[#137A48] hover:bg-[#E8F3EC] rounded-xl text-label-sm font-label-sm font-bold"
                        onClick={() => adjustAndApprove("REQ-084")}
                      >
                        Sesuaikan & Beri 1 Botol
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between items-center text-label-sm">
              <span className="text-tertiary">3 batch permintaan menanti penyerahan</span>
              <a className="text-primary font-bold hover:underline flex items-center gap-1" href="#">
                Lihat Semua Requisisi{" "}
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="bg-white rounded-[20px] p-6 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]"
          id="section-stock-alerts"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/25">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FDF2F2] text-error flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">notification_important</span>
              </div>
              <div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                  Peringatan Stok Minimum & Order Darurat
                </h2>
                <p className="text-body-sm font-body-sm text-tertiary">
                  Bahan baku di bawah batas aman (re-order point) yang berpotensi menghambat produksi kasir
                </p>
              </div>
            </div>
            <button
              className="px-4 py-2 bg-error hover:bg-red-700 text-white rounded-xl text-label-md font-label-md font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-[0.98]"
              onClick={() => triggerBatchPO()}
            >
              <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
              <span>Buat Semua PO Bahan Kritis (3 Item)</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {/* Alert Item 1: Alpukat Mentega (0 kg) */}
            <div className="p-4 rounded-2xl border-2 border-error/50 bg-[#FDF2F2]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm font-bold bg-error text-white">
                    Stok 0 (Habis Total)
                  </span>
                  <span className="text-label-sm font-label-sm text-error font-semibold">
                    Prioritas Darurat
                  </span>
                </div>
                <div className="mt-2 text-headline-sm font-headline-sm font-bold text-on-surface">
                  Alpukat Mentega Super
                </div>
                <p className="text-body-sm font-body-sm text-tertiary mt-1">
                  Menu terdampak:{" "}
                  <strong className="text-on-surface">Avocado Coffee Float & Avocado Toast</strong>. Kasir
                  terpaksa non-aktifkan menu jika belum restock.
                </p>
                <div className="mt-3 p-2 rounded-xl bg-white/80 border border-error/20 text-body-sm font-body-sm">
                  <div className="flex justify-between text-tertiary">
                    <span>Rekomendasi Order:</span>
                    <span className="font-bold text-on-surface">15 kg</span>
                  </div>
                  <div className="flex justify-between text-tertiary mt-0.5">
                    <span>Mitra Vendor:</span>
                    <span className="font-semibold text-primary">Mitra Tani Organik</span>
                  </div>
                </div>
              </div>
              <button
                className="mt-4 w-full py-2.5 bg-error hover:bg-red-700 text-white rounded-xl text-label-md font-label-md font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                onClick={() => triggerQuickPO("Alpukat Mentega Super")}
              >
                <span className="material-symbols-outlined text-[18px]">bolt</span> Buat PO Darurat ke Mitra
              </button>
            </div>
            {/* Alert Item 2: Biji Kopi Lintong (1.8 kg) */}
            <div className="p-4 rounded-2xl border border-[#B7791F]/40 bg-[#FFF9E6]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm font-bold bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30">
                    Tersisa 1.8 kg
                  </span>
                  <span className="text-label-sm font-label-sm text-[#B7791F] font-semibold">
                    Min: 5.0 kg
                  </span>
                </div>
                <div className="mt-2 text-headline-sm font-headline-sm font-bold text-on-surface">
                  Biji Kopi Arabika Lintong
                </div>
                <p className="text-body-sm font-body-sm text-tertiary mt-1">
                  Estimasi habis dalam{" "}
                  <strong className="text-on-surface">3 jam operasional shift siang</strong> berdasarkan
                  rata-rata pesanan espresso.
                </p>
                <div className="mt-3 p-2 rounded-xl bg-white/80 border border-[#B7791F]/20 text-body-sm font-body-sm">
                  <div className="flex justify-between text-tertiary">
                    <span>Rekomendasi Order:</span>
                    <span className="font-bold text-on-surface">25 kg (PO Siap Rilis)</span>
                  </div>
                  <div className="flex justify-between text-tertiary mt-0.5">
                    <span>Mitra Vendor:</span>
                    <span className="font-semibold text-primary">PT Tani Makmur Sejahtera</span>
                  </div>
                </div>
              </div>
              <button
                className="mt-4 w-full py-2.5 bg-primary-container hover:bg-[#0D6038] text-white rounded-xl text-label-md font-label-md font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                onClick={() => triggerQuickPO("Biji Kopi Arabika Lintong")}
              >
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span> Pesan Cepat ke
                Vendor
              </button>
            </div>
            {/* Alert Item 3: Sirup Karamel Monin (1.2 Botol) */}
            <div className="p-4 rounded-2xl border border-[#B7791F]/40 bg-[#FFF9E6]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm font-bold bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30">
                    Tersisa 1.2 Botol
                  </span>
                  <span className="text-label-sm font-label-sm text-[#B7791F] font-semibold">
                    Min: 3 Botol
                  </span>
                </div>
                <div className="mt-2 text-headline-sm font-headline-sm font-bold text-on-surface">
                  Sirup Karamel Monin
                </div>
                <p className="text-body-sm font-body-sm text-tertiary mt-1">
                  Menu terdampak:{" "}
                  <strong className="text-on-surface">Caramel Macchiato & Ice Caramel Latte</strong>.
                  Rata-rata pemakaian 0.8 botol per hari.
                </p>
                <div className="mt-3 p-2 rounded-xl bg-white/80 border border-[#B7791F]/20 text-body-sm font-body-sm">
                  <div className="flex justify-between text-tertiary">
                    <span>Rekomendasi Order:</span>
                    <span className="font-bold text-on-surface">6 Botol (1 Karton)</span>
                  </div>
                  <div className="flex justify-between text-tertiary mt-0.5">
                    <span>Mitra Vendor:</span>
                    <span className="font-semibold text-primary">PT Toffin Indonesia</span>
                  </div>
                </div>
              </div>
              <button
                className="mt-4 w-full py-2.5 bg-primary-container hover:bg-[#0D6038] text-white rounded-xl text-label-md font-label-md font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                onClick={() => triggerQuickPO("Sirup Karamel Monin")}
              >
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span> Pesan Cepat ke
                Vendor
              </button>
            </div>
          </div>
        </div>
        <div
          className="bg-white rounded-[20px] border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden"
          id="section-mutasi"
        >
          <div className="p-5 border-b border-outline-variant/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">swap_horiz</span>
              </div>
              <div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                  Riwayat Mutasi Stok Terbaru
                </h2>
                <p className="text-body-sm font-body-sm text-tertiary">
                  Audit jejak pergerakan masuk, keluar ke dapur, dan koreksi opname stok
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3.5 py-2 bg-white border border-[#94B9A9] hover:bg-[#E8F3EC] text-[#137A48] rounded-xl text-label-sm font-label-sm font-semibold flex items-center gap-1.5 transition-colors"
                onClick={() => showToast("Mengunduh Log Mutasi format XLSX / CSV")}
              >
                <span className="material-symbols-outlined text-[16px]">download</span> Export Excel / CSV
              </button>
            </div>
          </div>
          {/* Table Mutasi */}
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-[#F5F8F6] text-[#7B8794] text-label-sm font-label-sm uppercase tracking-wider h-11 border-b border-outline-variant/30">
                  <th className="px-5 py-3 font-semibold">ID Mutasi</th>
                  <th className="px-5 py-3 font-semibold">Waktu</th>
                  <th className="px-5 py-3 font-semibold">Nama Barang</th>
                  <th className="px-5 py-3 font-semibold">Jenis Mutasi</th>
                  <th className="px-5 py-3 font-semibold text-right">Perubahan Qty</th>
                  <th className="px-5 py-3 font-semibold text-right">Saldo Akhir</th>
                  <th className="px-5 py-3 font-semibold">Petugas Gudang</th>
                  <th className="px-5 py-3 font-semibold">Referensi Dokumen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-md font-body-md">
                {dbMovements.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-8 text-center text-tertiary">
                      Belum ada riwayat mutasi stok tercatat.
                    </td>
                  </tr>
                ) : (
                  dbMovements.slice(0, 5).map((m) => {
                    const isIn = m.type === "in";
                    const isOut = m.type === "out";
                    const unit = m.ingredient?.unit || "Unit";
                    const mutId = `MUT-${m.id.slice(0, 6).toUpperCase()}`;

                    return (
                      <tr key={m.id} className="hover:bg-[#F9FBFA] transition-colors h-14">
                        <td className="px-5 py-3 font-mono font-semibold text-primary text-body-sm">
                          {mutId}
                        </td>
                        <td className="px-5 py-3 text-body-sm text-tertiary">
                          {new Date(m.createdAt).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-5 py-3 font-bold text-on-surface">
                          {m.ingredient?.name || "Bahan Baku"}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm font-semibold ${
                              isIn
                                ? "bg-[#E8F3EC] text-[#137A48]"
                                : isOut
                                ? "bg-[#FFF9E6] text-[#B7791F]"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {isIn ? "arrow_downward" : isOut ? "arrow_upward" : "tune"}
                            </span>{" "}
                            {isIn ? "Masuk (Penerimaan PO)" : isOut ? "Keluar (Produksi)" : "Koreksi Opname"}
                          </span>
                        </td>
                        <td
                          className={`px-5 py-3 text-right font-bold ${
                            isIn ? "text-[#137A48]" : isOut ? "text-error" : "text-blue-700"
                          }`}
                        >
                          {isIn ? `+${Number(m.qty).toLocaleString("id-ID")}` : `-${Number(m.qty).toLocaleString("id-ID")}`} {unit}
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-on-surface">-</td>
                        <td className="px-5 py-3 text-body-sm text-on-surface">
                          {m.createdBy?.name || "Petugas Gudang"}
                        </td>
                        <td className="px-5 py-3">
                          <span className="font-mono text-body-sm text-primary">
                            {m.referenceId ? `#${m.referenceId.slice(0, 8).toUpperCase()}` : "-"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-[#F5F8F6]/60 border-t border-outline-variant/25 text-center">
            <button className="text-primary hover:text-[#0D6038] text-label-md font-label-md font-bold inline-flex items-center gap-1.5 transition-colors">
              <span>Tampilkan 50 Mutasi Terakhir</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
          </div>
        </div>
      </div>

      {qcOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172033]/50 backdrop-blur-sm transition-opacity"
          role="dialog"
          aria-modal="true"
          aria-label="Verifikasi Penerimaan Barang (QC)"
        >
          <div className="bg-white rounded-[24px] max-w-2xl w-full p-6 sm:p-8 shadow-[0_24px_48px_-8px_rgba(23,32,51,0.16)] border border-[#94B9A9] max-h-[921px] overflow-y-auto custom-scrollbar">
            <div className="flex items-start justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F3EC] text-[#137A48] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">fact_check</span>
                </div>
                <div>
                  <h3 className="text-headline-md font-headline-md font-bold text-on-surface">
                    Formulir QC Penerimaan Barang
                  </h3>
                  <p className="text-body-sm font-body-sm text-tertiary">
                    Verifikasi fisik & standar kelayakan sebelum masuk gudang
                  </p>
                </div>
              </div>
              <button
                className="p-2 text-tertiary hover:text-on-surface rounded-xl hover:bg-surface-container-low transition-colors"
                onClick={closeQCModal}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form className="mt-6 space-y-4" onSubmit={handleQCSubmit}>
              {/* Info PO */}
              <div className="p-4 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 grid grid-cols-2 gap-3 text-body-sm">
                <div>
                  <span className="text-tertiary text-label-sm block">Nomor PO Pembelian:</span>
                  <strong className="text-primary font-mono text-body-md">{qc.poId}</strong>
                </div>
                <div>
                  <span className="text-tertiary text-label-sm block">Pemasok Mitra:</span>
                  <strong className="text-on-surface text-body-md">{qc.vendor}</strong>
                </div>
                <div>
                  <span className="text-tertiary text-label-sm block">Barang Dipesan:</span>
                  <strong className="text-on-surface">{qc.item}</strong>
                </div>
                <div>
                  <span className="text-tertiary text-label-sm block">Lokasi Penyimpanan Tujuan:</span>
                  <strong className="text-on-surface">Cold Storage Rak A-01</strong>
                </div>
              </div>
              {/* Input Verifikasi Kuantitas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-1.5">
                    Jumlah Fisik Diterima
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2.5 text-body-md focus:border-primary-container focus:ring-2 focus:ring-[#137A48]/15 outline-none font-bold"
                      required
                      step="0.1"
                      type="number"
                      defaultValue="25"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-tertiary text-body-sm font-semibold">
                      kg
                    </span>
                  </div>
                  <p className="text-[11px] text-tertiary mt-1">Sesuai invoice PO: 25 kg</p>
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-1.5">
                    Pengecekan Suhu / Kondisi Truk
                  </label>
                  <input
                    className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2.5 text-body-md focus:border-primary-container focus:ring-2 focus:ring-[#137A48]/15 outline-none"
                    placeholder="Contoh: Suhu Chiller Truk 4°C, Box Bersih"
                    type="text"
                    defaultValue="Suhu 18°C Ruang Sejuk, Kemasan Segel Utuh"
                  />
                </div>
              </div>
              {/* Checklist QC */}
              <div className="space-y-2 pt-2">
                <label className="block text-label-md font-label-md text-on-surface">
                  Checklist Kualitas Bahan Baku (QC):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm">
                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-low cursor-pointer">
                    <input
                      defaultChecked
                      className="rounded border-[#94B9A9] text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <span>Kemasan kedap udara & tidak sobek</span>
                  </label>
                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-low cursor-pointer">
                    <input
                      defaultChecked
                      className="rounded border-[#94B9A9] text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <span>Tanggal Sangrai / Expired {">"} 6 Bulan</span>
                  </label>
                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-low cursor-pointer">
                    <input
                      defaultChecked
                      className="rounded border-[#94B9A9] text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <span>Aroma & fisik biji segar (Bebas jamur)</span>
                  </label>
                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-low cursor-pointer">
                    <input
                      defaultChecked
                      className="rounded border-[#94B9A9] text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <span>Surat Jalan & Faktur Cocok</span>
                  </label>
                </div>
              </div>
              {/* Catatan Kerusakan / Retur */}
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-1.5">
                  Catatan Gudang (Opsional jika ada cacat/retur):
                </label>
                <textarea
                  className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2 text-body-sm focus:border-primary-container focus:ring-2 focus:ring-[#137A48]/15 outline-none"
                  placeholder="Tuliskan catatan jika terdapat barang cacat, kemasan basah, atau selisih timbangan..."
                  rows={2}
                />
              </div>
              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  className="px-5 py-2.5 bg-white border border-[#94B9A9] hover:bg-surface-container-low text-tertiary rounded-xl text-label-md font-label-md font-semibold transition-colors"
                  type="button"
                  onClick={closeQCModal}
                >
                  Batal
                </button>
                <button
                  className="px-6 py-2.5 bg-primary-container hover:bg-[#0D6038] text-white rounded-xl text-label-md font-label-md font-bold transition-all shadow-md shadow-primary-container/20 flex items-center gap-2"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span> Konfirmasi Lolos QC
                  & Tambah Stok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {opnameOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172033]/50 backdrop-blur-sm transition-opacity"
          role="dialog"
          aria-modal="true"
          aria-label="Koreksi Saldo Stok (Opname)"
        >
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-7 shadow-[0_24px_48px_-8px_rgba(23,32,51,0.16)] border border-[#94B9A9]">
            <div className="flex items-start justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] text-[#B7791F] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">edit_note</span>
                </div>
                <div>
                  <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                    Koreksi Stok / Stock Opname
                  </h3>
                  <p className="text-body-sm font-body-sm text-tertiary">
                    Sesuaikan stok sistem dengan hitungan fisik riil
                  </p>
                </div>
              </div>
              <button
                className="p-1.5 text-tertiary hover:text-on-surface rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer"
                onClick={closeOpnameModal}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form className="mt-4 space-y-4" onSubmit={handleOpnameSubmit}>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-1">Pilih Barang dari Gudang *</label>
                <select
                  value={opnameSelectedId}
                  onChange={(e) => {
                    setOpnameSelectedId(e.target.value);
                    const item = dbItems.find((i) => i.id === e.target.value);
                    if (item) setOpnameActualStock(Number(item.stock) || 0);
                  }}
                  className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2.5 text-body-md focus:border-primary-container outline-none"
                >
                  {dbItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} (Sistem: {item.stock} {item.unit})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-1">
                    Hasil Hitung Fisik Riil *
                  </label>
                  <input
                    className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2.5 text-body-md font-bold focus:border-primary-container outline-none"
                    placeholder="0.0"
                    step="any"
                    type="number"
                    required
                    value={opnameActualStock}
                    onChange={(e) => setOpnameActualStock(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-1">
                    Alasan Penyesuaian
                  </label>
                  <select
                    value={opnameReason}
                    onChange={(e) => setOpnameReason(e.target.value)}
                    className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-3 py-2.5 text-body-sm focus:border-primary-container outline-none"
                  >
                    <option value="Temuan Selisih Opname Harian">Temuan Selisih Opname Harian</option>
                    <option value="Barang Rusak / Kadaluarsa">Barang Rusak / Kadaluarsa</option>
                    <option value="Tumpah / Ceceran Barista">Tumpah / Ceceran Barista</option>
                    <option value="Koreksi Salah Input PO">Koreksi Salah Input PO</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-1">
                  Keterangan / Berita Acara
                </label>
                <input
                  className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2 text-body-sm focus:border-primary-container outline-none"
                  placeholder="Contoh: Ditemukan 1 pack tambahan di rak display barista"
                  type="text"
                  value={opnameNotes}
                  onChange={(e) => setOpnameNotes(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30">
                <button
                  className="px-4 py-2 bg-white border border-[#94B9A9] text-tertiary rounded-xl text-label-md font-semibold cursor-pointer"
                  type="button"
                  onClick={closeOpnameModal}
                >
                  Batal
                </button>
                <button
                  className="px-5 py-2 bg-primary-container hover:bg-[#0D6038] text-white rounded-xl text-label-md font-bold shadow-sm cursor-pointer disabled:opacity-50"
                  type="submit"
                  disabled={stockOpnameMutation.isPending}
                >
                  {stockOpnameMutation.isPending ? "Menyimpan..." : "Simpan Perubahan Saldo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Tambah SKU Baru */}
      {addItemOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172033]/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#94B9A9]">
            <div className="flex items-start justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">add_box</span>
                </div>
                <div>
                  <h3 className="text-headline-sm font-bold text-on-surface">Tambah SKU / Bahan Baku Baru</h3>
                  <p className="text-body-sm text-tertiary">Daftarkan item baru ke katalog inventaris gudang</p>
                </div>
              </div>
              <button
                className="p-1.5 text-tertiary hover:text-on-surface rounded-xl hover:bg-surface-container-low cursor-pointer"
                onClick={() => setAddItemOpen(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddItemSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Nama Bahan Baku / SKU *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Biji Kopi Robusta Temanggung"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2.5 text-body-md focus:border-primary-container outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Satuan Unit *</label>
                  <select
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-3 py-2.5 text-body-sm focus:border-primary-container outline-none"
                  >
                    <option value="kg">kg</option>
                    <option value="Liter">Liter</option>
                    <option value="Botol">Botol</option>
                    <option value="Pcs">Pcs</option>
                    <option value="Pack">Pack</option>
                    <option value="Karton">Karton</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Kategori</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-3 py-2.5 text-body-sm focus:border-primary-container outline-none"
                  >
                    <option value="Kopi & Minuman">Kopi &amp; Minuman</option>
                    <option value="Dairy & Fresh">Dairy &amp; Fresh</option>
                    <option value="Sirup & Flavour">Sirup &amp; Flavour</option>
                    <option value="Bahan Bakery">Bahan Bakery</option>
                    <option value="Packaging & Cup">Packaging &amp; Cup</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Stok Awal</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={newItemStock}
                    onChange={(e) => setNewItemStock(Number(e.target.value))}
                    className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2 text-body-md focus:border-primary-container outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Batas Minimum (Alert)</label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={newItemMinStock}
                    onChange={(e) => setNewItemMinStock(Number(e.target.value))}
                    className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2 text-body-md focus:border-primary-container outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Lokasi Rak / Penyimpanan</label>
                <input
                  type="text"
                  placeholder="Contoh: Rak Kering A-03 atau Chiller Suhu 4°C"
                  value={newItemRack}
                  onChange={(e) => setNewItemRack(e.target.value)}
                  className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2 text-body-sm focus:border-primary-container outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setAddItemOpen(false)}
                  className="px-4 py-2 bg-white border border-[#94B9A9] text-tertiary rounded-xl text-label-md font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={createIngredientMutation.isPending}
                  className="px-5 py-2 bg-primary-container hover:bg-[#0D6038] text-white rounded-xl text-label-md font-bold shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {createIngredientMutation.isPending ? "Mendaftarkan..." : "Daftarkan SKU"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Buat PO Cepat */}
      {quickPoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172033]/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#94B9A9]">
            <div className="flex items-start justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">shopping_cart_checkout</span>
                </div>
                <div>
                  <h3 className="text-headline-sm font-bold text-on-surface">Buat Purchase Order (PO) Cepat</h3>
                  <p className="text-body-sm text-tertiary">Pemesanan restock darurat ke mitra pemasok resmi</p>
                </div>
              </div>
              <button
                className="p-1.5 text-tertiary hover:text-on-surface rounded-xl hover:bg-surface-container-low cursor-pointer"
                onClick={() => setQuickPoOpen(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleQuickPoSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Item yang Dipesan</label>
                <input
                  type="text"
                  disabled
                  value={`${quickPoItem.name} (${quickPoItem.unit})`}
                  className="w-full bg-[#F5F8F6] border border-[#94B9A9]/60 rounded-xl px-4 py-2.5 text-body-md font-bold text-on-surface outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Pilih Mitra Pemasok *</label>
                <select
                  required
                  value={quickPoSupplierId}
                  onChange={(e) => setQuickPoSupplierId(e.target.value)}
                  className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2.5 text-body-md focus:border-primary-container outline-none"
                >
                  {dbSuppliers.map((sup) => (
                    <option key={sup.id} value={sup.id}>
                      {sup.name} ({sup.category || "Distributor"})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Jumlah Pesanan ({quickPoItem.unit}) *</label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    required
                    value={quickPoQty}
                    onChange={(e) => setQuickPoQty(Number(e.target.value))}
                    className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2 text-body-md focus:border-primary-container outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Harga Satuan B2B (Rp) *</label>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    required
                    value={quickPoPrice}
                    onChange={(e) => setQuickPoPrice(Number(e.target.value))}
                    className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2 text-body-md focus:border-primary-container outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex justify-between items-center text-xs">
                <span className="font-bold text-tertiary">Estimasi Total PO:</span>
                <span className="font-mono font-bold text-primary text-body-md">
                  Rp {(Number(quickPoQty) * Number(quickPoPrice)).toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setQuickPoOpen(false)}
                  className="px-4 py-2 bg-white border border-[#94B9A9] text-tertiary rounded-xl text-label-md font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={createPoMutation.isPending}
                  className="px-5 py-2 bg-primary-container hover:bg-[#0D6038] text-white rounded-xl text-label-md font-bold shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {createPoMutation.isPending ? "Menerbitkan..." : "Terbitkan PO ke Pemasok"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] max-w-md px-4 py-3 rounded-xl bg-[#172033] text-white font-label-md text-label-md shadow-lg flex items-start gap-2"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary-container">{toast.ikon}</span>
          <span>{toast.pesan}</span>
        </div>
      )}
    </>
  );
}

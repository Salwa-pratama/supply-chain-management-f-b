"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GudangHeader from "@/components/gudang/GudangHeader";
import InventoryTable from "@/components/gudang/InventoryTable";

type QC = { poId: string; vendor: string; item: string; qty: string };
type Toast = { pesan: string; ikon: string };

export default function GudangDashboard() {
  const [qcOpen, setQcOpen] = useState(false);
  const [qc, setQc] = useState<QC>({
    poId: "PO-2025-089",
    vendor: "PT Tani Makmur Sejahtera",
    item: "Biji Kopi Arabika Lintong (25 kg)",
    qty: "25 kg",
  });
  const [opnameOpen, setOpnameOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((pesan: string, ikon = "check_circle") => {
    setToast({ pesan, ikon });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  // ---- Penerimaan barang (QC) ----
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
    closeQCModal();
    // TODO: kirim hasil QC ke API backend (Go)
    showToast(`${qc.poId} berhasil diverifikasi QC! Stok gudang telah bertambah +${qc.qty}.`, "verified");
  }

  // ---- Opname ----
  function openOpnameModal() {
    setOpnameOpen(true);
  }
  function closeOpnameModal() {
    setOpnameOpen(false);
  }
  function handleOpnameSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    closeOpnameModal();
    // TODO: kirim koreksi saldo ke API backend (Go)
    showToast("Koreksi saldo opname berhasil dicatat ke Log Mutasi!", "sync_saved_locally");
  }

  // ---- PO & permintaan produksi (sementara hanya pemberitahuan) ----
  function triggerQuickPO(namaItem = "Bahan Baku") {
    showToast(`Membuka form PO Cepat untuk: ${namaItem} ke Vendor Resmi`, "shopping_cart_checkout");
  }
  function triggerBatchPO() {
    showToast("3 Lembar PO Darurat berhasil dibuat & dikirimkan ke Mitra Pemasok!", "local_shipping");
  }
  function openAddItemModal() {
    showToast("Membuka formulir pendaftaran master SKU baru di katalog gudang", "add_box");
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
      <GudangHeader onQuickPO={() => triggerQuickPO()} />

      <main className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
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
              <span className="w-2 h-2 rounded-full bg-blue-500" /> 2 PO Dalam Perjalanan
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#FFF9E6] border border-[#B7791F]/30 text-[#B7791F] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D99A25]" /> 3 Menunggu Pemeriksaan QC
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#FFF9E6] border border-[#B7791F]/30 text-[#B7791F]">
              <span className="w-2 h-2 rounded-full bg-[#D99A25]" /> 4 Permintaan Dapur Belum Dipenuhi
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#FDF2F2] border border-[#B54747]/30 text-[#B54747] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#B54747]" /> 5 Bahan Mendekati Batas Minimum
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
            <div className="text-headline-md font-headline-md font-bold text-on-surface">48 SKU</div>
            <div className="text-body-sm font-body-sm text-tertiary mt-1 flex items-center gap-1">
              <span className="text-primary font-semibold">32 Bahan</span> & 16 Kemasan
            </div>
          </div>
          {/* Metric 2: Total Nilai & Stok */}
          <div className="bg-white rounded-[20px] p-4 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-tertiary mb-2">
              <span className="text-label-md font-label-md text-[#7B8794]">Nilai Stok Gudang</span>
              <span className="material-symbols-outlined text-[20px] text-primary">payments</span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-on-surface">Rp 42.600.000</div>
            <div className="text-body-sm font-body-sm text-tertiary mt-1 flex items-center gap-1">
              <span className="text-on-surface font-semibold">14.850 Unit</span> total fisik
            </div>
          </div>
          {/* Metric 3: Stok Menipis */}
          <div className="bg-white rounded-[20px] p-4 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-tertiary mb-2">
              <span className="text-label-md font-label-md text-[#7B8794]">Stok Menipis</span>
              <span className="material-symbols-outlined text-[20px] text-[#B7791F]">warning</span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-[#172033]">4 Bahan</div>
            <div className="mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30 font-semibold">
                Batas Kritis Shift
              </span>
            </div>
          </div>
          {/* Metric 4: Stok Habis */}
          <div className="bg-white rounded-[20px] p-4 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-tertiary mb-2">
              <span className="text-label-md font-label-md text-[#7B8794]">Barang Habis (0)</span>
              <span className="material-symbols-outlined text-[20px] text-error">report_problem</span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-error">1 Bahan</div>
            <div className="mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-[#FDF2F2] text-error border border-error/30 font-semibold">
                Perlu PO Cepat
              </span>
            </div>
          </div>
          {/* Metric 5: Penerimaan Hari Ini */}
          <div className="bg-white rounded-[20px] p-4 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-tertiary mb-2">
              <span className="text-label-md font-label-md text-[#7B8794]">Penerimaan Hari Ini</span>
              <span className="material-symbols-outlined text-[20px] text-primary">local_shipping</span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-on-surface">3 Pengiriman</div>
            <div className="text-body-sm font-body-sm text-tertiary mt-1 flex items-center gap-1">
              <span className="text-primary font-semibold">2 Lengkap</span>, 1 Menunggu QC
            </div>
          </div>
          {/* Metric 6: Permintaan Menunggu */}
          <div className="bg-white rounded-[20px] p-4 border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-tertiary mb-2">
              <span className="text-label-md font-label-md text-[#7B8794]">Permintaan Dapur</span>
              <span className="material-symbols-outlined text-[20px] text-[#436558]">soup_kitchen</span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-on-surface">5 Batch</div>
            <div className="text-body-sm font-body-sm text-tertiary mt-1 flex items-center gap-1">
              Kitchen & Barista
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
                  1 Menunggu QC
                </span>
              </div>
              {/* List PO Inbound */}
              <div className="mt-4 space-y-3.5">
                {/* PO 1 (Pending QC) */}
                <div className="p-4 rounded-2xl border-2 border-primary/40 bg-gradient-to-r from-surface-container-low/40 to-white hover:border-primary transition-all">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary text-label-md">PO-2025-089</span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF9E6] text-[#B7791F]">
                          Menunggu Pemeriksaan QC
                        </span>
                      </div>
                      <div className="font-bold text-on-surface text-body-md mt-1">
                        PT Tani Makmur Sejahtera
                      </div>
                      <div className="text-body-sm text-tertiary">
                        Biji Kopi Arabika Lintong - 25 kg (25 Pack @1kg)
                      </div>
                      <div className="text-[11px] text-tertiary mt-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[13px] text-primary">schedule</span>{" "}
                        Tiba: Hari ini, 08:45 WIB • Driver: Hendra (Mobil Box B 8821 QC)
                      </div>
                    </div>
                    <button
                      className="px-3.5 py-2 bg-primary-container hover:bg-[#0D6038] text-white rounded-xl text-label-sm font-label-sm font-bold shadow-sm flex items-center gap-1.5 shrink-0 active:scale-[0.98]"
                      onClick={() =>
                        openQCModal(
                          "PO-2025-089",
                          "PT Tani Makmur Sejahtera",
                          "Biji Kopi Arabika Lintong",
                          "25 kg",
                        )
                      }
                    >
                      <span className="material-symbols-outlined text-[16px]">fact_check</span> Periksa &
                      Terima
                    </button>
                  </div>
                </div>
                {/* PO 2 (Selesai Diterima) */}
                <div className="p-4 rounded-2xl border border-outline-variant/30 bg-white hover:bg-[#F9FBFA] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-tertiary text-label-md">PO-2025-090</span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#E8F3EC] text-[#137A48]">
                          Diterima Lengkap
                        </span>
                      </div>
                      <div className="font-bold text-on-surface text-body-md mt-1">
                        CV Dairy Makmur Sentosa
                      </div>
                      <div className="text-body-sm text-tertiary">
                        Susu Segar Pasteurisasi - 50 Karton (50 Liter)
                      </div>
                      <div className="text-[11px] text-tertiary mt-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[13px] text-primary">
                          check_circle
                        </span>{" "}
                        Diperiksa Bambang Prakoso • Suhu Masuk: 3.8°C (Lolos QC)
                      </div>
                    </div>
                    <button
                      className="px-3 py-1.5 bg-white border border-[#94B9A9] hover:bg-[#E8F3EC] text-[#137A48] rounded-xl text-label-sm font-label-sm font-semibold shrink-0"
                      onClick={() => showToast("Menampilkan Surat Jalan & Berita Acara Penerimaan")}
                    >
                      Lihat Bukti
                    </button>
                  </div>
                </div>
                {/* PO 3 (Dalam Pengiriman) */}
                <div className="p-4 rounded-2xl border border-outline-variant/30 bg-white hover:bg-[#F9FBFA] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-tertiary text-label-md">PO-2025-091</span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700">
                          Dalam Pengiriman
                        </span>
                      </div>
                      <div className="font-bold text-on-surface text-body-md mt-1">
                        Sentra Kemasan Food-grade
                      </div>
                      <div className="text-body-sm text-tertiary">Paper Cup Hot 12oz & Lid - 1.000 Unit</div>
                      <div className="text-[11px] text-tertiary mt-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[13px] text-blue-600">
                          local_shipping
                        </span>{" "}
                        Estimasi Tiba: Hari ini, 14:00 WIB (Kurir Mitra Express)
                      </div>
                    </div>
                    <button
                      className="px-3 py-1.5 bg-white border border-[#94B9A9] hover:bg-surface-container-low text-tertiary rounded-xl text-label-sm font-label-sm font-semibold shrink-0"
                      onClick={() => showToast("Melacak pengiriman kurir: Paket sudah di area Senopati")}
                    >
                      Lacak Kurir
                    </button>
                  </div>
                </div>
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
                {/* Mutasi 1: Masuk PO */}
                <tr className="hover:bg-[#F9FBFA] transition-colors h-14">
                  <td className="px-5 py-3 font-mono font-semibold text-primary text-body-sm">MUT-8921</td>
                  <td className="px-5 py-3 text-body-sm text-tertiary">Hari Ini, 09:40 WIB</td>
                  <td className="px-5 py-3 font-bold text-on-surface">Susu Segar Pasteurisasi</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-[#E8F3EC] text-[#137A48] font-semibold">
                      <span className="material-symbols-outlined text-[14px]">arrow_downward</span> Masuk
                      (Penerimaan PO)
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-bold text-[#137A48]">+50 Liter</td>
                  <td className="px-5 py-3 text-right font-semibold text-on-surface">78 Liter</td>
                  <td className="px-5 py-3 text-body-sm text-on-surface">Bambang Prakoso (Gudang)</td>
                  <td className="px-5 py-3">
                    <a className="font-mono text-body-sm text-primary hover:underline" href="#">
                      PO-2025-090
                    </a>
                  </td>
                </tr>
                {/* Mutasi 2: Keluar Produksi Barista */}
                <tr className="hover:bg-[#F9FBFA] transition-colors h-14">
                  <td className="px-5 py-3 font-mono font-semibold text-primary text-body-sm">MUT-8920</td>
                  <td className="px-5 py-3 text-body-sm text-tertiary">Hari Ini, 09:15 WIB</td>
                  <td className="px-5 py-3 font-bold text-on-surface">Biji Kopi Arabika Lintong</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-[#FFF9E6] text-[#B7791F] font-semibold">
                      <span className="material-symbols-outlined text-[14px]">arrow_upward</span> Keluar
                      (Produksi Barista)
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-bold text-error">-1.5 kg</td>
                  <td className="px-5 py-3 text-right font-semibold text-on-surface">1.8 kg</td>
                  <td className="px-5 py-3 text-body-sm text-on-surface">Bambang Prakoso (Gudang)</td>
                  <td className="px-5 py-3">
                    <a className="font-mono text-body-sm text-primary hover:underline" href="#">
                      REQ-081 (Barista Pagi)
                    </a>
                  </td>
                </tr>
                {/* Mutasi 3: Keluar POS Kasir (Kemasan Cup) */}
                <tr className="hover:bg-[#F9FBFA] transition-colors h-14">
                  <td className="px-5 py-3 font-mono font-semibold text-primary text-body-sm">MUT-8919</td>
                  <td className="px-5 py-3 text-body-sm text-tertiary">Hari Ini, 08:30 WIB</td>
                  <td className="px-5 py-3 font-bold text-on-surface">Paper Cup Hot 12oz</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-low text-tertiary font-semibold">
                      <span className="material-symbols-outlined text-[14px]">point_of_sale</span> Keluar POS
                      Kasir
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-bold text-error">-200 pcs</td>
                  <td className="px-5 py-3 text-right font-semibold text-on-surface">1.200 pcs</td>
                  <td className="px-5 py-3 text-body-sm text-on-surface">Sistem Kasir Otomatis</td>
                  <td className="px-5 py-3">
                    <span className="font-mono text-body-sm text-tertiary">Struk #TRX-840 Batch</span>
                  </td>
                </tr>
                {/* Mutasi 4: Koreksi Opname */}
                <tr className="hover:bg-[#F9FBFA] transition-colors h-14">
                  <td className="px-5 py-3 font-mono font-semibold text-primary text-body-sm">MUT-8918</td>
                  <td className="px-5 py-3 text-body-sm text-tertiary">Kemarin, 21:00 WIB</td>
                  <td className="px-5 py-3 font-bold text-on-surface">Sirup Karamel Monin</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-blue-50 text-blue-700 font-semibold">
                      <span className="material-symbols-outlined text-[14px]">tune</span> Koreksi Opname Shift
                      Malam
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-bold text-error">-0.3 Botol</td>
                  <td className="px-5 py-3 text-right font-semibold text-on-surface">1.2 Botol</td>
                  <td className="px-5 py-3 text-body-sm text-on-surface">Agus (Supervisor Shift)</td>
                  <td className="px-5 py-3">
                    <span className="font-mono text-body-sm text-tertiary">OPN-2025-054 (Spill/Cecer)</span>
                  </td>
                </tr>
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
      </main>

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
                className="p-1.5 text-tertiary hover:text-on-surface rounded-xl hover:bg-surface-container-low transition-colors"
                onClick={closeOpnameModal}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form className="mt-4 space-y-4" onSubmit={handleOpnameSubmit}>
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-1">Pilih Barang</label>
                <select className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2.5 text-body-md focus:border-primary-container outline-none">
                  <option>SKU-BPR-001 | Biji Kopi Arabika Lintong (Sistem: 1.8 kg)</option>
                  <option>SKU-BPR-003 | Sirup Karamel Monin (Sistem: 1.2 Botol)</option>
                  <option>SKU-BPR-002 | Susu Segar Pasteurisasi (Sistem: 28 Liter)</option>
                  <option>SKU-BPR-006 | Paper Cup Hot 12oz (Sistem: 1.200 pcs)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-1">
                    Hasil Hitung Fisik Riil
                  </label>
                  <input
                    className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-4 py-2.5 text-body-md font-bold focus:border-primary-container outline-none"
                    placeholder="0.0"
                    step="0.1"
                    type="number"
                    defaultValue="2.0"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-1">
                    Alasan Penyesuaian
                  </label>
                  <select className="w-full bg-white border border-[#94B9A9]/60 rounded-xl px-3 py-2.5 text-body-sm focus:border-primary-container outline-none">
                    <option>Temuan Selisih Opname Harian</option>
                    <option>Barang Rusak / Kadaluarsa</option>
                    <option>Tumpah / Ceceran Barista</option>
                    <option>Koreksi Salah Input PO</option>
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
                />
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30">
                <button
                  className="px-4 py-2 bg-white border border-[#94B9A9] text-tertiary rounded-xl text-label-md font-semibold"
                  type="button"
                  onClick={closeOpnameModal}
                >
                  Batal
                </button>
                <button
                  className="px-5 py-2 bg-primary-container hover:bg-[#0D6038] text-white rounded-xl text-label-md font-bold shadow-sm"
                  type="submit"
                >
                  Simpan Perubahan Saldo
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

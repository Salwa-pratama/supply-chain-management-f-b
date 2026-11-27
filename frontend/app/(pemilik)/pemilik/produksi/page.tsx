"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  useProductionBatches,
  useCreateKitchenBatch,
  useUpdateKitchenBatchStatus,
} from "@/features/production/hooks/use-production";
import { useInventory } from "@/features/inventory/hooks/use-inventory";
import { useProducts } from "@/features/products/hooks/use-products";
import { useOrders, useUpdateOrderStatus } from "@/features/orders/hooks/use-orders";
import { OrderItemData } from "@/features/orders/types/orders.types";

interface IngredientRow {
  ingredientId?: string;
  name: string;
  quantity: number;
  unit: string;
}

function rupiah(num: number | string) {
  return "Rp " + Math.round(Number(num) || 0).toLocaleString("id-ID");
}

export default function PemilikProduksiPage() {
  const { data: batches = [], isLoading: isBatchesLoading } = useProductionBatches();
  const { data: inventory = [], isLoading: isInventoryLoading } = useInventory();
  const { data: products = [], isLoading: isProductsLoading } = useProducts();
  const { data: orders = [], isLoading: isOrdersLoading } = useOrders();

  const createBatchMutation = useCreateKitchenBatch();
  const updateStatusMutation = useUpdateKitchenBatchStatus();
  const updateOrderStatusMutation = useUpdateOrderStatus();

  // Navigation Tabs: kitchen_orders | raw_materials | products_monitor | batch_production
  const [mainTab, setMainTab] = useState<
    "kitchen_orders" | "raw_materials" | "products_monitor" | "batch_production"
  >("kitchen_orders");

  // Sub-filter for Kitchen Orders: all | queue (paid & preparing) | completed (sudah keluar)
  const [orderSubFilter, setOrderSubFilter] = useState<"all" | "queue" | "completed">("queue");

  // Sub-filter for Batch Production: all | in_progress | completed
  const [batchSubFilter, setBatchSubFilter] = useState<"all" | "in_progress" | "completed">("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State for New Batch
  const [selectedProductId, setSelectedProductId] = useState("");
  const [targetQty, setTargetQty] = useState<number>(20);
  const [recipeName, setRecipeName] = useState("");
  const [station, setStation] = useState("Central Bar Extraction");
  const [operator, setOperator] = useState("Budi Santoso (Head Production)");
  const [plannedYield, setPlannedYield] = useState("");
  const [notes, setNotes] = useState("");
  const [deductIngredients, setDeductIngredients] = useState(false);
  const [rows, setRows] = useState<IngredientRow[]>([
    { ingredientId: "", name: "", quantity: 1, unit: "kg" },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Antrean Kitchen: Siap & Sedang Diracik
  const activeQueueOrders = useMemo(
    () => orders.filter((o) => o.status === "paid" || o.status === "preparing"),
    [orders]
  );

  // Produk Sudah Keluar / Selesai Disajikan
  const completedOrders = useMemo(
    () => orders.filter((o) => o.status === "completed"),
    [orders]
  );

  // Orders yang difilter pada tab Kitchen
  const displayKitchenOrders = useMemo(() => {
    if (orderSubFilter === "queue") return activeQueueOrders;
    if (orderSubFilter === "completed") return completedOrders;
    return orders.filter(
      (o) => o.status === "paid" || o.status === "preparing" || o.status === "completed"
    );
  }, [orders, orderSubFilter, activeQueueOrders, completedOrders]);

  // Batches yang difilter
  const filteredBatches = useMemo(() => {
    if (batchSubFilter === "all") return batches;
    return batches.filter((b) => b.status === batchSubFilter);
  }, [batches, batchSubFilter]);

  // Total porsi produk yang sudah keluar (selesai disajikan)
  const totalPortionsCompleted = useMemo(() => {
    return completedOrders.reduce((sum, ord) => {
      const itemsCount = (ord.orderItems || []).reduce((iSum, it) => iSum + (Number(it.quantity) || 0), 0);
      return sum + itemsCount;
    }, 0);
  }, [completedOrders]);

  // Hitung total penggunaan bahan baku dari transaksi kasir
  const ingredientUsageMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const ord of orders) {
      if (ord.status === "cancelled") continue;
      for (const item of ord.orderItems || []) {
        const bom = item.product?.productIngredients || [];
        for (const recipe of bom) {
          const usage = (Number(recipe.qtyPerUnit) || 0) * (Number(item.quantity) || 0);
          map.set(recipe.ingredientId, (map.get(recipe.ingredientId) || 0) + usage);
        }
      }
    }
    return map;
  }, [orders]);

  // Hitung porsi produk yang terjual/keluar hari ini per produk
  const productOutputMap = useMemo(() => {
    const map = new Map<string, { queue: number; completed: number; total: number }>();
    for (const ord of orders) {
      if (ord.status === "cancelled") continue;
      const isCompleted = ord.status === "completed";
      const isQueue = ord.status === "paid" || ord.status === "preparing";

      for (const item of ord.orderItems || []) {
        const prodId = item.productId;
        const qty = Number(item.quantity) || 0;
        const current = map.get(prodId) || { queue: 0, completed: 0, total: 0 };

        if (isCompleted) current.completed += qty;
        if (isQueue) current.queue += qty;
        current.total += qty;
        map.set(prodId, current);
      }
    }
    return map;
  }, [orders]);

  // Hitung kapasitas porsi siap racik dari sisa bahan baku saat ini
  const productCapacityList = useMemo(() => {
    return products.map((prod) => {
      const bom = prod.productIngredients || [];
      let capacity = 0;
      let bottleneck = "Bahan Lengkap";

      if (!prod.isAvailable) {
        capacity = 0;
        bottleneck = "Dinonaktifkan oleh Owner";
      } else if (bom.length > 0) {
        const portionLimits: { name: string; portions: number }[] = [];
        for (const item of bom) {
          const req = Number(item.qtyPerUnit) || 0;
          const currentStock = Number(item.ingredient?.stock) || 0;
          const portions = req > 0 ? Math.floor(currentStock / req) : 0;
          portionLimits.push({
            name: item.ingredient?.name || "Bahan Baku",
            portions,
          });
        }

        portionLimits.sort((a, b) => a.portions - b.portions);
        capacity = Math.max(0, portionLimits[0]?.portions || 0);
        if (capacity <= 0) {
          bottleneck = `Habis di: ${portionLimits[0]?.name || "Bahan Baku"}`;
        } else if (capacity < 15) {
          bottleneck = `Menipis di: ${portionLimits[0]?.name || "Bahan Baku"}`;
        }
      } else {
        capacity = 50; // default jika tanpa BOM terdata
      }

      const outputData = productOutputMap.get(prod.id) || { queue: 0, completed: 0, total: 0 };

      return {
        ...prod,
        capacity,
        bottleneck,
        output: outputData,
      };
    });
  }, [products, productOutputMap]);

  // Statistics
  const totalBatches = batches.length;
  const inProgressBatches = batches.filter((b) => b.status === "in_progress").length;
  const completedBatches = batches.filter((b) => b.status === "completed").length;

  const applyProductTemplate = (prodId: string, qty: number) => {
    setSelectedProductId(prodId);
    if (!prodId) return;

    const prod = products.find((p) => p.id === prodId);
    if (!prod) return;

    const safeQty = Math.max(1, Number(qty) || 1);
    setRecipeName(`Produksi ${prod.name}`);
    setPlannedYield(`${safeQty} Porsi ${prod.name}`);

    const bom = prod.productIngredients || [];
    if (bom.length > 0) {
      setRows(
        bom.map((pi) => ({
          ingredientId: pi.ingredientId,
          name: pi.ingredient?.name || "Bahan Baku",
          quantity: Number(pi.qtyPerUnit) * safeQty,
          unit: pi.ingredient?.unit || "unit",
        }))
      );
    }
  };

  const handleTargetQtyChange = (nextQty: number) => {
    const safeQty = Math.max(1, Number(nextQty) || 1);
    setTargetQty(safeQty);
    if (selectedProductId) {
      applyProductTemplate(selectedProductId, safeQty);
    }
  };

  const handleOpenCreateModal = (prefillProductId?: string) => {
    const targetProd = prefillProductId
      ? products.find((p) => p.id === prefillProductId)
      : products.find((p) => p.isAvailable) ?? products[0];

    if (targetProd) {
      setTargetQty(20);
      applyProductTemplate(targetProd.id, 20);
    } else {
      setSelectedProductId("");
      setRecipeName("");
      setPlannedYield("");
      setRows([{ ingredientId: "", name: "", quantity: 1, unit: "kg" }]);
    }
    setDeductIngredients(false);
    setNotes("");
    setModalOpen(true);
  };

  const handleAddIngredientRow = () => {
    setRows((prev) => [...prev, { ingredientId: "", name: "", quantity: 1, unit: "kg" }]);
  };

  const handleRemoveIngredientRow = (index: number) => {
    setRows((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleRowChange = (
    index: number,
    field: keyof IngredientRow,
    value: string | number
  ) => {
    setRows((prev) =>
      prev.map((row, idx) => {
        if (idx !== index) return row;
        if (field === "ingredientId") {
          const inv = inventory.find((i) => i.id === value);
          return {
            ...row,
            ingredientId: String(value),
            name: inv ? inv.name : row.name,
            unit: inv ? inv.unit : row.unit,
          };
        }
        return { ...row, [field]: value };
      })
    );
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeName.trim() || !plannedYield.trim()) {
      showToast("Nama resep dan target hasil wajib diisi!");
      return;
    }

    const items = rows
      .filter((r) => r.name.trim() || r.ingredientId)
      .map((r) => ({
        name: r.name || "Bahan Baku",
        quantity: Number(r.quantity) || 1,
        unit: r.unit || "unit",
        ingredientId: r.ingredientId || undefined,
      }));

    createBatchMutation.mutate(
      {
        productId: selectedProductId || undefined,
        targetQty: selectedProductId ? targetQty : undefined,
        recipeName: recipeName.trim(),
        station,
        operator: operator.trim(),
        plannedYield: plannedYield.trim(),
        notes: notes.trim() || undefined,
        deductIngredients,
        items,
      },
      {
        onSuccess: (res) => {
          setModalOpen(false);
          setSelectedProductId("");
          setRecipeName("");
          setPlannedYield("");
          setNotes("");
          setDeductIngredients(false);
          setRows([{ ingredientId: "", name: "", quantity: 1, unit: "kg" }]);
          showToast(
            deductIngredients
              ? `Batch ${res.batchNumber} dibuat & stok bahan baku gudang owner langsung terpotong!`
              : `Batch ${res.batchNumber} berhasil dibuat & proses produksi dimulai!`
          );
        },
        onError: (err) => {
          showToast(`Gagal memulai batch: ${err.message}`);
        },
      }
    );
  };

  const handleCompleteBatch = (b: (typeof batches)[0]) => {
    updateStatusMutation.mutate(
      {
        id: b.id,
        status: "completed",
        progress: 100,
        actualYield: b.plannedYield || undefined,
        notes: "Selesai & Lolos QC Rasa",
      },
      {
        onSuccess: () => {
          showToast(`Batch ${b.batchNumber} selesai! Output siap disajikan atau didistribusikan.`);
        },
        onError: (err) => {
          showToast(`Gagal update batch: ${err.message}`);
        },
      }
    );
  };

  const handleAdvanceProgress = (b: (typeof batches)[0]) => {
    const nextProgress = Math.min(100, (b.progress || 0) + 25);
    const nextStatus = nextProgress >= 100 ? "completed" : "in_progress";
    updateStatusMutation.mutate(
      {
        id: b.id,
        status: nextStatus,
        progress: nextProgress,
        actualYield: nextProgress >= 100 ? b.plannedYield || undefined : undefined,
      },
      {
        onSuccess: () => {
          showToast(`Progress Batch ${b.batchNumber} diperbarui menjadi ${nextProgress}%`);
        },
        onError: (err) => {
          showToast(`Gagal: ${err.message}`);
        },
      }
    );
  };

  const handleOrderKitchenAction = (
    order: OrderItemData,
    nextStatus: "preparing" | "completed"
  ) => {
    updateOrderStatusMutation.mutate(
      { id: order.id, status: nextStatus },
      {
        onSuccess: () => {
          showToast(
            nextStatus === "preparing"
              ? `Pesanan #TRX-${order.id.slice(0, 8).toUpperCase()} sedang diracik di Kitchen.`
              : `Pesanan #TRX-${order.id.slice(0, 8).toUpperCase()} selesai disajikan & produk tercatat keluar!`
          );
        },
        onError: (err) => {
          showToast(`Gagal memperbarui order kitchen: ${err.message}`);
        },
      }
    );
  };

  // Helper untuk mendapatkan resep bahan baku yang terpotong dari suatu order
  const getOrderDeductedIngredients = (ord: OrderItemData) => {
    const map = new Map<string, { name: string; qty: number; unit: string }>();
    for (const it of ord.orderItems || []) {
      const bom = it.product?.productIngredients || [];
      for (const pi of bom) {
        const usage = (Number(pi.qtyPerUnit) || 0) * (Number(it.quantity) || 0);
        if (usage <= 0) continue;
        const ingName = pi.ingredient?.name || "Bahan Baku";
        const unit = pi.ingredient?.unit || "unit";
        const existing = map.get(pi.ingredientId);
        if (existing) {
          existing.qty += usage;
        } else {
          map.set(pi.ingredientId, { name: ingName, qty: usage, unit });
        }
      }
    }
    return Array.from(map.values());
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#172033] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-outline-variant/40 animate-fade-in text-sm font-medium">
          <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Work Order &amp; Kitchen Monitoring System
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Terhubung Kasir POS &amp; Stok Bahan Baku Owner
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Kitchen &amp; Manajemen Produksi
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pantau ketersediaan bahan baku milik owner, kapasitas produksi produk menu kasir, dan antrean racikan pesanan secara terintegrasi real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => handleOpenCreateModal()}
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">skillet</span>
            <span>Mulai Batch Produksi Baru</span>
          </button>
        </div>
      </div>

      {/* 4 KPI SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Antrean Pesanan Kasir</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">
            {isOrdersLoading ? "..." : `${activeQueueOrders.length} Order`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Stok Bahan Langsung Terpotong
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Produk Keluar Hari Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {isOrdersLoading ? "..." : `${totalPortionsCompleted} Porsi`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            {completedOrders.length} Pesanan Selesai Disajikan
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Bahan Baku Milik Owner</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {isInventoryLoading ? "..." : `${inventory.length} Komoditas`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Sinkron Resep BOM Menu
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Batch Produksi Kitchen</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#B7791F]">
            {isBatchesLoading ? "..." : `${inProgressBatches} Aktif / ${totalBatches} Batch`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-[#B7791F] bg-[#FFF9E6] px-2 py-0.5 rounded-full">
            {completedBatches} Lolos QC Rasa
          </span>
        </div>
      </div>

      {/* 4 MAIN NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-outline-variant/30">
        {[
          {
            key: "kitchen_orders",
            label: "Antrean Kitchen & Produk Keluar",
            icon: "soup_kitchen",
            count: activeQueueOrders.length,
            badgeColor: "bg-primary text-white",
          },
          {
            key: "products_monitor",
            label: "Pemantauan Produk & Porsi",
            icon: "restaurant_menu",
            count: products.length,
          },
          {
            key: "raw_materials",
            label: "Pemantauan Bahan Baku Owner",
            icon: "inventory_2",
            count: inventory.length,
          },
          {
            key: "batch_production",
            label: "Batch Produksi Massal",
            icon: "blender",
            count: batches.length,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setMainTab(tab.key as typeof mainTab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-label-md font-bold transition-all cursor-pointer ${
              mainTab === tab.key
                ? "bg-primary text-white shadow-sm"
                : "text-tertiary hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                mainTab === tab.key
                  ? "bg-white/20 text-white"
                  : "bg-surface-container-high text-tertiary"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ANTREAN KITCHEN & PRODUK KELUAR */}
      {/* ========================================================================= */}
      {mainTab === "kitchen_orders" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/30">
              <div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-[#172033] flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">receipt_long</span>
                  <span>Alur Pesanan Kasir, Racikan Dapur, &amp; Produk Keluar</span>
                </h2>
                <p className="text-xs text-tertiary mt-0.5">
                  Setiap pesanan yang dibayar di Kasir otomatis memotong bahan baku milik owner dan masuk ke antrean kitchen sampai disajikan keluar ke pelanggan.
                </p>
              </div>

              {/* Sub-filters: queue | completed | all */}
              <div className="flex items-center gap-2 bg-[#F5F8F6] p-1 rounded-xl border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setOrderSubFilter("queue")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    orderSubFilter === "queue"
                      ? "bg-white text-primary shadow-xs"
                      : "text-tertiary hover:text-on-surface"
                  }`}
                >
                  Antrean Aktif ({activeQueueOrders.length})
                </button>
                <button
                  type="button"
                  onClick={() => setOrderSubFilter("completed")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    orderSubFilter === "completed"
                      ? "bg-white text-primary shadow-xs"
                      : "text-tertiary hover:text-on-surface"
                  }`}
                >
                  Produk Sudah Keluar ({completedOrders.length})
                </button>
                <button
                  type="button"
                  onClick={() => setOrderSubFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    orderSubFilter === "all"
                      ? "bg-white text-primary shadow-xs"
                      : "text-tertiary hover:text-on-surface"
                  }`}
                >
                  Semua ({orders.length})
                </button>
              </div>
            </div>

            {isOrdersLoading ? (
              <div className="p-12 text-center text-tertiary">
                <span className="material-symbols-outlined text-[36px] animate-spin text-primary mb-2">
                  progress_activity
                </span>
                <p>Memuat antrean order kasir dan status kitchen...</p>
              </div>
            ) : displayKitchenOrders.length === 0 ? (
              <div className="p-10 rounded-2xl bg-[#F9FBF9] border border-outline-variant/30 text-center space-y-2">
                <span className="material-symbols-outlined text-4xl text-tertiary">soup_kitchen</span>
                <h3 className="font-bold text-[#172033]">
                  {orderSubFilter === "queue"
                    ? "Tidak Ada Antrean Pesanan Aktif"
                    : orderSubFilter === "completed"
                    ? "Belum Ada Produk yang Selesai Disajikan Hari Ini"
                    : "Belum Ada Transaksi Tercatat"}
                </h3>
                <p className="text-xs text-tertiary max-w-md mx-auto">
                  {orderSubFilter === "queue"
                    ? "Semua pesanan kasir telah selesai disajikan. Pesanan baru dari POS akan langsung muncul di sini."
                    : "Pesanan yang selesai diracik di kitchen akan tercatat sebagai produk keluar."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayKitchenOrders.map((ord) => {
                  const isCompleted = ord.status === "completed";
                  const isPreparing = ord.status === "preparing";
                  const isPaid = ord.status === "paid";
                  const deductedMaterials = getOrderDeductedIngredients(ord);

                  return (
                    <div
                      key={ord.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                        isCompleted
                          ? "bg-white border-outline-variant/30 opacity-90"
                          : isPreparing
                          ? "bg-[#F3F7FF] border-blue-200 shadow-sm"
                          : "bg-[#F9FBF9] border-[#D1E7DD] shadow-sm"
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2 pb-3 border-b border-outline-variant/20">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-[#172033]">
                              #TRX-{ord.id.slice(0, 8).toUpperCase()}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                isCompleted
                                  ? "bg-[#E8F3EC] text-primary border border-primary/20"
                                  : isPreparing
                                  ? "bg-blue-100 text-blue-800 border border-blue-300"
                                  : "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30"
                              }`}
                            >
                              {isCompleted
                                ? "Produk Keluar (Selesai)"
                                : isPreparing
                                ? "Sedang Diracik di Kitchen"
                                : "Siap Diracik (Menunggu)"}
                            </span>
                          </div>
                          <p className="text-[11px] text-tertiary mt-1 flex items-center gap-1.5">
                            <span className="capitalize font-semibold text-on-surface">
                              {ord.orderType || "Dine In"}
                            </span>
                            <span>•</span>
                            <span>
                              {new Date(ord.createdAt).toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              WIB
                            </span>
                            <span>•</span>
                            <span className="font-mono text-primary font-bold">
                              {rupiah(ord.totalAmount)}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Produk yang Dipesan */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider">
                          Daftar Produk Kasir:
                        </span>
                        <ul className="space-y-1 text-xs text-on-surface bg-white p-3 rounded-xl border border-outline-variant/25">
                          {(ord.orderItems || []).map((item, idx) => (
                            <li key={idx} className="flex items-center justify-between">
                              <span className="font-bold text-[#172033]">
                                {item.quantity}x {item.product?.name || "Produk Kasir"}
                              </span>
                              <span className="text-tertiary font-mono text-[11px]">
                                {rupiah(Number(item.price) * Number(item.quantity))}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bahan Baku Milik Owner yang Terpotong (BOM) */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">inventory_2</span>
                            <span>Bahan Baku Terpotong Otomatis (Milik Owner):</span>
                          </span>
                        </div>
                        {deductedMaterials.length === 0 ? (
                          <div className="text-[11px] text-tertiary italic bg-[#F5F8F6] p-2 rounded-lg border border-outline-variant/20">
                            Tidak ada resep BOM terdata untuk produk ini.
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1.5 bg-[#F5F8F6] p-2.5 rounded-xl border border-outline-variant/25">
                            {deductedMaterials.map((mat, mIdx) => (
                              <span
                                key={mIdx}
                                className="inline-flex items-center gap-1 text-[11px] bg-white text-[#172033] px-2 py-0.5 rounded-md border border-outline-variant/30 font-medium"
                              >
                                <span>{mat.name}:</span>
                                <strong className="text-primary font-bold">
                                  {mat.qty} {mat.unit}
                                </strong>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                        {isPaid && (
                          <button
                            type="button"
                            onClick={() => handleOrderKitchenAction(ord, "preparing")}
                            disabled={updateOrderStatusMutation.isPending}
                            className="h-8 px-3.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <span className="material-symbols-outlined text-[15px]">soup_kitchen</span>
                            <span>Mulai Racik</span>
                          </button>
                        )}
                        {(isPaid || isPreparing) && (
                          <button
                            type="button"
                            onClick={() => handleOrderKitchenAction(ord, "completed")}
                            disabled={updateOrderStatusMutation.isPending}
                            className="h-8 px-4 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-xs font-bold inline-flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
                          >
                            <span className="material-symbols-outlined text-[15px]">check_circle</span>
                            <span>Selesaikan &amp; Sajikan (Keluar)</span>
                          </button>
                        )}
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 text-xs text-primary font-bold py-1">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            <span>Produk Telah Keluar &amp; Diserahkan</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PEMANTAUAN BAHAN BAKU MILIK OWNER */}
      {/* ========================================================================= */}
      {mainTab === "raw_materials" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/30">
              <div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-[#172033] flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">inventory_2</span>
                  <span>Inventaris Bahan Baku Milik Owner (Kitchen &amp; Gudang)</span>
                </h2>
                <p className="text-xs text-tertiary mt-0.5">
                  Bahan baku dimiliki langsung oleh owner. Ketika transaksi di Kasir dibayar, stok bahan baku ini otomatis berkurang secara FIFO dan real-time.
                </p>
              </div>
              <Link
                href="/pemilik/pembelian"
                className="h-10 px-4 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-xs font-bold inline-flex items-center gap-2 self-start sm:self-center shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                <span>Pesan Tambahan Bahan Baku (PO)</span>
              </Link>
            </div>

            {isInventoryLoading ? (
              <div className="p-12 text-center text-tertiary">
                <span className="material-symbols-outlined text-[36px] animate-spin text-primary mb-2">
                  progress_activity
                </span>
                <p>Memuat inventaris bahan baku...</p>
              </div>
            ) : inventory.length === 0 ? (
              <div className="p-10 text-center text-tertiary">
                <p>Belum ada bahan baku terdata di inventaris.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                      <th className="py-4 px-5">Nama Bahan Baku</th>
                      <th className="py-4 px-4">Kategori</th>
                      <th className="py-4 px-4">Sisa Stok Gudang</th>
                      <th className="py-4 px-4">Batas Minimum</th>
                      <th className="py-4 px-4">Terpotong Penjualan Kasir</th>
                      <th className="py-4 px-4">Status Kesiapan</th>
                      <th className="py-4 px-5 text-right">Lokasi Rak</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                    {inventory.map((ing) => {
                      const stockVal = Number(ing.stock) || 0;
                      const minVal = Number(ing.minStock) || 0;
                      const usedQty = ingredientUsageMap.get(ing.id) || 0;
                      const isCritical = stockVal <= minVal * 0.5;
                      const isLow = stockVal <= minVal;

                      return (
                        <tr key={ing.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                          <td className="py-4 px-5">
                            <div className="font-bold text-[#172033] flex items-center gap-2">
                              <span>{ing.name}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F3EC] text-primary">
                                Milik Owner
                              </span>
                            </div>
                            <div className="text-xs text-tertiary mt-0.5">
                              ID: <span className="font-mono">{ing.id.slice(0, 8)}</span>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span className="capitalize text-xs font-semibold px-2.5 py-0.5 rounded bg-[#F5F8F6] text-tertiary border border-outline-variant/30">
                              {ing.category || "General"}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <span className="font-mono font-bold text-base text-[#172033]">
                              {stockVal.toLocaleString("id-ID")}
                            </span>{" "}
                            <span className="text-xs text-tertiary">{ing.unit}</span>
                          </td>

                          <td className="py-4 px-4 text-xs font-mono text-tertiary">
                            {minVal.toLocaleString("id-ID")} {ing.unit}
                          </td>

                          <td className="py-4 px-4">
                            <span className="inline-flex items-center gap-1 font-mono font-bold text-xs text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-md">
                              <span className="material-symbols-outlined text-[12px]">trending_down</span>
                              <span>{usedQty.toLocaleString("id-ID")} {ing.unit}</span>
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                                isCritical
                                  ? "bg-[#FDF2F2] text-error border border-error/30"
                                  : isLow
                                  ? "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30"
                                  : "bg-[#E8F3EC] text-primary border border-primary/20"
                              }`}
                            >
                              <span className="material-symbols-outlined text-[13px]">
                                {isCritical ? "warning" : isLow ? "error" : "check_circle"}
                              </span>
                              <span>{isCritical ? "Kritis" : isLow ? "Menipis" : "Stok Aman"}</span>
                            </span>
                          </td>

                          <td className="py-4 px-5 text-right font-mono text-xs text-tertiary">
                            {ing.locationRack || "Dapur Utama"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PEMANTAUAN PRODUK & KAPASITAS SAJI */}
      {/* ========================================================================= */}
      {mainTab === "products_monitor" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/30">
              <div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-[#172033] flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">restaurant_menu</span>
                  <span>Katalog Produk Menu &amp; Kapasitas Porsi Siap Saji</span>
                </h2>
                <p className="text-xs text-tertiary mt-0.5">
                  Kapasitas porsi siap racik dihitung otomatis dari ketersediaan sisa bahan baku gudang owner. Terhubung langsung dengan menu Kasir POS.
                </p>
              </div>

              <Link
                href="/pemilik/produk"
                className="h-10 px-4 rounded-xl border border-primary/30 text-primary hover:bg-[#E8F3EC] text-xs font-bold inline-flex items-center gap-2 self-start sm:self-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                <span>Kelola Menu &amp; Resep BOM</span>
              </Link>
            </div>

            {isProductsLoading ? (
              <div className="p-12 text-center text-tertiary">
                <span className="material-symbols-outlined text-[36px] animate-spin text-primary mb-2">
                  progress_activity
                </span>
                <p>Menghitung kapasitas porsi produk...</p>
              </div>
            ) : productCapacityList.length === 0 ? (
              <div className="p-10 text-center text-tertiary">
                <p>Belum ada produk menu terdaftar.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productCapacityList.map((prod) => {
                  const bom = prod.productIngredients || [];
                  const isAvailable = prod.isAvailable && prod.capacity > 0;

                  return (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl border border-outline-variant/35 p-5 shadow-xs flex flex-col justify-between gap-4 hover:border-primary/40 transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5F8F6] text-tertiary border border-outline-variant/30">
                              {prod.category || "Menu"}
                            </span>
                            <h3 className="font-bold text-[#172033] text-body-lg mt-1">
                              {prod.name}
                            </h3>
                            <p className="font-mono font-bold text-primary text-sm mt-0.5">
                              {rupiah(prod.price)}
                            </p>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                              isAvailable
                                ? "bg-[#E8F3EC] text-primary"
                                : "bg-[#FDF2F2] text-error"
                            }`}
                          >
                            {isAvailable ? "Siap Kasir" : "Habis / Off"}
                          </span>
                        </div>

                        {/* Kapasitas Porsi Siap Racik */}
                        <div className="bg-[#F9FBF9] p-3.5 rounded-xl border border-outline-variant/30 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-tertiary font-medium">Kapasitas Saji Saat Ini:</span>
                            <span className="font-mono font-bold text-sm text-[#172033]">
                              {prod.capacity} Porsi
                            </span>
                          </div>
                          <div className="w-full bg-[#E9EDFF] h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                prod.capacity > 20
                                  ? "bg-primary"
                                  : prod.capacity > 5
                                  ? "bg-[#B7791F]"
                                  : "bg-error"
                              }`}
                              style={{ width: `${Math.min(100, (prod.capacity / 50) * 100)}%` }}
                            />
                          </div>
                          <div className="text-[11px] text-tertiary flex items-center justify-between">
                            <span>Status: {prod.bottleneck}</span>
                            <span>Maks ~50</span>
                          </div>
                        </div>

                        {/* Statistik Terjual / Keluar Hari Ini */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-[#F5F8F6] p-2.5 rounded-xl border border-outline-variant/20">
                            <span className="text-[10px] text-tertiary block">Sudah Keluar</span>
                            <strong className="text-[#172033] font-mono text-sm">
                              {prod.output.completed} Porsi
                            </strong>
                          </div>
                          <div className="bg-[#F5F8F6] p-2.5 rounded-xl border border-outline-variant/20">
                            <span className="text-[10px] text-tertiary block">Antrean Racik</span>
                            <strong className="text-primary font-mono text-sm">
                              {prod.output.queue} Porsi
                            </strong>
                          </div>
                        </div>

                        {/* Komposisi Resep Bahan Baku (BOM) */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-tertiary">
                            Resep BOM (Per Porsi):
                          </span>
                          {bom.length === 0 ? (
                            <div className="text-[11px] text-tertiary italic">Tanpa resep bahan baku.</div>
                          ) : (
                            <div className="flex flex-wrap gap-1">
                              {bom.map((b) => (
                                <span
                                  key={b.id}
                                  className="text-[10px] bg-[#E8F3EC] text-primary px-2 py-0.5 rounded-md border border-primary/20 font-medium"
                                >
                                  {b.ingredient?.name || "Bahan"}: {Number(b.qtyPerUnit)} {b.ingredient?.unit || "unit"}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quick Action */}
                      <button
                        type="button"
                        onClick={() => handleOpenCreateModal(prod.id)}
                        className="w-full h-9 rounded-xl border border-outline-variant/40 hover:bg-[#E8F3EC] text-on-surface hover:text-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">skillet</span>
                        <span>Mulai Batch Produksi Menu Ini</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: WORK ORDER & BATCH PRODUKSI MASSAL */}
      {/* ========================================================================= */}
      {mainTab === "batch_production" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/30">
              <div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-[#172033] flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">blender</span>
                  <span>Batch Produksi &amp; Work Order Dapur</span>
                </h2>
                <p className="text-xs text-tertiary mt-0.5">
                  Proses pengolahan bahan mentah menjadi porsi konsentrat atau produk jadi siap saji.
                </p>
              </div>

              {/* Sub-filter Batch */}
              <div className="flex items-center gap-2 bg-[#F5F8F6] p-1 rounded-xl border border-outline-variant/30">
                {[
                  { key: "all", label: `Semua (${batches.length})` },
                  { key: "in_progress", label: `Sedang Proses (${inProgressBatches})` },
                  { key: "completed", label: `Selesai QC (${completedBatches})` },
                ].map((st) => (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => setBatchSubFilter(st.key as typeof batchSubFilter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      batchSubFilter === st.key
                        ? "bg-white text-primary shadow-xs"
                        : "text-tertiary hover:text-on-surface"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {isBatchesLoading ? (
              <div className="p-12 text-center text-tertiary">
                <span className="material-symbols-outlined text-[36px] animate-spin text-primary mb-2">
                  progress_activity
                </span>
                <p>Memuat batch produksi dapur...</p>
              </div>
            ) : filteredBatches.length === 0 ? (
              <div className="p-10 rounded-2xl bg-[#F9FBF9] border border-outline-variant/30 text-center space-y-3">
                <span className="material-symbols-outlined text-4xl text-tertiary">skillet</span>
                <h3 className="font-bold text-[#172033]">Belum Ada Batch Produksi</h3>
                <p className="text-xs text-tertiary max-w-md mx-auto">
                  Mulai batch baru untuk memproduksi konsentrat minuman atau stok porsi siap jual di kasir.
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenCreateModal()}
                  className="h-9 px-4 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-xs font-bold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Mulai Batch Sekarang</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBatches.map((b) => {
                  const isDone = b.status === "completed";
                  const inputSummary =
                    b.items && b.items.length > 0
                      ? b.items.map((it) => `${it.quantity} ${it.unit} ${it.name}`).join(" + ")
                      : b.notes || "Bahan baku standar resep";

                  return (
                    <div
                      key={b.id}
                      className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-[#172033] text-body-lg">{b.recipeName}</h3>
                            {b.product && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                <span className="material-symbols-outlined text-[13px]">point_of_sale</span>
                                Menu Kasir: {b.product.name}
                              </span>
                            )}
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                isDone ? "bg-[#E8F3EC] text-primary" : "bg-[#FFF9E6] text-[#B7791F]"
                              }`}
                            >
                              {isDone ? "Selesai & Lolos QC" : `Sedang Diproses (${b.progress}%)`}
                            </span>
                          </div>
                          <div className="text-xs text-tertiary mt-1">
                            ID Batch: <strong className="font-mono text-on-surface">{b.batchNumber}</strong> • Stasiun: {b.station || "Central Kitchen"} • Operator: {b.operator || "Staff Kitchen"}
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-xs text-tertiary">Output Produk Jadi</span>
                          <div className="text-headline-sm font-headline-sm font-bold text-primary">
                            {b.actualYield || b.plannedYield || "-"}
                          </div>
                        </div>
                      </div>

                      <div className="text-body-sm text-tertiary bg-[#F5F8F6] p-3.5 rounded-xl border border-outline-variant/30">
                        <span className="font-bold text-on-surface">Bahan Baku Digunakan (BOM):</span> {inputSummary}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-tertiary font-medium">
                          <span>Progress Batch</span>
                          <span className="font-bold text-primary">{b.progress}%</span>
                        </div>
                        <div className="w-full bg-[#E9EDFF] h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isDone ? "bg-primary" : "bg-[#B7791F]"
                            }`}
                            style={{ width: `${b.progress}%` }}
                          />
                        </div>
                      </div>

                      {!isDone && (
                        <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                          <button
                            type="button"
                            onClick={() => handleAdvanceProgress(b)}
                            disabled={updateStatusMutation.isPending}
                            className="h-9 px-3.5 rounded-xl border border-outline-variant/50 hover:bg-[#F5F8F6] text-on-surface text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">trending_up</span>
                            <span>+25% Progress</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCompleteBatch(b)}
                            disabled={updateStatusMutation.isPending}
                            className="h-9 px-4 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            <span>Selesaikan Batch (QC Passed)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: MULAI BATCH PRODUKSI BARU */}
      {/* ========================================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-outline-variant/30 p-6 sm:p-8 animate-fade-in space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">skillet</span>
                </div>
                <div>
                  <h3 className="text-headline-sm font-bold text-[#172033]">Mulai Batch Produksi Baru</h3>
                  <p className="text-xs text-tertiary">
                    Pilih produk menu kasir untuk menarik resep BOM bahan baku secara otomatis
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-tertiary hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Produk Menu Kasir (Sinkron BOM)
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => applyProductTemplate(e.target.value, targetQty)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033] bg-white"
                  >
                    <option value="">-- Custom / Non-Menu Kasir --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Target Porsi
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={targetQty}
                    onChange={(e) => handleTargetQtyChange(Number(e.target.value))}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Nama Resep / Batch Produksi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Produksi Kopi Kenangan Mantan (Aren Latte)"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Stasiun Produksi
                  </label>
                  <select
                    value={station}
                    onChange={(e) => setStation(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033] bg-white"
                  >
                    <option value="Central Bar Extraction">Central Bar Extraction</option>
                    <option value="Kitchen Syrups & Sauces">Kitchen Syrups &amp; Sauces</option>
                    <option value="Bakery Oven Station">Bakery Oven Station</option>
                    <option value="Packaging & Assembly Line">Packaging &amp; Assembly Line</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Operator / Lead In-Charge *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Fahmi Nugraha (Barista Lead)"
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">
                  Target Hasil / Planned Yield *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 20 Porsi Kopi Kenangan Mantan"
                  value={plannedYield}
                  onChange={(e) => setPlannedYield(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                />
              </div>

              {/* Dynamic Rows Bahan Baku */}
              <div className="space-y-3 pt-2 border-t border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#172033]">
                    Kebutuhan Bahan Baku Gudang Owner (BOM)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddIngredientRow}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Tambah Baris Bahan</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {rows.map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <select
                        value={row.ingredientId || ""}
                        onChange={(e) => handleRowChange(idx, "ingredientId", e.target.value)}
                        className="flex-1 h-10 px-3 rounded-xl border border-outline-variant/50 text-xs text-[#172033] bg-white"
                      >
                        <option value="">Pilih dari Gudang Inventaris...</option>
                        {inventory.map((inv) => (
                          <option key={inv.id} value={inv.id}>
                            {inv.name} (Stok: {inv.stock} {inv.unit})
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        min={0.01}
                        step="any"
                        placeholder="Jumlah"
                        value={row.quantity}
                        onChange={(e) => handleRowChange(idx, "quantity", Number(e.target.value))}
                        className="w-24 h-10 px-3 rounded-xl border border-outline-variant/50 text-xs text-[#172033]"
                      />

                      <input
                        type="text"
                        placeholder="Satuan"
                        value={row.unit}
                        onChange={(e) => handleRowChange(idx, "unit", e.target.value)}
                        className="w-20 h-10 px-3 rounded-xl border border-outline-variant/50 text-xs text-[#172033]"
                      />

                      {rows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredientRow(idx)}
                          className="w-8 h-8 rounded-lg hover:bg-error/10 text-tertiary hover:text-error flex items-center justify-center cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/40 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deductIngredients}
                    onChange={(e) => setDeductIngredients(e.target.checked)}
                    className="mt-0.5 rounded border-outline-variant text-primary focus:ring-primary"
                  />
                  <span className="text-xs text-on-surface leading-relaxed">
                    <strong>Potong langsung stok bahan baku gudang owner saat batch dibuat</strong>{" "}
                    <span className="text-tertiary">
                      (Aktifkan untuk batch prep khusus; untuk racikan per order kasir, stok bahan baku dipotong otomatis saat transaksi kasir dibayar).
                    </span>
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">
                  Catatan Batch / Instruksi Khusus
                </label>
                <textarea
                  rows={2}
                  placeholder="Catatan SOP, suhu ekstraksi, atau instruksi kerja..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-xs text-[#172033]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="h-11 px-5 rounded-xl border border-outline-variant/50 hover:bg-surface-container-low text-xs font-bold text-tertiary cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={createBatchMutation.isPending}
                  className="h-11 px-6 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  {createBatchMutation.isPending ? "Memproses..." : "Konfirmasi & Mulai Batch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

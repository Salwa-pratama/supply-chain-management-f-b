"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PRODUCTS, type Category, type Product } from "@/lib/pos-products";
import { S } from "@/components/kasir/pos-styles";
import KasirHeader from "@/components/kasir/KasirHeader";
import KpiCards from "@/components/kasir/KpiCards";
import HistoryModal from "@/components/kasir/HistoryModal";
import ProductImage from "@/components/kasir/ProductImage";

type CartLine = { id: number; qty: number };
type OrderType = "dine-in" | "takeaway" | "delivery";
type Method = "cash" | "qris" | "edc";

type Receipt = {
  no: string;
  waktu: string;
  pelanggan: string;
  jenis: string;
  lines: { name: string; qty: number; price: number }[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  metode: string;
  dibayar: number;
  kembali: number;
};

const DISCOUNT_RATE = 0.1; // Promo Pagi 10%
const TAX_RATE = 0.1; // PB1 10%
const KASIR = "Budi Hartono (Shift Pagi)";
const OUTLET = "Kopi Kenangan Senopati #04";
const QRIS_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCnhKb9Xl1LGtRr2nv8iI74AZbSth3M6mS4vwjmKPtohijA14yOedkIFk2H49ahLemoKkflCUz1wGH5JodhYd9zf1g6GMgPiB7YHrYPcnr5mYY3yCHCqwMN7bXiqNv8cgvSbqsPviQSY998X6D8TfNkSxNIuQoLUY1sB3A2sy0g5MOiZDoRpS6mRTczmgLCjjHrFrVz6ztbJ7afZg5KJ9SAUz3B6kBP5YT_RQSKjBFVRVZ4vGmXl78T"; // TODO: ganti dengan QR dinamis dari API pembayaran

const ORDER_TYPES: { id: OrderType; label: string }[] = [
  { id: "dine-in", label: "Makan di Tempat" },
  { id: "takeaway", label: "Bawa Pulang" },
  { id: "delivery", label: "Delivery Order" },
];
const ORDER_LABEL: Record<OrderType, string> = {
  "dine-in": "Dine In",
  takeaway: "Take Away",
  delivery: "Delivery",
};

const CATEGORIES: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "Semua Produk" },
  { id: "makanan", label: "Makanan" },
  { id: "minuman", label: "Minuman" },
  { id: "snack", label: "Snack" },
  { id: "paket", label: "Paket Hemat" },
];

const METHODS: { id: Method; label: string; sub: string; icon: string }[] = [
  { id: "cash", label: "Uang Tunai / Cash", sub: "Tanpa Biaya Admin", icon: "payments" },
  { id: "qris", label: "QRIS Dinamis", sub: "BAPER Instant QR", icon: "qr_code_2" },
  { id: "edc", label: "Transfer / EDC", sub: "Debit & Kredit", icon: "credit_card" },
];
const METHOD_LABEL: Record<Method, string> = {
  cash: "Tunai (Cash)",
  qris: "QRIS Dinamis",
  edc: "Transfer / EDC",
};

const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

function rupiah(n: number) {
  return (
    "Rp " +
    Math.round(Math.abs(n))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
}
function angka(n: number) {
  return rupiah(n).replace("Rp ", "");
}
function waktuSekarang() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())} ${BULAN[d.getMonth()]} ${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())} WIB`;
}
function noTrx(seq: number) {
  return `#TRX-2025-${String(seq).padStart(4, "0")}`;
}

export default function PosTerminal() {
  const [cart, setCart] = useState<CartLine[]>([
    { id: 4, qty: 2 },
    { id: 1, qty: 1 },
    { id: 7, qty: 1 },
  ]);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [customer, setCustomer] = useState("Ibu Kartika");
  const [wa, setWa] = useState("0812-9876-5432");
  const [seq, setSeq] = useState(842);

  const [payOpen, setPayOpen] = useState(false);
  const [method, setMethod] = useState<Method>("cash");
  const [cash, setCash] = useState("100000");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((pesan: string) => {
    setToast(pesan);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3800);
  }, []);

  // ---------- Perhitungan ----------
  const produkById = useMemo(() => new Map(PRODUCTS.map((p) => [p.id, p])), []);
  const lines = cart.flatMap((l) => {
    const product = produkById.get(l.id);
    return product ? [{ ...l, product }] : [];
  });
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const discount = Math.round(subtotal * DISCOUNT_RATE);
  const tax = Math.round((subtotal - discount) * TAX_RATE);
  const total = subtotal - discount + tax;

  const cashNum = Number(cash) || 0;
  const kembalian = cashNum - total;
  const bisaBayar = method !== "cash" || cashNum >= total;
  const pelangganTampil = customer.trim() || "Pelanggan Umum";

  // ---------- Katalog ----------
  const q = search.trim().toLowerCase();
  const tampil = PRODUCTS.filter((p) => {
    const cocokKategori = category === "all" || p.category === category;
    const cocokNama = p.name.toLowerCase().includes(q);
    const cocokStok =
      stockFilter === "all" ||
      (stockFilter === "available" && p.stock > 0) ||
      (stockFilter === "low" && p.stock > 0 && p.stock <= 15);
    return cocokKategori && cocokNama && cocokStok;
  });
  const hitung = (id: "all" | Category) =>
    id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === id).length;

  // ---------- Aksi keranjang ----------
  function tambah(p: Product) {
    if (p.stock <= 0) return;
    const ada = cart.find((l) => l.id === p.id);
    if (ada && ada.qty >= p.stock) {
      showToast(`Stok ${p.name} hanya tersisa ${p.stock}.`);
      return;
    }
    setCart(
      ada ? cart.map((l) => (l.id === p.id ? { ...l, qty: l.qty + 1 } : l)) : [...cart, { id: p.id, qty: 1 }],
    );
  }
  function ubahQty(id: number, delta: number) {
    const item = cart.find((l) => l.id === id);
    const p = produkById.get(id);
    if (!item || !p) return;
    const qtyBaru = item.qty + delta;
    if (qtyBaru <= 0) return hapus(id);
    if (qtyBaru > p.stock) {
      showToast(`Stok ${p.name} hanya tersisa ${p.stock}.`);
      return;
    }
    setCart(cart.map((l) => (l.id === id ? { ...l, qty: qtyBaru } : l)));
  }
  function hapus(id: number) {
    setCart(cart.filter((l) => l.id !== id));
  }
  function kosongkan() {
    setCart([]);
  }
  function tahan() {
    showToast(
      `Pesanan ${noTrx(seq)} telah disimpan (Hold). Anda dapat membukanya kembali di menu Antrean Pesanan.`,
    );
  }

  // ---------- Pembayaran ----------
  const bukaPembayaran = useCallback(() => {
    if (cart.length === 0) {
      showToast("Keranjang belanja masih kosong!");
      return;
    }
    setPayOpen(true);
  }, [cart.length, showToast]);

  function selesaikan() {
    if (!bisaBayar) return;
    setReceipt({
      no: noTrx(seq),
      waktu: waktuSekarang(),
      pelanggan: `${pelangganTampil} (${ORDER_LABEL[orderType]})`,
      jenis: ORDER_LABEL[orderType],
      lines: lines.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
      subtotal,
      discount,
      tax,
      total,
      metode: METHOD_LABEL[method],
      dibayar: method === "cash" ? cashNum : total,
      kembali: method === "cash" ? kembalian : 0,
    });
    setPayOpen(false);
    // TODO: kirim transaksi ke API backend (Go): POST /transaksi
  }

  function transaksiBaru() {
    setReceipt(null);
    setCart([]);
    setSeq((s) => s + 1);
    setCash("100000");
    setMethod("cash");
    setCustomer("");
    setWa("");
  }

  function cetak() {
    showToast("Perintah cetak dikirim ke Thermal Printer Epson TM-T82X (USB / LAN). Struk tercetak!");
  }

  // ---------- Pintasan keyboard (F4 = bayar, F2 atau / = cari, Esc = tutup) ----------
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const sedangMengetik = !!target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if (e.key === "F4") {
        e.preventDefault();
        if (!receipt) bukaPembayaran();
      } else if (e.key === "F2" || (e.key === "/" && !sedangMengetik)) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape") {
        setPayOpen(false);
        setHistoryOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bukaPembayaran, receipt]);

  return (
    <>
      <KasirHeader onOpenHistory={() => setHistoryOpen(true)} />

      <main className="flex-1 p-6 lg:p-8 space-y-6">
        <KpiCards />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ===== Kolom kiri: katalog ===== */}
          <section className="lg:col-span-8 space-y-4">
            <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-3">
              <div className="flex items-center justify-between bg-[#E8F3EC] border border-[#137A48]/20 px-3.5 py-2 rounded-xl text-primary font-label-md text-label-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">sync</span>
                  <span>Bahan baku terhubung real-time dengan stok inventaris gerai & kitchen batch</span>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary hidden sm:inline">
                  Sinkron otomatis
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <div className="relative flex-1 w-full">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-tertiary text-[20px]">
                    search
                  </span>
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari produk atau SKU (Tekan '/' untuk fokus)..."
                    aria-label="Cari produk"
                    className={S.searchInput}
                  />
                  <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-bold bg-[#F5F8F6] border border-outline-variant/60 rounded text-tertiary">
                    F2
                  </kbd>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    aria-label="Filter ketersediaan"
                    className={S.stockSelect}
                  >
                    <option value="all">Semua Ketersediaan</option>
                    <option value="available">Tersedia Saja</option>
                    <option value="low">Stok Menipis ({"<"}15)</option>
                  </select>
                  <div className="flex border border-outline-variant/60 rounded-xl p-0.5 bg-[#F5F8F6]">
                    <button
                      type="button"
                      className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest text-primary shadow-sm"
                      title="Tampilan Grid"
                    >
                      <span className="material-symbols-outlined text-[18px]">grid_view</span>
                    </button>
                    <button
                      type="button"
                      className="px-2.5 py-1.5 rounded-lg text-tertiary hover:text-on-surface"
                      title="Tampilan List"
                    >
                      <span className="material-symbols-outlined text-[18px]">view_list</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={category === c.id ? S.catActive : S.catIdle}
                  >
                    {c.label} ({hitung(c.id)})
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" id="product-grid">
              {tampil.map((p) =>
                p.stock <= 0 ? (
                  <div
                    key={p.id}
                    className="bg-surface-container-lowest/70 rounded-2xl p-4 border border-outline-variant/30 opacity-75 relative group"
                  >
                    <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-surface-container-low grayscale">
                      <ProductImage src={p.img} alt={p.name} />
                      <div className="absolute inset-0 bg-inverse-surface/40 flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-error text-on-primary font-label-sm text-label-sm font-bold uppercase tracking-wider shadow">
                          Stok Habis
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <h3 className="font-headline-sm text-headline-sm font-bold text-tertiary leading-tight">
                        {p.name}
                      </h3>
                    </div>
                    <p className="font-body-sm text-[11px] text-error">{p.desc}</p>
                    <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                      <div>
                        <span className="font-label-sm text-[10px] text-tertiary">Harga</span>
                        <p className="font-headline-sm text-headline-sm font-bold text-tertiary">
                          {rupiah(p.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled
                        className="h-9 px-3.5 rounded-xl bg-surface-container text-tertiary cursor-not-allowed font-label-md text-label-md flex items-center gap-1.5 border border-outline-variant/40"
                      >
                        <span className="material-symbols-outlined text-[18px]">block</span>
                        <span>Habis</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={p.id}
                    className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between hover:border-primary/50 transition-all group"
                  >
                    <div>
                      <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-[#F5F8F6]">
                        <ProductImage
                          src={p.img}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm border border-outline-variant/40 font-bold">
                          {p.categoryLabel}
                        </span>
                        <span
                          className={`absolute bottom-2 right-2 px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${
                            p.stock < 10
                              ? "bg-[#FFF9E6] text-[#B7791F]"
                              : "bg-secondary-container text-primary"
                          }`}
                        >
                          {p.stockLabel}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight">
                          {p.name}
                        </h3>
                      </div>
                      <p className="font-body-sm text-[12px] text-tertiary line-clamp-1">{p.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                      <div>
                        <span className="font-label-sm text-[10px] text-tertiary">Harga</span>
                        <p className="font-headline-sm text-headline-sm font-bold text-primary">
                          {rupiah(p.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => tambah(p)}
                        className="h-9 px-3.5 rounded-xl bg-primary-container hover:bg-[#0D6038] text-on-primary font-label-md text-label-md flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        <span>Tambah</span>
                      </button>
                    </div>
                  </div>
                ),
              )}
              {tampil.length === 0 && (
                <div className="col-span-full p-10 text-center text-tertiary bg-surface-container-lowest rounded-2xl border border-outline-variant/35">
                  <span className="material-symbols-outlined text-[36px] opacity-40">search_off</span>
                  <p className="font-label-md text-label-md mt-1">Tidak ada produk yang cocok</p>
                </div>
              )}
            </div>
          </section>

          {/* ===== Kolom kanan: keranjang ===== */}
          <aside className="lg:col-span-4 sticky top-20">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.06)] flex flex-col overflow-hidden">
              <div className="p-4 border-b border-outline-variant/30 bg-[#F5F8F6]/60">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    </span>
                    <div>
                      <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        Keranjang Belanja
                      </h2>
                      <span className="font-label-sm text-[11px] text-tertiary">
                        Order ID: <span className="font-bold text-primary">{noTrx(seq)}</span>
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={kosongkan}
                    className="text-tertiary hover:text-error text-label-sm font-label-sm flex items-center gap-1 p-1 hover:bg-error-container/20 rounded-lg transition-colors"
                    title="Kosongkan Keranjang"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                    <span>Reset</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1 bg-[#E8F3EC] p-1 rounded-xl">
                  {ORDER_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setOrderType(t.id)}
                      className={orderType === t.id ? S.otActive : S.otIdle}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <label
                      htmlFor="customer-name"
                      className="block font-label-sm text-[11px] text-tertiary mb-1"
                    >
                      Nama Pelanggan
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      value={customer}
                      onChange={(e) => setCustomer(e.target.value)}
                      placeholder="Pelanggan Umum"
                      className={S.custInput}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="customer-wa"
                      className="block font-label-sm text-[11px] text-tertiary mb-1"
                    >
                      No WhatsApp
                    </label>
                    <input
                      id="customer-wa"
                      type="text"
                      value={wa}
                      onChange={(e) => setWa(e.target.value)}
                      placeholder="08xx-xxxx-xxxx"
                      className={S.custInput}
                    />
                  </div>
                </div>
              </div>

              <div
                className="p-4 space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar"
                id="cart-item-list"
              >
                {lines.length === 0 && (
                  <div className="p-8 text-center text-tertiary">
                    <span className="material-symbols-outlined text-[36px] opacity-40 mb-1">
                      remove_shopping_cart
                    </span>
                    <p className="font-label-md text-label-md">Keranjang Kosong</p>
                    <p className="font-body-sm text-[11px]">
                      Silakan pilih produk dari katalog di sebelah kiri
                    </p>
                  </div>
                )}
                {lines.map(({ product: p, qty }) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-outline-variant/30 hover:border-outline-variant/80 transition-colors bg-surface-bright"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-low">
                        <ProductImage src={p.img} alt={p.name} iconSize={20} />
                      </div>
                      <div className="truncate">
                        <p className="font-label-md text-label-md font-bold text-on-surface truncate">
                          {p.name}
                        </p>
                        <span className="font-body-sm text-[11px] text-tertiary">@ {rupiah(p.price)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center border border-outline-variant/50 rounded-lg bg-surface-container-lowest">
                        <button
                          type="button"
                          aria-label={`Kurangi ${p.name}`}
                          onClick={() => ubahQty(p.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-tertiary hover:text-error hover:bg-error-container/20 rounded-l-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">remove</span>
                        </button>
                        <span className="w-6 text-center font-label-md text-label-md font-bold text-on-surface">
                          {qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Tambah ${p.name}`}
                          onClick={() => ubahQty(p.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-r-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span>
                        </button>
                      </div>
                      <div className="text-right min-w-[70px]">
                        <span className="font-label-md text-label-md font-bold text-on-surface block">
                          {rupiah(p.price * qty)}
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label={`Hapus ${p.name}`}
                        onClick={() => hapus(p.id)}
                        className="text-tertiary hover:text-error transition-colors p-1"
                        title="Hapus"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-outline-variant/30 bg-[#F5F8F6]/40 space-y-2">
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-tertiary">Subtotal</span>
                  <span className="font-semibold text-on-surface" data-testid="subtotal">
                    {rupiah(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">loyalty</span> Diskon Member
                    (Promo Pagi 10%)
                  </span>
                  <span className="font-semibold text-primary" data-testid="diskon">
                    -{rupiah(discount)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="text-tertiary">PB1 / Pajak Resto (10%)</span>
                  <span className="font-semibold text-on-surface" data-testid="pajak">
                    +{rupiah(tax)}
                  </span>
                </div>
                <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between">
                  <div>
                    <span className="font-label-sm text-[11px] text-tertiary uppercase tracking-wider block">
                      Total Tagihan
                    </span>
                    <span className="text-[11px] text-primary font-bold">Termasuk Pajak Restoran</span>
                  </div>
                  <div className="text-right">
                    <span
                      className="font-headline-md text-[24px] font-extrabold text-[#137A48]"
                      data-testid="total"
                    >
                      {rupiah(total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={tahan} className={S.holdBtn}>
                    <span className="material-symbols-outlined text-[18px]">pause_circle</span>
                    <span>Hold Pesanan</span>
                  </button>
                  <button type="button" onClick={kosongkan} className={S.cancelBtn}>
                    <span className="material-symbols-outlined text-[18px]">close</span>
                    <span>Batal</span>
                  </button>
                </div>
                <button type="button" onClick={bukaPembayaran} className={S.payBtn}>
                  <span className="material-symbols-outlined text-[22px]">payments</span>
                  <span>Proses Pembayaran (F4)</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ===== Modal pembayaran ===== */}
      {payOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pilih Metode Pembayaran"
          className="fixed inset-0 z-50 bg-[#172033]/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-surface-container-lowest rounded-3xl max-w-xl w-full border border-outline-variant/60 shadow-[0_24px_48px_-8px_rgba(23,32,51,0.2)] overflow-hidden">
            <div className="p-5 border-b border-outline-variant/35 flex items-center justify-between bg-[#F5F8F6]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Pilih Metode Pembayaran
                  </h3>
                  <p className="font-body-sm text-[12px] text-tertiary">
                    No Pesanan: {noTrx(seq)} • {pelangganTampil}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Tutup"
                onClick={() => setPayOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container text-tertiary flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="bg-[#E8F3EC] border border-[#137A48]/20 rounded-2xl p-4 text-center">
                <span className="font-label-md text-label-md text-tertiary">
                  Total Tagihan Yang Harus Dibayar
                </span>
                <p
                  className="font-headline-xl text-[32px] font-extrabold text-[#137A48] mt-0.5"
                  data-testid="tagihan"
                >
                  {rupiah(total)}
                </p>
              </div>

              <div>
                <span className="block font-label-md text-label-md font-bold text-on-surface mb-2">
                  Metode Pembayaran
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      aria-pressed={method === m.id}
                      onClick={() => setMethod(m.id)}
                      className={method === m.id ? S.payMethodActive : S.payMethodIdle}
                    >
                      <span
                        className={`material-symbols-outlined text-[24px] ${method === m.id ? "text-primary" : "text-tertiary"}`}
                      >
                        {m.icon}
                      </span>
                      <span className="font-label-md text-label-md font-bold text-on-surface mt-2 block">
                        {m.label}
                      </span>
                      <span className="font-body-sm text-[10px] text-tertiary">{m.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {method === "cash" && (
                <div className="space-y-3 bg-[#F5F8F6] p-4 rounded-2xl border border-outline-variant/35">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="cash-input"
                      className="font-label-md text-label-md font-bold text-on-surface"
                    >
                      Uang Diterima
                    </label>
                    <div className="flex gap-1.5">
                      {[90000, 100000, 150000].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setCash(String(n))}
                          className="px-2.5 py-1 text-[11px] rounded-lg bg-surface-container-lowest border border-outline-variant font-semibold hover:border-primary"
                        >
                          Rp {n / 1000}k
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-tertiary">
                      Rp
                    </span>
                    <input
                      id="cash-input"
                      type="number"
                      min={0}
                      value={cash}
                      onChange={(e) => setCash(e.target.value)}
                      className={S.cashInput}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/40">
                    <span className="font-label-md text-label-md font-semibold text-tertiary">
                      Uang Kembalian:
                    </span>
                    <span
                      data-testid="kembalian"
                      className={`font-headline-sm text-headline-sm font-extrabold ${
                        kembalian >= 0 ? "text-[#137A48]" : "text-error"
                      }`}
                    >
                      {kembalian >= 0 ? rupiah(kembalian) : `Kurang ${rupiah(kembalian)}`}
                    </span>
                  </div>
                </div>
              )}

              {method === "qris" && (
                <div className="text-center space-y-3 p-4 bg-[#F5F8F6] rounded-2xl border border-outline-variant/35">
                  <div className="w-40 h-40 bg-surface-container-lowest mx-auto p-2 rounded-xl border border-outline-variant/40 flex items-center justify-center">
                    <ProductImage
                      src={QRIS_IMG}
                      alt="Kode QRIS dinamis"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="font-body-sm text-[12px] text-tertiary">
                    Pindai dengan GoPay, OVO, Dana, BCA, atau Livin&apos; Mandiri
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-primary text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" /> Menunggu sinyal
                    pembayaran...
                  </div>
                </div>
              )}

              {method === "edc" && (
                <div className="flex items-start gap-3 p-4 bg-[#F5F8F6] rounded-2xl border border-outline-variant/35 text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary">credit_card</span>
                  <p className="font-body-sm text-body-sm">
                    Minta pelanggan menggesek, menempel, atau memasukkan kartu pada mesin EDC sebesar{" "}
                    <strong>{rupiah(total)}</strong>, lalu tekan Selesaikan Transaksi.
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-outline-variant/35 bg-[#F5F8F6] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPayOpen(false)}
                className="h-11 px-5 rounded-xl border border-outline-variant text-tertiary hover:text-on-surface font-label-md text-label-md transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={!bisaBayar}
                onClick={selesaikan}
                className={`h-11 px-6 rounded-xl bg-primary-container hover:bg-[#0D6038] text-on-primary font-headline-sm text-headline-sm font-bold flex items-center gap-2 shadow-md shadow-primary-container/20 ${
                  bisaBayar ? "" : "opacity-50 cursor-not-allowed"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Selesaikan Transaksi (LUNAS)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Modal struk ===== */}
      {receipt && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Struk Thermal"
          className="fixed inset-0 z-50 bg-[#172033]/65 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full border border-outline-variant/60 shadow-[0_24px_48px_-8px_rgba(23,32,51,0.25)] overflow-hidden">
            <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">receipt</span>
                <span className="font-label-md text-label-md font-bold">Struk Thermal 80mm BAPER POS</span>
              </div>
              <button
                type="button"
                aria-label="Tutup struk"
                onClick={transaksiBaru}
                className="text-on-primary/80 hover:text-on-primary"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 bg-[#F5F8F6] flex justify-center">
              <div className="w-[320px] bg-white shadow-md border border-outline-variant/50 p-5 rounded-md font-mono text-[12px] leading-tight text-on-surface">
                <div className="text-center pb-3 border-b border-dashed border-outline-variant space-y-1">
                  <h4 className="font-bold text-[16px] tracking-wider text-primary">BAPER SCM & POS</h4>
                  <p className="text-[11px] text-tertiary">{OUTLET}</p>
                  <p className="text-[10px] text-tertiary">
                    Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta
                  </p>
                  <p className="text-[10px] text-tertiary">Telp: 021-5582910 | SCM ID: SNO-442</p>
                </div>
                <div className="py-2.5 border-b border-dashed border-outline-variant text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span>No TRX:</span>
                    <span className="font-bold">{receipt.no}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waktu:</span>
                    <span>{receipt.waktu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kasir:</span>
                    <span>{KASIR}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pelanggan:</span>
                    <span>{receipt.pelanggan}</span>
                  </div>
                </div>
                <div className="py-3 border-b border-dashed border-outline-variant space-y-2">
                  {receipt.lines.map((l) => (
                    <div key={l.name}>
                      <div className="flex justify-between font-bold">
                        <span>{l.name}</span>
                        <span>{angka(l.price * l.qty)}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-tertiary">
                        <span>
                          {l.qty} x @{angka(l.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="py-3 border-b border-dashed border-outline-variant space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{rupiah(receipt.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#137A48]">
                    <span>Diskon Member (10%):</span>
                    <span>-{rupiah(receipt.discount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PB1 Pajak Resto (10%):</span>
                    <span>+{rupiah(receipt.tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[14px] pt-1 border-t border-dotted border-outline-variant text-[#137A48]">
                    <span>TOTAL:</span>
                    <span>{rupiah(receipt.total)}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Metode: {receipt.metode}</span>
                    <span>{rupiah(receipt.dibayar)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Kembalian:</span>
                    <span>{rupiah(receipt.kembali)}</span>
                  </div>
                </div>
                <div className="pt-4 text-center space-y-1">
                  <span className="inline-block px-3 py-0.5 rounded border border-[#137A48] text-[#137A48] font-bold text-[11px] tracking-widest uppercase">
                    LUNAS
                  </span>
                  <p className="text-[11px] font-bold mt-2">Terima Kasih, Selamat Menikmati!</p>
                  <p className="text-[9px] text-tertiary">Kritik & Saran WA: {wa || "-"}</p>
                  <p className="text-[8px] text-tertiary pt-1">Powered by BAPER SCM Precision Ledger</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-outline-variant/35 bg-surface-container-lowest flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={cetak}
                className="flex-1 h-11 rounded-xl bg-surface-container-lowest border-2 border-primary text-primary hover:bg-[#E8F3EC] font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>Cetak Struk (Thermal)</span>
              </button>
              <button
                type="button"
                onClick={transaksiBaru}
                className="flex-1 h-11 rounded-xl bg-primary-container hover:bg-[#0D6038] text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Transaksi Baru</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {historyOpen && <HistoryModal onClose={() => setHistoryOpen(false)} />}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] max-w-md px-4 py-3 rounded-xl bg-[#172033] text-white font-label-md text-label-md shadow-lg flex items-start gap-2"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary-container">info</span>
          <span>{toast}</span>
        </div>
      )}
    </>
  );
}

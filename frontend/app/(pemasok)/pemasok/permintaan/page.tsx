"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";
import { useToast } from "@/components/ui/Toast";
import {
  runProgressTask,
  useProgressToast,
} from "@/components/ui/ProgressToast";

type DeadlineVariant = "urgent" | "normal" | "sent" | "done";
type StatusVariant = "open" | "review" | "success";

interface Quotation {
  price: string;
  leadTime: string;
  notes: string;
  submittedAt: string;
}

interface RfqItem {
  id: string;
  brand: string;
  category: string;
  requestedVolume: string;
  targetPrice: string;
  estimatedContractValue: string;
  period: string;
  deadline: string;
  deadlineVariant: DeadlineVariant;
  status: string;
  statusVariant: StatusVariant;
  location: string;
  paymentTerms: string;
  pic: { name: string; role: string; phone: string; email: string };
  quotation?: Quotation;
}

type ModalState =
  | { type: "spec"; rfq: RfqItem }
  | { type: "pic"; rfq: RfqItem }
  | { type: "quote"; rfq: RfqItem }
  | { type: "viewQuote"; rfq: RfqItem }
  | { type: "new" }
  | null;

const STORAGE_KEY = "baper.pemasok.rfq.v1";
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const SEED_RFQ: RfqItem[] = [
  {
    id: "RFQ-FNB-2024-041",
    brand: "Dear Butter - Artisan Croissant & Bakery",
    category: "Dairy & Butter Segar",
    requestedVolume: "600 Kg Butter Anchor & 800 L Fresh Milk / Bulan",
    targetPrice: "Rp 23.500 / Liter & Rp 140.000 / Kg",
    estimatedContractValue: "Rp 102.800.000 / Bulan",
    period: "Kontrak Pasokan 6 Bulan (Jun - Nov 2024)",
    deadline: "Sisa 2 Hari Lagi",
    deadlineVariant: "urgent",
    status: "Terbuka untuk Penawaran",
    statusVariant: "open",
    location: "Kawasan Bakery Central Kitchen, BSD, Tangerang",
    paymentTerms: "Tempo Pembayaran: TOP 30 Hari",
    pic: {
      name: "Rina Kusuma",
      role: "Procurement Lead Dear Butter",
      phone: "0812-3456-7890",
      email: "procurement@dearbutter.id",
    },
  },
  {
    id: "RFQ-FNB-2024-039",
    brand: "Tomoro Coffee - Regional Jabodetabek",
    category: "Biji Kopi Specialty",
    requestedVolume: "1.200 Kg Arabika Toraja & Flores Bajawa / Bulan",
    targetPrice: "Rp 160.000 / Kg (Packaging Valve 1kg)",
    estimatedContractValue: "Rp 192.000.000 / Bulan",
    period: "Kontrak Pasokan 12 Bulan (Tahunan)",
    deadline: "Sisa 4 Hari Lagi",
    deadlineVariant: "normal",
    status: "Terbuka untuk Penawaran",
    statusVariant: "open",
    location: "Hub Distribusi Tomoro, Kebon Jeruk, Jakarta Barat",
    paymentTerms: "Tempo Pembayaran: TOP 14 Hari (Transfer Bank)",
    pic: {
      name: "Dimas Anggara",
      role: "Supply Chain Manager Tomoro",
      phone: "0813-9988-7766",
      email: "supplychain@tomoro.coffee",
    },
  },
  {
    id: "RFQ-FNB-2024-035",
    brand: "Haus! Indonesia - Kemitraan Minuman",
    category: "Sirup & Puree Buah",
    requestedVolume: "350 Jeriken Sirup Gula Aren & Mangga (5L)",
    targetPrice: "Rp 120.000 / Jeriken 5L",
    estimatedContractValue: "Rp 42.000.000 / Bulan",
    period: "Kontrak Pasokan 3 Bulan",
    deadline: "Penawaran Dikirim",
    deadlineVariant: "sent",
    status: "Tahap Evaluasi Penawaran",
    statusVariant: "review",
    location: "Warehouse Logistik Haus!, Ciputat, Tangerang Selatan",
    paymentTerms: "Tempo Pembayaran: Cash on Delivery (COD) / 7 Hari",
    pic: {
      name: "Sinta Maharani",
      role: "Partnership Officer Haus!",
      phone: "0857-1122-3344",
      email: "partner@haus.id",
    },
    quotation: {
      price: "Rp 118.500 / Jeriken 5L",
      leadTime: "3 hari kerja setelah PO",
      notes: "Free ongkir untuk pengiriman > 100 jeriken.",
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
  {
    id: "RFQ-FNB-2024-031",
    brand: "Kopi Kenangan - Outlet Baru Sentul",
    category: "Paket Pembukaan Gerai Baru",
    requestedVolume: "Starter Pack: 100 Kg Beans + 300L Milk + Cups",
    targetPrice: "Sesuai Kontrak Master Price Agreement",
    estimatedContractValue: "Rp 24.600.000",
    period: "Pengiriman Perdana Sekaligus",
    deadline: "Terkonfirmasi",
    deadlineVariant: "done",
    status: "Deal - Dikonversi Menjadi PO",
    statusVariant: "success",
    location: "Sentul City Mall Lt. 1, Bogor",
    paymentTerms: "Mengikuti Kontrak Master: TOP 14 Hari",
    pic: {
      name: "Andi Pratama",
      role: "Outlet Project Lead Kopi Kenangan",
      phone: "0811-2233-4455",
      email: "outlet.project@kopikenangan.com",
    },
    quotation: {
      price: "Sesuai kontrak master price agreement",
      leadTime: "7 hari kerja pengiriman perdana",
      notes: "PO sudah diterbitkan oleh tim procurement pusat.",
      submittedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
];

function statusStyles(variant: StatusVariant) {
  if (variant === "open") {
    return "bg-[#E8F3EC] text-primary border border-primary/20";
  }
  if (variant === "review") {
    return "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/20";
  }
  return "bg-[#E8F3EC] text-primary border border-primary/20";
}

function deadlineStyles(variant: DeadlineVariant) {
  if (variant === "urgent") return "text-[#B54747]";
  if (variant === "normal") return "text-[#B7791F]";
  return "text-tertiary";
}

function ModalShell({
  title,
  subtitle,
  onClose,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-inverse-surface/45 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-lg bg-white rounded-2xl border border-outline-variant/40 shadow-[0_24px_60px_-20px_rgba(23,32,51,0.45)] overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-outline-variant/30">
          <div>
            <h2 className="text-headline-sm font-headline-sm text-[#172033] font-bold">
              {title}
            </h2>
            {subtitle && (
              <p className="text-body-sm text-tertiary mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-tertiary hover:bg-surface-container hover:text-on-surface transition-colors"
            aria-label="Tutup dialog"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="px-6 py-5 max-h-[65vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>

        {footer && (
          <div className="flex flex-wrap items-center justify-end gap-2 px-6 py-4 bg-[#F9F9FF] border-t border-outline-variant/30">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PemasokPermintaanPage() {
  const toast = useToast();
  const progress = useProgressToast();
  const [rfqs, setRfqs] = useState<RfqItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);

  const [quotePrice, setQuotePrice] = useState("");
  const [quoteLeadTime, setQuoteLeadTime] = useState("3 hari kerja setelah PO");
  const [quoteNotes, setQuoteNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [newBrand, setNewBrand] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newVolume, setNewVolume] = useState("");
  const [newTargetPrice, setNewTargetPrice] = useState("");
  const [newPeriod, setNewPeriod] = useState("Kontrak Pasokan 6 Bulan");
  const [newLocation, setNewLocation] = useState("");
  const [newPaymentTerms, setNewPaymentTerms] = useState("Tempo Pembayaran: TOP 30 Hari");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setRfqs(parsed as RfqItem[]);
          setHydrated(true);
          return;
        }
      }
    } catch {
      // fallback ke seed
    }
    setRfqs(SEED_RFQ);
    setHydrated(true);
  }, []);

  function persist(next: RfqItem[]) {
    setRfqs(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      throw new Error("Penyimpanan browser tidak tersedia.");
    }
  }

  const stats = useMemo(() => {
    const open = rfqs.filter((rfq) => rfq.statusVariant === "open").length;
    const review = rfqs.filter((rfq) => rfq.statusVariant === "review").length;
    const success = rfqs.filter((rfq) => rfq.statusVariant === "success").length;
    const total = rfqs.length;
    const winRate = total ? Math.round((success / total) * 100) : 0;
    return { open, review, success, winRate, total };
  }, [rfqs]);

  const openQuoteModal = (rfq: RfqItem) => {
    setQuotePrice(rfq.targetPrice.startsWith("Rp") ? "" : rfq.targetPrice);
    setQuoteLeadTime("3 hari kerja setelah PO");
    setQuoteNotes("");
    setModal({ type: "quote", rfq });
  };

  const submitQuotation = async (rfq: RfqItem) => {
    if (!quotePrice.trim()) {
      toast.warning("Harga penawaran wajib diisi.", "Data Belum Lengkap");
      return;
    }

    setSubmitting(true);
    const result = await runProgressTask(progress, {
      title: "Mengirim Penawaran Harga",
      icon: "send",
      steps: [
        {
          message: `Memvalidasi penawaran untuk ${rfq.brand}...`,
          run: () => wait(420),
        },
        {
          message: "Mengirim dokumen quotation ke PIC gerai...",
          run: () => wait(760),
        },
        {
          message: "Memperbarui status tender...",
          run: () => wait(360),
        },
      ],
      successTitle: "Penawaran terkirim",
      successMessage: () =>
        `Quotation untuk ${rfq.id} sudah masuk tahap evaluasi PIC gerai.`,
      errorTitle: "Gagal mengirim penawaran",
    });

    if (result.ok) {
      const next = rfqs.map((item) =>
        item.id === rfq.id
          ? {
              ...item,
              status: "Tahap Evaluasi Penawaran",
              statusVariant: "review" as StatusVariant,
              deadline: "Penawaran Dikirim",
              deadlineVariant: "sent" as DeadlineVariant,
              quotation: {
                price: quotePrice.trim(),
                leadTime: quoteLeadTime.trim(),
                notes: quoteNotes.trim(),
                submittedAt: new Date().toISOString(),
              },
            }
          : item
      );
      persist(next);
      setModal(null);
      toast.success(
        `Penawaran ${rfq.id} berhasil dikirim.`,
        "Quotation Terkirim"
      );
    }

    setSubmitting(false);
  };

  const submitNewRfq = async () => {
    if (!newBrand.trim() || !newVolume.trim()) {
      toast.warning(
        "Nama gerai dan spesifikasi kebutuhan wajib diisi.",
        "Data Belum Lengkap"
      );
      return;
    }

    setSubmitting(true);
    const result = await runProgressTask(progress, {
      title: "Menerbitkan Permintaan Terbuka",
      icon: "post_add",
      steps: [
        {
          message: "Menyusun dokumen RFQ...",
          run: () => wait(420),
        },
        {
          message: "Menyiarkan tender ke jaringan pemilik bisnis...",
          run: () => wait(820),
        },
      ],
      successTitle: "RFQ terbit",
      successMessage: () =>
        "Permintaan pembelian terbuka Anda sudah tayang untuk mitra F&B.",
      errorTitle: "Gagal menerbitkan RFQ",
    });

    if (result.ok) {
      const year = new Date().getFullYear();
      const id = `RFQ-SUP-${year}-${String(
        Math.floor(Math.random() * 900) + 100
      )}`;
      const nextItem: RfqItem = {
        id,
        brand: newBrand.trim(),
        category: newCategory.trim() || "Pasokan Umum",
        requestedVolume: newVolume.trim(),
        targetPrice: newTargetPrice.trim() || "Terbuka untuk penawaran",
        estimatedContractValue: "-",
        period: newPeriod,
        deadline: "Baru Dibuka",
        deadlineVariant: "normal",
        status: "Terbuka untuk Penawaran",
        statusVariant: "open",
        location: newLocation.trim() || "Lokasi gerai mitra",
        paymentTerms: newPaymentTerms,
        pic: {
          name: "Hendro Prasetyo",
          role: "Kepala Logistik & Distribusi",
          phone: "0812-0000-8821",
          email: "hendro@tanimakmur.co.id",
        },
      };

      persist([nextItem, ...rfqs]);
      setModal(null);
      setNewBrand("");
      setNewCategory("");
      setNewVolume("");
      setNewTargetPrice("");
      setNewLocation("");
      toast.success(
        `${id} berhasil diterbitkan dan menunggu penawaran mitra.`,
        "Permintaan Terbuka Terbit"
      );
    }

    setSubmitting(false);
  };

  const downloadHistory = () => {
    const rows = rfqs.map((rfq) => {
      const quote = rfq.quotation;
      return [
        rfq.id,
        rfq.brand,
        rfq.category,
        rfq.status,
        quote?.price ?? "-",
        quote?.leadTime ?? "-",
        quote ? new Date(quote.submittedAt).toLocaleString("id-ID") : "-",
      ]
        .map((value) =>
          String(value).includes(",") ? `"${String(value).replace(/"/g, "'")}"` : value
        )
        .join(",");
    });

    const header =
      "Kode Tender,Gerai,Kategori,Status,Harga Penawaran,Lead Time,Waktu Penawaran";
    const csv = `${header}\n${rows.join("\n")}`;
    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `riwayat_penawaran_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(
      `${rfqs.length} riwayat penawaran berhasil diunduh.`,
      "Unduhan Selesai"
    );
  };

  const copyContact = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} disalin ke clipboard.`, "Berhasil Disalin");
    } catch {
      toast.warning("Browser memblokir clipboard.", "Tidak Bisa Menyalin");
    }
  };

  const inputClass =
    "w-full h-11 px-4 text-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all";
  const labelClass = "text-xs font-bold text-tertiary uppercase";

  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Pengadaan &amp; Tender Pasokan F&B
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                {hydrated ? `${stats.open} Tender Terbuka Perlu Penawaran` : "Memuat..."}
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Permintaan Pembelian &amp; Tender (RFQ)
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Daftar permohonan pasokan bahan baku dari jaringan gerai F&B yang mencari mitra pemasok resmi berskala besar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={downloadHistory}
              className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Unduh Riwayat Penawaran</span>
            </button>
            <button
              type="button"
              onClick={() => setModal({ type: "new" })}
              className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">post_add</span>
              <span>Kirim Penawaran Terbuka</span>
            </button>
          </div>
        </div>

        {/* STATS 4 CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Tender Terbuka (Baru)</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">
              {stats.open} <span className="text-sm font-normal text-tertiary">Permintaan</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Batas Penawaran Minggu Ini
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Penawaran Diproses</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#B7791F]">
              {stats.review} <span className="text-sm font-normal text-tertiary">Pengajuan</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-[#B7791F] bg-[#FFF9E6] px-2 py-0.5 rounded-full border border-[#B7791F]/20">
              Evaluasi Harga &amp; Sampel
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Tahap Negosiasi TOP</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
              {stats.review} <span className="text-sm font-normal text-tertiary">Mitra</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-tertiary bg-[#F5F8F6] px-2 py-0.5 rounded-full">
              Penyusunan Kontrak B2B
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Kontrak Deal / PO Terbit</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">
              {stats.success} <span className="text-sm font-normal text-tertiary">Kontrak</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Tingkat Kemenangan {stats.winRate}%
            </span>
          </div>
        </div>

        {/* RFQ CARDS LIST */}
        <div className="space-y-4">
          {!hydrated ? (
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/35 text-center text-tertiary">
              <span className="material-symbols-outlined animate-spin text-3xl text-primary">
                progress_activity
              </span>
              <p className="mt-2 text-body-sm">Memuat daftar tender...</p>
            </div>
          ) : (
            rfqs.map((rfq) => (
              <div
                key={rfq.id}
                className={`bg-white rounded-2xl border p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] relative overflow-hidden transition-all hover:shadow-md ${
                  rfq.statusVariant === "open"
                    ? "border-primary/40 hover:border-primary"
                    : "border-outline-variant/35"
                }`}
              >
                {rfq.statusVariant === "open" && (
                  <div className="absolute top-0 left-0 h-1.5 w-full bg-primary" />
                )}
                {rfq.statusVariant === "review" && (
                  <div className="absolute top-0 left-0 h-1.5 w-full bg-[#B7791F]" />
                )}
                {rfq.statusVariant === "success" && (
                  <div className="absolute top-0 left-0 h-1.5 w-full bg-[#2B8A5B]" />
                )}

                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pb-5 border-b border-outline-variant/30">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                        rfq.statusVariant === "open"
                          ? "bg-[#E8F3EC] text-primary border-primary/20"
                          : rfq.statusVariant === "review"
                          ? "bg-[#FFF9E6] text-[#B7791F] border-[#B7791F]/20"
                          : "bg-[#E8F3EC] text-primary border-primary/20"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px]">
                        assignment_turned_in
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-headline-sm text-headline-sm text-[#172033]">
                          {rfq.brand}
                        </h3>
                        <span className="bg-[#F5F8F6] text-tertiary text-[11px] font-bold px-2 py-0.5 rounded-full border border-outline-variant/40">
                          {rfq.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-tertiary mt-1">
                        <span>
                          Kode Tender: <strong className="text-on-surface font-mono">{rfq.id}</strong>
                        </span>
                        <span>•</span>
                        <span>{rfq.period}</span>
                        <span>•</span>
                        <span className={`font-bold ${deadlineStyles(rfq.deadlineVariant)}`}>
                          {rfq.deadline}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-tertiary mt-2">
                        <span className="material-symbols-outlined text-[16px] text-tertiary">
                          pin_drop
                        </span>
                        <span>{rfq.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Estimasi Nilai */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${statusStyles(
                        rfq.statusVariant
                      )}`}
                    >
                      {rfq.status}
                    </span>

                    <div className="text-right">
                      <span className="text-xs text-tertiary">Estimasi Nilai Kontrak</span>
                      <div className="text-headline-sm font-headline-sm font-bold text-primary">
                        {rfq.estimatedContractValue}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detail Kebutuhan Bahan & Term */}
                <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-body-sm">
                  <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 space-y-1">
                    <span className="text-xs font-bold text-tertiary uppercase">Spesifikasi Kebutuhan:</span>
                    <div className="font-semibold text-on-surface">{rfq.requestedVolume}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 space-y-1">
                    <span className="text-xs font-bold text-tertiary uppercase">Target Harga Mitra:</span>
                    <div className="font-semibold text-[#B7791F]">{rfq.targetPrice}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 space-y-1">
                    <span className="text-xs font-bold text-tertiary uppercase">Ketentuan Pembayaran:</span>
                    <div className="font-semibold text-on-surface">{rfq.paymentTerms}</div>
                  </div>
                </div>

                {/* Action Cluster */}
                <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setModal({ type: "spec", rfq })}
                      className="h-10 px-3.5 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">description</span>
                      <span>Lihat Spesifikasi Lengkap (TOR)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setModal({ type: "pic", rfq })}
                      className="h-10 px-3.5 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      <span>Tanya PIC Gerai</span>
                    </button>
                  </div>

                  {rfq.statusVariant === "open" && (
                    <button
                      type="button"
                      onClick={() => openQuoteModal(rfq)}
                      className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      <span>Ajukan Penawaran Harga (Quotation)</span>
                    </button>
                  )}

                  {rfq.statusVariant === "review" && (
                    <button
                      type="button"
                      onClick={() => setModal({ type: "viewQuote", rfq })}
                      className="h-10 px-5 rounded-xl border border-[#94B9A9] text-primary hover:bg-[#E8F3EC] text-label-md font-label-md flex items-center gap-1.5 transition-all font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                      <span>Lihat Penawaran Terkirim</span>
                    </button>
                  )}

                  {rfq.statusVariant === "success" && (
                    <Link
                      href="/pemasok/pesanan-po"
                      className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                      <span>Lihat PO Terbit</span>
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* MODALS */}
      {modal?.type === "spec" && (
        <ModalShell
          title="Spesifikasi Lengkap (TOR)"
          subtitle={`${modal.rfq.id} • ${modal.rfq.brand}`}
          onClose={() => setModal(null)}
          footer={
            <button
              type="button"
              onClick={() => setModal(null)}
              className="h-10 px-4 rounded-xl border border-outline-variant/50 bg-white text-on-surface text-label-md font-label-md hover:bg-[#F5F8F6] transition-colors"
            >
              Tutup
            </button>
          }
        >
          <div className="space-y-4 text-body-sm">
            {[
              { label: "Kategori Pasokan", value: modal.rfq.category },
              { label: "Volume / Spesifikasi", value: modal.rfq.requestedVolume },
              { label: "Target Harga", value: modal.rfq.targetPrice },
              { label: "Estimasi Nilai Kontrak", value: modal.rfq.estimatedContractValue },
              { label: "Periode Kontrak", value: modal.rfq.period },
              { label: "Lokasi Pengiriman", value: modal.rfq.location },
              { label: "Ketentuan Pembayaran", value: modal.rfq.paymentTerms },
              { label: "Batas Penawaran", value: modal.rfq.deadline },
            ].map((row) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 py-2 border-b border-outline-variant/20 last:border-b-0"
              >
                <span className="text-xs font-bold uppercase text-tertiary">
                  {row.label}
                </span>
                <span className="font-semibold text-on-surface sm:text-right sm:max-w-[60%]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </ModalShell>
      )}

      {modal?.type === "pic" && (
        <ModalShell
          title="Kontak PIC Gerai"
          subtitle={modal.rfq.brand}
          onClose={() => setModal(null)}
          footer={
            <a
              href={`https://wa.me/62${modal.rfq.pic.phone.replace(/[^0-9]/g, "").replace(/^0/, "")}`}
              target="_blank"
              rel="noreferrer"
              className="h-10 px-4 rounded-xl bg-primary text-white text-label-md font-label-md font-bold hover:bg-primary-container transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Chat via WhatsApp
            </a>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-primary font-bold flex items-center justify-center">
                {modal.rfq.pic.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-body-md font-bold text-on-surface">
                  {modal.rfq.pic.name}
                </p>
                <p className="text-body-sm text-tertiary">{modal.rfq.pic.role}</p>
              </div>
            </div>

            {[
              { label: "Telepon / WhatsApp", value: modal.rfq.pic.phone, icon: "call" },
              { label: "Email", value: modal.rfq.pic.email, icon: "mail" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-3 p-3 rounded-xl border border-outline-variant/30"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    {row.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase text-tertiary">
                      {row.label}
                    </p>
                    <p className="text-body-sm font-semibold text-on-surface truncate">
                      {row.value}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyContact(row.value, row.label)}
                  className="p-1.5 rounded-lg text-tertiary hover:bg-[#E8F3EC] hover:text-primary transition-colors shrink-0"
                  title="Salin"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    content_copy
                  </span>
                </button>
              </div>
            ))}

            <p className="text-body-sm text-tertiary leading-relaxed">
              Gunakan kanal resmi ini untuk menanyakan detail spesifikasi, jadwal
              pengiriman, atau negosiasi harga sebelum mengirim quotation.
            </p>
          </div>
        </ModalShell>
      )}

      {modal?.type === "quote" && (
        <ModalShell
          title="Ajukan Penawaran Harga"
          subtitle={`${modal.rfq.id} • ${modal.rfq.brand}`}
          onClose={() => setModal(null)}
          footer={
            <>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="h-10 px-4 rounded-xl border border-outline-variant/50 bg-white text-on-surface text-label-md font-label-md hover:bg-[#F5F8F6] transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => submitQuotation(modal.rfq)}
                disabled={submitting}
                className="h-10 px-4 rounded-xl bg-primary text-white text-label-md font-label-md font-bold hover:bg-primary-container transition-colors disabled:opacity-60 disabled:cursor-wait flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {submitting ? "progress_activity" : "send"}
                </span>
                Kirim Penawaran
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-[#FFF9E6] border border-[#B7791F]/25 text-body-sm">
              <span className="font-bold text-[#B7791F]">Target harga gerai: </span>
              <span className="text-on-surface">{modal.rfq.targetPrice}</span>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Harga Penawaran Anda</label>
              <input
                value={quotePrice}
                onChange={(event) => setQuotePrice(event.target.value)}
                placeholder="Contoh: Rp 138.000 / Kg"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Estimasi Lead Time</label>
              <input
                value={quoteLeadTime}
                onChange={(event) => setQuoteLeadTime(event.target.value)}
                placeholder="Contoh: 3 hari kerja setelah PO"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Catatan Tambahan</label>
              <textarea
                value={quoteNotes}
                onChange={(event) => setQuoteNotes(event.target.value)}
                rows={3}
                placeholder="MOQ, ongkir, syarat pembayaran, dsb."
                className="w-full px-4 py-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
              />
            </div>
          </div>
        </ModalShell>
      )}

      {modal?.type === "viewQuote" && (
        <ModalShell
          title="Penawaran Terkirim"
          subtitle={`${modal.rfq.id} • ${modal.rfq.brand}`}
          onClose={() => setModal(null)}
          footer={
            <button
              type="button"
              onClick={() => setModal(null)}
              className="h-10 px-4 rounded-xl border border-outline-variant/50 bg-white text-on-surface text-label-md font-label-md hover:bg-[#F5F8F6] transition-colors"
            >
              Tutup
            </button>
          }
        >
          {modal.rfq.quotation ? (
            <div className="space-y-4 text-body-sm">
              {[
                { label: "Harga Penawaran", value: modal.rfq.quotation.price },
                { label: "Lead Time", value: modal.rfq.quotation.leadTime },
                {
                  label: "Waktu Dikirim",
                  value: new Date(
                    modal.rfq.quotation.submittedAt
                  ).toLocaleString("id-ID"),
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-3 py-2 border-b border-outline-variant/20 last:border-b-0"
                >
                  <span className="text-xs font-bold uppercase text-tertiary">
                    {row.label}
                  </span>
                  <span className="font-semibold text-on-surface text-right">
                    {row.value}
                  </span>
                </div>
              ))}
              <div className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                <p className="text-[11px] font-bold uppercase text-tertiary mb-1">
                  Catatan
                </p>
                <p className="text-body-sm text-on-surface">
                  {modal.rfq.quotation.notes || "-"}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#FFF9E6] border border-[#B7791F]/25">
                <p className="text-body-sm text-[#B7791F] font-semibold">
                  Status: menunggu evaluasi PIC gerai. Anda akan menerima notifikasi
                  bila penawaran disetujui.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-body-sm text-tertiary">
              Belum ada penawaran tersimpan untuk tender ini.
            </p>
          )}
        </ModalShell>
      )}

      {modal?.type === "new" && (
        <ModalShell
          title="Kirim Penawaran Terbuka"
          subtitle="Terbitkan permintaan pasokan baru untuk jaringan gerai F&B"
          onClose={() => setModal(null)}
          footer={
            <>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="h-10 px-4 rounded-xl border border-outline-variant/50 bg-white text-on-surface text-label-md font-label-md hover:bg-[#F5F8F6] transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={submitNewRfq}
                disabled={submitting}
                className="h-10 px-4 rounded-xl bg-primary text-white text-label-md font-label-md font-bold hover:bg-primary-container transition-colors disabled:opacity-60 disabled:cursor-wait flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {submitting ? "progress_activity" : "post_add"}
                </span>
                Terbitkan RFQ
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className={labelClass}>Nama Gerai / Perusahaan</label>
              <input
                value={newBrand}
                onChange={(event) => setNewBrand(event.target.value)}
                placeholder="Contoh: Kopi Senja - Cabang Bandung"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={labelClass}>Kategori Pasokan</label>
                <input
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value)}
                  placeholder="Dairy & Butter"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Periode Kontrak</label>
                <select
                  value={newPeriod}
                  onChange={(event) => setNewPeriod(event.target.value)}
                  className={inputClass}
                >
                  <option>Kontrak Pasokan 3 Bulan</option>
                  <option>Kontrak Pasokan 6 Bulan</option>
                  <option>Kontrak Pasokan 12 Bulan</option>
                  <option>Pengiriman Perdana Sekaligus</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Spesifikasi / Volume Kebutuhan</label>
              <textarea
                value={newVolume}
                onChange={(event) => setNewVolume(event.target.value)}
                rows={2}
                placeholder="Contoh: 500 Kg Butter Anchor & 600 L Fresh Milk / Bulan"
                className="w-full px-4 py-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Target Harga</label>
              <input
                value={newTargetPrice}
                onChange={(event) => setNewTargetPrice(event.target.value)}
                placeholder="Contoh: Rp 140.000 / Kg"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Lokasi Pengiriman</label>
              <input
                value={newLocation}
                onChange={(event) => setNewLocation(event.target.value)}
                placeholder="Alamat gudang / gerai"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Ketentuan Pembayaran</label>
              <input
                value={newPaymentTerms}
                onChange={(event) => setNewPaymentTerms(event.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </ModalShell>
      )}
    </>
  );
}

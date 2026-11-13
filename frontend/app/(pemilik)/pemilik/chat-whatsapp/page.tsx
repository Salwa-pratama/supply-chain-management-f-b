import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat WhatsApp & Pelanggan | BAPER SCM Pemilik",
};

const CHATS = [
  {
    id: "WA-01",
    customer: "Sarah Amanda",
    phone: "+62 812-9981-2244",
    lastMsg: "Halo Kak! Mau pesan Kopi Kenangan Mantan 2 cup less sugar ya",
    time: "14:28",
    unread: 0,
    status: "Bot Menjawab (Auto-Closing)",
    active: true,
  },
  {
    id: "WA-02",
    customer: "Dimas Wicaksono",
    phone: "+62 813-7722-1199",
    lastMsg: "Apakah promo buy 1 get 1 masih berlaku untuk hari ini?",
    time: "14:15",
    unread: 1,
    status: "Perlu Tanggapan Kasir",
    active: false,
  },
  {
    id: "WA-03",
    customer: "Nadia Safitri",
    phone: "+62 856-9900-3322",
    lastMsg: "Pesanan saya sudah siap diambil belum ya? Terima kasih",
    time: "13:50",
    unread: 0,
    status: "Pesanan Siap Ambil",
    active: false,
  },
  {
    id: "WA-04",
    customer: "Reza Surya",
    phone: "+62 878-4455-8811",
    lastMsg: "Invoice pesanan katering sudah saya bayar via VA BCA ya",
    time: "12:10",
    unread: 0,
    status: "Selesai (Lunas)",
    active: false,
  },
];

export default function PemilikChatWhatsappPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Omnichannel Messaging Hub
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Nomor Outlet: +62 811-9922-8800
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Inbox Chat WhatsApp Pelanggan
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Kolaborasi antara asisten virtual Google Gemini dan staf gerai dalam melayani pemesanan, pertanyaan menu, serta bukti bayar QRIS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#E8F3EC] border border-primary/20 text-xs font-bold text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Gateway WhatsApp Terhubung</span>
          </div>
          <a
            href="/pemilik/bot-ai"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-on-surface hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            <span>Konfigurasi Bot</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px]">
        {/* CHAT LIST */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-outline-variant/30">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Cari obrolan..."
                className="w-full h-10 pl-9 pr-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="divide-y divide-outline-variant/20 overflow-y-auto custom-scrollbar flex-1">
            {CHATS.map((c) => (
              <div
                key={c.id}
                className={`p-4 cursor-pointer transition-colors ${
                  c.active ? "bg-secondary-container/50 border-l-4 border-primary" : "hover:bg-[#F5F8F6]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#172033] text-body-sm">{c.customer}</span>
                  <span className="text-[11px] text-tertiary">{c.time}</span>
                </div>
                <p className="text-xs text-tertiary line-clamp-1">{c.lastMsg}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
                    {c.status}
                  </span>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT CONVERSATION VIEW */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between bg-[#F9F9FF]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                SA
              </div>
              <div>
                <h3 className="font-bold text-[#172033] text-body-md">Sarah Amanda</h3>
                <span className="text-xs text-tertiary">+62 812-9981-2244 • Dilayani Otomatis oleh Gemini AI</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-xl border border-primary/40 text-primary hover:bg-[#E8F3EC] text-xs font-bold transition-all"
              >
                Ambil Alih Manual
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar bg-[#F5F8F6]/40">
            {/* Customer Bubble */}
            <div className="flex flex-col items-start max-w-md">
              <span className="text-[11px] text-tertiary mb-1">Sarah Amanda • 14:26</span>
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border border-outline-variant/35 shadow-sm text-body-sm text-[#172033]">
                Halo admin BAPER SCM Kenangan, mau pesan 2 Kenangan Mantan less sugar &amp; 1 Toast Choco ya!
              </div>
            </div>

            {/* AI Assistant Bubble */}
            <div className="flex flex-col items-end max-w-md ml-auto">
              <div className="flex items-center gap-1.5 text-[11px] text-primary font-bold mb-1">
                <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                <span>Gemini 1.5 Auto-Bot • 14:27</span>
              </div>
              <div className="bg-[#E8F3EC] p-3.5 rounded-2xl rounded-tr-sm border border-primary/20 shadow-sm text-body-sm text-[#172033] space-y-2">
                <p>Halo Kak Sarah! Pesanan Anda telah dirangkum otomatis ke sistem kasir POS:</p>
                <div className="bg-white p-2.5 rounded-xl border border-outline-variant/30 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>• 2x Kopi Mantan (Less Sugar)</span>
                    <span className="font-mono">Rp 44.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• 1x Choco Toast</span>
                    <span className="font-mono">Rp 22.000</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-outline-variant/20 pt-1 text-primary">
                    <span>Total Pembayaran:</span>
                    <span className="font-mono">Rp 66.000</span>
                  </div>
                </div>
                <p className="text-xs text-tertiary">
                  Silakan scan QRIS Dinamis terlampir atau balas <strong>KONFIRMASI</strong> untuk melanjutkan ke antrean barista.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-outline-variant/30 bg-white flex items-center gap-3">
            <button
              type="button"
              className="w-10 h-10 rounded-xl hover:bg-[#F5F8F6] text-tertiary flex items-center justify-center transition-colors"
              title="Kirim Gambar / Dokumen"
            >
              <span className="material-symbols-outlined text-[20px]">attach_file</span>
            </button>
            <input
              type="text"
              placeholder="Ketik pesan balasan untuk pelanggan..."
              className="flex-1 h-11 px-4 text-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Kirim</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

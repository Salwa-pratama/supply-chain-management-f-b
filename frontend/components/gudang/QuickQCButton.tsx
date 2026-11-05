"use client";

// Tombol "Buat Pesanan Cepat" di sidebar. Sidebar berada di layout (server),
// jadi tombol ini mengirim sinyal yang didengar oleh GudangDashboard untuk membuka modal QC.
export default function QuickQCButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("gudang:buka-qc"))}
      className="w-full mb-5 bg-[#E8F3EC] text-[#137A48] hover:bg-[#137A48] hover:text-white transition-all duration-200 rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-label-md font-label-md font-semibold border border-[#94B9A9]/40 active:scale-[0.98]"
    >
      <span className="material-symbols-outlined text-[18px]">add_task</span>
      <span>Buat Pesanan Cepat</span>
    </button>
  );
}

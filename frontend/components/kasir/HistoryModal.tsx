export default function HistoryModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Riwayat Transaksi"
      className="fixed inset-0 z-50 bg-[#172033]/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-surface-container-lowest rounded-3xl max-w-4xl w-full border border-outline-variant/60 shadow-[0_24px_48px_-8px_rgba(23,32,51,0.2)] overflow-hidden">
        <div className="p-5 border-b border-outline-variant/35 flex items-center justify-between bg-[#F5F8F6]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-secondary-container text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]" data-icon="history">
                history
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Riwayat Transaksi Hari Ini
              </h3>
              <p className="font-body-sm text-[12px] text-tertiary">
                Outlet Kopi Kenangan Senopati #04 • 84 Transaksi Tercatat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container text-tertiary flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]" data-icon="close">
              close
            </span>
          </button>
        </div>
        {/* Quick filters inside modal */}
        <div className="p-4 border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-3 bg-surface-bright">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-tertiary">Filter:</span>
            <span className="px-2.5 py-1 rounded-full bg-[#E8F3EC] text-primary text-[11px] font-bold border border-primary/20">
              Semua Lunas (84)
            </span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest border border-outline-variant text-tertiary text-[11px] hover:border-primary cursor-pointer">
              Shift Pagi
            </span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest border border-outline-variant text-tertiary text-[11px] hover:border-primary cursor-pointer">
              QRIS (48)
            </span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest border border-outline-variant text-tertiary text-[11px] hover:border-primary cursor-pointer">
              Tunai (36)
            </span>
          </div>
          <input
            className="h-9 px-3 text-body-sm bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary focus:outline-none w-48"
            placeholder="Cari No Struk..."
            type="text"
          />
        </div>
        {/* Table History */}
        <div className="overflow-x-auto p-4">
          <table className="w-full text-left text-body-sm border-collapse">
            <thead>
              <tr className="bg-[#F5F8F6] text-tertiary font-label-sm text-label-sm uppercase h-10 border-b border-outline-variant/30">
                <th className="px-3.5 py-2 rounded-l-xl">No. Transaksi</th>
                <th className="px-3.5 py-2">Waktu</th>
                <th className="px-3.5 py-2">Pelanggan & Meja</th>
                <th className="px-3.5 py-2">Metode Bayar</th>
                <th className="px-3.5 py-2">Total Nilai</th>
                <th className="px-3.5 py-2">Status</th>
                <th className="px-3.5 py-2 rounded-r-xl text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {/* Row 1 */}
              <tr className="hover:bg-[#F9FBFA] transition-colors h-14">
                <td className="px-3.5 py-2 font-mono font-bold text-primary">#TRX-2025-0842</td>
                <td className="px-3.5 py-2 text-tertiary">09:42 WIB</td>
                <td className="px-3.5 py-2 font-semibold">
                  Ibu Kartika <span className="text-tertiary font-normal text-[11px]">(Dine-in Meja 04)</span>
                </td>
                <td className="px-3.5 py-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-[14px]" data-icon="payments">
                      payments
                    </span>{" "}
                    Tunai
                  </span>
                </td>
                <td className="px-3.5 py-2 font-bold text-on-surface">Rp 87.120</td>
                <td className="px-3.5 py-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20 text-[11px] font-bold">
                    Lunas
                  </span>
                </td>
                <td className="px-3.5 py-2 text-center">
                  <button
                    className="p-1.5 rounded-lg text-primary hover:bg-secondary-container"
                    title="Cetak Ulang Struk"
                  >
                    <span className="material-symbols-outlined text-[18px]" data-icon="print">
                      print
                    </span>
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-[#F9FBFA] transition-colors h-14">
                <td className="px-3.5 py-2 font-mono font-bold text-primary">#TRX-2025-0841</td>
                <td className="px-3.5 py-2 text-tertiary">09:35 WIB</td>
                <td className="px-3.5 py-2 font-semibold">
                  Dimas Pratama <span className="text-tertiary font-normal text-[11px]">(Takeaway)</span>
                </td>
                <td className="px-3.5 py-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-[14px]" data-icon="qr_code_2">
                      qr_code_2
                    </span>{" "}
                    QRIS
                  </span>
                </td>
                <td className="px-3.5 py-2 font-bold text-on-surface">Rp 52.000</td>
                <td className="px-3.5 py-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20 text-[11px] font-bold">
                    Lunas
                  </span>
                </td>
                <td className="px-3.5 py-2 text-center">
                  <button
                    className="p-1.5 rounded-lg text-primary hover:bg-secondary-container"
                    title="Cetak Ulang Struk"
                  >
                    <span className="material-symbols-outlined text-[18px]" data-icon="print">
                      print
                    </span>
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-[#F9FBFA] transition-colors h-14">
                <td className="px-3.5 py-2 font-mono font-bold text-primary">#TRX-2025-0840</td>
                <td className="px-3.5 py-2 text-tertiary">09:18 WIB</td>
                <td className="px-3.5 py-2 font-semibold">
                  Pak Gunawan <span className="text-tertiary font-normal text-[11px]">(Dine-in Meja 01)</span>
                </td>
                <td className="px-3.5 py-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-[14px]" data-icon="credit_card">
                      credit_card
                    </span>{" "}
                    EDC BCA
                  </span>
                </td>
                <td className="px-3.5 py-2 font-bold text-on-surface">Rp 144.000</td>
                <td className="px-3.5 py-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20 text-[11px] font-bold">
                    Lunas
                  </span>
                </td>
                <td className="px-3.5 py-2 text-center">
                  <button
                    className="p-1.5 rounded-lg text-primary hover:bg-secondary-container"
                    title="Cetak Ulang Struk"
                  >
                    <span className="material-symbols-outlined text-[18px]" data-icon="print">
                      print
                    </span>
                  </button>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-[#F9FBFA] transition-colors h-14">
                <td className="px-3.5 py-2 font-mono font-bold text-primary">#TRX-2025-0839</td>
                <td className="px-3.5 py-2 text-tertiary">09:02 WIB</td>
                <td className="px-3.5 py-2 font-semibold">
                  Siti Aisyah <span className="text-tertiary font-normal text-[11px]">(WhatsApp Bot)</span>
                </td>
                <td className="px-3.5 py-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-[14px]" data-icon="qr_code_2">
                      qr_code_2
                    </span>{" "}
                    QRIS
                  </span>
                </td>
                <td className="px-3.5 py-2 font-bold text-on-surface">Rp 30.000</td>
                <td className="px-3.5 py-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20 text-[11px] font-bold">
                    Lunas
                  </span>
                </td>
                <td className="px-3.5 py-2 text-center">
                  <button
                    className="p-1.5 rounded-lg text-primary hover:bg-secondary-container"
                    title="Cetak Ulang Struk"
                  >
                    <span className="material-symbols-outlined text-[18px]" data-icon="print">
                      print
                    </span>
                  </button>
                </td>
              </tr>
              {/* Row 5 */}
              <tr className="hover:bg-[#F9FBFA] transition-colors h-14">
                <td className="px-3.5 py-2 font-mono font-bold text-primary">#TRX-2025-0838</td>
                <td className="px-3.5 py-2 text-tertiary">08:44 WIB</td>
                <td className="px-3.5 py-2 font-semibold">
                  Anisa Wijaya{" "}
                  <span className="text-tertiary font-normal text-[11px]">(Dine-in Meja 06)</span>
                </td>
                <td className="px-3.5 py-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-[14px]" data-icon="payments">
                      payments
                    </span>{" "}
                    Tunai
                  </span>
                </td>
                <td className="px-3.5 py-2 font-bold text-on-surface">Rp 68.000</td>
                <td className="px-3.5 py-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20 text-[11px] font-bold">
                    Lunas
                  </span>
                </td>
                <td className="px-3.5 py-2 text-center">
                  <button
                    className="p-1.5 rounded-lg text-primary hover:bg-secondary-container"
                    title="Cetak Ulang Struk"
                  >
                    <span className="material-symbols-outlined text-[18px]" data-icon="print">
                      print
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant/35 bg-[#F5F8F6] flex justify-end">
          <button
            onClick={onClose}
            className="h-10 px-5 rounded-xl bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md"
          >
            Tutup Riwayat
          </button>
        </div>
      </div>
    </div>
  );
}

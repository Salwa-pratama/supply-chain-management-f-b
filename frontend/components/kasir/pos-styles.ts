// Kelas Tailwind panjang dari desain Stitch (halaman kasir), dipisahkan agar komponen mudah dibaca.
export const S = {
  searchInput:
    "w-full h-11 pl-10 pr-12 bg-[#FFFFFF] border border-outline-variant/60 rounded-xl font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-tertiary/70",
  stockSelect:
    "h-11 px-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl text-label-md font-label-md text-on-surface focus:outline-none focus:border-primary",
  catActive:
    "px-4 py-2 rounded-xl text-label-md font-label-md whitespace-nowrap bg-primary-container text-on-primary font-semibold shadow-sm transition-all",
  catIdle:
    "px-4 py-2 rounded-xl text-label-md font-label-md whitespace-nowrap bg-[#F5F8F6] hover:bg-[#E8F3EC] text-tertiary hover:text-primary border border-outline-variant/40 transition-all",
  otActive:
    "py-1.5 text-center text-label-sm font-label-sm rounded-lg bg-surface-container-lowest text-primary font-bold shadow-sm transition-all",
  otIdle:
    "py-1.5 text-center text-label-sm font-label-sm rounded-lg text-tertiary hover:text-on-surface transition-all",
  custInput:
    "w-full h-9 px-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl text-body-sm font-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20",
  holdBtn:
    "h-10 rounded-xl bg-surface-container-lowest border border-outline-variant/70 hover:border-primary text-tertiary hover:text-primary font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all",
  cancelBtn:
    "h-10 rounded-xl bg-[#FDF2F2] border border-error/20 text-error hover:bg-error-container/50 font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all",
  payBtn:
    "w-full h-12 rounded-2xl bg-primary-container hover:bg-[#0D6038] text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-container/20 active:scale-[0.98] transition-all",
  cashInput:
    "w-full h-12 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant rounded-xl font-headline-sm text-headline-sm font-bold text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
  payMethodActive:
    "p-3 rounded-xl border-2 border-primary bg-[#E8F3EC]/40 text-left flex flex-col justify-between transition-all",
  payMethodIdle:
    "p-3 rounded-xl border border-outline-variant text-left flex flex-col justify-between hover:border-primary transition-all",
} as const;

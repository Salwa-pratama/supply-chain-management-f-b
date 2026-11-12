"use client";

import { useLogout } from "../hooks/use-logout";

interface LogoutButtonProps {
  className?: string;
  iconClassName?: string;
  label?: string;
}

export default function LogoutButton({
  className = "flex items-center gap-3 text-error hover:bg-error-container/40 rounded-lg px-3 py-2 transition-colors w-full text-left",
  iconClassName = "material-symbols-outlined text-[20px]",
  label = "Keluar",
}: LogoutButtonProps) {
  const { logout } = useLogout();

  return (
    <button
      type="button"
      onClick={logout}
      className={className}
      aria-label="Keluar dari sistem"
    >
      <span className={iconClassName}>logout</span>
      <span className="font-label-md text-label-md font-semibold">{label}</span>
    </button>
  );
}


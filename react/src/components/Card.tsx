import { ReactNode } from "react";

export default function Card({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="
        backdrop-blur
        bg-white/10
        border border-white/20
        rounded-3xl
        shadow-xl
        p-5
        h-full
      "
    >
      {children}
    </div>
  );
}

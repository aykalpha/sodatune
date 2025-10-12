import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5}}
      className="
        backdrop-blur
        bg-white/10
        border border-white/20
        rounded-3xl
        shadow-xl
        p-5
        h-full
        overflow-hidden
      "
    >
      {children}
    </motion.div>
  );
}

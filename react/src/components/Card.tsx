import { ReactNode } from "react";
import { motion } from "framer-motion";

type CardProps = {
  children: ReactNode;
  onAnimationComplete?: () => void;
};

export default function Card({ children, onAnimationComplete }: CardProps) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onAnimationComplete={onAnimationComplete}
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

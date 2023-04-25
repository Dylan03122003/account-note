import { motion } from "framer-motion";
import React, { ReactNode } from "react";
type ButtonProps = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

const Button = ({ className, onClick, children }: ButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`${className} px-4 py-1 rounded-md bg-black text-gray-300 border-[1px] border-solid border-gray-400`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;

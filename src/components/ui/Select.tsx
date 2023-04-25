import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TiTick } from "react-icons/ti";

type SelectStyle = {
  borderSuccessColor?: string;
};

type SelectProps = {
  options: string[];
  label: string;
  placeholder: string;
  className?: string;
  onChange: (option: string) => void;
  error?: string;
  isSubmitting: boolean;
  style?: SelectStyle;
};

const Select = ({
  options,
  label,
  placeholder,
  className,
  onChange,
  error = "",
  isSubmitting,
  style,
}: SelectProps) => {
  const [choice, setChoice] = useState(placeholder);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  function handleClickedOption(option: string) {
    setChoice(option);
    setIsOpen(false);
    setIsSelected(true);
    onChange(option);
  }

  return (
    <div className={`w-72 sm:w-96 relative ${className}`}>
      <div className="w-full flex items-center justify-between mb-2">
        <label
          className={`${error !== "" ? "text-red-500" : "text-gray-300 "}`}
        >
          {label}
        </label>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between p-3 w-full cursor-pointer bg-white  rounded-xl border-solid border-[1px] ${
          isSelected
            ? `${
                style?.borderSuccessColor
                  ? `${style.borderSuccessColor}`
                  : "border-green-500"
              } shadow-solid_green`
            : "border-transparent"
        } `}
      >
        <p className="text-lg text-gray-600">{choice}</p>
        {!isSelected ? (
          <motion.div
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
          >
            <IoIosArrowDown className="h-6 w-6 text-gray-600" />
          </motion.div>
        ) : (
          <motion.div
            whileInView={{ scale: [1.3, 1] }}
            className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center"
          >
            <TiTick className="h-[80%] w-[80%] text-green-600" />
          </motion.div>
        )}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown-select"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="bg-white p-3 mt-2 rounded-xl flex flex-col items-center gap-2 border-solid border-[1px] border-gray-600 absolute w-full z-10"
          >
            {options.map((option) => (
              <button
                onClick={() => handleClickedOption(option)}
                className="w-full text-left  text-gray-600 rounded-xl hover:bg-blue-50 p-2"
                key={option}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;

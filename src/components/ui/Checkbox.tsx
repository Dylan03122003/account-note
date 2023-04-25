import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";

type CheckboxProps = {
  className?: string;
  onChange?: (isChecked: boolean) => void;
  label?: string;
  initialValue?: boolean;
};

const Checkbox = ({
  className = "",
  onChange,
  label,
  initialValue,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(
    initialValue ? initialValue : false
  );

  useEffect(() => {
    onChange && onChange(isChecked);
  }, [isChecked]);

  function handleClick() {
    setIsChecked((preCheck) => !preCheck);
  }
  return (
    <div className={`${className} flex gap-2 items-center`}>
      <div
        onClick={handleClick}
        className={`w-7 h-7 border-solid border-[1px] rounded-lg cursor-pointer flex items-center justify-center ${
          isChecked ? "bg-blue-100 border-blue-800" : "border-gray-500"
        }`}
      >
        {isChecked && (
          <motion.div whileInView={{ scale: [1.2, 1] }}>
            <BsCheck className="w-7 h-7 text-blue-800" />
          </motion.div>
        )}
      </div>
      <label className=" text-gray-300">{label}</label>
    </div>
  );
};

export default Checkbox;

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { TiTick } from "react-icons/ti";

type TextFieldProps = {
  className?: string;
  placeholder: string;
  Icon: any;
  label: string;
  canBeEmpty?: boolean;
  onChange?: (text: string) => void;
  onBlur?: (text: string) => void;
  id?: string;
  error?: string;
  initialText?: string;
};

const TextField = ({
  className,
  placeholder,
  Icon,
  label,
  canBeEmpty = false,
  onChange,
  onBlur,
  id = "text",
  error,
  initialText,
}: TextFieldProps) => {
  const [text, setText] = useState(initialText ? initialText : "");
  const [isValid, setIsValid] = useState(false);
  const [keyTouched, setKeyTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState(error);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setKeyTouched(true);
    }
  }, [error]);

  function handleTextChange(currentText: string) {
    if (currentText === "") {
      setIsValid(false);
      if (!canBeEmpty) setErrorMessage(`Must have some text`);
    }
    if (currentText !== "") {
      setIsValid(true);
      if (!canBeEmpty) setErrorMessage("");
    }
    setKeyTouched(true);
    setText(currentText);
    onChange && onChange(currentText);
  }

  function handleTextBlur(currentText: string) {
    onBlur && onBlur(currentText);
  }

  function borderStyle() {
    if (!keyTouched) return "";
    if (canBeEmpty && isValid) return "border-green-500 shadow-solid_green";
    if (canBeEmpty && !isValid) return "";
    return isValid
      ? "border-green-500 shadow-solid_green"
      : "border-red-400 shadow-solid-red";
  }

  function labelStyle() {
    if (!keyTouched) {
      return "text-gray-300";
    }
    return !canBeEmpty && errorMessage ? "text-red-400" : "text-gray-300";
  }

  return (
    <div className={`w-auto sm:w-[500px] ${className} relative`}>
      <div className="w-full flex items-center justify-between mb-2">
        <label htmlFor={id} className={`${labelStyle()}`}>
          {label}
        </label>
        {!canBeEmpty && errorMessage && (
          <p className="text-red-400 hidden sm:block">{errorMessage}</p>
        )}
      </div>
      <div
        className={`flex items-center justify-start p-4 w-full rounded-md gap-2 bg-slate-100 relative border-solid border-[1px] mb-2 ${borderStyle()}`}
      >
        <Icon className="h-5 w-5 text-gray-600" />
        <input
          id={id}
          type="text"
          className="outline-none text-lg text-gray-600 bg-slate-100 w-[85%]"
          placeholder={placeholder}
          onChange={(e) => handleTextChange(e.target.value)}
          onBlur={(e) => handleTextBlur(e.target.value)}
          value={text}
        />
        {keyTouched && isValid && (
          <motion.div
            whileInView={{ scale: [1.3, 1] }}
            className="absolute right-5 h-6 w-6 rounded-full bg-green-100 center-child"
          >
            <TiTick className="h-[80%] w-[80%] text-green-600" />
          </motion.div>
        )}
        {!canBeEmpty && keyTouched && !isValid && (
          <motion.div
            whileInView={{ scale: [1.3, 1] }}
            className="absolute right-5 h-6 w-6 rounded-full bg-red-100 center-child"
          >
            <BiErrorCircle className="h-full w-full text-red-600" />
          </motion.div>
        )}
      </div>
      {!canBeEmpty && errorMessage && (
        <p className="text-red-400 block sm:hidden">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextField;

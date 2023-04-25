import { motion } from "framer-motion";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import { IoMdCopy } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAccountNote } from "../contexts/AccountNoteContext";
type CardProps = {
  id: string;
  brandName: string;
  accountCode: string;
  password?: string;
  userName?: string;
  accountType: AccountType;
  isMyBankAccount?: boolean;
};

export enum AccountType {
  SocialMedia = "social media",
  BankCard = "bank card",
}

const Card = ({
  id,
  brandName,
  accountCode,
  password,
  userName,
  accountType,
  isMyBankAccount,
}: CardProps) => {
  const bankAccountInfor = isMyBankAccount
    ? `- ${brandName}\n- ${userName}\n- ${accountCode}`
    : "";

  const { deleteAccount } = useAccountNote();
  function handleDeleteAccount() {
    deleteAccount(id);
  }

  return (
    <div className="w-64 bg-black p-2 border-solid border-[1px] border-gray-300  rounded-md">
      <h2 className="text-xl font-semibold text-gray-300">{brandName}</h2>

      {accountType === AccountType.BankCard && (
        <p className="text-gray-300 mt-2">{userName}</p>
      )}

      <div>
        <div className="flex items-center justify-between p-5">
          <p className="text-lg text-gray-500">{accountCode}</p>
          <CopyToClipboard text={accountCode}>
            <motion.button whileTap={{ scale: 0.95 }}>
              <IoMdCopy className="w-8 h-8  text-gray-500" />
            </motion.button>
          </CopyToClipboard>
        </div>

        {password && (
          <div className="flex items-center justify-between p-5">
            <p className="text-lg text-gray-500">{password}</p>
            <CopyToClipboard text={password}>
              <motion.button whileTap={{ scale: 0.95 }}>
                <IoMdCopy className="w-8 h-8 text-gray-500" />
              </motion.button>
            </CopyToClipboard>
          </div>
        )}
      </div>

      {isMyBankAccount && (
        <div className="flex items-center justify-center p-5">
          <CopyToClipboard text={bankAccountInfor}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-white border-solid border-[1px] border-gray-400 py-2 px-4 rounded-md"
            >
              Copy Infor
            </motion.button>
          </CopyToClipboard>
        </div>
      )}

      <div className="flex items-center gap-10 justify-center mt-5">
        <Link to={`/${id}`} className="">
          <BsPencil className="text-gray-400 w-6 h-6  hover:text-gray-500" />
        </Link>
        <button onClick={handleDeleteAccount}>
          <BsTrash3 className="text-gray-400 w-6 h-6 hover:text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Card;

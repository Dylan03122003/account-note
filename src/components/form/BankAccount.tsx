import { useState } from "react";
import { AiFillBank } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, TextField } from "../../components";
import {
  AccountItem,
  BankAccountInfo,
  useAccountNote,
} from "../../contexts/AccountNoteContext";
import { AccountType } from "../Card";

type BankAccountProps = {
  id?: string;
  oldAccountInfo?: BankAccountInfo; // If we have old account which mean we are attemping to update
};

const BankAccount = ({ id, oldAccountInfo }: BankAccountProps) => {
  const [brandName, setBrandName] = useState(
    oldAccountInfo ? oldAccountInfo.brandName : ""
  );
  const [accountCode, setAccountCode] = useState(
    oldAccountInfo ? oldAccountInfo.accountCode : ""
  );
  const [userName, setUserName] = useState(
    oldAccountInfo ? oldAccountInfo.userName : ""
  );
  const [isMyBankAccount, setIsMyBankAccount] = useState(
    oldAccountInfo ? oldAccountInfo.isMyBankAccount : false
  );

  const { addAccount, updateAccount } = useAccountNote();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleSubmit() {
    setIsSubmitting(true);

    if (!brandName || !accountCode || !userName) {
      return;
    }

    const bankAccount: BankAccountInfo = {
      brandName,
      accountCode,
      userName,
      isMyBankAccount,
    };
    if (oldAccountInfo) {
      updateAccount(id, {
        accountType: AccountType.BankCard,
        accountInfor: bankAccount,
      });
    }
    if (!oldAccountInfo)
      addAccount({
        accountType: AccountType.BankCard,
        accountInfor: bankAccount,
      });

    setIsSubmitting(false);
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center">
      <TextField
        Icon={AiFillBank}
        label="Enter brand name"
        placeholder="Sacombank"
        onChange={(text) => setBrandName(text)}
        error={isSubmitting && !brandName ? "Brand name can't be empty" : ""}
        initialText={brandName}
      />
      <TextField
        Icon={AiFillBank}
        label="Enter account code"
        placeholder="771122000333"
        onChange={(text) => setAccountCode(text)}
        error={
          isSubmitting && !accountCode ? "Account code can't be empty" : ""
        }
        initialText={accountCode}
      />
      <TextField
        Icon={AiFillBank}
        label="Enter user name"
        placeholder="Nguyen Van An"
        onChange={(text) => setUserName(text)}
        error={isSubmitting && !userName ? "User name can't be empty" : ""}
        initialText={userName}
      />
      <Checkbox
        className="mt-5"
        label="My account"
        onChange={(isChecked) => setIsMyBankAccount(isChecked)}
        initialValue={isMyBankAccount}
      />
      <Button onClick={handleSubmit} className="mt-10">
        Submit
      </Button>
    </div>
  );
};

export default BankAccount;

import { useState } from "react";
import { AiFillBank } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  SocialAccountInfo,
  useAccountNote,
} from "../../contexts/AccountNoteContext";
import { AccountType } from "../Card";
import Button from "../ui/Button";
import TextField from "../ui/TextField";

type SocialAccountProps = {
  id?: string;
  oldAccountInfo?: SocialAccountInfo;
};

// brandName, accountCode, password
const SocialAccount = ({ id, oldAccountInfo }: SocialAccountProps) => {
  const [brandName, setBrandName] = useState(
    oldAccountInfo ? oldAccountInfo.brandName : ""
  );
  const [accountCode, setAccountCode] = useState(
    oldAccountInfo ? oldAccountInfo.accountCode : ""
  );
  const [password, setPassword] = useState(
    oldAccountInfo ? oldAccountInfo.password : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateAccount, addAccount } = useAccountNote();
  const navigate = useNavigate();
  function handleSubmit() {
    setIsSubmitting(true);

    if (!brandName || !accountCode || !password) return;

    const socialAccount: SocialAccountInfo = {
      brandName,
      accountCode,
      password,
    };

    if (oldAccountInfo) {
      updateAccount(id, {
        accountType: AccountType.SocialMedia,
        accountInfor: socialAccount,
      });
    }

    if (!oldAccountInfo)
      addAccount({
        accountType: AccountType.SocialMedia,
        accountInfor: socialAccount,
      });

    setIsSubmitting(false);
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center">
      <TextField
        Icon={AiFillBank}
        label="Enter brand name"
        placeholder="Facebook"
        onChange={(text) => setBrandName(text)}
        error={isSubmitting && !brandName ? "Brand name can't be empty" : ""}
        initialText={brandName}
      />
      <TextField
        Icon={AiFillBank}
        label="Enter account code"
        placeholder="nguyenvanan123"
        onChange={(text) => setAccountCode(text)}
        error={
          isSubmitting && !accountCode ? "Account code can't be empty" : ""
        }
        initialText={accountCode}
      />
      <TextField
        Icon={AiFillBank}
        label="Enter password"
        placeholder="0963827384"
        onChange={(text) => setPassword(text)}
        error={isSubmitting && !password ? "Password can't be empty" : ""}
        initialText={password}
      />
      <Button onClick={handleSubmit} className="mt-10">
        Submit
      </Button>
    </div>
  );
};

export default SocialAccount;

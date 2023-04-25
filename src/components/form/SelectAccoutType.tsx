import React, { useState } from "react";

import { Button, Select } from "../../components";
import { AccountType } from "../Card";

type SelectAccoutTypeProps = {
  onGetType: (accountType: string) => void;
  onNext: () => void;
};

const SelectAccoutType = ({ onGetType, onNext }: SelectAccoutTypeProps) => {
  const [accountType, setAccountType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  function handleSelectAccountType() {
    if (!accountType) {
      setErrorMessage("Please choose an option!");
      return;
    }
    onNext();
  }
  return (
    <div className="flex flex-col items-center gap-10">
      <Select
        options={[AccountType.BankCard, AccountType.SocialMedia]}
        label="Select account type"
        placeholder="Social"
        onChange={(value) => {
          onGetType(value);
          setAccountType(value);
        }}
        style={{ borderSuccessColor: "border-green-200" }}
        isSubmitting={false}
        error={errorMessage}
      />
      <Button onClick={handleSelectAccountType}>Next</Button>
    </div>
  );
};

export default SelectAccoutType;

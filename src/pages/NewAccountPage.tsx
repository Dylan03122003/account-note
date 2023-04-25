import React, { useState } from "react";
import { BankAccount, SelectAccoutType, SocialAccount } from "../components";
import { AccountType } from "../components/Card";

const NewAccountPage = () => {
  const [accountType, setAccountType] = useState("");
  const [finishInputAccountType, setFinishInputAccountType] = useState(false);
  const [finishInputAccountInfo, setFinishInputAccountInfo] = useState(false);

  function handleSelectAccountType(accountType: string) {
    setAccountType(accountType);
  }

  return (
    <div className="pt-0 sm:pt-20 text-white translate-y-28">
      {!finishInputAccountType && (
        <SelectAccoutType
          onGetType={handleSelectAccountType}
          onNext={() => setFinishInputAccountType(true)}
        />
      )}
      {!finishInputAccountInfo &&
        finishInputAccountType &&
        accountType === AccountType.BankCard && <BankAccount />}

      {!finishInputAccountInfo &&
        finishInputAccountType &&
        accountType === AccountType.SocialMedia && <SocialAccount />}
    </div>
  );
};

export default NewAccountPage;

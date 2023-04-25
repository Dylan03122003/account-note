import React from "react";
import { useParams } from "react-router-dom";
import { BankAccount, SocialAccount } from "../components";
import { AccountType } from "../components/Card";
import {
  BankAccountInfo,
  SocialAccountInfo,
  useAccountNote,
} from "../contexts/AccountNoteContext";
const EditPage = () => {
  const { accountID } = useParams();
  const { getAnAccount } = useAccountNote();
  const editedAccount = getAnAccount(accountID);

  return (
    <div className="pt-20">
      <div className="mt-20">
        {editedAccount?.accountType === AccountType.BankCard && (
          <BankAccount
            id={accountID}
            oldAccountInfo={editedAccount.accountInfor as BankAccountInfo}
          />
        )}
        {editedAccount?.accountType === AccountType.SocialMedia && (
          <SocialAccount
            id={accountID}
            oldAccountInfo={editedAccount.accountInfor as SocialAccountInfo}
          />
        )}
      </div>
    </div>
  );
};

export default EditPage;

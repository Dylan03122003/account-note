import React from "react";
import { Link, Outlet } from "react-router-dom";
import Card, { AccountType } from "../components/Card";
import {
  BankAccountInfo,
  SocialAccountInfo,
  useAccountNote,
} from "../contexts/AccountNoteContext";

const HomePage = () => {
  const { accounts } = useAccountNote();

  return (
    <div className="pt-0 sm:pt-20">
      <ul className="flex items-center justify-center flex-col gap-5 pt-20 sm:pt-0 pb-20">
        {accounts.map((account, index) => {
          const bankAccount: BankAccountInfo =
            account.accountInfor as BankAccountInfo;

          const socialAccount: SocialAccountInfo =
            account.accountInfor as SocialAccountInfo;

          if (account.accountType === AccountType.BankCard)
            return (
              <li key={index}>
                <Card
                  id={account.id ? account.id : ""}
                  accountCode={bankAccount.accountCode}
                  accountType={AccountType.BankCard}
                  brandName={bankAccount.brandName}
                  userName={bankAccount.userName}
                  isMyBankAccount={bankAccount.isMyBankAccount}
                />
              </li>
            );

          if (account.accountType === AccountType.SocialMedia)
            return (
              <li key={index}>
                <Card
                  id={account.id ? account.id : ""}
                  brandName={socialAccount.brandName}
                  accountCode={socialAccount.accountCode}
                  password={socialAccount.password}
                  accountType={AccountType.SocialMedia}
                />
              </li>
            );
        })}
      </ul>
      <Outlet />
    </div>
  );
};

export default HomePage;

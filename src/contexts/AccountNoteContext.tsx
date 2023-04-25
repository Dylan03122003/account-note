import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  deleteAccountFromDB,
  getAccounts,
  saveAccountToDB,
  updateAccountFromDB,
} from "../backend/firebase-action";
import { AccountType } from "../components/Card";

type AccountNoteProps = {
  children: ReactNode;
};

export type BankAccountInfo = {
  brandName: string;
  accountCode: string;
  userName: string;
  isMyBankAccount?: boolean;
};

export type SocialAccountInfo = {
  brandName: string;
  accountCode: string;
  password: string;
};

export type AccountItem = {
  accountType: AccountType;
  accountInfor: BankAccountInfo | SocialAccountInfo;
  id?: string;
};

type AccountNoteContextValue = {
  accounts: AccountItem[];
  addAccount: (newAccount: AccountItem) => void;
  deleteAccount: (id: string) => void;
  getAnAccount: (id: string | undefined) => AccountItem | undefined;
  updateAccount: (id: string | undefined, newAccount: AccountItem) => void;
};

const AccountNoteContext = createContext({} as AccountNoteContextValue);

export function AccountNoteProvider({ children }: AccountNoteProps) {
  const [accounts, setAccounts] = useState<AccountItem[]>([]);

  // Load data for the first time from database
  useEffect(() => {
    getAccounts().then((data) => setAccounts(data));
  }, []);

  function addAccount(newAccount: AccountItem) {
    saveAccountToDB(newAccount);
    getAccounts().then((data) => setAccounts(data));
  }

  function deleteAccount(id: string) {
    setAccounts((preAccounts) => {
      return preAccounts.filter((account) => account.id !== id);
    });
    deleteAccountFromDB(id);
  }

  function getAnAccount(id: string | undefined) {
    if (id === undefined) return undefined;
    return accounts.find((account) => account.id === id);
  }

  function updateAccount(id: string | undefined, newAccount: AccountItem) {
    updateAccountFromDB(id, newAccount);
    if (id !== undefined)
      setAccounts((preAccounts) => {
        let updatedAccounts = preAccounts.filter(
          (account) => account.id !== id
        );
        return [{ id: id, ...newAccount }, ...updatedAccounts];
      });
  }

  return (
    <AccountNoteContext.Provider
      value={{
        accounts,
        addAccount,
        deleteAccount,
        getAnAccount,
        updateAccount,
      }}
    >
      {children}
    </AccountNoteContext.Provider>
  );
}

export const useAccountNote = () => useContext(AccountNoteContext);

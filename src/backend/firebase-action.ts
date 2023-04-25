import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { database } from "../config/firebase";
import { AccountItem } from "../contexts/AccountNoteContext";

export const accountCollectionsRef = collection(database, "accounts");

export const getAccounts = async () => {
  const data = await getDocs(accountCollectionsRef);
  const filteredData = data.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as AccountItem)
  );
  return filteredData;
};

export const saveAccountToDB = async (newAccount: AccountItem) => {
  await addDoc(accountCollectionsRef, {
    accountType: newAccount.accountType,
    accountInfor: newAccount.accountInfor,
  });
};

export const deleteAccountFromDB = async (id: string) => {
  const accountDoc = doc(database, "accounts", id);
  await deleteDoc(accountDoc);
};

export const updateAccountFromDB = async (
  id: string | undefined,
  newAccount: AccountItem
) => {
  try {
    if (id === undefined) throw new Error("ID is undefined");
    const accountDoc = doc(database, "accounts", id);

    await updateDoc(accountDoc, newAccount);
  } catch (error) {
    console.log(error);
  }
};

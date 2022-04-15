import { Db } from "../types/db";
import FirebaseDb from "./firebase";
import LocalStorageDb from "./local";

export default function RetrieveDb(isSignedIn: boolean) {
    return isSignedIn ? 
        new FirebaseDb() as Db : 
        new LocalStorageDb() as Db;
}
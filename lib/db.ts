import { Db } from "../types/db";
import LocalStorageDb from "./local";

export default function RetrieveDb(isSignedIn: boolean) {
    return new LocalStorageDb() as Db;
}
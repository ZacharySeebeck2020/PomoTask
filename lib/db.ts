import { Db } from "../types/db";
import LocalStorageDb from "./local";
import MySQLDb from "./mysql";

export default function RetrieveDb(isSignedIn: boolean, userId: string = "") { 
    // if (isSignedIn && userId) { return new MySQLDb(userId); }
    
    return new LocalStorageDb() as Db;
}
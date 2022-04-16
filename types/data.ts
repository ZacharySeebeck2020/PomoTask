import { Db } from "./db";

export interface DbContextValues {
    db: Db;
    loading: boolean;
    refreshDb(): void;
}
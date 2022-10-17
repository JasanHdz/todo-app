import { ISeedEntry, entriesInitialData } from "./entries";
import { SeedUser, usersInitialData } from "./users";

interface SeedData {
  users: SeedUser[]
  entries: ISeedEntry[]
}

export const initialData: SeedData = {
  users: usersInitialData,
  entries: entriesInitialData,
}
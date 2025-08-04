import { metamobClient } from "../metamob/metamob.api";
import type { User } from "./users.types";


export async function getUser(pseudo: string): Promise<User> {
  const response = await metamobClient.get<User>(`/utilisateurs/${pseudo}`);
  return response.data;
}
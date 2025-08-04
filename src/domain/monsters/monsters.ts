import type { AxiosInstance } from "axios";
import { toUpdateMonsterDto, type MonsterDto, type MonsterTradeDto } from "./monsters.dto";
import type { MonsterFilters, UpdateMonster as UpdateMonster } from "./monsters.types";


// To get all monsters
export async function getMonsters(
  client: AxiosInstance,
  filtres: MonsterFilters = {},
): Promise<MonsterDto[]> {
  const queryParams = new URLSearchParams();

  Object.entries(filtres).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const endpoint = `/monstres${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const res = await client.get<MonsterDto[]>(endpoint);
  return res.data;
}

export async function getMonstersStatus(
  client: AxiosInstance,
  pseudo: string,
  filtres: MonsterFilters = {},
): Promise<MonsterTradeDto[]> {
  const queryParams = new URLSearchParams();

  // Ajouter les filtres comme query parameters
  Object.entries(filtres).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const endpoint = `/utilisateurs/${pseudo}/monstres${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const archiRes = await client.get<MonsterTradeDto[]>(endpoint);

  return archiRes.data;
}


export async function updateMonsterStatus(
  client: AxiosInstance,
  pseudo: string,
  monstersToUpdate: UpdateMonster[]
): Promise<void> {
  const endpoint = `/utilisateurs/${pseudo}/monstres`;
  const res = await client.put<void>(endpoint, monstersToUpdate.map(toUpdateMonsterDto));
  return res.data;
}
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getMonstersStatus, updateMonsterStatus } from "./monsters";
import type { TradeStatus, MonsterTrade } from "./monsters.types";
import { useMetamobApiStore } from "../metamob/metamob.store";
import { useSettingsStore } from "../settings/settings.store";
import { toMonsterTrade } from "./monsters.dto";


export const useMonstersStore = defineStore('monsters', () => {


  const metamobApiStore = useMetamobApiStore();
  const settingStore = useSettingsStore();
  const loading = ref(false);
  const monsters = ref<MonsterTrade[]>([])
  const metamobClient = computed(() => metamobApiStore.createMetamobClient());

  async function fetchMonsters(pseudo: string) {
    loading.value = true;
    try {
      const response = await getMonstersStatus(metamobClient.value, pseudo);
      monsters.value = response.map(toMonsterTrade);
    } catch (error) {
      console.error("Erreur lors de la récupération des monstres:", error);
    } finally {
      loading.value = false;
    }
  }

  function getStatusByQty(qty: number): TradeStatus {
    if (qty === 0) {
      return 'recherche';
    } else if (qty > 1) {
      return 'propose';
    }
    return 'aucun';
  }
  async function updateMonsterQty(
    monsterList: { monsterId: number, qty: number }[]): Promise<void> {
    loading.value = true;

    const listToUpdate = monsterList
      .filter((monsterQty) => {
        return monsterQty.qty >= 0
      })
      .map((monsterQty) => {
        const status = getStatusByQty(monsterQty.qty)
        return {
          id: monsterQty.monsterId,
          status: status,
          quantity: monsterQty.qty
        };
      })
    await updateMonsterStatus(metamobClient.value, settingStore.settings.pseudo, listToUpdate);
    await fetchMonsters(settingStore.settings.pseudo)
    loading.value = false;
  }

  function getMonstersStatusByType(type: string) {
    return monsters.value.filter(monster => monster.type === type);
  }

  function getCapturedMonstersByType(type: string) {
    return monsters.value.filter(monster => monster.type === type && monster.quantite > 0).length;
  }

  function getNbMonstersByType(type: string) {
    return monsters.value.filter(monster => monster.type === type).length;
  }


  return {
    monsters,
    loading,
    fetchMonsters,
    getMonstersStatusByType,
    getCapturedMonstersByType,
    getNbMonstersByType,
    updateMonsterQty
  }
})
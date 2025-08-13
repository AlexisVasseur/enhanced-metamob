<script setup lang="ts">
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useMetamobApiStore } from '@/domain/metamob/metamob.store'
import { getMonstersStatus } from '@/domain/monsters/monsters'
import { useMonstersStore } from '@/domain/monsters/monsters.store'
import type { MonsterTrade } from '@/domain/monsters/monsters.types'
import { toMonsterTrade } from '@/domain/monsters/monsters.dto'
import MonsterTradeList from '@/components/MonsterTradeList.vue'

const pseudoToLoad = ref<string>('')
const otherMonsterList = ref<MonsterTrade[]>([])

const metamobClient = useMetamobApiStore().createMetamobClient()
async function handleClick() {
  if (pseudoToLoad.value) {
    const res = await getMonstersStatus(metamobClient, pseudoToLoad.value)
    otherMonsterList.value = res.map(toMonsterTrade)
  }
}

const monstersStore = useMonstersStore()

const myTradeIds = ref<number[]>([])
const hisTradeIds = ref<number[]>([])

const myTradeMonsterList = computed(() => {
  const myMonsters = monstersStore.monsters.filter((monster: MonsterTrade) => monster.propose === 1)
  const hisMonsters = otherMonsterList.value.filter(
    (monster: MonsterTrade) => monster.recherche === 1,
  )
  return myMonsters.filter((myMonster: MonsterTrade) => {
    return hisMonsters.some((hisMonster: MonsterTrade) => hisMonster.id === myMonster.id)
  })
})

const hisTradeMonsterList = computed(() => {
  const myMonsters = monstersStore.monsters.filter(
    (monster: MonsterTrade) => monster.recherche === 1,
  )
  const hisMonsters = otherMonsterList.value.filter(
    (monster: MonsterTrade) => monster.propose === 1,
  )
  return hisMonsters.filter((myMonster: MonsterTrade) => {
    return myMonsters.some((hisMonster: MonsterTrade) => hisMonster.id === myMonster.id)
  })
})

async function updateTradeList() {
  const listToUpdate: { monsterId: number; qty: number }[] = []
  monstersStore.monsters.forEach((monster: MonsterTrade) => {
    if (myTradeIds.value.includes(monster.id)) {
      listToUpdate.push({ monsterId: monster.id, qty: monster.quantite - 1 })
    }

    if (hisTradeIds.value.includes(monster.id)) {
      listToUpdate.push({ monsterId: monster.id, qty: monster.quantite + 1 })
    }
  })

  await monstersStore.updateMonsterQty(listToUpdate)
  myTradeIds.value = []
  hisTradeIds.value = []
}
</script>

<template>
  <div class="trader-container">
    <div class="trader-header">
      <InputText v-model="pseudoToLoad" placeholder="Pseudo echangeur" class="pseudo-input" />
      <Button label="Charger" @click="handleClick()" class="load-button" />
    </div>

    <div class="trade-lists">
      <MonsterTradeList
        v-model="myTradeIds"
        label="Mes monstres"
        :monster-trade="myTradeMonsterList"
      />
      <MonsterTradeList
        v-model="hisTradeIds"
        label="Ses monstres"
        :monster-trade="hisTradeMonsterList"
      />
    </div>

    <div class="trader-actions">
      <Button label="Valider l'echange" @click="updateTradeList" class="validate-button" />
    </div>
  </div>
</template>

<style scoped>
.trader-container {
  padding: 20px;
}

.trader-header {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
}

.pseudo-input {
  flex: 1;
  max-width: 300px;
}

.load-button {
  min-width: 100px;
}

.trade-lists {
  display: flex;
  flex-direction: row;
  gap: 24px;
  padding-top: 20px;
  margin-bottom: 30px;
}

.trader-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.validate-button {
  min-width: 150px;
  height: 40px;
}

@media (max-width: 768px) {
  .trade-lists {
    flex-direction: column;
    gap: 20px;
  }

  .trader-header {
    flex-direction: column;
    align-items: stretch;
  }

  .pseudo-input {
    max-width: none;
  }
}
</style>

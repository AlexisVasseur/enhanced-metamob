<script setup lang="ts">
import type { MonsterTrade } from '@/domain/monsters/monsters.types'
import MonsterTradeCard from './MonsterTradeCard.vue'

interface MonsterTradeCardProps {
  label: string
  monsterTrade: MonsterTrade[]
}
defineProps<MonsterTradeCardProps>()
const tradeList = defineModel<number[]>({ required: true })

function updateTradeList(status: boolean, monster: MonsterTrade) {
  if (status) {
    tradeList.value.push(monster.id)
  } else {
    tradeList.value = tradeList.value.filter((monsterId) => monsterId !== monster.id)
  }
}
</script>

<template>
  <div class="monster-trade-list">
    <strong class="list-label">{{ label }}</strong>
    <MonsterTradeCard
      v-for="monster in monsterTrade"
      :key="monster.id"
      :monsterTrade="monster"
      :updateTrade="updateTradeList"
    />
  </div>
</template>

<style scoped>
.monster-trade-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-label {
  font-size: 1.1rem;
  color: #333;
}
</style>

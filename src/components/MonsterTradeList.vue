<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <strong>{{ label }}</strong>
    <MonsterTradeCard v-for="monster in monsterTrade" :key="monster.id" :monsterTrade="monster"
      :updateTrade="updateTradeList" />
  </div>
</template>
<script setup lang="ts">
import type { MonsterTrade } from '@/domain/monsters/monsters.types';
import MonsterTradeCard from './MonsterTradeCard.vue';


interface MonsterTradeCardProps {
  label: string;
  monsterTrade: MonsterTrade[];
}
defineProps<MonsterTradeCardProps>();
const tradeList = defineModel<number[]>({ required: true });


function updateTradeList(status: boolean, monster: MonsterTrade) {
  if (status) {
    tradeList.value.push(monster.id);
  } else {
    tradeList.value = tradeList.value.filter((monsterId) => monsterId !== monster.id);
  }
}

</script>

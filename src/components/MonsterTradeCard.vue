<template>
  <div class="monster-trade">
    <img width="80" height="80" style="background-color: #F5ECDD" :src="monsterTrade.image_url" alt="">
    <div>{{ monsterTrade.nom }} ({{ monsterTrade.quantite }})</div>
    <Checkbox v-model="checkbox" binary @change="handleClick" />
  </div>
</template>


<script lang="ts" setup>

import Checkbox from 'primevue/checkbox';
import type { MonsterTrade } from '@/domain/monsters/monsters.types';
import { ref } from 'vue';

const checkbox = ref(false);
const props = defineProps<{
  monsterTrade: MonsterTrade;
  updateTrade: (status: boolean, monster: MonsterTrade) => void;
}>();

function handleClick() {
  props.updateTrade(checkbox.value, props.monsterTrade);
}
</script>
<style>
.monster-trade {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-direction: row;
  border: 1px solid white;
  padding-right: 12px;
  ;
}
</style>
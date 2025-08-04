<template>
  <Tabs value="0">
    <TabList>
      <Tab value="0">{{ archiLabelTitle }}</Tab>
      <Tab value="1">{{ monsterLabelTitle }}</Tab>
      <Tab value="2">{{ bossLabelTitle }}</Tab>
      <Tab value="3">Trader</Tab>
    </TabList>

    <TabPanels>
      <TabPanel value="0">
        <MonsterExchangeList monsterType="archimonstre" />
      </TabPanel>
      <TabPanel value="1">
        <MonsterExchangeList monsterType="monstre" />
      </TabPanel>
      <TabPanel value="2">
        <MonsterExchangeList :monsterType="'boss'" />
      </TabPanel>
      <TabPanel value="3">
        <Trader />
      </TabPanel>
    </TabPanels>


  </Tabs>
</template>

<script lang="ts" setup>
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import MonsterExchangeList from './MonsterList.vue';
import { computed, onMounted } from 'vue';

import type { MonsterType } from '../domain/monsters/monsters.types';
import Trader from './Trader.vue';
import { useMonstersStore } from '@/domain/monsters/monsters.store';
import { useSettingsStore } from '@/domain/settings/settings.store';


const userStore = useMonstersStore();
const settingStore = useSettingsStore();
onMounted(() => {
  userStore.fetchMonsters(settingStore.settings.pseudo);
})

function getRatioLabel(type: MonsterType) {
  const total = userStore.getNbMonstersByType(type);
  const captured = userStore.getCapturedMonstersByType(type);
  return `(${captured} / ${total})`;
}

const archiLabelTitle = computed(() => {
  return `Archimonstres ${getRatioLabel('archimonstre')}`;
});

const monsterLabelTitle = computed(() => {
  return `Monstres ${getRatioLabel('monstre')}`;
});

const bossLabelTitle = computed(() => {
  return `Boss ${getRatioLabel('boss')}`;
});





</script>

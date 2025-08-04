<template>
  <DataTable
    :loading="monsterStore.loading"
    scrollable
    scrollHeight="600px"
    :value="filteredMonsters"
    v-model:filters="filters"
    :globalFilterFields="['nom', 'nom_normal', 'zone', 'souszone']"
    :virtualScrollerOptions="{ itemSize: 50 }"
  >
    <template #header>
      <div class="flex justify-end">
        <IconField>
          <InputText v-model="filters['global'].value" placeholder="Recherche de monstre" />
          <SelectButton
            v-model="captureStatus"
            :options="options"
            optionLabel="name"
            optionValue="value"
          />
        </IconField>
      </div>
    </template>
    <template #empty> No customers found. </template>
    <Column field="id" header="ID"></Column>
    <Column :showFilterMenu="true" field="nom" header="Nom">
      <template #body="slotProps">
        <div style="display: flex; flex-direction: row; gap: 8px">
          <img
            style="background-color: #f5ecdd"
            :src="slotProps.data.image_url"
            :alt="slotProps.data.image"
            height="50"
          />
          <div>
            <div>
              <strong>{{ slotProps.data.nom }}</strong>
            </div>
            <div>{{ slotProps.data.nom_normal }}</div>
            <div>{{ slotProps.data.zone }}</div>
            <div>{{ slotProps.data.souszone }}</div>
          </div>
        </div>
      </template>
    </Column>
    <Column field="quantite" header="Quantité">
      <template #body="slotProps">
        <div style="display: flex; align-items: center; gap: 8px">
          <Button
            size="small"
            icon="pi pi-minus"
            severity="danger"
            @click="onDecreaseQty(slotProps.data.id, slotProps.data.quantite)"
          />
          <InputText size="small" disabled type="text" v-model="slotProps.data.quantite" />
          <Button
            size="small"
            icon="pi pi-plus"
            @click="onIncreaseQty(slotProps.data.id, slotProps.data.quantite)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import IconField from 'primevue/iconfield'

import type { MonsterTrade } from '@/domain/monsters/monsters.types'
import { useMonstersStore } from '@/domain/monsters/monsters.store'

interface MonsterListProps {
  monsterType?: string
}
const props = defineProps<MonsterListProps>()

const monsterStore = useMonstersStore()
const filteredMonsters = computed<MonsterTrade[]>(() => {
  return monsterStore.monsters.filter((monster: MonsterTrade) => {
    if (captureStatus.value === 2 && monster.quantite === 0) {
      return false // Filtrer les monstres non capturés
    }

    if (captureStatus.value === 3 && monster.quantite > 0) {
      return false // Filtrer les monstres capturés
    }

    return monster.type === props.monsterType
  })
})

const nbNotCaptured = computed(() => {
  return monsterStore.monsters.filter(
    (monster: MonsterTrade) => monster.type === props.monsterType && monster.quantite === 0,
  ).length
})

const nbCaptured = computed(() => {
  return monsterStore.monsters.filter(
    (monster: MonsterTrade) => monster.type === props.monsterType && monster.quantite > 0,
  ).length
})

const nbAll = computed(() => {
  return monsterStore.monsters.filter((monster: MonsterTrade) => monster.type === props.monsterType)
    .length
})

const captureStatus = ref<number>(1)
const options = computed(() => {
  return [
    { name: `Tout (${nbAll.value})`, value: 1 },
    {
      name: `Capturé (${nbCaptured.value})`,
      value: 2,
    },
    { name: `Manquant (${nbNotCaptured.value})`, value: 3 },
  ]
})

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  nom: { value: null, matchMode: FilterMatchMode.CONTAINS },
  nom_normal: { value: null, matchMode: FilterMatchMode.CONTAINS },
  zone: { value: null, matchMode: FilterMatchMode.CONTAINS },
  souszone: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

function onIncreaseQty(monsterId: number, qty: string) {
  const newQty = parseInt(qty, 10) + 1
  monsterStore.updateMonsterQty([{ monsterId, qty: newQty }])
}

function onDecreaseQty(monsterId: number, qty: string) {
  const newQty = parseInt(qty, 10) - 1
  monsterStore.updateMonsterQty([{ monsterId, qty: newQty }])
}
</script>

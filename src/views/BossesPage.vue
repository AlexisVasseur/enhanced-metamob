<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMonstersStore } from '@/domain/monsters/monsters.store'
import { useSettingsStore } from '@/domain/settings/settings.store'
import type { MonsterTrade } from '@/domain/monsters/monsters.types'
import MonsterList from '@/components/MonsterList.vue'

const monstersStore = useMonstersStore()
const settingsStore = useSettingsStore()

onMounted(() => {
  monstersStore.fetchMonsters(settingsStore.settings.pseudo)
})

const bossMonsters = computed<MonsterTrade[]>(() => {
  return monstersStore.monsters.filter((monster: MonsterTrade) => monster.type === 'boss')
})

const bossStats = computed(() => {
  const total = bossMonsters.value.length
  const captured = bossMonsters.value.filter((monster: MonsterTrade) => monster.quantite > 0).length
  const missing = total - captured

  return {
    total,
    captured,
    missing,
    percentage: total > 0 ? Math.round((captured / total) * 100) : 0,
  }
})
</script>

<template>
  <div class="bosses-page">
    <div class="page-header">
      <h1 class="page-title">Bosses</h1>
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-number">{{ bossStats.total }}</div>
          <div class="stat-label">Total</div>
        </div>
        <div class="stat-card captured">
          <div class="stat-number">{{ bossStats.captured }}</div>
          <div class="stat-label">Capturés</div>
        </div>
        <div class="stat-card missing">
          <div class="stat-number">{{ bossStats.missing }}</div>
          <div class="stat-label">Manquants</div>
        </div>
        <div class="stat-card percentage">
          <div class="stat-number">{{ bossStats.percentage }}%</div>
          <div class="stat-label">Progression</div>
        </div>
      </div>
    </div>

    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${bossStats.percentage}%` }"></div>
    </div>

    <div class="content-section">
      <MonsterList monsterType="boss" />
    </div>
  </div>
</template>

<style scoped>
.bosses-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card.captured {
  border-left: 4px solid #10b981;
}

.stat-card.missing {
  border-left: 4px solid #ef4444;
}

.stat-card.percentage {
  border-left: 4px solid #3b82f6;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  margin-bottom: 30px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
  transition: width 0.5s ease;
}

.content-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

@media (max-width: 768px) {
  .bosses-page {
    padding: 15px;
  }

  .page-title {
    font-size: 2rem;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .stat-card {
    padding: 15px;
  }

  .stat-number {
    font-size: 1.5rem;
  }
}
</style>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const navItems = [
  { name: 'Monsters', path: '/', icon: 'pi pi-star' },
  { name: 'Settings', path: '/settings', icon: 'pi pi-cog' },
]
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <h1>Enhanced Metamob</h1>
      </div>

      <nav class="navigation">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          active-class="active"
        >
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
}

.logo h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navigation {
  display: flex;
  gap: 20px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  text-decoration: none;
  color: white;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.nav-link i {
  font-size: 1.1rem;
}

.nav-link span {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    padding: 15px 20px;
    gap: 15px;
  }

  .logo h1 {
    font-size: 1.5rem;
  }

  .navigation {
    gap: 10px;
  }

  .nav-link {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
}
</style>

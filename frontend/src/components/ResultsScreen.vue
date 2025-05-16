<template>
  <div class="screen-container">
    <div class="content-container">
      <h2 class="subheading">
        Your Compliance Analysis
      </h2>
      
      <p class="body-text">
        Here's what we found in your documents. We've identified key areas that need attention to meet regulatory requirements.
      </p>

      <div class="card">
        <div class="section-header">
          <span>Compliance Status</span>
        </div>
        <ul class="list">
          <li v-for="(item, index) in complianceItems" :key="index" class="list-item">
            <span :class="item.status">{{ item.name }}</span>
            <span class="small-text">{{ item.description }}</span>
          </li>
        </ul>
      </div>

      <div class="card">
        <div class="section-header">
          <span>Next Steps</span>
        </div>
        <p class="body-text">
          Based on our analysis, we recommend focusing on these areas first:
        </p>
        <ul class="list">
          <li v-for="(step, index) in nextSteps" :key="index" class="list-item">
            {{ step }}
          </li>
        </ul>
      </div>

      <div class="button-container">
        <button class="primary-button" @click="handleViewActionPlan">
          View Action Plan
        </button>
        <button class="secondary-button" @click="handleDownloadReport">
          Download Report
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '../assets/shared-styles.css';

interface ComplianceItem {
  name: string;
  status: 'complete' | 'warning' | 'incomplete';
  description: string;
}

const router = useRouter()

const complianceItems = ref<ComplianceItem[]>([
  { 
    name: 'Environmental Impact Assessment',
    status: 'complete',
    description: 'All required sections present'
  },
  {
    name: 'Community Engagement',
    status: 'warning',
    description: 'Missing consent documentation'
  },
  {
    name: 'Financial Projections',
    status: 'incomplete',
    description: 'Needs detailed breakdown'
  }
])

const nextSteps = ref<string[]>([
  'Complete community consent documentation',
  'Update financial projections with quarterly breakdowns',
  'Schedule follow-up consultation'
])

const handleViewActionPlan = (): void => {
  router.push('/action-plan')
}

const handleDownloadReport = (): void => {
  // Implement report download functionality
  console.log('Downloading report...')
}
</script>

<style scoped>
.complete {
  color: #38a169;
}

.warning {
  color: #d69e2e;
}

.incomplete {
  color: #e53e3e;
}

.list-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style> 
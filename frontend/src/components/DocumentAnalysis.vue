<template>
  <div class="screen-container">
    <div class="content-container">
      <h2 class="subheading">
        Analyzing Your Documents
      </h2>
      
      <p class="body-text">
        We're reviewing your documents to identify compliance gaps and opportunities for improvement.
      </p>

      <div class="card">
        <div class="section-header">
          <span>Document Status</span>
        </div>
        <ul class="list">
          <li v-for="(doc, index) in documents" :key="index" class="list-item">
            {{ doc.name }} - {{ doc.status }}
          </li>
        </ul>
      </div>

      <div class="card">
        <div class="section-header">
          <span>Analysis Progress</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${analysisProgress}%` }"></div>
        </div>
        <p class="small-text">{{ analysisProgress }}% Complete</p>
      </div>

      <div class="card">
        <IngestionProgress />
      </div>
      
      <div class="button-container">
        <button class="secondary-button" @click="handleCancel">
          Cancel Analysis
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import '../assets/shared-styles.css'
import IngestionProgress from './IngestionProgress.vue'

interface Document {
  name: string;
  status: string;
}

interface Results {
  answer?: string;
}

interface StoreState {
  results: Results;
  loading: boolean;
  error: string | null;
}

const router = useRouter()
const store = useStore()
const analysisProgress = ref<number>(0)
const queryInput = ref<string>('')
const activeTab = ref<string>('chunks')

const documents = ref<Document[]>([
  { name: 'Environmental Impact Assessment', status: 'Analyzing...' },
  { name: 'Project Proposal', status: 'Analyzing...' },
  { name: 'Financial Statements', status: 'Analyzing...' }
])

// Computed properties from store state
const results = computed<Results>(() => store.state.results)
const loading = computed<boolean>(() => store.state.loading)
const error = computed<string | null>(() => store.state.error)

// Format answer with markdown
const formattedAnswer = computed<string>(() => {
  if (!results.value || !results.value.answer) return '';
  
  // Process citations in the format [1], [2], etc.
  let processedAnswer = results.value.answer.replace(
    /\[(\d+)\]/g, 
    (match, p1) => `<span class="citation">${match}</span>`
  );
  
  return marked.parse(processedAnswer);
})

onMounted(() => {
  simulateAnalysis()
})

const simulateAnalysis = (): void => {
  const interval = setInterval(() => {
    analysisProgress.value += 5
    if (analysisProgress.value >= 100) {
      clearInterval(interval)
      router.push('/results')
    }
  }, 500)
}

const handleCancel = (): void => {
  router.push('/upload')
}

const submitQuery = (): void => {
  if (!queryInput.value.trim()) return;
  store.dispatch('submitQuery', queryInput.value);
}
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--color-border);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  margin: var(--spacing-sm) 0;
}

.progress-fill {
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
}
</style> 
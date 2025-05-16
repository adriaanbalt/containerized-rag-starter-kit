<template>
  <div class="screen-container">
    <div class="content-container">
      <h2 class="subheading">
        Your Action Plan
      </h2>
      
      <p class="body-text">
        Follow these steps to get your project fully compliant. We've prioritized tasks based on their impact and urgency.
      </p>

      <div class="card">
        <div class="section-header">
          <span>Priority Tasks</span>
        </div>
        <ul class="list">
          <li v-for="(task, index) in priorityTasks" :key="index" class="list-item">
            <div class="task-header">
              <span class="task-title">{{ task.title }}</span>
              <span class="task-deadline">{{ task.deadline }}</span>
            </div>
            <p class="small-text">{{ task.description }}</p>
            <div class="task-actions">
              <button class="secondary-button" @click="handleTaskAction(task)">
                {{ task.action }}
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div class="card">
        <div class="section-header">
          <span>Resources</span>
        </div>
        <ul class="list">
          <li v-for="(resource, index) in resources" :key="index" class="list-item">
            <a :href="resource.link" class="resource-link">
              {{ resource.title }}
            </a>
            <p class="small-text">{{ resource.description }}</p>
          </li>
        </ul>
      </div>

      <div class="button-container">
        <button class="primary-button" @click="handleScheduleConsultation">
          Schedule Consultation
        </button>
        <button class="secondary-button" @click="handleBackToResults">
          Back to Results
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '../assets/shared-styles.css';

interface Task {
  title: string;
  deadline: string;
  description: string;
  action: string;
}

interface Resource {
  title: string;
  description: string;
  link: string;
}

const router = useRouter()

const priorityTasks = ref<Task[]>([
  {
    title: 'Complete Community Consent Documentation',
    deadline: 'Due in 2 weeks',
    description: 'Gather and submit signed consent forms from affected communities',
    action: 'View Template'
  },
  {
    title: 'Update Financial Projections',
    deadline: 'Due in 1 week',
    description: 'Include quarterly breakdowns and sensitivity analysis',
    action: 'Download Template'
  },
  {
    title: 'Environmental Impact Assessment',
    deadline: 'Due in 3 weeks',
    description: 'Complete the missing sections in your EIA report',
    action: 'View Guidelines'
  }
])

const resources = ref<Resource[]>([
  {
    title: 'Community Engagement Guide',
    description: 'Best practices for obtaining community consent',
    link: '#'
  },
  {
    title: 'Financial Projection Template',
    description: 'Excel template with formulas and examples',
    link: '#'
  },
  {
    title: 'EIA Requirements Checklist',
    description: 'Complete list of required sections and documentation',
    link: '#'
  }
])

const handleTaskAction = (task: Task): void => {
  console.log(`Handling action for task: ${task.title}`)
}

const handleScheduleConsultation = (): void => {
  router.push('/support')
}

const handleBackToResults = (): void => {
  router.push('/results')
}
</script>

<style scoped>
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.task-title {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.task-deadline {
  font-size: var(--font-size-small);
  color: var(--color-text-muted);
}

.task-actions {
  margin-top: var(--spacing-sm);
}

.resource-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.resource-link:hover {
  text-decoration: underline;
}
</style> 
<template>
  <div class="screen-container">
    <div class="content-container">
      <h2 class="subheading">
        Get Support
      </h2>
      
      <p class="body-text">
        Our team of compliance experts is here to help you navigate the requirements and get your project approved.
      </p>

      <div class="card">
        <div class="section-header">
          <span>Schedule a Consultation</span>
        </div>
        <p class="body-text">
          Book a 30-minute call with one of our compliance experts to discuss your specific needs.
        </p>
        <div class="button-container">
          <button class="primary-button" @click="handleScheduleCall">
            Schedule Call
          </button>
        </div>
      </div>

      <div class="card">
        <div class="section-header">
          <span>Contact Options</span>
        </div>
        <ul class="list">
          <li v-for="(option, index) in contactOptions" :key="index" class="list-item">
            <div class="contact-option">
              <span class="contact-title">{{ option.title }}</span>
              <p class="small-text">{{ option.description }}</p>
              <a :href="option.link" class="contact-link">{{ option.action }}</a>
            </div>
          </li>
        </ul>
      </div>

      <div class="card">
        <div class="section-header">
          <span>FAQ</span>
        </div>
        <ul class="list">
          <li v-for="(faq, index) in faqs" :key="index" class="list-item">
            <div class="faq-item">
              <span class="faq-question">{{ faq.question }}</span>
              <p class="small-text">{{ faq.answer }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="button-container">
        <button class="secondary-button" @click="handleBackToActionPlan">
          Back to Action Plan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '../assets/shared-styles.css';

interface ContactOption {
  title: string;
  description: string;
  action: string;
  link: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const router = useRouter()

const contactOptions = ref<ContactOption[]>([
  {
    title: 'Email Support',
    description: 'Get a response within 24 hours',
    action: 'Send Email',
    link: 'mailto:support@example.com'
  },
  {
    title: 'Live Chat',
    description: 'Available Monday-Friday, 9am-5pm',
    action: 'Start Chat',
    link: '#'
  },
  {
    title: 'Phone Support',
    description: 'Call us at +1 (555) 123-4567',
    action: 'Call Now',
    link: 'tel:+15551234567'
  }
])

const faqs = ref<FAQ[]>([
  {
    question: 'How long does the compliance process take?',
    answer: 'Typically 4-6 weeks, depending on the complexity of your project and completeness of documentation.'
  },
  {
    question: 'What documents do I need to prepare?',
    answer: 'Required documents vary by project type, but generally include environmental assessments, community consent, and financial projections.'
  },
  {
    question: 'Can I get help with document preparation?',
    answer: 'Yes, our team can provide templates and guidance for all required documentation.'
  }
])

const handleScheduleCall = (): void => {
  // Implement scheduling functionality
  console.log('Opening scheduling interface...')
}

const handleBackToActionPlan = (): void => {
  router.push('/action-plan')
}
</script>

<style scoped>
.contact-option {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.contact-title {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.contact-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.contact-link:hover {
  text-decoration: underline;
}

.faq-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.faq-question {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
</style> 
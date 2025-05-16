<template>
  <div class="screen-container">
    <div class="content-container">
      <h1 class="heading">
        Get Your Energy Project Compliant — Fast.
      </h1>
      
      <p class="body-text">
        Upload your documents. We'll tell you what's missing and help you meet regulatory standards — so you can unlock funding, faster.
      </p>

      <div 
        class="card upload-zone"
        :class="{ 'is-dragging': isDragging }"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
      >
        <div class="upload-zone-content">
          <i class="upload-icon">📁</i>
          <p class="body-text">Drop folder or click to upload</p>
        </div>
      </div>

      <div v-if="isUploading" class="card">
        <p class="body-text">Uploading {{ fileCount }} files — sit tight, this only takes a moment.</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${uploadProgress}%` }"></div>
        </div>
      </div>

      <p class="small-text">
        Having trouble uploading? 
        <a href="mailto:support@example.com">Email us your documents</a> 
        and we'll take care of the rest.
      </p>

      <p class="small-text">
        Trusted by energy producers and small businesses across Nigeria, Ghana, and Kenya.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/shared-styles.css'

const router = useRouter()
const isDragging = ref(false)
const isUploading = ref(false)
const fileCount = ref(0)
const uploadProgress = ref(0)

const handleDragOver = (e) => {
  isDragging.value = true
}

const handleDragLeave = (e) => {
  isDragging.value = false
}

const handleDrop = (e) => {
  isDragging.value = false
  const files = e.dataTransfer.files
  processFiles(files)
}

const triggerFileInput = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.webkitdirectory = true
  input.directory = true
  input.multiple = true
  input.onchange = (e) => processFiles(e.target.files)
  input.click()
}

const processFiles = async (files) => {
  try {
    isUploading.value = true
    fileCount.value = files.length

    // todo: upload files to s3
    
    // Navigate to analysis screen after successful upload
    router.push('/analysis')
  } catch (error) {
    console.error('Error processing files:', error)
    // Here you might want to show an error message to the user
  } finally {
    isUploading.value = false
  }
}
</script>

<style scoped>
.upload-zone {
  border: 2px dashed var(--color-border);
  cursor: pointer;
  transition: all 0.3s;
}

.upload-zone.is-dragging {
  border-color: var(--color-primary);
  background-color: rgba(56, 178, 172, 0.1);
}

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
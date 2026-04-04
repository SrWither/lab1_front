<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { setAuthToken } from '@/api/auth'

const router = useRouter()
const auth = AuthStore()

onMounted(() => {
  auth.clearToken()
  router.push('/login')
  setAuthToken(null)
})
</script>

<template>
  <div
    class="min-h-[calc(100vh-11.5rem)] md:min-h-[calc(100vh-7.5rem)] flex items-center justify-center px-4"
  >
    <h1 class="text-3xl font-bold">Cerrando sesión...</h1>
  </div>
</template>

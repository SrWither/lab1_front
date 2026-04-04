<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import { useRouter } from 'vue-router'
import ToastStore from '@/stores/toast'
import { AuthStore } from '@/stores/auth'

import { type RegisterAuthRequest, registerAuth } from '@/api/auth'

import JBtn from '@/components/jBtn.vue'
import jInput from '@/components/jInput.vue'
import jSimpleCard from '@/components/jSimpleCard.vue'

const toast = ToastStore()
const router = useRouter()
const auth = AuthStore()

const form = reactive<RegisterAuthRequest>({
  username: '',
  nombre: '',
  password: '',
})

const handleSubmit = async () => {
  try {
    await registerAuth(form)
    toast.success({ text: 'Registro exitoso' })
    router.push('/login')
  } catch {
    toast.error({ text: 'Error al registrar' })
  }
}

onBeforeMount(() => {
  if (auth.token) {
    router.push('/')
  }
})
</script>

<template>
  <div
    class="min-h-[calc(100vh-11.5rem)] md:min-h-[calc(100vh-7.5rem)] flex items-center justify-center px-4"
  >
    <jSimpleCard class="w-full max-w-md p-6 space-y-6">
      <!-- Header -->
      <div class="text-center space-y-1">
        <h2 class="text-2xl font-bold">Crear cuenta</h2>
        <p class="text-sm opacity-70">Registrate para empezar a usar la plataforma</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <jInput v-model="form.username" label="Username" required />
        <jInput v-model="form.nombre" label="Nombre completo" required />
        <jInput v-model="form.password" label="Contraseña" type="password" required />

        <jBtn label="Crear cuenta" class="w-full mt-2" variant="secondary" />
      </form>

      <!-- Footer -->
      <div class="text-center text-sm opacity-70">
        ¿Ya tenés cuenta?
        <router-link to="/login" class="underline hover:opacity-100 ml-1">
          Iniciar sesión
        </router-link>
      </div>
    </jSimpleCard>
  </div>
</template>

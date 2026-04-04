<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import { useRouter } from 'vue-router'
import ToastStore from '@/stores/toast'
import { AuthStore } from '@/stores/auth'
import { UserStore } from '@/stores/user'

import { type LoginAuthRequest, loginAuth, setAuthToken } from '@/api/auth'
import { getCurrentUser } from '@/api/users'

import JBtn from '@/components/jBtn.vue'
import jInput from '@/components/jInput.vue'
import jSimpleCard from '@/components/jSimpleCard.vue'

const toast = ToastStore()
const router = useRouter()
const auth = AuthStore()
const user = UserStore()

const form = reactive<LoginAuthRequest>({
  username: '',
  password: '',
})

const handleSubmit = async () => {
  try {
    const response = await loginAuth(form)
    setAuthToken(response.token)
    toast.success({ text: 'Login exitoso' })
    auth.setToken(response.token)
    const currentUser = await getCurrentUser()
    user.setUser(currentUser)
    router.push('/')
  } catch {
    toast.error({ text: 'Usuario o contraseña incorrectos' })
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
        <h2 class="text-2xl font-bold">Iniciar sesión</h2>
        <p class="text-sm opacity-70">Ingresa tus credenciales para continuar</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <jInput v-model="form.username" label="Username" required />
        <jInput v-model="form.password" label="Contraseña" type="password" required />

        <jBtn label="Entrar" class="w-full mt-2" variant="secondary" />
      </form>

      <!-- Footer -->
      <div class="text-center text-sm opacity-70">
        ¿No tenés cuenta?
        <router-link to="/register" class="underline hover:opacity-100 ml-1">
          Registrate
        </router-link>
      </div>
    </jSimpleCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserStore } from '@/stores/user'
import { AuthStore } from '@/stores/auth'
import { updateUser, deleteUser } from '@/api/users'
import { useRouter } from 'vue-router'
import toastStore from '@/stores/toast'
import jBtn from '@/components/jBtn.vue'
import jInput from '@/components/jInput.vue'
import jModal from '@/components/jModal.vue'
import jAlert from '@/components/jAlert.vue'

const userStore = UserStore()
const authStore = AuthStore()
const toast = toastStore()
const router = useRouter()

const nuevoNombre = ref(userStore.user?.nombre ?? '')
const guardando = ref(false)
const errorNombre = ref('')
const nombreCambiado = ref(false)

const guardarNombre = async () => {
  if (!userStore.user || !nuevoNombre.value.trim()) return
  if (nuevoNombre.value.trim() === userStore.user.nombre) {
    errorNombre.value = 'El nombre es igual al actual.'
    return
  }
  guardando.value = true
  errorNombre.value = ''
  nombreCambiado.value = false
  try {
    const updated = await updateUser(userStore.user.id, { nombre: nuevoNombre.value.trim() })
    userStore.setUser(updated)
    nombreCambiado.value = true
    toast.success({ text: 'Nombre actualizado correctamente' })
  } catch {
    errorNombre.value = 'No se pudo actualizar el nombre.'
  } finally {
    guardando.value = false
  }
}

const showConfirmDelete = ref(false)
const confirmInput = ref('')
const eliminando = ref(false)

const eliminarCuenta = async () => {
  if (!userStore.user) return
  eliminando.value = true
  try {
    await deleteUser(userStore.user.id)
    authStore.clearToken()
    userStore.clearUser()
    toast.success({ text: 'Cuenta eliminada. ¡Hasta la próxima!' })
    router.push('/login')
  } catch {
    toast.error({ text: 'No se pudo eliminar la cuenta.' })
  } finally {
    eliminando.value = false
    showConfirmDelete.value = false
  }
}

const confirmacionValida = () =>
  confirmInput.value.trim().toLowerCase() === userStore.user?.nombre?.toLowerCase()
</script>

<template>
  <div class="p-6 md:p-10 max-w-2xl mx-auto space-y-8">
    <!-- Header -->
    <header>
      <h1 class="text-3xl font-bold text-black dark:text-white flex items-center gap-2">
        <i class="pi pi-cog" />
        Configuración
      </h1>
      <p class="text-zinc-500 dark:text-zinc-400 mt-1">Gestioná tu cuenta.</p>
    </header>

    <!-- Info actual -->
    <div
      class="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm flex items-center gap-4"
    >
      <div
        class="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
      >
        <i class="pi pi-user text-2xl text-zinc-400 dark:text-zinc-500" />
      </div>
      <div>
        <p class="text-lg font-semibold text-black dark:text-white">{{ userStore.user?.nombre }}</p>
        <p class="text-sm text-zinc-400 dark:text-zinc-500">ID #{{ userStore.user?.id }}</p>
      </div>
    </div>

    <!-- Cambiar nombre -->
    <section
      class="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-5"
    >
      <div class="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <i class="pi pi-pencil text-zinc-400" />
        <h2 class="text-base font-semibold text-black dark:text-white">Cambiar nombre</h2>
      </div>

      <jAlert v-if="errorNombre" variant="error">{{ errorNombre }}</jAlert>
      <jAlert v-if="nombreCambiado" variant="success">Nombre actualizado correctamente.</jAlert>

      <div class="space-y-4">
        <jInput v-model="nuevoNombre" label="Nuevo nombre" @keyup.enter="guardarNombre" />
        <jBtn
          label="Guardar cambios"
          icon="check"
          @click="guardarNombre"
          :disabled="guardando || !nuevoNombre.trim()"
        />
      </div>
    </section>

    <!-- Zona de peligro -->
    <section
      class="rounded-2xl bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900/40 p-6 shadow-sm space-y-5"
    >
      <div class="flex items-center gap-2 border-b border-red-100 dark:border-red-900/30 pb-4">
        <i class="pi pi-exclamation-triangle text-red-500" />
        <h2 class="text-base font-semibold text-red-600 dark:text-red-400">Zona de peligro</h2>
      </div>

      <div class="flex items-start justify-between gap-4">
        <div class="space-y-1">
          <p class="text-sm font-medium text-black dark:text-white">Eliminar cuenta</p>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">
            Esta acción es permanente. Se borrarán tu usuario y toda tu lista de juegos.
          </p>
        </div>
        <jBtn
          label="Eliminar"
          icon="delete"
          variant="secondary"
          @click="showConfirmDelete = true"
          class="shrink-0"
        />
      </div>
    </section>

    <!-- Modal confirmar eliminación -->
    <jModal v-model="showConfirmDelete" title="Eliminar cuenta">
      <div class="space-y-5">
        <div
          class="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 p-4 flex gap-3"
        >
          <i class="pi pi-exclamation-circle text-red-500 text-lg shrink-0 mt-0.5" />
          <p class="text-sm text-red-700 dark:text-red-400">
            Esta acción <strong>no se puede deshacer</strong>. Se eliminarán tu cuenta y todos tus
            datos.
          </p>
        </div>

        <div class="space-y-2">
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            Escribí tu nombre
            <span class="font-semibold text-black dark:text-white">{{
              userStore.user?.nombre
            }}</span>
            para confirmar:
          </p>
          <jInput v-model="confirmInput" label="Tu nombre" />
        </div>

        <div class="flex gap-3 pt-1">
          <jBtn
            label="Eliminar mi cuenta"
            icon="delete_forever"
            @click="eliminarCuenta"
            :disabled="eliminando || !confirmacionValida()"
          />
          <jBtn
            label="Cancelar"
            variant="secondary"
            @click="
              () => {
                showConfirmDelete = false
                confirmInput = ''
              }
            "
          />
        </div>
      </div>
    </jModal>
  </div>
</template>

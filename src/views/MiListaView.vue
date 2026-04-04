<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { UserStore } from '@/stores/user'
import { listarJuegosUsuario, actualizarJuegoUsuario, eliminarJuegoUsuario } from '@/api/juegos'
import type { ItemLista, UpdateJuegoRequest } from '@/api/types'
import toastStore from '@/stores/toast'
import jBtn from '@/components/jBtn.vue'
import jSpinner from '@/components/jSpinner.vue'
import jAlert from '@/components/jAlert.vue'
import jModal from '@/components/jModal.vue'

const userStore = UserStore()
const toast = toastStore()

const lista = ref<ItemLista[]>([])
const loading = ref(true)
const error = ref('')

const fetchLista = async () => {
  if (!userStore.user) return
  loading.value = true
  error.value = ''
  try {
    lista.value = await listarJuegosUsuario(userStore.user.id)
  } catch {
    error.value = 'No se pudo cargar tu lista.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchLista)

const flags = ['tengo', 'quiero', 'jugado', 'me_gusta'] as const

const flagMeta: Record<(typeof flags)[number], { label: string; icon: string }> = {
  tengo: { label: 'Tengo', icon: 'pi pi-box' },
  quiero: { label: 'Quiero', icon: 'pi pi-shopping-cart' },
  jugado: { label: 'Jugado', icon: 'pi pi-play-circle' },
  me_gusta: { label: 'Me gusta', icon: 'pi pi-heart' },
}

const toggling = ref<string | null>(null)

const toggleFlag = async (juego: ItemLista, flag: (typeof flags)[number]) => {
  if (!userStore.user) return
  toggling.value = `${juego.id}-${flag}`
  const update: UpdateJuegoRequest = { [flag]: !juego[flag] }
  try {
    const updated = await actualizarJuegoUsuario(userStore.user.id, juego.id, update)
    const idx = lista.value.findIndex((j) => j.id === juego.id)
    if (idx !== -1) lista.value[idx] = updated
  } catch {
    toast.error({ text: 'Error al actualizar el flag' })
  } finally {
    toggling.value = null
  }
}

const showConfirm = ref(false)
const juegoAEliminar = ref<ItemLista | null>(null)
const eliminando = ref(false)

const confirmarEliminar = (juego: ItemLista) => {
  juegoAEliminar.value = juego
  showConfirm.value = true
}

const eliminar = async () => {
  if (!juegoAEliminar.value || !userStore.user) return
  eliminando.value = true
  try {
    await eliminarJuegoUsuario(userStore.user.id, juegoAEliminar.value.id)
    lista.value = lista.value.filter((j) => j.id !== juegoAEliminar.value!.id)
    toast.success({ text: `"${juegoAEliminar.value.nombre}" eliminado de tu lista` })
    showConfirm.value = false
  } catch {
    toast.error({ text: 'Error al eliminar el juego' })
  } finally {
    eliminando.value = false
    juegoAEliminar.value = null
  }
}

const hayJuegos = computed(() => lista.value.length > 0)
</script>

<template>
  <div class="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-black dark:text-white">Mi lista</h1>
        <p class="text-zinc-500 dark:text-zinc-400 mt-1">
          {{ lista.length }} juego{{ lista.length !== 1 ? 's' : '' }} en tu colección.
        </p>
      </div>
      <jBtn label="Actualizar" icon="refresh" variant="secondary" @click="fetchLista" />
    </header>

    <div v-if="loading" class="flex justify-center py-10">
      <jSpinner />
    </div>

    <jAlert v-else-if="error" variant="error">{{ error }}</jAlert>

    <div v-else-if="!hayJuegos" class="text-center py-16 space-y-3">
      <p class="text-zinc-400 dark:text-zinc-500 text-lg">Tu lista está vacía.</p>
      <router-link to="/catalogo">
        <jBtn label="Ir al catálogo" icon="search" />
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div
        v-for="juego in lista"
        :key="juego.id"
        class="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-4"
      >
        <!-- Header -->
        <div class="flex items-start justify-between gap-3">
          <div class="space-y-1 flex-1">
            <h3 class="font-semibold text-black dark:text-white leading-tight">
              {{ juego.nombre }}
            </h3>
            <div class="flex flex-wrap gap-3 text-xs text-zinc-400 dark:text-zinc-500">
              <span v-if="juego.genero" class="flex items-center gap-1">
                <i class="pi pi-tag text-[11px]" />
                {{ juego.genero }}
              </span>
              <span v-if="juego.plataforma" class="flex items-center gap-1">
                <i class="pi pi-desktop text-[11px]" />
                {{ juego.plataforma }}
              </span>
            </div>
          </div>
          <button
            @click="confirmarEliminar(juego)"
            class="text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition"
            title="Eliminar"
          >
            <i class="pi pi-trash text-lg" />
          </button>
        </div>

        <p v-if="juego.descripcion" class="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {{ juego.descripcion }}
        </p>

        <!-- Flags -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="flag in flags"
            :key="flag"
            @click="toggleFlag(juego, flag)"
            :disabled="toggling === `${juego.id}-${flag}`"
            :class="[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition',
              juego[flag]
                ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                : 'bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-400',
            ]"
          >
            <i :class="[flagMeta[flag].icon, 'text-[11px]']" />
            {{ flagMeta[flag].label }}
          </button>
        </div>

        <!-- Fecha -->
        <p class="text-xs text-zinc-400 dark:text-zinc-600 flex items-center gap-1">
          <i class="pi pi-calendar text-[11px]" />
          Agregado
          {{
            new Date(juego.fecha_agregado).toLocaleDateString('es-AR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          }}
        </p>
      </div>
    </div>

    <!-- Modal confirmación eliminar -->
    <jModal v-model="showConfirm" title="Eliminar juego">
      <div class="space-y-4">
        <p class="text-sm text-zinc-600 dark:text-zinc-400">
          ¿Confirmás eliminar
          <span class="font-semibold text-black dark:text-white">{{ juegoAEliminar?.nombre }}</span>
          de tu lista?
        </p>
        <div class="flex gap-3">
          <jBtn label="Eliminar" @click="eliminar" :disabled="eliminando" />
          <jBtn label="Cancelar" variant="secondary" @click="showConfirm = false" />
        </div>
      </div>
    </jModal>
  </div>
</template>

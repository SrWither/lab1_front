<script setup lang="ts">
import { ref } from 'vue'
import { UserStore } from '@/stores/user'
import { listarJuegos, agregarJuegoUsuario } from '@/api/juegos'
import type { Juego, AddJuegoRequest } from '@/api/types'
import toastStore from '@/stores/toast'
import jBtn from '@/components/jBtn.vue'
import jInput from '@/components/jInput.vue'
import jSelect from '@/components/jSelect.vue'
import jSpinner from '@/components/jSpinner.vue'
import jAlert from '@/components/jAlert.vue'
import jModal from '@/components/jModal.vue'

const userStore = UserStore()
const toast = toastStore()

const query = ref('')
const fuente = ref<'local' | 'wikidata'>('local')
const juegos = ref<Juego[]>([])
const loading = ref(false)
const error = ref('')
const buscado = ref(false)

const fuenteOpciones = [
  { label: 'Catálogo local', value: 'local' },
  { label: 'Wikidata', value: 'wikidata' },
]

const buscar = async () => {
  loading.value = true
  error.value = ''
  juegos.value = []
  buscado.value = false
  try {
    juegos.value = await listarJuegos({
      q: query.value || undefined,
      fuente: fuente.value,
    })
  } catch {
    error.value = 'Error al buscar juegos. Intentá de nuevo.'
  } finally {
    loading.value = false
    buscado.value = true
  }
}

// Modal agregar por ID manual
const showModalManual = ref(false)
const idManual = ref('')
const agregandoManual = ref(false)

const agregarPorId = async () => {
  if (!idManual.value.trim() || !userStore.user) return
  agregandoManual.value = true
  try {
    const payload: AddJuegoRequest = {
      juego_id: idManual.value.trim(),
      tengo: false,
      quiero: true,
      jugado: false,
      me_gusta: false,
    }
    await agregarJuegoUsuario(userStore.user.id, payload)
    toast.success({ text: `Juego ${idManual.value} agregado a tu lista` })
    idManual.value = ''
    showModalManual.value = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    toast.error({ text: e?.error ?? 'No se pudo agregar el juego' })
  } finally {
    agregandoManual.value = false
  }
}

// Agregar desde resultado
const agregando = ref<string | null>(null)

const agregarJuego = async (juego: Juego) => {
  if (!userStore.user) return
  agregando.value = juego.id
  try {
    const payload: AddJuegoRequest = {
      juego_id: juego.id,
      tengo: false,
      quiero: true,
      jugado: false,
      me_gusta: false,
    }
    await agregarJuegoUsuario(userStore.user.id, payload)
    toast.success({ text: `"${juego.nombre}" agregado a tu lista` })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const msg = e?.status === 409 ? 'Ya está en tu lista' : (e?.error ?? 'Error al agregar')
    toast.error({ text: msg })
  } finally {
    agregando.value = null
  }
}
</script>

<template>
  <div class="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-black dark:text-white">Catálogo</h1>
        <p class="text-zinc-500 dark:text-zinc-400 mt-1">Buscá y agregá juegos a tu lista.</p>
      </div>
      <jBtn label="Agregar por ID" icon="add" variant="secondary" @click="showModalManual = true" />
    </header>

    <!-- Buscador -->
    <div class="flex gap-3 flex-wrap items-end">
      <div class="flex-1 min-w-48">
        <jInput v-model="query" label="Buscar juego" @keyup.enter="buscar" />
      </div>
      <div class="w-48">
        <jSelect v-model="fuente" :options="fuenteOpciones" label="Fuente" />
      </div>
      <jBtn label="Buscar" icon="search" @click="buscar" />
    </div>

    <!-- Estados -->
    <div v-if="loading" class="flex justify-center py-10">
      <jSpinner />
    </div>

    <jAlert v-else-if="error" variant="error">{{ error }}</jAlert>

    <p
      v-else-if="juegos.length === 0 && buscado"
      class="text-zinc-500 dark:text-zinc-400 text-center py-10"
    >
      No se encontraron resultados para "{{ query }}".
    </p>

    <!-- Resultados -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="juego in juegos"
        :key="juego.id"
        class="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-3"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="space-y-1 flex-1">
            <h3 class="font-semibold text-black dark:text-white leading-tight">
              {{ juego.nombre }}
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 font-mono">{{ juego.id }}</p>
          </div>
          <jBtn
            icon="add"
            variant="secondary"
            @click="agregarJuego(juego)"
            :disabled="agregando === juego.id"
          />
        </div>

        <p v-if="juego.descripcion" class="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {{ juego.descripcion }}
        </p>

        <div class="flex flex-wrap gap-3 text-xs text-zinc-400 dark:text-zinc-500">
          <span v-if="juego.genero" class="flex items-center gap-1">
            <i class="pi pi-tag text-[11px]" />
            {{ juego.genero }}
          </span>
          <span v-if="juego.plataforma" class="flex items-center gap-1">
            <i class="pi pi-desktop text-[11px]" />
            {{ juego.plataforma }}
          </span>
          <span v-if="juego.lanzamiento" class="flex items-center gap-1">
            <i class="pi pi-calendar text-[11px]" />
            {{ juego.lanzamiento }}
          </span>
        </div>
      </div>
    </div>

    <!-- Modal ID manual -->
    <jModal v-model="showModalManual" title="Agregar juego por ID">
      <div class="space-y-4">
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Ingresá el Q-id de Wikidata del juego (ej: <span class="font-mono">Q12395</span>).
        </p>
        <jInput v-model="idManual" label="ID del juego" />
        <jBtn
          label="Agregar"
          icon="add"
          @click="agregarPorId"
          :disabled="agregandoManual || !idManual.trim()"
        />
      </div>
    </jModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UserStore } from '@/stores/user'
import { sugerirJuego, listarJuegosUsuario } from '@/api/juegos'
import type { SugerenciaRespuesta, ItemLista } from '@/api/types'
import jBtn from '@/components/jBtn.vue'
import jSpinner from '@/components/jSpinner.vue'
import jAlert from '@/components/jAlert.vue'

const userStore = UserStore()

const sugerencia = ref<SugerenciaRespuesta | null>(null)
const loadingSugerencia = ref(false)
const errorSugerencia = ref('')

const resumen = ref({ total: 0, tengo: 0, jugado: 0, me_gusta: 0 })
const loadingResumen = ref(true)

const fetchResumen = async () => {
  if (!userStore.user) return
  try {
    const lista: ItemLista[] = await listarJuegosUsuario(userStore.user.id)
    resumen.value = {
      total: lista.length,
      tengo: lista.filter((j) => j.tengo).length,
      jugado: lista.filter((j) => j.jugado).length,
      me_gusta: lista.filter((j) => j.me_gusta).length,
    }
  } catch {
    // silencioso, no crítico
  } finally {
    loadingResumen.value = false
  }
}

const fetchSugerencia = async () => {
  if (!userStore.user) return
  loadingSugerencia.value = true
  errorSugerencia.value = ''
  sugerencia.value = null
  try {
    console.log('Solicitando sugerencia para usuario', userStore.user.id)
    sugerencia.value = await sugerirJuego(userStore.user.id)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    errorSugerencia.value = e?.error ?? 'No hay juegos en tu lista para sugerir.'
  } finally {
    loadingSugerencia.value = false
  }
}

onMounted(() => {
  fetchResumen()
})
</script>

<template>
  <div class="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
    <!-- Bienvenida -->
    <header>
      <h1 class="text-3xl font-bold text-black dark:text-white flex items-center gap-2">
        <i class="pi pi-user" />
        Bienvenido, {{ userStore.user?.nombre }}
      </h1>
      <p class="text-zinc-500 dark:text-zinc-400 mt-1">Tu centro de juegos personal.</p>
    </header>

    <!-- Resumen stats -->
    <section>
      <h2 class="text-lg font-semibold text-black dark:text-white mb-4">Tu colección</h2>
      <div v-if="loadingResumen" class="flex justify-center py-6">
        <jSpinner />
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="stat in [
            { label: 'Total en lista', value: resumen.total, icon: 'pi pi-list' },
            { label: 'Tengo', value: resumen.tengo, icon: 'pi pi-box' },
            { label: 'Jugado', value: resumen.jugado, icon: 'pi pi-play-circle' },
            { label: 'Me gusta', value: resumen.me_gusta, icon: 'pi pi-heart' },
          ]"
          :key="stat.label"
          class="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col gap-1 shadow-sm"
        >
          <i :class="[stat.icon, 'text-2xl text-zinc-400 dark:text-zinc-500']" />
          <span class="text-3xl font-bold text-black dark:text-white">{{ stat.value }}</span>
          <span class="text-sm text-zinc-500 dark:text-zinc-400">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- Sugerencia del día -->
    <section
      class="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-4"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-black dark:text-white flex items-center gap-2">
          <i class="pi pi-sparkles" />
          Sugerencia aleatoria
        </h2>

        <jBtn
          label="Sugerirme uno"
          icon="shuffle"
          @click="fetchSugerencia"
          :disabled="loadingSugerencia"
        />
      </div>

      <div v-if="loadingSugerencia" class="flex justify-center py-4">
        <jSpinner />
      </div>

      <jAlert v-else-if="errorSugerencia" variant="error">{{ errorSugerencia }}</jAlert>

      <div v-else-if="sugerencia" class="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-4 space-y-2">
        <h3 class="text-xl font-bold text-black dark:text-white">{{ sugerencia.nombre }}</h3>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ sugerencia.descripcion }}</p>
        <div class="flex gap-4 text-xs text-zinc-400 dark:text-zinc-500 pt-1">
          <span v-if="sugerencia.genero" class="flex items-center gap-1">
            <i class="pi pi-tag text-[11px]" /> {{ sugerencia.genero }}
          </span>
          <span v-if="sugerencia.plataforma" class="flex items-center gap-1">
            <i class="pi pi-desktop text-[11px]" /> {{ sugerencia.plataforma }}
          </span>
          <span v-if="sugerencia.lanzamiento" class="flex items-center gap-1">
            <i class="pi pi-calendar text-[11px]" /> {{ sugerencia.lanzamiento }}
          </span>
        </div>
      </div>

      <p v-else class="text-sm text-zinc-400 dark:text-zinc-500">
        Presioná el botón para que te sugiramos un juego de tu lista.
      </p>
    </section>

    <!-- Links rápidos -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <router-link
        to="/catalogo"
        class="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-600 transition group"
      >
        <span
          class="material-icons text-3xl text-zinc-400 group-hover:text-black dark:group-hover:text-white transition"
          >search</span
        >
        <h3 class="text-lg font-semibold text-black dark:text-white mt-2">Explorar catálogo</h3>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Buscá juegos en Wikidata y agregálos a tu lista.
        </p>
      </router-link>

      <router-link
        to="/mi-lista"
        class="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-600 transition group"
      >
        <span
          class="material-icons text-3xl text-zinc-400 group-hover:text-black dark:group-hover:text-white transition"
          >format_list_bulleted</span
        >
        <h3 class="text-lg font-semibold text-black dark:text-white mt-2">Mi lista</h3>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Gestioná tus juegos con flags y estados.
        </p>
      </router-link>
    </section>
  </div>
</template>

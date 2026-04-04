<template>
  <div class="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
    <header class="mb-10">
      <h1 class="text-3xl font-bold tracking-tight dark:text-white text-dark">Componentes</h1>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
      <section
        class="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
      >
        <h2
          class="text-lg font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2 text-dark dark:text-white"
        >
          Buttons
        </h2>
        <div class="flex gap-3 flex-wrap">
          <jBtn label="Primary" icon="rocket_launch" />
          <jBtn label="Secondary" variant="secondary" icon="info" />
          <jBtn label="Tertiary" variant="tertiary" />
          <jBtn icon="arrow_forward" iconPosition="right" />
        </div>
      </section>

      <section
        class="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
      >
        <h2
          class="text-lg font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2 text-dark dark:text-white"
        >
          Inputs
        </h2>
        <div class="space-y-4 w-full">
          <jInput v-model="text" label="Texto" />
          <jInput v-model="email" label="Email" type="email" />
          <jInput v-model="password" label="Password" type="password" />
        </div>
      </section>

      <section
        class="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
      >
        <h2
          class="text-lg font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2 text-dark dark:text-white"
        >
          Selects
        </h2>
        <div class="space-y-6 w-full">
          <jSelect v-model="selected" :options="options" label="Seleccionar" />
          <jMultiSelect v-model="multi" :options="options" label="Seleccionar múltiples" />
        </div>
      </section>

      <section
        class="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
      >
        <h2
          class="text-lg font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2 text-dark dark:text-white"
        >
          Alerts
        </h2>
        <div class="space-y-3 w-full">
          <jAlert variant="info">Información general</jAlert>
          <jAlert variant="success">Operación exitosa</jAlert>
          <jAlert variant="error">Algo salió mal</jAlert>
        </div>
      </section>

      <section
        class="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
      >
        <h2
          class="text-lg font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2 text-dark dark:text-white"
        >
          Feedback & Overlays
        </h2>

        <div class="space-y-6">
          <div>
            <h3 class="text-sm text-zinc-500 mb-3">Spinner</h3>
            <jSpinner />
          </div>

          <div>
            <h3 class="text-sm text-zinc-500 mb-3">Modal</h3>
            <jBtn label="Abrir Modal" @click="showModal = true" />
          </div>
        </div>
      </section>

      <section
        class="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
      >
        <h2
          class="text-lg font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2 text-dark dark:text-white"
        >
          Simple Card
        </h2>
        <div class="w-full">
          <jSimpleCard>
            <h3 class="text-lg font-medium">Componente SimpleCard</h3>
            <p class="text-sm opacity-70">Solo un contenedor con estilos básicos.</p>
          </jSimpleCard>
        </div>
      </section>

      <section
        class="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6 lg:col-span-2"
      >
        <h2
          class="text-lg font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2 text-dark dark:text-white"
        >
          Complex Card
        </h2>
        <div class="max-w-sm">
          <jCard
            title="Componente Card"
            subtitle="Minimalista y reutilizable"
            image="https://picsum.photos/400/200"
            actionLabel="Ver más"
            actionIcon="arrow_forward"
            @action="handleClick"
          >
            Este es un contenido adicional dentro de la card.
          </jCard>
        </div>
      </section>

      <section
        class="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6 lg:col-span-3"
      >
        <h2
          class="text-lg font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2 text-dark dark:text-white"
        >
          Toaster
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- TOP -->
          <div class="space-y-3">
            <h3 class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Top positions</h3>

            <div class="grid grid-cols-3 gap-3">
              <jBtn
                label="Top Left"
                @click="toast.success({ text: 'Top Left', position: 'top-left', timeout: 3000 })"
              />
              <jBtn
                label="Top Center"
                @click="toast.info({ text: 'Top Center', position: 'top-center', timeout: 3000 })"
              />
              <jBtn
                label="Top Right"
                @click="toast.warning({ text: 'Top Right', position: 'top-right', timeout: 3000 })"
              />
            </div>
          </div>

          <!-- BOTTOM -->
          <div class="space-y-3">
            <h3 class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Bottom positions</h3>

            <div class="grid grid-cols-3 gap-3">
              <jBtn
                label="Bottom Left"
                @click="
                  toast.success({ text: 'Bottom Left', position: 'bottom-left', timeout: 3000 })
                "
              />
              <jBtn
                label="Bottom Center"
                @click="
                  toast.info({ text: 'Bottom Center', position: 'bottom-center', timeout: 3000 })
                "
              />
              <jBtn
                label="Bottom Right"
                @click="
                  toast.error({ text: 'Bottom Right', position: 'bottom-right', timeout: 3000 })
                "
              />
            </div>
          </div>
        </div>

        <!-- Extras -->
        <div class="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <h3 class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Variants</h3>

          <div class="flex flex-wrap gap-3">
            <jBtn label="Success" @click="toast.success({ text: '¡Operación exitosa!' })" />
            <jBtn
              label="Error"
              variant="secondary"
              @click="toast.error({ text: 'Algo salió mal...' })"
            />
            <jBtn
              label="Info"
              variant="tertiary"
              @click="toast.info({ text: 'Información importante' })"
            />
            <jBtn
              label="Warning"
              variant="tertiary"
              @click="toast.warning({ text: 'Cuidado con esto' })"
            />
          </div>
        </div>
      </section>
    </div>

    <jModal v-model="showModal" title="Ejemplo Modal"> Este es un modal reutilizable 👀 </jModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import jBtn from '@/components/jBtn.vue'
import jCard from '@/components/jCard.vue'
import jAlert from '@/components/jAlert.vue'
import jInput from '@/components/jInput.vue'
import jSelect from '@/components/jSelect.vue'
import jMultiSelect from '@/components/jMultiSelect.vue'
import jSpinner from '@/components/jSpinner.vue'
import jModal from '@/components/jModal.vue'
import jSimpleCard from '@/components/jSimpleCard.vue'
import toastStore from '@/stores/toast'

const toast = toastStore()

const handleClick = () => {
  alert('¡Acción de la card!')
}

// Inputs
const text = ref('')
const email = ref('')
const password = ref('')

// Select
const selected = ref('')

// MultiSelect
const multi = ref<string[]>([])

const options = [
  { label: 'Opción 1', value: '1' },
  { label: 'Opción 2', value: '2' },
  { label: 'Opción 3', value: '3' },
]

// Modal
const showModal = ref(false)
</script>

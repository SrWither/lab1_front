<template>
  <div
    class="rounded-2xl overflow-hidden bg-black text-white dark:bg-white dark:text-black transition-all duration-200 ease-out hover:shadow-lg"
  >
    <!-- Imagen -->
    <img v-if="image" :src="image" alt="card image" class="w-full h-48 object-cover" />

    <!-- Contenido -->
    <div class="p-4 flex flex-col gap-2">
      <!-- Title -->
      <h3 class="text-lg font-medium">
        {{ title }}
      </h3>

      <!-- Subtitle -->
      <p v-if="subtitle" class="text-sm opacity-70">
        {{ subtitle }}
      </p>

      <!-- Slot -->
      <div v-if="$slots.default" class="text-sm opacity-80">
        <slot />
      </div>

      <!-- Acción -->
      <div v-if="actionLabel" class="mt-2">
        <jButton
          :label="actionLabel"
          :icon="actionIcon"
          :variant="actionVariant"
          rounded
          @click="$emit('action')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import jButton from './jBtn.vue'

type Props = {
  title: string
  subtitle?: string
  image?: string
  actionLabel?: string
  actionIcon?: string
  actionVariant?: 'primary' | 'secondary' | 'tertiary'
}

withDefaults(defineProps<Props>(), {
  actionVariant: 'primary',
})

defineEmits(['action'])
</script>

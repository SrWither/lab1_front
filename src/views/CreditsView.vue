<!-- views/CreditsView.vue -->
<script setup lang="ts">
const integrantes = [
  { nombre: 'Fadel Jachuf', rol: 'Backend/Frontend' },
  { nombre: 'Maximiliano Acosta', rol: 'Backend' },
  { nombre: 'Maximo Quiñones', rol: 'Backend' },
  { nombre: 'Lucas Tejerina', rol: 'Backend' },
]
</script>

<template>
  <div class="p-6 md:p-10 max-w-3xl mx-auto space-y-12">
    <!-- Header -->
    <header class="text-center space-y-3">
      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 rounded-full bg-black dark:bg-white flex items-center justify-center">
          <i class="pi pi-star text-2xl text-white dark:text-black" />
        </div>
      </div>
      <h1 class="text-4xl font-bold text-black dark:text-white">Créditos</h1>
      <p class="text-zinc-500 dark:text-zinc-400">
        El equipo detrás del Recomendador de Videojuegos.
      </p>
    </header>

    <!-- Cards integrantes -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div
        v-for="(integrante, i) in integrantes"
        :key="i"
        class="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm flex items-center gap-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition group"
      >
        <div
          class="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-black dark:group-hover:bg-white flex items-center justify-center shrink-0 transition"
        >
          <i
            class="pi pi-user text-xl text-zinc-400 dark:text-zinc-500 group-hover:text-white dark:group-hover:text-black transition"
          />
        </div>
        <div class="space-y-0.5">
          <p class="font-semibold text-black dark:text-white">{{ integrante.nombre }}</p>
          <p class="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
            <i class="pi pi-briefcase text-[10px]" />
            {{ integrante.rol }}
          </p>
        </div>
      </div>
    </div>

    <!-- Separador + info curso -->
    <div
      class="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-4"
    >
      <div class="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <i class="pi pi-info-circle text-zinc-400" />
        <h2 class="text-base font-semibold text-black dark:text-white">Sobre el proyecto</h2>
      </div>
      <div class="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
        <p class="flex items-center gap-2">
          <i class="pi pi-book text-zinc-300 dark:text-zinc-600" />
          Laboratorio 2026 — Redes y Sistemas Distribuidos
        </p>
        <p class="flex items-center gap-2">
          <i class="pi pi-server text-zinc-300 dark:text-zinc-600" />
          Backend: Flask + Python
        </p>
        <p class="flex items-center gap-2">
          <i class="pi pi-desktop text-zinc-300 dark:text-zinc-600" />
          Frontend: Vue 3 + TypeScript + Tailwind
        </p>
        <p class="flex items-center gap-2">
          <i class="pi pi-database text-zinc-300 dark:text-zinc-600" />
          Datos: Wikidata
        </p>
      </div>
    </div>
  </div>
</template>

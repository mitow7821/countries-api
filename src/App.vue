<template>
  <router-view v-slot="{ Component }">
    <Suspense timeout="0">
      <component :is="Component" />
      <template #fallback>Loading...</template>
    </Suspense>
  </router-view>
</template>

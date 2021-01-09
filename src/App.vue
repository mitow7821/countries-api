<template>
  <div class="font-custom flex flex-col min-h-screen">
    <Nav />
    <router-view v-slot="{ Component }">
      <Suspense timeout="0">
        <component :is="Component" />
        <template #fallback>
          <div
            class="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-2xl"
          >
            Loading ...
          </div>
        </template>
      </Suspense>
    </router-view>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
export default {
  components: {
    Nav,
  },
};
</script>

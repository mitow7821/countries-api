<template>
  <div class="py-5 shadow relative dark:bg-dark2 dark:text-light text-dark">
    <div class="flex items-center justify-between w-11/12 mx-auto">
      <h1 class="text-xl font-extrabold">Where in the world?</h1>
      <div @click="toggleDarkMode" class="flex cursor-pointer items-center">
        <ion-icon name="moon-outline" v-if="visible"></ion-icon>
        <ion-icon name="moon" v-if="!visible"></ion-icon>
        <p class="font-semibold ml-2">Dark Mode</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const data = reactive({
      visible: true,
    });
    function toggleDarkMode() {
      data.visible = !data.visible;
      document.querySelector("html").classList.toggle("dark");
    }
    return {
      toggleDarkMode,
      ...toRefs(data),
    };
  },
};
</script>

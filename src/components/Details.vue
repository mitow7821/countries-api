<template>
  <div>{{ id }}</div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const idParam = route.fullPath.split("/")[1];
    const data = reactive({ id: idParam });
    return {
      ...toRefs(data),
    };
  },
};
</script>

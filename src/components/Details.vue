<template>
  <pre>{{ country }}</pre>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
export default {
  //
  async setup() {
    const route = useRoute();
    const idParam = route.fullPath.split("/")[1];
    const state = reactive({ id: idParam, country: null });

    state.country = await fetch(
      `https://restcountries.eu/rest/v2/name/${state.id}?fields=name;nativeName;population;region;subRegion;capital;topLevelDomain;currencies;language;borders`
    )
      .then((response) => response.json())
      .then((data) => data);

    return {
      ...toRefs(state),
    };
  },
};
</script>

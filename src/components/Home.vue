<template>
  <div>
    <div v-for="(item, id) in countries" :key="id">
      <router-link :to="'/' + id">
        {{ item.countries }}
      </router-link>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";

export default {
  async setup() {
    const state = reactive({ countries: null });
    const url =
      "https://restcountries.eu/rest/v2/all?fields=name;nativeName;population;region;subRegion;capital;topLevelDomain;currencies;language;borderCountries";
    state.countries = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);
    return toRefs(state);
  },
};
</script>

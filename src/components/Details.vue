<template>
  <div>
    <router-link to="/">Back</router-link>
    <router-link
      :to="'/' + item"
      v-for="(item, index) in translatedBorders"
      :key="index"
    >
      <p>{{ item }}</p>
    </router-link>
    <img :src="country[0].flag" />
    <pre>{{ country }}</pre>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onUpdated, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  async setup() {
    const route = useRoute();

    const state = reactive({
      id: computed(() => route.fullPath.split("/")[1]),
      country: null,
      countries: null,
      translatedBorders: [],
      borders: computed(() => translateBorders()),
    });

    //Border countries shortcuts convertion into full names
    function translateBorders() {
      state.translatedBorders = [];
      state.country[0].borders.forEach((border) => {
        state.countries.forEach((country) => {
          if (country.flag.toLowerCase().includes(border.toLowerCase())) {
            state.translatedBorders.push(country.name);
          }
        });
      });
    }

    //Helper data for border countries translation
    state.countries = await fetch(
      `https://restcountries.eu/rest/v2/all?fields=name;flag`
    )
      .then((response) => response.json())
      .then((data) => {
        data.forEach((el) => {
          el.flag = el.flag
            .split("https://restcountries.eu/data/")[1]
            .split(".")[0];
        });
        return data;
      });

    //Fetch detailed data for selected country
    state.country = await fetch(
      `https://restcountries.eu/rest/v2/name/${state.id}?fields=flag;name;nativeName;population;region;subRegion;capital;topLevelDomain;currencies;languages;borders`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 1) {
          data.forEach((el) => {
            if (el.name.toLowerCase() === state.id.toLowerCase()) {
              data = Array(el);
            }
          });
        }
        return data;
      });

    //Change country with border buttons
    function changeCountry(route) {
      fetch(
        `https://restcountries.eu/rest/v2/name/${route}?fields=flag;name;nativeName;population;region;subRegion;capital;topLevelDomain;currencies;languages;borders`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 1) {
            data.forEach((el) => {
              if (el.name.toLowerCase() === state.id.toLowerCase()) {
                data = Array(el);
              }
            });
          }
          state.country = data;
          translateBorders();
        });
    }

    //Watch for url changes
    watch(
      () => state.id,
      () => {
        state.id ? changeCountry(state.id) : null;
      }
    );

    //
    //
    //
    return {
      ...toRefs(state),
      changeCountry,
    };
  },
};
</script>

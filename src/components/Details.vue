<template>
  <div class="flex-grow bg-gray-50">
    <div class="w-11/12 mx-auto px-5 xl:px-0">
      <router-link
        to="/"
        class="flex items-center justify-center w-32 bg-white my-12 py-1 gap-2 shadow border rounded"
      >
        <ion-icon name="arrow-back"></ion-icon>
        <p class="pr-2 mt-0.5 font-semibold">Back</p></router-link
      >
      <div class="flex items-center flex-col xl:flex-row">
        <div class="lg:h-92 xl:w-1/2 self-start">
          <img
            :src="country[0].flag"
            class="h-full w-full xl:w-5/6 object-cover shadow-md mx-auto xl:mx-0"
          />
        </div>
        <div class="xl:w-1/2 mt-12 xl:mt-6 self-start pl-2 xl:pl-0">
          <h1 class="text-3xl font-extrabold pb-8">{{ country[0].name }}</h1>
          <div class="flex flex-col xl:flex-row gap-8 xl:gap-32">
            <div>
              <div class="pb-3">
                <span class="font-semibold">Native Name: </span>
                <span>{{ country[0].nativeName || "Unknown" }}</span>
              </div>
              <div class="pb-3">
                <span class="font-semibold">Population: </span>
                <span>{{
                  country[0].population.toLocaleString() || "Unknown"
                }}</span>
              </div>
              <div class="pb-3">
                <span class="font-semibold">Region: </span>
                <span>{{ country[0].region || "Unknown" }}</span>
              </div>
              <div class="pb-3">
                <span class="font-semibold">Sub Region: </span>
                <span>{{ country[0].subregion || "Unknown" }}</span>
              </div>
              <div class="pb-3">
                <span class="font-semibold">Capital: </span>
                <span>{{ country[0].capital || "Unknown" }}</span>
              </div>
            </div>
            <div>
              <div class="pb-3">
                <span class="font-semibold">Top Level Domain: </span>
                <span>{{ country[0].topLevelDomain[0] || "Unknown" }}</span>
              </div>
              <div class="pb-3">
                <span class="font-semibold">Currencies: </span>
                <span>{{ country[0].currencies[0].name || "Unknown" }}</span>
              </div>
              <div class="pb-3">
                <span class="font-semibold">Languages: </span>
                <span>{{ languages || "Unknown" }} </span>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col xl:flex-row items-center mt-8 mb-16"
            v-show="translatedBorders.length"
          >
            <span class="font-semibold mr-10 mb-6 self-start whitespace-nowrap"
              >Border Countries:
            </span>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 items-strech">
              <router-link
                :to="'/' + item"
                v-for="(item, index) in translatedBorders"
                :key="index"
                class="mr-2"
              >
                <p
                  class="py-1.5 xl:py-1 sm:px-3 h-full bg-white shadow-sm border rounded text-center"
                >
                  {{ item }}
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      translatedBorders: null,
      borders: computed(() => translateBorders()),
      languages: computed(() => getLanguages()),
    });

    //Convert languages object to nice looking visual string
    function getLanguages() {
      let langs = "";
      state.country[0].languages.forEach((lang, id) => {
        if (state.country[0].languages.length - 1 != id) {
          langs += lang.name + ", ";
        } else {
          langs += lang.name;
        }
      });
      return langs;
    }

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
      `https://restcountries.eu/rest/v2/name/${state.id}?fields=flag;name;nativeName;population;region;subregion;capital;topLevelDomain;currencies;languages;borders`
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
        `https://restcountries.eu/rest/v2/name/${route}?fields=flag;name;nativeName;population;region;subregion;capital;topLevelDomain;currencies;languages;borders`
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

<template>
  <div class="bg-gray-50 flex-grow">
    <div class="w-11/12 mx-auto">
      <div class="flex justify-between flex-col sm:flex-row gap-6 py-8">
        <div
          class="flex items-center bg-white w-100 sm:w-1/2 lg:w-1/3 shadow-sm border rounded"
        >
          <ion-icon name="search" class="px-4 text-gray-400"></ion-icon>
          <input
            type="text"
            v-model="searchValue"
            placeholder="Search for a country ..."
            class="outline-none py-3 w-full pr-5 text-sm rounded"
          />
        </div>

        <select
          v-model="selectValue"
          class="shadow-sm border outline-none w-1/2 sm:w-28 px-1 rounded py-2 sm:py-auto"
        >
          <option value="All" selected>All</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-x-16 gap-y-14"
      >
        <router-link
          v-for="(item, id) in presentedCountries"
          :key="id"
          :to="'/' + item.name"
        >
          <div class="bg-white shadow-md rounded-md">
            <div class="h-48">
              <img
                :src="item.flag"
                alt=""
                class="min-w-full h-full object-cover rounded-t-md"
              />
            </div>
            <div class="h-52 pt-6 pl-7">
              <h1 class="font-extrabold text-lg pb-4">{{ item.name }}</h1>
              <div class="pb-1">
                <span class="font-semibold">Population: </span>
                <span>{{ item.population.toLocaleString() || "Unknown" }}</span>
              </div>
              <div class="pb-1">
                <span class="font-semibold">Region: </span>
                <span>{{ item.region || "Unknown" }}</span>
              </div>
              <div>
                <span class="font-semibold">Capital: </span>
                <span>{{ item.capital || "Unknown" }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { watch, reactive, toRefs } from "vue";

export default {
  async setup() {
    const state = reactive({
      presentedCountries: null,
      allCountries: null,
      searchValue: "",
      searchedCountries: null,
      selectValue: "All",
      selectedCountries: null,
    });

    //Search by country name
    watch(
      () => state.searchValue,
      () => {
        if (state.selectValue == "All") {
          if (state.searchValue == "") {
            state.searchedCountries = state.allCountries;
          } else {
            state.searchedCountries = state.allCountries.filter(({ name }) => {
              return name
                .toLowerCase()
                .includes(state.searchValue.toLowerCase());
            });
          }
          state.presentedCountries = state.searchedCountries;
        } else {
          if (state.searchValue == "") {
            state.searchedCountries = state.allCountries.filter(
              ({ region }) => {
                return region.includes(state.selectValue);
              }
            );
          } else {
            state.searchedCountries = state.selectedCountries.filter(
              ({ name }) => {
                return name
                  .toLowerCase()
                  .includes(state.searchValue.toLowerCase());
              }
            );
          }
          state.presentedCountries = state.searchedCountries;
        }
      }
    );

    //Filter by region
    watch(
      () => state.selectValue,
      () => {
        state.searchValue = "";
        if (state.selectValue == "All") {
          state.selectedCountries = state.allCountries;
        } else {
          state.selectedCountries = state.allCountries.filter(({ region }) => {
            return region.includes(state.selectValue);
          });
        }
        state.presentedCountries = state.selectedCountries;
      }
    );

    //Fetch countries data
    state.allCountries = await fetch(
      "https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital"
    )
      .then((response) => response.json())
      .then((data) => data);
    state.presentedCountries = state.allCountries;

    //
    //
    //
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style>
a {
  display: block;
}
</style>

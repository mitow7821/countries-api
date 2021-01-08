<template>
  <div>
    <input type="text" v-model="searchValue" />
    <select v-model="selectValue">
      <option value="All" selected>All</option>
      <option value="Europe">Europe</option>
      <option value="Africa">Africa</option>
      <option value="Asia">Asia</option>
    </select>
    <div>
      <router-link
        v-for="(item, id) in presentedCountries"
        :key="id"
        :to="'/' + item.name"
      >
        {{ item.name }}
      </router-link>
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
            state.searchedCountries = state.presentedCountries;
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

<template>
  <div class="settings-container">
    <MWidgetHeader
      title="Settings"
      action-img="https://api.iconify.design/heroicons-outline:x.svg"
      @click="$router.push({ name: Route.Home })"
    />
    <draggable
      v-model="cities"
      class="cities-container"
      group="people"
      @start="drag = true"
      @end="drag = false"
      @change="handleOrderChange"
    >
      <template #item="{ element }">
        <div class="data-row">
          <div class="wrapper">
            <img
              class="burger"
              width="20"
              height="20"
              src="https://api.iconify.design/mdi-light:format-line-spacing.svg"
            />
            <span class="title">
              {{ setWhiteSpaceBeforeCountry(element.name) }}
            </span>
          </div>
          <img
            src="https://api.iconify.design/mdi-light:delete.svg"
            @click="deleteItem(element.name)"
          />
        </div>
      </template>
    </draggable>
    <div class="search-input">
      <h1 class="title">Add location:</h1>
      <div class="input-wrapper">
        <input
          v-model="cityQuery"
          class="input"
          list="cityname"
          @keydown.enter="addItem"
          @input="debounceSuggestedCities"
        />
        <datalist id="cityname">
          <option
            v-for="(country, index) in suggestedCities"
            :key="index"
            :value="`${setWhiteSpaceBeforeCountry(country.name)}`"
          ></option>
        </datalist>
        <img
          class="enter"
          src="https://api.iconify.design/ion:add.svg"
          width="30"
          height="30"
          @click="addItem"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import draggable from "vuedraggable";

import MWidgetHeader from "@/components/MWidgetHeader.ce.vue";

import openWeatherService from "@/services/openWeatherService";
import { EStorageKeys, TDataRow } from "@/types/types";
import { Route } from "@/router";

const cities: Ref<TDataRow[]> = ref([]);
const suggestedCities: Ref<TDataRow[]> = ref([]);
const cityQuery = ref("");

const drag = ref(false);

defineEmits(["click:close"]);

onMounted(async () => {
  const data = localStorage.getItem(EStorageKeys.Cities);
  cities.value = data !== null ? JSON.parse(data) : [];
});

const addItem = async () => {
  if (isValidQuery() && !isDuplicate()) {
    cities.value.push({ name: normalizeString(cityQuery.value) });

    await updateLocalStorage();

    cityQuery.value = "";
  }
};

const deleteItem = async (_name: string) => {
  cities.value = cities.value.filter(({ name }) => _name !== name);
  await updateLocalStorage();
};

const debounceSuggestedCities = useDebounceFn(async () => {
  await getSuggestedCities();
}, 1000);

const getSuggestedCities = async () => {
  if (!cityQuery.value) return;

  const normalizedQueryString = normalizeString(cityQuery.value);

  const data = await openWeatherService.getCity(normalizedQueryString);

  const modifiedData: TDataRow[] = data.map(({ name, country }) => {
    return { name: `${name},${country}` };
  });

  suggestedCities.value = distinctCities(modifiedData);
};

const isValidQuery = () => {
  const preparedQueryString = normalizeString(cityQuery.value);

  const isQueryValid = !!suggestedCities.value.find((country) => {
    const normalizedString = normalizeString(country.name);

    return preparedQueryString === normalizedString;
  });

  return isQueryValid;
};

const isDuplicate = () => {
  return !!cities.value.find(
    ({ name }) => name === normalizeString(cityQuery.value)
  );
};

const normalizeString = (str: string) =>
  str
    .split(",")
    .map((item) => item.trim())
    .join(",");

const distinctCities = (cities: TDataRow[]) => {
  const uniqueIsoCode: string[] = [];

  return cities.filter(({ name }) => {
    const isDuplicate = uniqueIsoCode.includes(name);

    if (!isDuplicate) {
      uniqueIsoCode.push(name);
      return true;
    }

    return false;
  });
};

const handleOrderChange = async () => {
  await updateLocalStorage();
};

const updateLocalStorage = async () =>
  localStorage.setItem(EStorageKeys.Cities, JSON.stringify(cities.value));

const setWhiteSpaceBeforeCountry = (str: string) => {
  const city = str.split(",");
  city[1] = " " + city[1];
  return city.join(",");
};
</script>

<style scoped lang="scss">
.settings-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  > .search-input {
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    > .input-wrapper {
      display: flex;
      > .input {
        flex-grow: 1;
      }
    }
    > .title {
      font-size: 10pt;
    }
  }

  > .cities-container {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    > .data-row {
      display: flex;
      justify-content: space-between;
      min-height: 30px;
      background-color: lightgray;
      margin-top: 16px;
      padding: 4px 8px;

      > .wrapper {
        display: flex;
        align-items: center;

        > .title {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>

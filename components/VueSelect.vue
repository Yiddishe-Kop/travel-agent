<template>
  <div class="custom-select">
    <span class="text-xs font-bold">{{ label }}</span>
    <v-select
      :value="value"
      label="name"
      :options="searchResults"
      :filterable="false"
      class="mt-1"
      :multiple="multiple"
      @search="onSearch"
      @input="$emit('input', $event)"
      ref="select"
    >
      <template v-slot:option="option">
        <slot name="option" :option="option">
          <div class="py-1">
            <p class="truncate name">{{ option.name }}</p>
            <p class="truncate city">{{ option.city }}, {{ option.country }}</p>
            <h3 class="flex items-center code">
              <svg class="w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h24v24H0z" stroke="none"></path><path d="M16 10h4a2 2 0 010 4h-4l-4 7H9l2-7H7l-2 2H2l2-4-2-4h3l2 2h4L9 3h3z"></path></svg>
              <span>{{ option.code }}</span>
            </h3>
          </div>
        </slot>
      </template>
      <template v-slot:no-options>
        <slot name="no-options">
          <p class="py-6">Type to search airports...</p>
        </slot>
      </template>
      <template v-slot:selected-option="option">
        <slot name="selected-option" :option="option">
          <span class="truncate"><strong>{{ option.code }}</strong> - {{ option.name }}</span>
        </slot>
      </template>
    </v-select>
    <p v-if="help" class="mt-1 text-xs text-gray-500">{{ help }}</p>
  </div>
</template>

<script>
import debounce from "lodash.debounce";

export default {
  name: "VueSelect",
  props: {
    label: String,
    value: Object | Array,
    airports: Array,
    multiple: {
      type: Boolean,
      default: false,
    },
    help: String,
  },
  data: (vm) => ({
    searchResults: [],
  }),
  methods: {
    onSearch(search, loading, shouldDebounce = true) {
      search = search || this.$refs.select.search || "";
      loading = loading || this.$refs.select.toggleLoading;
      if (shouldDebounce) {
        this.debouncedFetchOptions(search, loading, this);
      } else {
        this.fetchOptions(search, loading, this);
      }
    },
    debouncedFetchOptions: debounce(async (search, loading, vm) => {
      vm.fetchOptions(search, loading, vm);
    }, 350),
    async fetchOptions(search, loading, vm) {
      loading(true);
      vm.searchResults = vm.airports
        .filter((airport) => {
          let regex = new RegExp(search, "i");
          return (
            regex.test(airport.name) ||
            regex.test(airport.city) ||
            regex.test(airport.country) ||
            regex.test(airport.code)
          );
        })
        .slice(0, 10);
      loading(false);
    },
  },
  async mounted() {
    this.onSearch("", undefined, false);
  },
};
</script>

<style lang="scss">
/*! purgecss start ignore */
.custom-select {
  .v-select {
    border-radius: 8px;
    background-color: #efefef;

    .vs__search {
      @apply py-1;
    }
    &.vs--open {
      border-radius: 8px 8px 0 0;
      min-width: 120px;
    }
    .vs__selected {
      @apply bg-gray-100 border-gray-400 text-gray-900;
      .vs__deselect {
        @apply text-gray-700;
        margin-inline-start: 6px !important;
        fill: currentColor;
      }
    }
    .vs__deselect {
      padding: 4px !important;
      svg {
        @apply text-gray-300;
        fill: currentColor;
      }
      &:hover svg {
        @apply text-red-500;
      }
    }
    .vs__actions * {
      @apply text-gray-500;
      fill: currentColor;
      margin-inline-end: 6px;
    }
    .vs__dropdown-menu {
      @apply bg-gray-100;
      .vs__dropdown-option {
        @apply text-gray-800;
        .name {
          @apply font-bold;
        }
        .city {
          @apply text-sm text-gray-500;
        }
        .code {
          @apply text-xl font-black;
        }
        // color: var(--bg-100) !important;
        &--highlight {
          @apply bg-gray-600 text-gray-100;
          .name {
          }
          .city {
            @apply text-gray-300;
          }
          .code {
          }
        }
      }
    }
  }
}
/*! purgecss end ignore */
</style>

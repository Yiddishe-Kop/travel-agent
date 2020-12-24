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
          {{ option.name }}
        </slot>
      </template>
      <template v-slot:no-options>
        <slot name="no-options">
          <p class="py-6">
            {{ $t("empty") }}
          </p>
        </slot>
      </template>
      <template v-slot:selected-option="option">
        <slot name="selected-option" :option="option">
          {{ option.name }}
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

      loading(false);
    },
  },
  async mounted() {
    this.onSearch("", undefined, false);
    const res = await this.$axios.get("/airports.json");
    this.searchResults = res.data;
  },
};
</script>

<style lang="scss">
.custom-select {
  .v-select {
    @apply border-gray-200 border;
    border-radius: 8px;
    max-width: 360px;
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
        // color: var(--bg-100) !important;
        &--highlight {
          @apply bg-gray-600 text-gray-100;
        }
      }
    }
  }
}
</style>

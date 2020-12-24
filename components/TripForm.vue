<template>
  <div
    class="p-6 bg-gray-200 bg-opacity-75 rounded-lg shadow-md md:w-3/5 md:p-8"
  >
    <formulate-form @submit="submit" class="grid grid-cols-12 gap-4">
      <formulate-input
        v-model="form.tripType"
        :options="{
          return: 'Return',
          oneWay: 'One Way',
          multi: 'Multi City',
        }"
        type="radio"
        validation="required"
        element-class="flex space-x-4 "
        outer-class="col-span-full"
      />
      <vue-select
        v-model="form.from"
        :airports="airports"
        label="From"
        class="col-span-6"
      />
      <vue-select
        v-model="form.to"
        :airports="airports"
        label="To"
        class="col-span-6"
      />
      <formulate-input
        v-model="form.departAt"
        label="Depart Date"
        type="date"
        validation="required"
        outer-class="col-span-6 formulate-input"
      />
      <formulate-input
        v-model="form.returnAt"
        label="Return Date"
        type="date"
        validation="required"
        outer-class="col-span-6 formulate-input"
      />
    </formulate-form>
  </div>
</template>

<script>
import VueSelect from "~/components/VueSelect.vue";

export default {
  name: "TripForm",
  components: { VueSelect },
  data() {
    return {
      airports: [],
      form: {},
    };
  },
  methods: {
    submit() {
      console.log("Hooray!");
    },
  },
  async fetch() {
    const res = await this.$axios.get("/airports.json");
    this.airports = res.data;
  },
  fetchOnServer: false,
};
</script>

<style>
</style>

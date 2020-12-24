<template>
  <div class="flex flex-col w-screen min-h-screen">
    <header class="px-6 py-3 bg-gray-700">
      <a href="/">
        <h2 class="text-2xl font-bold text-white">High End Travel</h2>
      </a>
    </header>

    <section
      class="relative flex items-center justify-center flex-1 h-screen py-24 bg-no-repeat bg-cover"
      style="background-image: url(https://source.unsplash.com/rf6ywHVkrlY)"
    >
      <div class="p-6 bg-gray-200 bg-opacity-75 rounded-lg shadow-md md:w-3/5 md:p-8">
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
          <vue-select v-model="form.from" :airports="airports" label="From" class="col-span-6" />
          <vue-select v-model="form.to" :airports="airports" label="To" class="col-span-6" />
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
    </section>
  </div>
</template>

<script>
import VueSelect from "~/components/VueSelect.vue";

export default {
  components: {
    VueSelect,
  },
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
  async mounted() {
    const res = await this.$axios.get("/airports.json");
    this.airports = res.data;
  }
};
</script>

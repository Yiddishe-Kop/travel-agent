<template>
  <div class="w-screen min-h-screen flex flex-col">
    <header class="py-3 px-6 bg-gray-700">
      <a href="/">
        <h2 class="font-bold text-2xl text-white">High End Travel</h2>
      </a>
    </header>

    <section
      class="h-screen relative py-24 flex-1 flex items-center justify-center bg-no-repeat bg-cover"
      style="background-image: url(https://source.unsplash.com/rf6ywHVkrlY)"
    >
      <div class="bg-gray-200 p-6 md:p-8 rounded-lg shadow-md bg-opacity-75">
        <formulate-form @submit="submit" class="grid grid-cols-12 gap-x-4">
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
          <vue-select v-model="form.from" label="From" class="col-span-6" />
          <vue-select v-model="form.to" label="To" class="col-span-6" />

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
      form: {},
    };
  },
  methods: {
    submit() {
      console.log("Hooray!");
    },
  },
};
</script>

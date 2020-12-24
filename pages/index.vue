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
      <client-only>
        <trip-form />
      </client-only>
    </section>
  </div>
</template>

<script>
import TripForm from "~/components/TripForm.vue";

export default {
  components: {
    TripForm,
  },
};
</script>

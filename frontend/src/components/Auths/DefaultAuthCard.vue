<script setup lang="ts">
const props = defineProps(['subtitle', 'title', 'customClasses'])
</script>

<template>
  <!-- ====== Forms Section Start -->
    <div
    class="rounded-sm grid grid-cols-4 bg-gradient-to-r from-sky-500 to-indigo-500 justify-items-center border h-screen"
  >
    <div class="flex col-start-2 w-full col-span-2 z-50 bg-white h-3/4 mt-20 rounded-md border-stroke shadow-default dark:border-strokedark dark:bg-boxdark flex-wrap items-center">
      <div class="w-full self-center border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
        <div class="w-full p-4 sm:p-6 xl:p-14.5">
          <span class="mb-1.5 block font-medium">{{ props.subtitle }}</span>
          <h2 class="mb-4 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            {{ props.title }}
          </h2>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
  <!-- ====== Forms Section End -->

  
</template>

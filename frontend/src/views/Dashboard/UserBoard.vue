<script setup>
import DefaultLayoutUser from '@/layouts/DefaultLayoutUser.vue'
</script>

<template>
  <DefaultLayoutUser>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
     <div class="grid">
      <a href="/" class="flex items-center ps-2.5 mt-5">
        <img
          src="https://cdn3.iconfinder.com/data/icons/clinical-3/96/medical-kit-256.png"
          class="h-16 me-3 sm:h-16"
          alt="Flowbite Logo"
        />
        <span class="self-center text-4xl text-black dark:text-white font-bold text-2xl font-extrabold whitespace-nowrap text-black dark:text-white mt-3"
          >Welcome to BK HEALTH</span
        >
      </a>
     </div>
    </div>
  </DefaultLayoutUser>
</template>
<script>
export default {
  mounted() {
      const userInfo = localStorage.getItem('user');
      console.log(userInfo);
  }
}
</script>


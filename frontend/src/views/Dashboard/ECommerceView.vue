<script setup>
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <DataStatsOne />
    </div>
  </DefaultLayout>
</template>
<script>
export default {
  data(){
    return {
      patients: {}
    }
  },
  mounted() {
      const userInfo = localStorage.getItem('user');
      console.log(userInfo);
  }
}
</script>


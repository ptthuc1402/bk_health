<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
<template>
  <DefaultLayout>
    <div class="relative overflow-x-auto">
      <div class="p-4 rounded-lg dark:border-gray-700">
        <div class="grid grid-cols-3 gap-4 mb-4 mt-[50px]">
          <div
          class="flex items-center justify-center h-24 p-4 drop-shadow-xl border-black rounded rounded-2xl text-black bg-white"
          >
            <p class="text-2xl text-black font-bold flex inline">
              <svg
                class="mr-4 mt-1 flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path
                  d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"
                />
              </svg>
              Doctor quantity: {{ doctors.length }}
            </p>
          </div>
        </div>
      </div>
      <table
        class="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-[100px]"
        v-if="doctors.length != 0"
      >
        <thead class="text-base text-white uppercase bg-slate-700 dark:bg-gray-700 dark:text-white">
          <tr>
            <th scope="col" class="px-6 py-3 w-[100px]">Tên bác sĩ</th>
            <th scope="col" class="px-6 py-3 w-[100px]">Email</th>
            <th scope="col" class="px-6 py-3 w-[100px]">Giới tính</th>
            <th scope="col" class="px-6 py-3 w-[100px]">Ngày sinh</th>
            <th scope="col" class="px-6 py-3 w-[100px]">Số điện thoại</th>
            <th scope="col" class="px-6 py-3 w-[100px]">Địa chỉ</th>
            <th scope="col" class="px-6 py-3 w-[100px]">Chuyên khoa</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-[100px]"
            v-for="(doctor) in doctors"
            :key="doctor"
          >
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
              {{ doctor.name }}
            </th>
            <td class="px-6 py-4">
              {{ doctor.email }}
            </td>
            <td class="px-6 py-4">
              {{ doctor.sex }}
            </td>
            <td class="px-6 py-4">
              {{ doctor.birth }}
            </td>
            <td class="px-6 py-4">
              {{ doctor.phone }}
            </td>
            <td class="px-6 py-4">
              {{ doctor.address }}
            </td>
            <td class="px-6 py-4">
              {{ doctor.spec }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="mt-[50px]">
        <div
          class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <svg
            class="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
            />
          </svg>
          <p class="text-lg">Data is empty, please add</p>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      doctors: {}
    }
  },
  mounted() {
    axios
      .get('http://localhost:8080/doctor/index', {})
      .then((response) => [(this.doctors = response.data.doctors)])
  }
}
</script>

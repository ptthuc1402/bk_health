<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'

var patients = ''
var appoints = ''
var doctors = ''
var users = ''
var patients_length = ref(0)
var users_length = ref(0)
var appoints_length = ref(0)
var doctors_length = ref(0)

type GetUsersResponse = {
  data: patients[]
}

onMounted(async () => {
  patients = await getPatients()
  doctors = await getDoctors()
  appoints = await getAppoints()
  users = await getUsers()

  console.log(appoints.appoinments.length)
  users_length.value = users.users.length ? users.users.length : 0
  doctors_length.value = doctors.doctors.length ? doctors.doctors.length : 0
  patients_length.value = patients.patients.length ? patients.patients.length : 0
  appoints_length.value = appoints.appoinments.length ? appoints.appoinments.length : 0
})

async function getPatients() {
  // 👇️ const data: GetUsersResponse
  const { data, status } = await axios.get<GetUsersResponse>(
    'http://localhost:8080/patient/index',
    {
      headers: {
        Accept: 'application/json'
      }
    }
  )
  // 👇️ "response status is: 200"
  return data
}
async function getUsers() {
  // 👇️ const data: GetUsersResponse
  const { data, status } = await axios.get<GetUsersResponse>('http://localhost:8080/auth/index', {
    headers: {
      Accept: 'application/json'
    }
  })
  // 👇️ "response status is: 200"
  return data
}
async function getAppoints() {
  // 👇️ const data: GetUsersResponse
  const { data, status } = await axios.get<GetUsersResponse>(
    'http://localhost:8080/appoint/index',
    {
      headers: {
        Accept: 'application/json'
      }
    }
  )
  // 👇️ "response status is: 200"c
  console.log(data)
  return data
}
async function getDoctors() {
  // 👇️ const data: GetUsersResponse
  const { data, status } = await axios.get<GetUsersResponse>('http://localhost:8080/doctor/index', {
    headers: {
      Accept: 'application/json'
    }
  })
  // 👇️ "response status is: 200"
  return data
}
</script>

<template>
  <!-- Card Item Start -->
  <div
    class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <path
          d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"
        />
      </svg>
    </div>

    <div class="mt-4 flex items-end justify-between">
      <div>
        <h4 class="text-title-md font-bold text-black dark:text-white">
          {{ patients_length }}
        </h4>
        <span class="text-sm font-medium">Tổng số bệnh nhân</span>
      </div>
    </div>
  </div>

  <div
    class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
        />
      </svg>
    </div>

    <div class="mt-4 flex items-end justify-between">
      <div>
        <h4 class="text-title-md font-bold text-black dark:text-white">{{ doctors_length }}</h4>
        <span class="text-sm font-medium">Tổng số bác sĩ</span>
      </div>
    </div>
  </div>

  <div
    class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z"
        />
      </svg>
    </div>

    <div class="mt-4 flex items-end justify-between">
      <div>
        <h4 class="text-title-md font-bold text-black dark:text-white">{{ appoints_length }}</h4>
        <span class="text-sm font-medium">Tổng số lịch hẹn</span>
      </div>
    </div>
  </div>

  <div
    class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path
          d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
        />
      </svg>
    </div>

    <div class="mt-4 flex items-end justify-between">
      <div>
        <h4 class="text-title-md font-bold text-black dark:text-white">{{ users_length }}</h4>
        <span class="text-sm font-medium">Tổng số users</span>
      </div>
    </div>
  </div>
  <!-- Card Item End -->
</template>

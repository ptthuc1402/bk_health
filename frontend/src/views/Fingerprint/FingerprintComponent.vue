<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import OCRView from '@/views/OCR/OCRView.vue'
</script>
<template>
  <DefaultLayout>
    <button
      v-if="!isScan"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-10 float-right mr-[200px]"
      @click="scanFinger"
    >
      Quét vân tay
    </button>
    <button
      v-if="isScan"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-10 float-right mr-[200px]"
      @click="scanFinger"
    >
      Dừng quét
    </button>
    <input
      type="text"
      id="first_name"
      class="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Patient ID"
      required
      v-model="patient.patient_id"
    />
    <input
      type="number"
      id="first_name"
      class="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Finger ID"
      required
      v-model="patient.finger_id"
    />

    <button
      :disabled="!canScan"
      :class="`${
        !canScan ? 'bg-slate-700 ' : 'bg-blue-700 hover:bg-blue-800'
      } text-white   focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600focus:outline-none dark:focus:ring-blue-800 mt-10 float-right mr-[200px]`"
      @click="submit"
    >
      Submit
    </button>
    <div
      v-if="mess"
      class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mt-24"
      role="alert"
    >
      <div class="flex">
        <div class="py-1">
          <svg
            class="fill-current h-6 w-6 text-teal-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
            />
          </svg>
        </div>
        <div>
          <p class="font-bold">{{ mess }}</p>
          <!-- <p class="text-sm">Make sure you know how these changes affect you.</p> -->
        </div>
      </div>
    </div>
    <div></div>
  </DefaultLayout>
</template>

<style></style>

<script>
import axios from 'axios'
import { app } from '@/const/const.ts'

// const firebaseConfig = {
//   apiKey: 'AIzaSyAeQRKp_YujlvFjDmASDYhszQop3z9_AdE',
//   authDomain: 'final-project-67f5b.firebaseapp.com',
//   databaseURL: 'https://final-project-67f5b-default-rtdb.asia-southeast1.firebasedatabase.app',
//   projectId: 'final-project-67f5b',
//   storageBucket: 'final-project-67f5b.appspot.com',
//   messagingSenderId: '742637064779',
//   appId: '1:742637064779:web:9e10ea1ba0e05de878f3ce'
// }
// const app = firebase.initializeApp(firebaseConfig)
// let db = app.database()
// let ref_test = db.ref('doanfinal')
export default {
  data() {
    return {
      isScan: false,
      count_fingerID: '',
      patient: {
        patient_id: '',
        count_fingerID_post: '',
        finger_id: ''
      },
      mess: '',
      canScan: false
    }
  },
  mounted() {
    const self = this
    axios
      .get('http://localhost:8080/patient/get_quantity_fingerid', {})
      .then((response) => [
        ((this.count_fingerID = response.data.count_fingerID), console.log(this.count_fingerID))
      ])

    app
      .database()
      .ref('measure')
      .on('value', function (snapshot) {
        self.mess = snapshot.val().message || null
        self.canScan = snapshot.val().canScan || null
      })
  },
  methods: {
    scanFinger() {
      // Toggle the editable state
      this.isScan = !this.isScan
      console.log(this.isScan)
      console.log(this.patient.finger_id)
      app.database().ref('measure').set({
        isScan: this.isScan,
        id_count: this.patient.finger_id,
        isDetect: false,
        isMeasure: false
      })
      // setTimeout(() => {
      //   app
      //     .database()
      //     .ref('measure')
      //     .set({ id_count: this.count_fingerID + 1 })
      // }, '1000')
    },
    submit() {
      var partient_id = this.patient.patient_id
      console.log(partient_id)
      app.database().ref('measure').set({ isScan: false })
      this.patient.count_fingerID_post = this.count_fingerID + 1
      console.log(this.patient)
      axios.post('http://localhost:8080/patient/update_patient_id', this.patient).then()
      window.location.href = '/'
    }
  }
}
</script>

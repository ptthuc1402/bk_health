<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import OCRView from '@/views/OCR/OCRView.vue'
</script>
<template>
  <DefaultLayout>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-10 float-right mr-[200px]"
      @click="scanFinger"
    >
      Tiến hành quét vân tay
    </button>
    <!-- <input
      type="text"
      id="first_name"
      class="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Patient ID"
      required
      v-model="patient.patient_id"
    /> -->

    <button
      v-if="canDetect"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-10 float-right mr-[200px]"
      @click="submit"
    >
      Gửi
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
      isDetect: false,
      count_fingerID: '',
      patient: {
        patient_id: ''
      },
      mess: '',
      id_detected: 0,
      patients: {},
      canDetect: false,
      mess: ''
    }
  },
  mounted() {
    const self = this

    app
      .database()
      .ref('measure')
      .on('value', function (snapshot) {
        self.mess = snapshot.val().mess || null
      })
    // axios
    //   .get('http://localhost:8080/patient/get_quantity_fingerid', {})
    //   .then((response) => [
    //     ((this.count_fingerID = response.data.count_fingerID), console.log(this.count_fingerID))
    //   ])app
    app
      .database()
      .ref('measure')
      .on('value', function (snapshot) {
        self.canDetect = snapshot.val().canDetect || null
      })

    axios
      .get('http://localhost:8080/patient/index')
      .then((response) => [(this.patients = response.data.patients), console.log(this.patients)])
  },
  methods: {
    scanFinger() {
      // Toggle the editable state
      this.isDetect = !this.isDetect
      console.log(this.isDetect)
      // for (var i = 0; i < this.patients.length; i++) {
      //   if (this.patients[i].patient_id === this.patient.patient_id) {
      //     this.count_fingerID = this.patients[i].idFinger
      //   }
      // }

      app.database().ref('measure').set({ isDetect: this.isDetect })
      // setTimeout(() => {
      //   app
      //     .database()
      //     .ref('measure')
      //     .set({ id_count: this.count_fingerID + 1 })
      // }, '1000')
    },
    submit() {
      app
        .database()
        .ref('measure')
        .on('value', function (snapshot) {
          self.id_detected = snapshot.val().fingerID_detect || null
        })

      app.database().ref('measure').set({ isDetect: false, isScan: false })
      console.log(id_detected)
      localStorage.setItem('id_detected', id_detected)
      localStorage.setItem('is_scan', true)
      axios
        .post('http://localhost:8080/patient/get_patient', { id_detected })
        .then((response) => (this.patient_scan = response.data.patient[0]))

      window.location.href = '/ocr'
      // var partient_id = this.patient.patient_id
      // console.log(partient_id)
      // this.patient.count_fingerID_post = this.count_fingerID + 1
      // console.log(this.patient)
      // axios.post('http://localhost:8080/patient/update_patient_id', this.patient).then()
    }
  }
}
</script>

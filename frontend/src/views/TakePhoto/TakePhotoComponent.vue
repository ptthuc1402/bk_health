<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
<template>
  <DefaultLayout>
    <div class="flex justify-center items-center">
      <div id="app" class="web-camera-container">
        <div class="flex justify-center items-center space-x-10">
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-12 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            @click="toggleCamera"
          >
            <span v-if="!isCameraOpen">Open Camera</span>
            <span v-else>Close Camera</span>
          </button>
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-12 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="returnHome"
          >
            Return Home
          </button>
        </div>

        <div v-show="isCameraOpen && isLoading" class="camera-loading">
          <ul class="loader-circle"></ul>
        </div>

        <div
          id=""
          v-if="isCameraOpen"
          v-show="!isLoading"
          class="camera-box mt-8"
          :class="{ flash: isShotPhoto }"
        >
          <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div>

          <video v-show="!isPhotoTaken" ref="camera" :width="900" :height="600" autoplay></video>

          <canvas
            v-show="isPhotoTaken"
            id="photoTaken"
            ref="canvas"
            :width="900"
            :height="600"
          ></canvas>
        </div>

        <div
          v-if="isCameraOpen && !isLoading"
          class="camera-shoot flex justify-center items-center mt-8"
        >
          <button type="button" class="button" @click="takePhoto">
            <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png" />
          </button>
        </div>

        <div
          v-if="isPhotoTaken && isCameraOpen"
          class="camera-download flex justify-center items-center"
        >
          <div class="flex flex-wrap flex justify-center items-center">
            <input
              type="text"
              id="first_name"
              class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
              v-model="patient.name"
            />
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Phone Number"
              required
              v-model="patient.phone"
            />
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Patient ID"
              required
              v-model="patient.id"
            />
            <button
              id="downloadPhoto"
              download="my-photo.jpg"
              class="text-white bg-blue-700 mt-8 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-12 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              role="button"
              @click="downloadImage"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
<style>
#myComponent {
  justify-content: center;
  align-items: center;
}

#myComponent canvas {
  position: absolute;
}
</style>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: '#',
      patient: {
        name: '',
        phone: '',
        id: ''
      }
    }
  },
  methods: {
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false
        this.isPhotoTaken = false
        this.isShotPhoto = false
        this.stopCameraStream()
      } else {
        this.isCameraOpen = true
        this.createCameraElement()
      }
    },

    returnHome() {
      window.location.href = '/home'
    },

    //opencamera
    createCameraElement() {
      this.isLoading = true
      const constraints = (window.constraints = {
        audio: false,
        video: true
      })
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.isLoading = false
          this.$refs.camera.srcObject = stream
        })
        .catch((error) => {
          this.isLoading = false
          alert("May the browser didn't support or there is some errors.")
        })
    },

    //close camera
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks()
      tracks.forEach((track) => {
        track.stop()
      })
    },

    //takephoto
    takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true
        const FLASH_TIMEOUT = 50
        setTimeout(() => {
          this.isShotPhoto = false
        }, FLASH_TIMEOUT)
      }
      this.isPhotoTaken = !this.isPhotoTaken
      const context = this.$refs.canvas.getContext('2d')
      context.drawImage(this.$refs.camera, 0, 0, 900, 650)
    },

    //downphototofolder
    downloadImage() {
      const canvas = document.getElementById('photoTaken').toDataURL('image/jpeg')
      axios
        .post('http://localhost:8080/take_photo', {
          image: canvas,
          name: this.patient.name,
          phone: this.patient.phone,
          id: this.patient.id
        })
        .then()
    }
  }
}
</script>
<style></style>

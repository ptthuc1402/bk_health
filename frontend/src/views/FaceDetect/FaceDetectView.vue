<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
<template>
  <DefaultLayout>
    <div class="m-2 flex justify-center items-center">
      <button @click="Return()" class="border m-2 border-2 border-black rounded-lg">
        <p class="p-2 text-black font-medium">Return Home</p>
      </button>
    </div>
    <div id="myComponent" class="flex justify-center items-center mt-16">
      <video class="detect" id="video" width="900" height="700" autoplay muted></video>
    </div>
  </DefaultLayout>
</template>

<style>
#myComponent {
  padding: 0;
}

#myComponent canvas {
  position: absolute;
}
</style>

<script>
// import '@tensorflow/tfjs';
import * as faceapi from 'face-api.js'
import { AnchorPosition } from 'tfjs-image-recognition-base/build/commonjs/draw'
import axios from 'axios'

export default {
  data() {
    return {
      openCam: true,
      stream: null,
      labels: []
    }
  },

  mounted() {
    const video = document.getElementById('video')

    axios.get('http://localhost:8080/patient/index_name').then((response) => {
      for (var i = 0; i < response.data.data.length; i++) {
        this.labels.push(response.data.data[i])
      }
    })

    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      faceapi.nets.ageGenderNet.loadFromUri('/models')
    ]).then(startVideo)

    function startVideo() {
      navigator.getUserMedia(
        { video: {} },
        (stream) => (video.srcObject = stream),
        (err) => console.error(err)
      )
    }

    video.addEventListener('play', () => {
      const canvas = faceapi.createCanvasFromMedia(video)
      document.getElementById('myComponent').append(canvas)
      const displaySize = { width: video.width, height: video.height }
      faceapi.matchDimensions(canvas, displaySize)
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender()
          .withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        resizedDetections.forEach((detection) => {
          const box = detection.detection.box
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: Math.round(detection.age) + ' year old ' + detection.gender,
            drawLabelOptions: { anchorPosition: AnchorPosition.TOP_RIGHT }
          })
          drawBox.draw(canvas)
        })
        console.log(this.labels)
        const labels_detect = this.labels

        //face detect
        const labeledFaceDescriptors = await Promise.all(
          labels_detect.map(async (label) => {
            const imgUrl = `storage/${label}/img.jpg`
            console.log(imgUrl)
            const img = await faceapi.fetchImage(imgUrl)
            const faceDescription = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor()
            if (!faceDescription) {
              throw new Error(`no faces detected for ${label}`)
            }
            const faceDescriptors = [faceDescription.descriptor]
            return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
          })
        )

        //face recognition
        const threshold = 0.4
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, threshold)
        const results = detections.map((fd) => faceMatcher.findBestMatch(fd.descriptor))
        results.forEach((bestMatch, i) => {
          const box = detections[i].detection.box
          const text = bestMatch.toString()

          const drawBox = new faceapi.draw.DrawBox(box, { label: text })
          drawBox.draw(canvas)
        })
      }, 100)
    })
  },

  methods: {
    Return() {
      window.location.href = '/'
    }
  }
}
</script>

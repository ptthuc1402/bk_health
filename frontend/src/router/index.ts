import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import SigninView from '@/views/Authentication/SigninView.vue'
// @ts-ignore
import SignupView from '@/views/Authentication/SignupView.vue'
// @ts-ignore
import ECommerceView from '@/views/Dashboard/ECommerceView.vue'
import OCRView from '@/views/OCR/OCRView.vue'
// @ts-ignore
import PatientView from '@/views/Patients/PatientView.vue'
// @ts-ignore
import DoctorView from '@/views/Doctor/DoctorView.vue'
// @ts-ignore
import AddDoctorView from '@/views/Doctor/AddDoctorView.vue'
// @ts-ignore
import AppointmentView from '@/views/Appointment/AppointmentView.vue'
// @ts-ignore
import AddAppointmentView from '@/views/Appointment/AddAppointmentView.vue'
// @ts-ignore
import FaceDetectView from '@/views/FaceDetect/FaceDetectView.vue'

import TakePhotoComponent from '@/views/TakePhoto/TakePhotoComponent.vue'

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: SigninView,
    meta: {
      title: 'Signin'
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: ECommerceView
  },
  {
    path: '/',
    name: 'home',
    component: ECommerceView
  },
  {
    path: '/ocr',
    name: 'ocr',
    component: OCRView
  },
  {
    path: '/patient',
    name: 'patient',
    component: PatientView
  },
  {
    path: '/doctor/doctor_index',
    name: 'doctor',
    component: DoctorView
  },
  {
    path: '/doctor/doctor_add',
    name: 'doctor_add',
    component: AddDoctorView
  },
  {
    path: '/appoint/appoint_add',
    name: 'appoint_add',
    component: AddAppointmentView
  },
  {
    path: '/appoint/appoint_index',
    name: 'appoint_index',
    component: AppointmentView
  },
  {
    path: '/face_detect',
    name: 'face_detect',
    component: FaceDetectView,
    meta: {
      title: 'face_detect'
    }
  },
  {
    path: '/take_photo',
    name: 'take_photo',
    component: TakePhotoComponent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('user')
  const publicPages = ['/signin', '/signup']
  const authRequired = !publicPages.includes(to.path)
  if (authRequired && !isLoggedIn) {
    next('/signin')
  } else {
    next()
  }
})

export default router

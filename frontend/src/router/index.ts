import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import SigninView from '@/views/Authentication/SigninView.vue'
// @ts-ignore
import SignupView from '@/views/Authentication/SignupView.vue'
// @ts-ignore
import ECommerceView from '@/views/Dashboard/ECommerceView.vue'
import OCRView from '@/views/OCR/OCRView.vue'
import PatientView from '@/views/Patients/PatientView.vue'
import DoctorView from '@/views/Doctor/DoctorView.vue'
import AddDoctorView from '@/views/Doctor/AddDoctorView.vue'
import AppointmentView from '@/views/Appointment/AppointmentView.vue'
import AddAppointmentView from '@/views/Appointment/AddAppointmentView.vue'
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

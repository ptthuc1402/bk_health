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
// @ts-ignore
import TakePhotoComponent from '@/views/TakePhoto/TakePhotoComponent.vue'
// @ts-ignore
import FingerprintComponent from '@/views/Fingerprint/FingerprintComponent.vue'
// @ts-ignore
import DetectFingerView from '@/views/DetectFinger/DetectFingerView.vue'
// @ts-ignore
import UserBoard from '../views/Dashboard/UserBoard.vue'
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
    component: ECommerceView,
  },
  {
    path: '/home_user',
    name: 'homeUser',
    component: UserBoard
  },
  {
    path: '/',
    component: ECommerceView,
    // @ts-ignore
    beforeEnter: (to, from, next) => {
    const isAdmin = JSON.parse(localStorage.getItem('role_id')!);
      if ((JSON.parse(localStorage.getItem('user')!) === null)) {
        return next({ path: '/signin' });
      };
      if ((JSON.parse(localStorage.getItem('user')!) !== null) && (isAdmin === 2)) {
        return next({ path: '/home_user' });
      }
      next();
    }
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
  },
  {
    path: '/res_fingerprint',
    name: 'res_fingerprint',
    component: FingerprintComponent
  },
  {
    path: '/detect_finger',
    name: 'detect_finger',
    component: DetectFingerView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   // const isLoggedIn = localStorage.getItem('user')
//   const publicPages = ['/signin', '/signup'] 
//   const authRequired = !publicPages.includes(to.path)
//   if (authRequired) {
//     next('/signin')
//   } else {
//     next()
//   }
// })

export default router

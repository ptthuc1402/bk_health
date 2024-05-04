import firebase from 'firebase'

export const firebaseConfig = {
  apiKey: 'AIzaSyAeQRKp_YujlvFjDmASDYhszQop3z9_AdE',
  authDomain: 'final-project-67f5b.firebaseapp.com',
  databaseURL: 'https://final-project-67f5b-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'final-project-67f5b',
  storageBucket: 'final-project-67f5b.appspot.com',
  messagingSenderId: '742637064779',
  appId: '1:742637064779:web:9e10ea1ba0e05de878f3ce'
}
export const app = firebase.initializeApp(firebaseConfig)
export const db = app.database()
export const ref = db.ref('measure')

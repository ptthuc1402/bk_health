import firebase from 'firebase'

export const firebaseConfig = {
  apiKey: 'AIzaSyAaEkUsbjLhxn97sgxcyJ1NfgQ6BKSwsBw',
  authDomain: 'final-project-c8ec9.firebaseapp.com',
  databaseURL: 'https://final-project-c8ec9-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'final-project-c8ec9',
  storageBucket: 'final-project-c8ec9.appspot.com',
  messagingSenderId: '478994857105',
  appId: '1:478994857105:web:3899497704f985069a1330'
}
export const app = firebase.initializeApp(firebaseConfig)
export const db = app.database()
export const ref = db.ref('measure')

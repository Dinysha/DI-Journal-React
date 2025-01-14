import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

// console.log('VITE_API_KEY:', import.meta.env.VITE_API_KEY)
// console.log('VITE_AUTH_DOMAIN:', process.env.VITE_AUTH_DOMAIN)
// console.log('VITE_PROJECT_ID:', process.env.VITE_PROJECT_ID)
// console.log('VITE_STORAGE_BUCKET:', process.env.VITE_STORAGE_BUCKET)
// console.log('VITE_MESSAGING_SUNDER_ID:', process.env.VITE_MESSAGING_SUNDER_ID)
// console.log('VITE_APP_ID:', process.env.VITE_APP_ID)

const app = initializeApp(firebaseConfig)

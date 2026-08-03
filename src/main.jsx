import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// IMPORT AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// IMPORT i18n UNTUK DUA BAHASA 👇
import './i18n';

// INISIALISASI AOS
AOS.init({
  duration: 1000, // durasi animasi
  easing: 'ease-in-out', // efek gerakan
  once: true, // animasi hanya jalan sekali saat scroll
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

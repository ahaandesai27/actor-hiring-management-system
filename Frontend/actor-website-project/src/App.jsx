import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import SubContent from './components/SubContent'
import MainContents from './components/MainContents'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <SubContent />
      <MainContents />
    </>
  )
}

export default App

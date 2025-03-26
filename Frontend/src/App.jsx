import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import SubContent from './components/SubContent'
import MainContents from './components/MainContents'
import NewHeader from './components/NewHeader';
import './App.css'

function App() {

  return (
    <>
      <NewHeader />
      {/* <SubContent /> */}
      <MainContents />
    </>
  )
}

export default App

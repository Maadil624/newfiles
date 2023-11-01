import React from 'react'
import Nav from './Nav'
import CenterHome from './CenterHome'

export default function Home() {
  localStorage.clear();
  sessionStorage.clear()
  return (
    <>
      <Nav/>
      <CenterHome/>
    </>
  )
}

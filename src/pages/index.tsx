import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserTab from 'pages/UserTab'
import NotFound from 'pages/NotFound'
import Home from './Home'

const Routing: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:username" element={<UserTab />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Routing

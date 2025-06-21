import './App.css'

import {RouterProvider } from 'react-router-dom'

import Router from "./Router.jsx";

function App() {
  return (
      <div>
          <RouterProvider router={Router} />
      </div>
  )
}

export default App

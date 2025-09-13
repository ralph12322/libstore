import React from 'react'

export default function Footer () {
  return (

      <footer className="bottom-0 sticky bg-gradient-to-br from-purple-900 via-steelblue-100 to-purple-100 opacity-70 text-white text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} Read and Roam. All rights reserved.</p>
      </footer>
  )
}


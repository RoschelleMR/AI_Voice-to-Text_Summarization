import React from 'react'

export default function Header() {
  return (
    <header class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <img src="/path-to-your-logo.png" alt="Logo" class="h-8 mr-3" />
          <span class="text-lg font-bold">SumScribe</span>
        </div>
        <nav>
          {/* <!-- Navigation Links --> */}
        </nav>
      </div>
    </header>
  )
}



import React from 'react'
import Spinner from './Components/spinner'

const Loader = () => {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="space-y-8">
      
       
        <div>
          <Spinner size="large"  color="text-green-900" />
          <h2 className="text-2xl mb-2 text-darkOrange">Loading...</h2>

        </div>
       
      </div>
    </main>
    </div>
  )
}

export default Loader

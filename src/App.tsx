import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, TextField } from './components'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [favoriteDogBreed, setFavoriteDogBreed] = useState('')

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 class="site-title">Vite + React</h1>
      <div className="card">
        <Button 
          onClick={() => setCount((count) => count + 1)}
          variant="primary"
          size="sm"
        >
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        
        <div className="simpleForm">
          <form>
            <div>
              <TextField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <TextField
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <TextField
                label="Favorite Dog Breed"
                value={favoriteDogBreed}
                onChange={(e) => setFavoriteDogBreed(e.target.value)}
                placeholder="Enter your favorite dog breed"
              />
            </div>
          </form>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

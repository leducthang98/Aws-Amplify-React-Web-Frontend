import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { useEffect, useState } from 'react';

Amplify.configure(config)

function App() {
  const [petName, setPetName] = useState('')
  const [petType, setPetType] = useState('')
  const [pets, setPets] = useState([])

  useEffect(() => {
    API.get('petsapi', '/pets/name').then(petRes => {
      setPets([...pets, ...petRes])
    })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    API.post('petsapi', '/pets', {
      body: {
        name: petName,
        type: petType
      }
    }).then(() => {
      setPets([...pets, {
        name: petName,
        type: petType
      }])
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input value={petName} placeholder="name" onChange={(e) => setPetName(e.target.value)}></input>
          <input value={petType} placeholder="type " onChange={(e) => setPetType(e.target.value)}></input>
          <button>Add</button>
        </form>
        <ul>
          {pets.map((pet) => {
            return (
              <li>{pet.name}</li>
            )
          })}
        </ul>
        <AmplifySignOut></AmplifySignOut>
      </header>
    </div>
  );
}

export default withAuthenticator(App);

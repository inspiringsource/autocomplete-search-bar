import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function useAnimalSearch() {

  const [animals, setAnimals] = useState([])

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery')
    search(lastQuery)
  }, [])

  const search = async (q) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', q);
  };

  return { search, animals };
}



function App() {
  const { search, animals } = useAnimalSearch()

  return (
    <div>
      <h1>Quick search</h1>
      <input 
      type="text" 
      placeholder="Search" 
      onChange={(e) => search(e.target.value)} 
      />

      <ul>
        {animals.map(animal => (
          <Animal key={animal.id} {...animal} />
        ))}
         {animals.length === 0 && 'No match found'}
      </ul>
    </div>
  )
}

function Animal({ type, name, age }) {
  return (
    <li>
      <b>{type}</b> <u>Name:</u> {name} <u>Age:</u> {age}
    </li>
  )
}

export default App

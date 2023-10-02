import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import ReactLoading from 'react-loading';

//components
import FavPoke from './components/FavPoke'

function App() {
  const [poke, setpoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  //useEffect run only 1 time when open web
  useEffect(() => {

    let abortController = new AbortController(); //use for cancel requestใช้เพื่อไม้ให้เรียกซ้ำ

    const loadPoke = async () => {
      try {

        setLoading(true)
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {
          signal: abortController.signal
        });

        setpoke(response.data)
        setError("");

      } catch (error) {
        setError("Something went wrong", error);
      } finally {
        setLoading(false)
      }
    }

    loadPoke();

    return () => abortController.abort(); //cancel request

  }, [number])//empty array - If don't use so maked app will alyways run.

  // console.log(poke);

  const prevPoke = () => {
    setNumber((number) => number - 1);
  }

  const nextPoke = () => {
    setNumber((number) => number + 1);
  }

  const addFav = () => {
    setFav((oldState) => [...oldState, poke]);
  }


  return (
    <div className="block max-w-5xl p-6 rounded-2xl bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-800 ">
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        <div > 
          {loading?
            <ReactLoading type='cylon' color='yellow' height={'20%'} width={'25%'} />
              :
            <>
              <h1>{poke?.name}</h1>
              <button onClick={addFav} className='mt-4'>Add to favourite</button>
              <br />
              <img src={poke?.sprites?.other?.home?.front_default} alt={poke?.name} />
              <ul className="pt-20 pb-4">
                {poke?.abilities?.map((abil, idx) => (
                  <li key={idx}>{abil.ability?.name} </li>
                ))}
              </ul>
              <button onClick={prevPoke} className='mr-2'>Previous</button>
              <button onClick={nextPoke}>Next</button>
            </>}
        </div>
        <div>
          <div className='flex items-center justify-center'><h2>Your favourite pokemon</h2></div>
          {fav.length>0?<FavPoke fav={fav} />:<div className="flex h-full items-center justify-center"><p>Np favourite pokemon...</p></div>}
        </div>
      </div>
    </div>
  )
}

export default App

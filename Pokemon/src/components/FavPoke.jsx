import React from 'react'
import LikePoke from './LikePoke'

function FavPoke({fav}) {

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-3 '>
        {fav?.map((data,idx)=>(
            <div key={idx}>
                <h3>{data.name}</h3>
                <img src={data.sprites.other.home.front_default}></img>
                <div className="pt-5 mb-3"><LikePoke/></div>
            </div>
        ))}
    </div>
  )
}

export default FavPoke

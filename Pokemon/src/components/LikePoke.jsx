import React from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from 'react'


function LikePeko() {
  const [Like, setLike] = useState(false);

  const toggleLike = () => { 
    setLike((check) => !check) 
  }

  return (
    <button onClick={toggleLike}>
      {Like ? <FaHeart style={{color:"red"}} /> : <FaRegHeart />}
    </button>
  )
}

export default LikePeko;

import React,{useState,useRef,useEffect} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'

const TitleCard = ({title,category}) => {

  const [apiData,setApiData]=useState([]);
  const cardsRef=useRef()
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjJlZGMzYTM0MTQ5MWMyZjdjNTA5MDZhODRhYjI2MSIsIm5iZiI6MTczMjcwNjQxNy43ODcwNjEyLCJzdWIiOiI2NzQ2Y2Q4YTllY2M0NzQ4NjljOWI1MmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mcLOh1pg158O7fEW0zkjY1pPsXMbFT7-uCBWzjpuqYs'
    }
  };
  
  
const handleWheel=(event)=>{
  event.preventDefault;
  cardsRef.current.scrollLeft+=event.deltaY;
}
useEffect(()=>{
 
  fetch(`https://api.themoviedb.org/3/movie/${category? category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handleWheel)
},[])

  return (
    <div className='title-cards'>
      <h2>{title? title: 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""/>
            <p>{card.original_title}</p>
            </Link>
        })}
      
    </div>
    </div>
  )
}

export default TitleCard

import React, { useEffect ,useState} from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const{id}=useParams()
  const navigate=useNavigate()
  const[apiData,setApiData]=useState({
    name:'',
    key:'',
    published_at:'',
    typeof:''
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjJlZGMzYTM0MTQ5MWMyZjdjNTA5MDZhODRhYjI2MSIsIm5iZiI6MTczMjcwNjQxNy43ODcwNjEyLCJzdWIiOiI2NzQ2Y2Q4YTllY2M0NzQ4NjljOWI1MmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mcLOh1pg158O7fEW0zkjY1pPsXMbFT7-uCBWzjpuqYs'
    }
  };

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])
  

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt=""  onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}`}title='trailer' 
      frameBorder='0'
      allowFullScreen></iframe> 
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
        
        </div>     
      </div>
  )
}

export default Player

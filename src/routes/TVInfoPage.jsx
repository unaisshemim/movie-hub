import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import TVInfo from '../components/TVInfo';
import Navbar from '../components/Navbar';

function TVInfoPage() {

    const [movies, setMovies] = useState(null);

    const {id} = useParams();
     
    useEffect(() => {
      const url = `https://api.themoviedb.org/3/tv/${id}language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTFmMGY4MjYxMTAzMDk1MTRiM2U5MjMxODY3NjE0ZSIsInN1YiI6IjY0ZDM1ZDZhMDM3MjY0MDBmZmZjN2M3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TpzrrzlL_IEwa7uovSoSWI_8fwByw8FbP0aCbMk_2Y0'
        }
      };
      
 

        axios.get(url, options)
          .then(response => {
           setMovies(response.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [id]);

      console.log(movies);

      if(movies === null){
        return (
          <div className='text-center text-2xl pt-40 text-black'>       
            Loading...................
          </div>
        )
      }

  return (
    <div className='bg-black'>
        <Navbar/>
        <TVInfo key={movies.id} infos={movies} />
      
    </div>
  )
}

export default TVInfoPage
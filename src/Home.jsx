
import Footer from './components/Footer'
import Hero from './components/Hero'

import PopularMovieCard from './components/PopularMovieCard'
import RecentMovieCard from './components/RecentMovieCard'
function Home() {
  return (
    <>
   <Hero/>
   <PopularMovieCard/>
   <RecentMovieCard/>
   {/* <PopularTVShows/> */}
   <Footer/>
    </>
  )
}

export default Home
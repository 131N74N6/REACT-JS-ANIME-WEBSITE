import POPULAR_ANIME from "./anime/Popular-Anime";
import UPCOMING_ANIME from "./anime/Upcoming";
import SearchPage from "./search-page/Search";
import DetailInfo from "./info/Detail";
import CurrentlyAiring from "./anime/Currently";
import "./main.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<POPULAR_ANIME/>}/>
            <Route path="/upcoming" element={<UPCOMING_ANIME/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/detail/:mal_id" element={<DetailInfo/>}/>
            <Route path="/currently-airing" element={<CurrentlyAiring/>}/>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App

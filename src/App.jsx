import POPULAR_ANIME from "./Pages/Popular-Anime";
import UPCOMING_ANIME from "./Pages/Upcoming";
import SearchPage from "./Pages/Search";
import DetailInfo from "./Pages/Detail";
import CurrentlyAiring from "./Pages/Currently";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./main.css";

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

// import { fetchPhotos } from "./api/mediaApi";
// import { fetchVedios } from "./api/mediaApi";
// import { fetchGifs } from "./api/mediaApi";

import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

const App = () => {
  // const getPhotos = async () => {
  //   const data = await fetchPhotos("dog");
  //   console.log(data.results);
  // };

  // const getVedios = async () => {
  //   const data = await fetchVedios("dog");
  //   console.log(data.videos);
  // };

  // const getGifs = async () => {
  //   const data = await fetchGifs("dog");
  //   console.log(data.data);
  // };

  return (
    <div className="">
      {/* <button className="bg-cyan-700 m-5 px-4 py-3" onClick={getPhotos}>
        Get Photos
      </button>
      <button className="bg-cyan-700 m-5 px-4 py-3" onClick={getVedios}>
        Get Videos
      </button>

      <button className="bg-cyan-700 m-5 px-4 py-3" onClick={getGifs}>
        Get GIf
      </button> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;

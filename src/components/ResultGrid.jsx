// import { useSelector, useDispatch } from "react-redux";
// import { fetchPhotos, fetchVedios, fetchGifs } from "../api/mediaApi";
// import {
//   setQuery,
//   setLoading,
//   setError,
//   setResults,
// } from "../features/searchSlice";
// import { useEffect } from "react";
// import ResultCard from "./ResultCard";

// const ResultGrid = () => {
//   const dispatch = useDispatch();
//   const { query, activeTab, results, loading, error } = useSelector(
//     (store) => store.search,
//   );

//   // useEffect(() => {},[]);

//   useEffect(() => {
//     if (!query) return;
//     const getData = async () => {
//       try {
//         dispatch(setLoading());
//         let data = [];
//         if (activeTab == "photos") {
//           let response = await fetchPhotos(query);
//           data = response.results.map((item) => ({
//             // ye normalization hai jese ki ab data aglag formate me aaye ag hme use ek jgh show krna h
//             id: item.id,
//             type: "photo",
//             title: item.alt_description,
//             thumbnail: item.urls.small,
//             src: item.urls.full,
//             // url: items.urls.regular,
//           }));
//         }
//         if (activeTab == "videos") {
//           let response = await fetchVedios(query);
//           data = response.videos.map((item) => ({
//             id: item.id,
//             type: "video",
//             title: item.user.name || "video",
//             thumbnail: item.image,
//             src: item.video_files[0].link,
//           }));
//         }
//         if (activeTab == "GIF") {
//           let response = await fetchGifs(query);
//           data = response.data.map((item) => ({
//             id: item.id,
//             type: "GIF",
//             title: item.title || "GIF",
//             thumbnail: item.images.downsized.url,

//             src: item.images.downsized.url,
//           }));
//         }

//         //console.log(data[0]);
//         console.log(data);
//         // console.log("length:", data.length);

//         dispatch(setResults(data));
//       } catch (error) {
//         dispatch(setError(error.message));
//       }
//     };
//     getData();
//   }, [query, activeTab]);

//   if (error) return <h1>Error</h1>;
//   if (loading) return <h1>Loading...</h1>;
//   return (
//     <div className="flex flex-wrap gap-5">
//       {results.map((item, idx) => {
//         return (
//           <div key={idx}>
//             <ResultCard item={item} />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ResultGrid;

import { useDispatch, useSelector } from "react-redux";

import { fetchPhotos, fetchVedios, fetchGifs } from "../api/mediaApi";

import { setLoading, setError, setResults } from "../features/searchSlice";
import { useEffect, useState } from "react";
import ResultCard from "./ResultCard";

// const ResultGrid = () => {
//   const dispatch = useDispatch();
//   const { query, activeTab, results, loading, error } = useSelector(
//     (store) => store.search,
//   );

//   useEffect(() => {
//     // console.log("Query:", query, "ActiveTab:", activeTab);
//     if (!query) return;

//     const getData = async () => {
//       try {
//         dispatch(setLoading(true));

//         let data = [];

//         if (activeTab === "photos") {
//           const response = await fetchPhotos(query);
//           data = response.results.map((item) => ({
//             id: item.id,
//             type: "photo",
//             title: item.alt_description || "Photo",
//             thumbnail: item.urls.small,
//             src: item.urls.full,
//             url: item.src,
//             // url: item.urls.regular,
//             // url: item.links.html,
//             url: item.links.html,
//           }));
//           // console.log(data.url);
//         }

//         if (activeTab == "videos") {
//           let response = await fetchVedios(query);
//           data = response.videos.map((item) => ({
//             id: item.id,
//             type: "video",
//             title: item.user.name || "video",
//             thumbnail: item.image,
//             src: item.video_files[0].link,
//             url: item.url,
//           }));
//         }
//         if (activeTab == "GIF") {
//           let response = await fetchGifs(query);
//           data = response.data.map((item) => ({
//             id: item.id,
//             type: "GIF",
//             title: item.title || "GIF",
//             thumbnail: item.images.downsized.url,
//             url: item.url,

//             src: item.images.downsized.url,
//           }));
//         }
//         console.log(data);

//         dispatch(setResults(data));
//       } catch (err) {
//         dispatch(setError(err.message));
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     getData();
//   }, [query, activeTab, dispatch]);

//   if (error) return <h1>Error: {error}</h1>;
//   if (loading) return <h1>Loading...</h1>;

//   return (
//     <div className="flex justify-center flex-wrap gap-6 p-5  overflow-auto">
//       {results.map((item) => (
//         <ResultCard key={item.id} item={item} />
//       ))}
//     </div>
//   );
// };

// export default ResultGrid;

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search,
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [query, activeTab]);

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        dispatch(setLoading(true));
        let data = [];

        if (activeTab === "photos") {
          const response = await fetchPhotos(query, page);
          data = response.results.map((item) => ({
            id: item.id,
            type: "photo",
            title: item.alt_description || "Photo",
            thumbnail: item.urls.small,
            src: item.urls.full,
            url: item.links.html,
          }));
        }

        if (activeTab === "videos") {
          const response = await fetchVedios(query, page);
          data = response.videos.map((item) => ({
            id: item.id,
            type: "video",
            title: item.user.name || "Video",
            thumbnail: item.image,
            src: item.video_files[0].link,
            url: item.url,
          }));
        }

        if (activeTab === "GIF") {
          // const response = await fetchGifs(query, (page - 1) * 20);
          const response = await fetchGifs(query, page);
          data = response.data.map((item) => ({
            id: item.id,
            type: "gif",
            title: item.title || "gif",
            thumbnail: item.images.fixed_width.url, // ✅ use fixed_width for grid
            src: item.images.original.url, // full-size GIF
            url: item.url, // Giphy page link
          }));
          console.log(data);
        }

        dispatch(setResults(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    getData();
  }, [query, activeTab, page, dispatch]);

  if (error) return <h1>Error: {error}</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className="flex justify-center flex-wrap gap-6 p-5 bg-black">
        {results.map((item) => (
          <ResultCard key={item.id} item={item} />
        ))}
      </div>

      {/* Pagination Controls */}
      {results.length > 0 && (
        <div className="flex justify-center items-center gap-4 pb-6 bg-black text-white ">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 active:scale-95"
          >
            Prev
          </button>

          <span className="font-medium">Page {page}</span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-black text-white rounded active:scale-95"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ResultGrid;

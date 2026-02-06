// // import React from "react";

// // const ResultCard = () => {
// // return <div className="w-96 h-96 bg-white rounded">ResultCard</div>;
// // };

// // export default ResultCard;

// import React from "react";

// const ResultCard = ({ item }) => {
//   if (!item) return null; // safety check

//   return (
//     <div className="w-60 h-60 bg-white rounded shadow-md overflow-hidden flex flex-col">
//       {/* Thumbnail */}
//       <img
//         src={item.thumbnail}
//         alt={item.title}
//         className="w-full h-40 object-cover"
//       />

//       {/* Title */}
//       <div className="p-2 flex-1 flex flex-col justify-between">
//         <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>

//         {/* Optional link to full image/video
//         {item.src && (
//           <a
//             href={item.src}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 text-xs mt-1"
//           >
//             View Full
//           </a>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default ResultCard;

/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { addCollection, addedToast } from "../features/collectionSlice";

const ResultCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCollection = (item) => {
    dispatch(addCollection(item));
    dispatch(addedToast());
  };

  return (
    <div className="w-[18vw] relative h-80 bg-white rounded-xl overflow-hidden">
      <a target="_blank" className="h-full" href={item.url}>
        {item.type == "photo" ? (
          <img
            className="h-full w-full object-cover object-center"
            loading="lazy"
            src={item.src}
            alt=""
          />
        ) : (
          ""
        )}
        {item.type == "video" ? (
          <video
            loading="lazy"
            className="h-full w-full object-cover object-center"
            autoPlay
            loop
            muted
            src={item.src}
          ></video>
        ) : (
          ""
        )}
        {item.type == "gif" ? (
          <img
            className="h-full w-full object-cover object-center"
            loading="lazy"
            src={item.src}
            alt=""
          />
        ) : (
          ""
        )}
      </a>
      <div
        id="bottom"
        className="flex justify-between gap-3 items-center w-full px-4 py-6 absolute bottom-0 text-white"
      >
        <h2 className="text-lg font-semibold capitalize h-14 overflow-hidden">
          {item.title}
        </h2>
        <button
          onClick={() => {
            addToCollection(item);
          }}
          className="bg-indigo-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ResultCard;

import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../features/searchSlice";

const Tabs = () => {
  const tabs = ["photos", "videos", "GIF"];
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div className="flex gap-10 p-10 bg-black">
      {tabs.map((elem, idx) => (
        <button
          key={idx}
          onClick={() => dispatch(setActiveTab(elem))}
          className={`px-5 py-2 rounded-md uppercase text-sm font-semibold
            transition-all duration-200 active:scale-95
            ${
              activeTab === elem
                ? "bg-blue-700 text-white"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
        >
          {elem}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

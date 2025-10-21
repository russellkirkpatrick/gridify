import { useEffect, useState, useContext } from "react";
import { TracksContext } from "../Store.jsx";
import { useNavigate } from "react-router-dom";


const Stats = () => {
  const navigate = useNavigate()
  const { setLimit, setTrackList } = useContext(TracksContext);
  const [range, setRange] = useState("medium_term")
  const [limit, setLocalLimit] = useState(50)
  const [tracks, setTracks] = useState([])
  


  useEffect(() => {
    fetch(`https://gridify-api.onrender.com/tracks/${range}`)
      .then(res => res.json())
      .then(data => {  
        setTrackList(data)
        setTracks(data)
      })
  }, [range])

  useEffect(() => {
    console.log(tracks)
  })

  const handleChangeRange = (e) => {
    setRange(e.target.value);
  };
  
  const handleChangeLimit = (e) => {
    setLocalLimit(e.target.value)
    setLimit(e.target.value);
  };

  const createPlaylist = () => {
    const uris = (tracks || []).map(t => t.uri).filter(Boolean);
    navigate("/save", { state: { tracks, range, limit } });
  };
  
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[8%] w-full max-w-[600px] p-8 rounded-md text-center">
      <div className="flex justify-center items-center">
        <h3 className="shimmer-sky">range</h3>
        <div className="relative inline-block m-[5px]">
          <select
            value={range}
            onChange={handleChangeRange}
            className="
              appearance-none
              bg-white/90 text-gray-900
              px-2 py-1 pr-6
              rounded-md border border-gray-300
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-emerald-400
              transition
              text-sm
              h-[30px]
            "
          >
            <option value="short_term">Month</option>
            <option value="medium_term">6 Months</option>
            <option value="long_term">Year</option>
          </select>
        </div>

        <h3 className="shimmer-sky">limit</h3>
        <div className="relative inline-block m-[5px]">
          <select
            value={limit}
            onChange={handleChangeLimit}
            className="
              appearance-none
              bg-white/90 text-gray-900
              px-2 py-1 pr-6
              rounded-md border border-gray-300
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-emerald-400
              transition
              text-sm
              h-[30px]
            "
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        <button
          className="
            bg-[#1DB954] text-white
            px-2 py-[3px]
            rounded-md
            shadow-sm
            hover:bg-[#1ed760]
            focus:outline-none focus:ring-2 focus:ring-[#1DB954]/50
            transition
            text-sm
            h-[30px]
          "
          onClick={createPlaylist}        
        >
          save
        </button>
      </div>
      
      {/* <Area tracks={tracks} /> */}

      
      {/* {tracks.length > 0 ? 
        <div className="bg-[darkslategrey] p-8 rounded-md text-center">
          <ul>
            {tracks.map((track, i) => i < limit && (
              <li key={track.id}>{track.name}</li>
            ))}
          </ul>
        </div>
      : <></>} */}
    </div>
  );
}

export default Stats
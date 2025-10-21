import { createContext, useState, useContext } from "react";

export const TracksContext = createContext();

export const Store = ({ children }) => {
  const [limit, setLimit] = useState(50)
  const [trackList, setTrackList] = useState([]);

  return (
    <TracksContext.Provider value={{ limit, setLimit, trackList, setTrackList }}>
      {children}
    </TracksContext.Provider>
  );
};
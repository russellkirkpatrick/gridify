// src/components/DraggablePlayground.jsx
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const Area = ({tracks = []}) => {
  const containerRef = useRef(null);
  const [selected, setSelected] = useState(null);

  return (
    <div className="relative w-full h-[calc(100vh-10rem)]" ref={containerRef}>
      {/* static label that changes on click */}
      <div className="absolute left-4 top-4 z-50 bg-black/60 text-white px-3 py-2 rounded">
        {selected ? `${selected.title} — ${selected.artist}` : "Click a card…"}
      </div>

      {/* the cards */}
      {tracks.map((track, i) => {
        const img = track?.album?.images?.length
          ? track.album.images[0]?.url
          : null;
        
        return(
          <motion.button
            key={i}
            type="button"
            className="absolute w-28 h-28 rounded-lg overflow-hidden shadow border border-white/10 bg-white/10 backdrop-blur"
            style={{
              // drop them in roughly different spots so you see multiple
              left: 40 + (i * 30) % 300,
              top: 100 + (i * 40) % 300,
            }}
            drag
            dragConstraints={containerRef}
            dragMomentum={false}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(track)}
          >
            {track.album.images ? (
              <img
                src={img}
                alt={track.album.name}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable={false}
              />
            ) : (
              <div className="grid place-items-center w-full h-full text-white/80 text-xs">
                No image
              </div>
            )}
          </motion.button>
        )})}
    </div>
  );
}

export default Area
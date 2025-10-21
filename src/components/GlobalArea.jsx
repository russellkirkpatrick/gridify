import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { TracksContext } from "../Store.jsx";

const GlobalArea = ({ dragBoundsRef }) => {
  const { limit, trackList } = useContext(TracksContext);

  return (
    <>
      {trackList.map((track, i) => {
        const img = track?.album?.images?.[0]?.url || null;
        let size = 70;
        // if (window.innerWidth < ) size = 40;
        // else if (window.innerWidth < 500) size = 60;
        if (window.innerWidth < 450) size = 40;

        if (window.innerWidth > 1000) size = 80;
       
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        const topMargin = screenH * 0.20; // 10% from top
        const bottomMargin = screenH * 0.15; // instead of 0.10

        const columns = 5;
        const rows = Math.ceil(trackList.length / columns);

        const usableW = screenW * 0.70; // roughly accounts for ~15% margins on each side
        const usableH = screenH - (topMargin + bottomMargin);

        const rawGapX = (usableW - columns * size) / (columns - 1);
        const rawGapY = (usableH - rows * size) / (rows - 1);

        const isVeryWide = screenW >= 1000;
        const MAX_WIDE_GAP = 28;

        const gapX = isVeryWide ? Math.min(rawGapX, MAX_WIDE_GAP) : rawGapX;
        const gapY = isVeryWide ? Math.min(rawGapY, MAX_WIDE_GAP) : rawGapY;

        // ✅ now gridWidth exists, so marginX can use it
        const gridWidth = columns * size + (columns - 1) * gapX;
        const marginX = Math.max((screenW - gridWidth) / 2, screenW * 0.05);

        const col = i % columns;
        const row = Math.floor(i / columns);

        const left = marginX + col * (size + gapX);
        const top = topMargin + row * (size + gapY);


        if (i < limit) {
          return (
            <motion.button
              key={i}
              type="button"
              style={{
                width: size,
                height: size,
                left,
                top,
              }}
              className="absolute pointer-events-auto rounded-lg overflow-hidden shadow border border-white/20 bg-white/10 backdrop-blur"
              drag
              dragConstraints={dragBoundsRef}
              dragMomentum={false}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {img ? (
                <img
                  src={img}
                  alt={track?.album?.name || track?.name || "Album"}
                  style={{
                    width: size,
                    height: size,
                  }}
                  className="w-[70px] h-[70px] object-cover pointer-events-none select-none"
                  draggable={false}
                />
              ) : (
                <div className="grid place-items-center w-full h-full text-xs text-white/80">
                  No image
                </div>
              )}
            </motion.button>
          );
        }
      })}
    </>
  );
};

export default GlobalArea;
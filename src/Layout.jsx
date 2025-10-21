import { useRef } from "react";
import { useLocation } from "react-router-dom";


import Body from "./components/Body.jsx";
import Footer from "./components/Footer.jsx";
import GlobalArea from "./components/GlobalArea.jsx";
import Header from "./components/Header.jsx";

const Layout = () => {  
  const dragBoundsRef = useRef(null);
  const { pathname } = useLocation();
  
  const shouldShow = pathname.endsWith("/connected");

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={`${import.meta.env.BASE_URL}img/clouds_5.mp4`} type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex">
          <Body />
        </div>
        <Footer />
      </div>


      {shouldShow && (
        <div ref={dragBoundsRef} className="fixed inset-0 z-20 pointer-events-none">
          <GlobalArea dragBoundsRef={dragBoundsRef} />
      </div>
      )}
      
    </div>
  );
};
 
export default Layout;
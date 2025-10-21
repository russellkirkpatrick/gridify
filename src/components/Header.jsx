import { useNavigate } from "react-router-dom";

const Header = () => {  

  const navigate = useNavigate()
  const goHome = () => {
    navigate("/");
  };

  return (
    <header className="text-white flex justify-center items-center pt-[50px] text-[25px]">
      <button className="shimmer-sky" onClick={goHome}>Gridify</button>
    </header>
  );
};
 
export default Header;
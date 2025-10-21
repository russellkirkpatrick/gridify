import { useEffect } from "react";

const Login = () => {
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "login_failed") {
      alert("Login failed. Please try again.");
    }
  }, []);

  const login = () => {
    window.location.href = "https://gridify-api.onrender.com/login";
  };

  return (
    <div className="p-8 rounded-md text-center">
      <button id="login" onClick={login}>
        <img className="h-[30px] w-[30px]" src="/img/spotifyLogo.png"></img>
      </button>
    </div>
  );
};

export default Login
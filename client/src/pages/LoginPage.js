import { useState, useContext } from "react";
import { Input } from "@material-tailwind/react";

import { Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    
    if (res.ok) {
      alert("You are Loged In !")
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
 
      <h1 className="w-full flex justify-center mb-10">Login page</h1>
      <form className="flex justify-center" onSubmit={login}>
        <div className="flex flex-col items-center">
          <div className="w-72 mb-2">
            <Input
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-72 mb-2">
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn_submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

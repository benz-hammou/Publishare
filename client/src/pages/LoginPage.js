import { useState, useContext } from "react";
import { Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { API_BASE_URL } from "../constants";
import { fetchAPI } from "../utiles/apiCallStorage";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const login = async (e) => {
    try {
      e.preventDefault();
      const res = await fetchAPI(`${API_BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      alert("You are Loged In !");
      setUserInfo(res);
      navigate("/");
      localStorage.setItem("token", res.token);
    } catch (error) {
      console.log(
        "Fetche error: Logging in is not possible, please try again",
        error
      );
    }
  };

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

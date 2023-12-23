import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        alert("Registration successful, profile are create, you can now Login with your Username");
        const data = await res.json();
        navigate("/")
        console.log(data);
      } else {
        alert("registration failed");
      }

    } catch (error) {
      console.log(
        "Fetche error: The profile could not be registred, please try again",
        error
      );
    }
  };

  return (
    <div>
      <h1 className="w-full flex justify-center mb-10">Register page</h1>
      <form className="flex justify-center" onSubmit={register}>
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
          <button className="btn_submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

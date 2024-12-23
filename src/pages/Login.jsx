import { useState } from "react";
import "./login.css";
import Error from "../components/Login/Error";
import { useRef } from "react";
import { login } from "../app/features/logstatus";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Login() {
  let navigation = useNavigate()
  let dispatch = useDispatch()
  let username = useRef(null);
  let password = useRef(null);
  let [user, setUser] = useState("");
  let [pass, setPass] = useState("");
  let [userError, setUserError] = useState("");
  let [passError, setPassError] = useState("");  
  if(localStorage.getItem("login")==="true"){
    navigation("/E-commerce-React-/")
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (user.length <= 8) {
      setUserError("must be more than 8 charachter");
    }else if (pass.length <= 8) {
      setUserError("")
      setPassError("must be more than 8 charachter");
    }else{
      dispatch(login(true))
      navigation("/E-commerce-React-/")
    }
  }
  return (
    <div className="flex justify-center flex-col items-center gap-4 ">
      <h1 className="text-6xl">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-72 bg-gray-100 p-4 items-center gap-2"
      >
        <label htmlFor="username">Username</label>
        <input
          ref={username}
          onChange={(e) => {
            setUser(e.target.value);
          }}
          value={user}
          className="input"
          placeholder="username"
          id="username"
          type="text"
        />
        <Error text={userError} />
        <label htmlFor="password">Password</label>
        <input
          ref={password}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          value={pass}
          className="input"
          placeholder="password"
          id="password"
          type="password"
        />
        <Error text={passError} />
        <button className="bg-blue-600 w-fit text-white px-8 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

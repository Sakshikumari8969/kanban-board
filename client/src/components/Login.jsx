import React, { useState } from "react";
import "../styles/Login.css";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("patelvirendra62@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessages, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    api
      .post(`/api/accounts/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        const token = data.token;
        localStorage.setItem("auth-token", token);
        setSuccessMessage("Login successful");
        navigate("/board/list");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Login failed");
      });

    console.log({
      email,
      password,
    });
  };

  function onEmailChange(e) {
    setEmail(e.target.value);
  }
  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="login-container shadow">
      <h1>User Login Form</h1>
      <hr />
      {errorMessage && <p className="error">{errorMessage}</p>}

      {successMessages && <p className="success">{successMessages}</p>}

      <form onSubmit={handleSubmit}>
        <section>
          <label>Email </label>
          <input type="email" value={email} onChange={onEmailChange} />
        </section>
        <br />
        <section>
          <label>Password </label>
          <input type="password" value={password} onChange={onPasswordChange} />
        </section>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

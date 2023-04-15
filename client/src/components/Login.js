import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      console.log(email);
      console.log(password);
      setEmail("");
      setPassword("");
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter the login credentials");
    }
  };
  return (
    <div className="container">
      <h1>User Login Form</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <label>Email : </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>
        <br />
        <section>
          <label>Passoword : </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>
        <br />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

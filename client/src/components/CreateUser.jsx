import React, { useState } from "react";
import "../styles/CreateUser.css";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
// import { response } from "express";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("9145212250");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessages, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    api
      .post(`/api/accounts/register`, {
        name: name,
        email: email,
        password: password,
        phone: phone,
      })
      .then((response) => {
        setSuccessMessage("Registered Successfully");
        navigate("/accounts/login");
      })
      .catch((error) => {
        setErrorMessage("registration failed");
      });
  };
  return (
    <div className="create-container">
      <h1>User Registration Form</h1>

      <hr />
      {errorMessage && <p className="error">{errorMessage}</p>}

      {successMessages && <p className="success">{successMessages}</p>}

      <form onSubmit={handleSubmit}>
        <section>
          <label>Name : </label>
          <input
            type="text"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </section>
        <br />
        <section>
          <label>Email : </label>
          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </section>
        <br />
        <section>
          <label>Password :</label>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </section>
        <br />
        <section>
          <label>Phone :</label>
          <input
            type="number"
            value={phone}
            placeholder="mobile number"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </section>
        <div class="col-12" />
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="invalidCheck"
            required
          />
          <label class="form-check-label" for="invalidCheck">
            Agree to terms and conditions
          </label>
          <div class="invalid-feedback">
            You agree before submitting this form.
          </div>
        </div>

        <button style={{ color: "black", fontWeight: "bold" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

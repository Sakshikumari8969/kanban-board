import React, { useState } from "react";
import "../styles/CreateUser.css";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && password && phone) {
      console.log(name);
      console.log(email);
      console.log(password);
      console.log(phone);
      alert("Thanks for registering here");

      setEmail("");
      setName("");
      setPassword("");
      setPhone("");
    } else {
      alert("Please enter the complete fields");
    }
  };
  return (
    <div className="create-container">
      <h1>User Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <section
          style={{ color: "black", fontStyle: "italic", fontWeight: "bold" }}
        >
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
        <section
          style={{ color: "black", fontStyle: "italic", fontWeight: "bold" }}
        >
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
        <section
          style={{ color: "black", fontStyle: "italic", fontWeight: "bold" }}
        >
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
        <section
          style={{ color: "black", fontStyle: "italic", fontWeight: "bold" }}
        >
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

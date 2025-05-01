import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignupForm.css";

export default function SignupForm() {
  const navigate = useNavigate();

  const [name, setName] = useState({ first: "", middle: "", last: "" });
  const [isBusiness, setIsBusiness] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState({
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [image, setImage] = useState({ url: "", alt: "" });
  const [resume, setResume] = useState(""); // placeholder

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.first.trim()) errs.first = "First name is required";
    if (!name.last.trim()) errs.last = "Last name is required";
    if (!email.match(/^\S+@\S+\.\S+$/)) errs.email = "Valid email required";
    if (password.length < 6) errs.password = "Password ≥ 6 characters";
    if (!address.country.trim()) errs.country = "Country is required";
    if (!address.city.trim()) errs.city = "City is required";
    if (!address.street.trim()) errs.street = "Street is required";
    if (address.houseNumber && isNaN(Number(address.houseNumber)))
      errs.houseNumber = "Must be a number";
    // zip is optional
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const payload = {
      name: {
        first: name.first,
        middle: name.middle || "",
        last: name.last,
      },
      isBusiness,
      phone,
      email,
      password,
      address: {
        state: address.state,
        country: address.country,
        city: address.city,
        street: address.street,
        houseNumber: address.houseNumber ? Number(address.houseNumber) : 0,
        zip: address.zip ? Number(address.zip) : 0,
      },
      image: {
        url: image.url,
        alt: image.alt,
      },
      resume, // placeholder string
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL || "http://localhost:3001"}/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      navigate("/login");
    } catch (err) {
      alert("Signup failed: " + err.message);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h3>Create Your Account</h3>

      <fieldset>
        <legend>Name</legend>
        <input
          type="text"
          placeholder="First name"
          value={name.first}
          onChange={(e) => setName(n => ({ ...n, first: e.target.value }))}
        />
        {errors.first && <span className="error">{errors.first}</span>}
        <input
          type="text"
          placeholder="Middle name"
          value={name.middle}
          onChange={(e) => setName(n => ({ ...n, middle: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Last name"
          value={name.last}
          onChange={(e) => setName(n => ({ ...n, last: e.target.value }))}
        />
        {errors.last && <span className="error">{errors.last}</span>}
      </fieldset>

      <label>
        <input
          type="checkbox"
          checked={isBusiness}
          onChange={e => setIsBusiness(e.target.checked)}
        /> I am a business owner
      </label>

      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <fieldset>
        <legend>Address</legend>
        <input
          type="text"
          placeholder="State"
          value={address.state}
          onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Country"
          value={address.country}
          onChange={e => setAddress(a => ({ ...a, country: e.target.value }))}
        />
        {errors.country && <span className="error">{errors.country}</span>}
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
        />
        {errors.city && <span className="error">{errors.city}</span>}
        <input
          type="text"
          placeholder="Street"
          value={address.street}
          onChange={e => setAddress(a => ({ ...a, street: e.target.value }))}
        />
        {errors.street && <span className="error">{errors.street}</span>}
        <input
          type="text"
          placeholder="House #"
          value={address.houseNumber}
          onChange={e => setAddress(a => ({ ...a, houseNumber: e.target.value }))}
        />
        {errors.houseNumber && <span className="error">{errors.houseNumber}</span>}
        <input
          type="text"
          placeholder="ZIP (optional)"
          value={address.zip}
          onChange={e => setAddress(a => ({ ...a, zip: e.target.value }))}
        />
      </fieldset>

      <fieldset>
        <legend>Image</legend>
        <input
          type="text"
          placeholder="Image URL"
          value={image.url}
          onChange={e => setImage(i => ({ ...i, url: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Image alt text"
          value={image.alt}
          onChange={e => setImage(i => ({ ...i, alt: e.target.value }))}
        />
      </fieldset>

      <input
        type="hidden"
        value={resume || ""}
        onChange={() => {}}
      />

      <button type="submit" className="btn gradient-btn">
        Register
      </button>
    </form>
  );
}

"use client";
import { useState } from "react";
import { registerUser } from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      setMsg("User registered successfully");
    } catch (err) {
      setMsg(err?.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "phone", "password"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            type={field === "password" ? "password" : "text"}
            className="border p-2 w-full"
            value={form[field]}
            onChange={handleChange}
            required
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Register
        </button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
}

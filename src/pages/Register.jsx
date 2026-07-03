import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Button from "../components/common/Button.jsx";
import { useToast } from "../components/common/Toast.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import registerSide from "../assets/register.jpeg";

export default function Register() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";
  const gatingMessage = location.state?.message;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      showToast("Passwords do not match.", "info");
      return;
    }
    const result = register(form);
    if (!result.success) {
      setError(result.error);
      showToast(result.error, "info");
      return;
    }
    showToast("Your Drift & Bloom account is ready.");
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Drift & Bloom for faster checkout and order tracking."
      image={registerSide}
    >
      {gatingMessage && (
        <p className="bg-beige text-charcoal/70 text-sm rounded-lg px-4 py-3 mb-4">
          {gatingMessage}
        </p>
      )}
      {error && (
        <p className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <FiUser
            className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
            size={16}
          />
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full bg-beige rounded-lg pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>
        <div className="relative">
          <FiMail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
            size={16}
          />
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full bg-beige rounded-lg pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>
        <div className="relative">
          <FiLock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
            size={16}
          />
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-beige rounded-lg pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>
        <div className="relative">
          <FiLock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
            size={16}
          />
          <input
            type="password"
            name="confirm"
            required
            value={form.confirm}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full bg-beige rounded-lg pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>
        <Button type="submit" fullWidth size="lg" className="mt-2">
          Create Account
        </Button>
      </form>
      <p className="text-sm text-charcoal/60 text-center mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          state={location.state}
          className="text-olive underline"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

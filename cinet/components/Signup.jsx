"use client"; 
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function SignupFormDemo({ setIsLogin }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    studentId: "",
    year: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to sign up");
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      alert("Signup successful!");

      // Clear the form on successful signup
      setFormData({
        firstname: "",
        lastname: "",
        studentId: "",
        year: "",
        email: "",
        password: "",
      });

    } catch (error) {
      console.error("Error during signup:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    setIsLogin(true); 
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black">
      <h1 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 mb-4 text-left">
        Welcome to CipherNet
      </h1>
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-left mb-2">Sign Up</h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 text-left">
        Create your account to get started.
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer className="flex-1">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              id="firstname"
              name="firstname"
              type="text"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-1">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              id="lastname"
              name="lastname"
              type="text"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
        </div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer className="flex-1">
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              name="studentId"
              type="text"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-1">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          className="bg-gradient-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium"
          type="submit"
          disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up →"}
          <BottomGradient />
        </button>
      </form>

      <button
        className="mt-4 w-full text-neutral-600 hover:text-neutral-800 border rounded-md h-10 font-medium"
        onClick={handleLoginClick}>
        Already have an account? Login
      </button>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={`flex flex-col space-y-2 w-full ${className}`}>{children}</div>
);

"use client"; // Ensure this component is a Client Component
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Login({ setIsLogin }) { // Accept setIsLogin as a prop
  const router = useRouter(); // Initialize the router

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted");
    // Add your login logic here
  };

  const handleSignupClick = () => {
    setIsLogin(false); // Switch to the signup form
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Login</h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please enter your credentials to log in.
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email"  type="email" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password"  type="password" required />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit">
          Login &rarr;
          <BottomGradient />
        </button>
      </form>

      <button
        className="mt-4 w-full text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 border border-neutral-400 rounded-md h-10 font-medium"
        onClick={handleSignupClick}>
        Don't have an account? Sign up
      </button>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span
        className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      {children}
    </div>
  );
};

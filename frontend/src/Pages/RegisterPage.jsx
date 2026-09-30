import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";
import { useState } from "react";
import { registerUser } from "../API/authAPI";
import { registerSchema } from "../Validators/authValidator";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/authSlice";
const Register = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const navigate = useNavigate();
const dispatch = useDispatch();
const registerMutation = useMutation({
  mutationFn: registerUser,
  onSuccess: (data) => {
    setSuccessMessage(data.message);
    setErrorMessage("");

    dispatch(setUser(data.user));
    navigate("/dashboard");
  },

  onError: (error) => {
    setErrorMessage(error.response?.data?.message || "Registration failed");
    setSuccessMessage("");
  },
});
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();

  const result = registerSchema.safeParse(formData);

if (!result.success) {
  setErrorMessage(result.error.issues[0].message);
  return;
}
  registerMutation.mutate(formData);
};
  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#211D35]">
      <Navbar />

      <main className="px-4 pt-32 pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <span className="inline-block rounded-full bg-[#E9FDF1] px-4 py-2 text-sm font-semibold text-[#249653]">
              Start your financial journey
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight">
              Take control of your
              <span className="text-[#6C63FF]"> expenses.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-[#777285]">
              Create your account and start tracking your income, expenses,
              savings, and transaction history in one place.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Track income and expenses",
                "Monitor your remaining balance",
                "Keep a complete transaction history",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E9FDF1] text-[#249653]">
                    ✓
                  </div>
                  <span className="text-[#555064]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-md"
          >
            <div className="rounded-3xl border border-[#E8E5F2] bg-white p-8 shadow-xl shadow-[#211D35]/5">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold">Create your account</h2>

                <p className="mt-2 text-[#777285]">
                  Start managing your money today
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-[#DDD9E8] bg-[#FCFBFE] px-4 py-3 outline-none transition focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#DDD9E8] bg-[#FCFBFE] px-4 py-3 outline-none transition focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-[#DDD9E8] bg-[#FCFBFE] px-4 py-3 outline-none transition focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full rounded-xl border border-[#DDD9E8] bg-[#FCFBFE] px-4 py-3 outline-none transition focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/10"
                  />
                </div>

                <div className="flex items-start gap-3 text-sm text-[#777285]">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#6C63FF]"
                  />

                  <p>I agree to the terms and conditions.</p>
                </div>
                {successMessage && (
                  <p className="text-sm text-[#249653]">{successMessage}</p>
                )}

                {errorMessage && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#6C63FF] py-3.5 font-semibold text-white transition hover:bg-[#5B52E8] hover:shadow-lg hover:shadow-[#6C63FF]/20"
                >
                  Create Account
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#777285]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#6C63FF] hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;

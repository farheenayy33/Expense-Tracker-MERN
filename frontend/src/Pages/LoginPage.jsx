import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../API/authAPI";
import { loginSchema } from "../Validators/authValidator";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/authSlice";

const Login = () => {   
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const loginMutation = useMutation({
    mutationFn: loginUser,

  onSuccess: (data) => {
  console.log("Login successful:", data);
  console.log("User going into Redux:", data.user);

  dispatch(setUser(data.user));
  setErrorMessage("");
  navigate("/dashboard");
},

    onError: (error) => {
      setErrorMessage(
        error.response?.data?.message || "Invalid email or password",
      );
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      console.log(result.error);
      return;
    }

  loginMutation.mutate(formData);  };

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#211D35]">
      <Navbar />

      <main className="relative overflow-hidden pt-26">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#A8F0C6]/40 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#6C63FF]/15 blur-3xl"
        />

        <section className="relative px-6 pb-20 pt-10 lg:px-8 lg:pb-28">
          <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hidden lg:block"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DDD9FF] bg-white px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#6C63FF]" />

                <span className="text-xs font-semibold text-[#6C63FF]">
                  Welcome back
                </span>
              </div>

              <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-tight">
                Your money,
                <br />
                <span className="text-[#6C63FF]">still under control.</span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-[#777285]">
                Sign in to continue tracking your income, expenses, savings, and
                transaction history in one simple place.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                }}
                whileHover={{
                  y: -5,
                }}
                className="mt-10 max-w-md rounded-3xl border border-white bg-white p-6 shadow-[0_20px_60px_rgba(80,65,130,0.12)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#918D9F]">
                      Your financial overview
                    </p>

                    <p className="mt-1 text-2xl font-black text-[#211D35]">
                      Everything in one place
                    </p>
                  </div>

                  <motion.div
                    whileHover={{
                      rotate: 8,
                      scale: 1.08,
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C63FF] text-lg font-bold text-white shadow-lg shadow-[#6C63FF]/25"
                  >
                    $
                  </motion.div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-[#F0EEFF] p-4"
                  >
                    <p className="text-xs font-medium text-[#777285]">Income</p>

                    <p className="mt-1 text-lg font-bold text-[#211D35]">
                      Track
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-[#E9FDF1] p-4"
                  >
                    <p className="text-xs font-medium text-[#777285]">
                      Savings
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#249653]">
                      Monitor
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto w-full max-w-md"
            >
              <motion.div
                whileHover={{
                  y: -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                }}
                className="rounded-3xl border border-white bg-white p-7 shadow-[0_25px_70px_rgba(80,65,130,0.14)] sm:p-9"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0EEFF] text-xl font-black text-[#6C63FF]">
                    $
                  </div>

                  <h2 className="mt-6 text-3xl font-black tracking-tight text-[#211D35] text-center">
                    Welcome back
                  </h2>

                  <p className="mt-2 text-center text-sm leading-6 text-[#777285]">
                    Sign in to access your ExpenseTracker account.
                  </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#383344]"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#E4E0EE] bg-[#FBFAFE] px-4 py-3.5 text-sm text-[#211D35] outline-none transition-all duration-200 placeholder:text-[#A09BAB] focus:border-[#6C63FF] focus:bg-white focus:ring-4 focus:ring-[#6C63FF]/10"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-[#383344]"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        className="text-xs font-semibold text-[#6C63FF] transition-colors hover:text-[#211D35]"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-[#E4E0EE] bg-[#FBFAFE] px-4 py-3.5 text-sm text-[#211D35] outline-none transition-all duration-200 placeholder:text-[#A09BAB] focus:border-[#6C63FF] focus:bg-white focus:ring-4 focus:ring-[#6C63FF]/10"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border-[#D9D5E5] accent-[#6C63FF]"
                    />

                    <label
                      htmlFor="remember"
                      className="text-xs font-medium text-[#777285]"
                    >
                      Remember me
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="relative w-full overflow-hidden rounded-xl bg-[#6C63FF] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#6C63FF]/25"
                  >
                    <motion.span
                      className="absolute inset-0 bg-[#211D35]"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    />

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Sign in
                      <span>→</span>
                    </span>
                  </motion.button>
                </form>

                <div className="my-7 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#E8E5F2]" />

                  <span className="text-xs text-[#A09BAB]">
                    New to ExpenseTracker?
                  </span>

                  <div className="h-px flex-1 bg-[#E8E5F2]" />
                </div>

                <Link
                  to="/register"
                  className="flex w-full items-center justify-center rounded-xl border border-[#DDD9E8] bg-white px-6 py-3.5 text-sm font-bold text-[#383344] transition-all duration-200 hover:border-[#6C63FF] hover:bg-[#F0EEFF] hover:text-[#6C63FF]"
                >
                  Create an account
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Login;

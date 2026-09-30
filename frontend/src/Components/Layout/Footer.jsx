import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-t border-[#E8E5F2] bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="group inline-flex items-center gap-2.5"
            >
              <motion.div
                whileHover={{
                  rotate: 8,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C63FF] text-lg font-bold text-white shadow-lg shadow-[#6C63FF]/25"
              >
                $
              </motion.div>

              <span className="text-[17px] font-bold tracking-tight text-[#211D35]">
                Expense
                <span className="text-[#6C63FF]">Tracker</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-[#777285]">
              Take control of your money, understand where it goes,
              and build better financial habits — one transaction at a time.
            </p>

            {/* Decorative financial stats */}
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                className="rounded-xl bg-[#F0EEFF] px-4 py-2.5"
              >
                <p className="text-xs font-medium text-[#777285]">
                  Track
                </p>
                <p className="text-sm font-bold text-[#6C63FF]">
                  Every Expense
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                className="rounded-xl bg-[#E9FDF1] px-4 py-2.5"
              >
                <p className="text-xs font-medium text-[#777285]">
                  Build
                </p>
                <p className="text-sm font-bold text-[#249653]">
                  Better Habits
                </p>
              </motion.div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-bold text-[#211D35]">
              Product
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-sm text-[#777285] transition-colors duration-200 hover:text-[#6C63FF]"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-[#777285] transition-colors duration-200 hover:text-[#6C63FF]"
                >
                  How it works
                </a>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-sm text-[#777285] transition-colors duration-200 hover:text-[#6C63FF]"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-sm text-[#777285] transition-colors duration-200 hover:text-[#6C63FF]"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-bold text-[#211D35]">
              Features
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <span className="text-sm text-[#777285]">
                  Income Tracking
                </span>
              </li>

              <li>
                <span className="text-sm text-[#777285]">
                  Expense Tracking
                </span>
              </li>

              <li>
                <span className="text-sm text-[#777285]">
                  Savings Overview
                </span>
              </li>

              <li>
                <span className="text-sm text-[#777285]">
                  Transaction History
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#E8E5F2] pt-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-[#918D9F]">
            © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-xs font-medium text-[#777285] transition-colors hover:text-[#6C63FF]"
            >
              Privacy
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-xs font-medium text-[#777285] transition-colors hover:text-[#6C63FF]"
            >
              Terms
            </motion.a>

            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: -2,
              }}
              className="rounded-lg bg-[#211D35] px-3 py-1.5 text-xs font-semibold text-white"
            >
              Your money. Your control.
            </motion.div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;


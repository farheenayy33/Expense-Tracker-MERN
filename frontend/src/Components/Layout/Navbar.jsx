import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-5 py-3.5 shadow-[0_10px_40px_rgba(80,65,130,0.10)] backdrop-blur-xl sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
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

          <motion.span
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
            className="text-[17px] font-bold tracking-tight text-[#211D35]"
          >
            Expense
            <span className="text-[#6C63FF]">Tracker</span>
          </motion.span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <motion.a
            href="#features"
            whileHover={{ y: -1 }}
            className="relative text-sm font-medium text-[#777285] transition-colors duration-200 hover:text-[#6C63FF]"
          >
            Features
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#6C63FF] transition-all duration-300 group-hover:w-full" />
          </motion.a>

          <motion.a
            href="#how-it-works"
            whileHover={{ y: -1 }}
            className="text-sm font-medium text-[#777285] transition-colors duration-200 hover:text-[#6C63FF]"
          >
            How it works
          </motion.a>

          <motion.div whileHover={{ y: -1 }}>
            <Link
              to="/login"
              className="text-sm font-semibold text-[#383344] transition-colors duration-200 hover:text-[#6C63FF]"
            >
              Login
            </Link>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.03,
              y: -1,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <Link
              to="/register"
              className="relative block overflow-hidden rounded-xl bg-[#211D35] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#211D35]/15"
            >
              <motion.span
                className="absolute inset-0 bg-[#6C63FF]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              />

              <span className="relative z-10">Get Started</span>
            </Link>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 items-center gap-2 rounded-xl border border-[#E4E0EE] bg-white px-4 text-sm font-semibold text-[#383344] md:hidden"
        >
          <span className="text-base">☰</span>
          Menu
        </motion.button>
      </nav>

      {menuOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/70 bg-white/95 p-5 shadow-[0_10px_40px_rgba(80,65,130,0.10)] backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[#777285] hover:text-[#6C63FF]"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[#777285] hover:text-[#6C63FF]"
            >
              How it works
            </a>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold text-[#383344]"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold text-[#6C63FF]"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;


import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#211D35]">

      <Navbar />

    
      <main>

        <section className="relative overflow-hidden px-6 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-44">

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

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DDD9FF] bg-white px-4 py-2 shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-[#6C63FF]" />

                <span className="text-xs font-semibold text-[#6C63FF]">
                  Smarter money management
                </span>
              </motion.div>

              <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Your money,
                <br />

                <span className="text-[#6C63FF]">
                  finally organized.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-[#777285] sm:text-lg">
                Track your income, understand your expenses, monitor
                your savings, and see exactly where your money goes —
                all in one simple place.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <motion.div
                  whileHover={{
                    scale: 1.03,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#6C63FF] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#6C63FF]/25"
                  >
                    Start Tracking
                    <span>→</span>
                  </Link>
                </motion.div>

                <motion.a
                  href="#how-it-works"
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="flex items-center justify-center rounded-xl border border-[#DDD9E8] bg-white px-6 py-3.5 text-sm font-bold text-[#383344] shadow-sm"
                >
                  See how it works
                </motion.a>

              </div>

              {/* Small Trust Text */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["F", "A", "S"].map((letter, index) => (
                    <motion.div
                      key={letter}
                      initial={{
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay: 0.7 + index * 0.1,
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F8F7FC] bg-[#211D35] text-[10px] font-bold text-white"
                    >
                      {letter}
                    </motion.div>
                  ))}
                </div>

                <p className="text-xs text-[#777285]">
                  Built for people who want clarity over their money.
                </p>
              </div>
            </motion.div>

            {/* ================= FINANCE CARD ================= */}
            <motion.div
              initial={{
                opacity: 0,
                x: 50,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto w-full max-w-xl"
            >

              {/* Main Card */}
              <motion.div
                whileHover={{
                  y: -6,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                }}
                className="relative rounded-3xl border border-white bg-white p-6 shadow-[0_25px_70px_rgba(80,65,130,0.15)]"
              >

                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#918D9F]">
                      Total Balance
                    </p>

                    <h2 className="mt-1 text-3xl font-black tracking-tight text-[#211D35]">
                      $12,840.50
                    </h2>
                  </div>

                  <div className="rounded-xl bg-[#E9FDF1] px-3 py-2">
                    <p className="text-xs font-bold text-[#249653]">
                      +8.4%
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div className="mt-8 flex h-40 items-end gap-3">

                  {[35, 52, 43, 68, 55, 78, 65, 92, 76, 100].map(
                    (height, index) => (
                      <motion.div
                        key={index}
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: `${height}%`,
                        }}
                        transition={{
                          duration: 0.7,
                          delay: 0.6 + index * 0.06,
                          ease: "easeOut",
                        }}
                        className={`flex-1 rounded-t-lg ${
                          index === 9
                            ? "bg-[#6C63FF]"
                            : "bg-[#E8E5FF]"
                        }`}
                      />
                    )
                  )}

                </div>

                {/* Chart Labels */}
                <div className="mt-3 flex justify-between text-[10px] font-medium text-[#A09BAB]">
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jul</span>
                  <span>Sep</span>
                </div>

                {/* Stats */}
                <div className="mt-7 grid grid-cols-2 gap-3">

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-[#F0EEFF] p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#6C63FF] text-xs text-white">
                        ↑
                      </span>

                      <span className="text-xs font-medium text-[#777285]">
                        Income
                      </span>
                    </div>

                    <p className="mt-2 text-lg font-bold text-[#211D35]">
                      +$8,500
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-[#FFF0EC] p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF9275] text-xs text-white">
                        ↓
                      </span>

                      <span className="text-xs font-medium text-[#777285]">
                        Expenses
                      </span>
                    </div>

                    <p className="mt-2 text-lg font-bold text-[#211D35]">
                      -$2,340
                    </p>
                  </motion.div>

                </div>

              </motion.div>

              {/* Floating Transaction Card */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: 30,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 1,
                }}
                whileHover={{
                  scale: 1.04,
                  y: -4,
                }}
                className="absolute -right-5 bottom-8 hidden w-52 rounded-2xl border border-white bg-white p-4 shadow-[0_15px_40px_rgba(80,65,130,0.15)] sm:block"
              >
                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E9FDF1] text-sm text-[#249653]">
                    +
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#211D35]">
                      Salary Added
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#918D9F]">
                      Today, 10:42 AM
                    </p>
                  </div>

                </div>

                <p className="mt-3 text-lg font-black text-[#249653]">
                  +$5,000
                </p>
              </motion.div>

              {/* Floating Savings Card */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -30,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 1.15,
                }}
                whileHover={{
                  scale: 1.04,
                  y: -4,
                }}
                className="absolute -left-5 top-10 hidden w-44 rounded-2xl border border-white bg-[#211D35] p-4 shadow-[0_15px_40px_rgba(33,29,53,0.25)] sm:block"
              >
                <p className="text-[10px] font-medium text-white/60">
                  Savings
                </p>

                <p className="mt-1 text-xl font-black text-white">
                  $6,160
                </p>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "72%" }}
                    transition={{
                      duration: 1,
                      delay: 1.3,
                    }}
                    className="h-full rounded-full bg-[#A8F0C6]"
                  />
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section
          id="features"
          className="px-6 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <p className="text-sm font-bold uppercase tracking-widest text-[#6C63FF]">
                Everything in one place
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#211D35] sm:text-5xl">
                Know where your money is going.
              </h2>

              <p className="mt-5 text-base leading-7 text-[#777285]">
                ExpenseTracker turns everyday transactions into a clear
                picture of your financial life.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">

              {/* Income */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl bg-[#F0EEFF] p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6C63FF] text-xl text-white">
                  ↑
                </div>

                <h3 className="mt-7 text-xl font-bold">
                  Track Income
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#777285]">
                  Record salaries, payments, savings, and other money
                  coming into your account.
                </p>
              </motion.div>

              {/* Expenses */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl bg-[#FFF0EC] p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF9275] text-xl text-white">
                  ↓
                </div>

                <h3 className="mt-7 text-xl font-bold">
                  Understand Expenses
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#777285]">
                  See what you spend on university, hostel, food,
                  transport, and everything in between.
                </p>
              </motion.div>

              {/* Savings */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl bg-[#E9FDF1] p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#249653] text-xl text-white">
                  $
                </div>

                <h3 className="mt-7 text-xl font-bold">
                  Watch Your Savings
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#777285]">
                  Understand how much remains after expenses and keep
                  your savings goals visible.
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section
          id="how-it-works"
          className="bg-white px-6 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-2xl text-center"
            >
              <p className="text-sm font-bold uppercase tracking-widest text-[#6C63FF]">
                Simple process
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                From transaction to clarity.
              </h2>

              <p className="mt-5 text-base leading-7 text-[#777285]">
                No complicated spreadsheets. Just record what happens
                and let your financial picture become clearer.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-10 md:grid-cols-3">

              {[
                {
                  number: "01",
                  title: "Add your money",
                  description:
                    "Record your salary, payments, savings, or any other income.",
                },
                {
                  number: "02",
                  title: "Record expenses",
                  description:
                    "Add your everyday spending and keep a complete transaction history.",
                },
                {
                  number: "03",
                  title: "See the picture",
                  description:
                    "Understand your remaining balance, savings, and spending patterns.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="relative"
                >
                  <span className="text-6xl font-black text-[#E8E5FF]">
                    {item.number}
                  </span>

                  <h3 className="mt-2 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#777285]">
                    {item.description}
                  </p>
                </motion.div>
              ))}

            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="px-6 py-20 lg:px-8 lg:py-28">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#211D35] px-7 py-14 text-center sm:px-12 lg:py-20"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: 2,
              }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6C63FF] text-2xl font-black text-white"
            >
              $
            </motion.div>

            <h2 className="mx-auto mt-7 max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl">
              Give your money a little more direction.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
              Start tracking your income and expenses and build a
              clearer picture of your financial life.
            </p>

            <motion.div
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="mt-8 inline-block"
            >
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[#A8F0C6] px-6 py-3.5 text-sm font-bold text-[#211D35]"
              >
                Create your account
                <span>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </section>

      </main>

      <Footer />

    </div>
  );
};

export default Landing;


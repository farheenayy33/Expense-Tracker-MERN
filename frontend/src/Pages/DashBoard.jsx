import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getTransactions } from "../API/transactionsAPI";
import { setTransactions } from "../Redux/transactionSlice";
import AddIncome from "../Components/Layout/AddIncome";
import AddExpense from "../Components/Layout/AddExpenses";
import TransactionsUpdates from "../Components/Layout/TransactionsUpdate";
import Profile from "../Components/Layout/Profile";
import AccountMenue from "../Components/Layout/AccountMenue";

const DashboardPage = () => {
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const transactions = useSelector((state) => state.transactions.transactions);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: () => getTransactions(user.id),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (data?.transactions) {
      dispatch(setTransactions(data.transactions));
    }
  }, [data, dispatch]);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const balance = totalIncome - totalExpense;
  const savings = balance;

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-PK");
  };

  const formatDate = (date) => {
    if (!date) return "";

    const transactionDate = new Date(date);
    const now = new Date();

    const difference = now - transactionDate;
    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;

    return transactionDate.toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const recentActivity = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)
    .map((transaction) => {
      const isIncome = transaction.type === "income";
      const amount = formatAmount(transaction.amount);

      return {
        id: transaction._id,
        type: transaction.type,
        title: isIncome ? "Amount Added" : "Expense Recorded",
        description: isIncome
          ? `You added Rs. ${amount} to your account.`
          : `You spent Rs. ${amount} on ${transaction.category}.`,
        amount: `${isIncome ? "+" : "-"} Rs. ${amount}`,
        time: formatDate(transaction.date),
      };
    });

  const sidebarItems = [
    {
      label: "Overview",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      label: "Transactions & Updates",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h10" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      ),
    },
    {
      label: "Profile",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 21c.7-3.5 3.1-5.5 7-5.5s6.3 2 7 5.5" />
        </svg>
      ),
    },
  ];

  const handleMenuClick = (label) => {
    setActiveMenu(label);
    setMobileMenuOpen(false);
  };

  const openIncomeModal = () => {
    setActiveModal("income");
  };

  const openExpenseModal = () => {
    setActiveModal("expense");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FC]">
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-[#E8E5F2] bg-white lg:flex lg:flex-col"
      >
        <div className="flex h-20 items-center border-b border-[#E8E5F2] px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6C63FF] font-bold text-white">
              $
            </div>

            <div>
              <p className="text-lg font-bold leading-none">ExpenseTracker</p>

              <p className="mt-1 text-xs text-[#777285]">Personal finance</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-7">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-[#AAA5B7]">
            Menu
          </p>

          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleMenuClick(item.label)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeMenu === item.label
                    ? "bg-[#F0EEFF] text-[#6C63FF]"
                    : "text-[#777285] hover:bg-[#F8F7FC] hover:text-[#211D35]"
                }`}
              >
                <span className="h-5 w-5">{item.icon}</span>

                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="border-t border-[#E8E5F2] p-4">
          <AccountMenue onAccountClick={() => setActiveMenu("Profile")} />
        </div>
      </motion.aside>

      <header className="sticky top-0 z-30 border-b border-[#E8E5F2] bg-white/90 backdrop-blur lg:hidden">
        <div className="flex h-20 items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6C63FF] font-bold text-white">
              $
            </div>

            <span className="font-bold">ExpenseTracker</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E8E5F2] text-xl text-[#555064]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "×" : "☰"}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          />

          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#E8E5F2] bg-white shadow-xl lg:hidden"
          >
            <div className="flex h-20 items-center justify-between border-b border-[#E8E5F2] px-5">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6C63FF] font-bold text-white">
                  $
                </div>

                <div>
                  <p className="text-lg font-bold leading-none">
                    ExpenseTracker
                  </p>

                  <p className="mt-1 text-xs text-[#777285]">
                    Personal finance
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-[#777285] hover:bg-[#F8F7FC]"
              >
                ×
              </button>
            </div>

            <nav className="flex-1 px-4 py-7">
              <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-[#AAA5B7]">
                Menu
              </p>

              <div className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleMenuClick(item.label)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                      activeMenu === item.label
                        ? "bg-[#F0EEFF] text-[#6C63FF]"
                        : "text-[#777285] hover:bg-[#F8F7FC] hover:text-[#211D35]"
                    }`}
                  >
                    <span className="h-5 w-5">{item.icon}</span>

                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            <div className="border-t border-[#E8E5F2] p-4">
              <div className="flex items-center gap-3 rounded-xl bg-[#F8F7FC] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8E5FF] font-bold text-[#6C63FF]">
                  {user?.name?.charAt(0)?.toUpperCase() || "F"}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {user?.name || "Farheen"}
                  </p>

                  <p className="truncate text-xs text-[#777285]">
                    Personal Account
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}

      <main className="min-h-screen lg:ml-72">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-[#6C63FF]">{activeMenu}</p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Good morning, {user?.name || "Farheen"}
              </h1>

              <p className="mt-2 text-sm text-[#777285] sm:text-base">
                Here's your financial overview.
              </p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={openIncomeModal}
                className="flex-1 rounded-xl border border-[#DDD9E8] bg-white px-4 py-3 text-sm font-semibold text-[#555064] shadow-sm transition hover:border-[#6C63FF] hover:text-[#6C63FF] sm:flex-none"
              >
                + Add Income
              </motion.button>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={openExpenseModal}
                className="flex-1 rounded-xl bg-[#6C63FF] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#6C63FF]/20 transition hover:bg-[#5B52E8] sm:flex-none"
              >
                − Add Expense
              </motion.button>
            </div>
          </motion.div>

          {isLoading && (
            <div className="mb-6 rounded-2xl border border-[#E8E5F2] bg-white p-4 text-sm text-[#777285]">
              Loading your transactions...
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
              Unable to load your transaction data.
            </div>
          )}

          {activeMenu === "Overview" && (
            <>
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                whileHover={{ y: -3 }}
                className="relative overflow-hidden rounded-3xl bg-[#211D35] p-6 text-white shadow-xl shadow-[#211D35]/10 sm:p-8"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#6C63FF]/30 blur-2xl" />

                <div className="absolute -bottom-20 right-20 h-44 w-44 rounded-full bg-[#249653]/20 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm text-white/60">Available Balance</p>

                      <h2
                        className={`mt-3 text-4xl font-bold tracking-tight sm:text-5xl ${
                          balance < 0 ? "text-[#FF9275]" : ""
                        }`}
                      >
                        {isLoading ? "..." : `Rs. ${formatAmount(balance)}`}
                      </h2>

                      <p className="mt-3 text-sm text-white/50">
                        Your current available amount
                      </p>
                    </div>

                    <div className="w-fit rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                      <p className="text-xs text-white/50">Account ID</p>

                      <p className="mt-1 font-mono text-sm font-semibold">
                        ET-4821
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">
                        Account status
                      </span>

                      <span className="flex items-center gap-2 text-sm font-medium text-[#A8F0C6]">
                        <span className="h-2 w-2 rounded-full bg-[#249653]" />
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </motion.section>

              <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-[#E8E5F2] bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-[#777285]">Total Income</p>

                      <p className="mt-2 text-2xl font-bold">
                        {isLoading ? "..." : `Rs. ${formatAmount(totalIncome)}`}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E9FDF1] text-lg font-bold text-[#249653]">
                      ↑
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-[#249653]">
                    Amount added to account
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-[#E8E5F2] bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-[#777285]">Total Expenses</p>

                      <p className="mt-2 text-2xl font-bold">
                        {isLoading
                          ? "..."
                          : `Rs. ${formatAmount(totalExpense)}`}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0EC] text-lg font-bold text-[#FF9275]">
                      ↓
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-[#FF9275]">
                    Amount spent so far
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-[#E8E5F2] bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-[#777285]">Savings</p>

                      <p className="mt-2 text-2xl font-bold">
                        {isLoading ? "..." : `Rs. ${formatAmount(savings)}`}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0EEFF] text-lg font-bold text-[#6C63FF]">
                      $
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-[#6C63FF]">
                    Current income − expenses
                  </p>
                </motion.div>
              </section>

              <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-2xl border border-[#E8E5F2] bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E8E5F2] p-5 sm:p-6">
                    <div>
                      <h2 className="font-bold">Recent Activity</h2>

                      <p className="mt-1 text-xs text-[#777285]">
                        Your latest account activity
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveMenu("Transactions & Updates")}
                      className="text-sm font-semibold text-[#6C63FF] transition hover:underline"
                    >
                      View all
                    </button>
                  </div>

                  <div className="divide-y divide-[#F0EEF5]">
                    {recentActivity.length > 0 ? (
                      recentActivity.map((activity) => (
                        <motion.div
                          key={activity.id}
                          whileHover={{ backgroundColor: "#FCFBFE" }}
                          className="flex items-center gap-4 p-5 transition sm:p-6"
                        >
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                              activity.type === "income"
                                ? "bg-[#E9FDF1] text-[#249653]"
                                : "bg-[#FFF0EC] text-[#FF9275]"
                            }`}
                          >
                            {activity.type === "income" ? "↑" : "↓"}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                              {activity.title}
                            </p>

                            <p className="mt-1 truncate text-xs text-[#777285]">
                              {activity.description}
                            </p>

                            <p className="mt-1 text-[11px] text-[#AAA5B7]">
                              {activity.time}
                            </p>
                          </div>

                          <p
                            className={`shrink-0 text-sm font-bold ${
                              activity.type === "income"
                                ? "text-[#249653]"
                                : "text-[#FF9275]"
                            }`}
                          >
                            {activity.amount}
                          </p>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-sm font-medium text-[#555064]">
                          No transactions yet
                        </p>

                        <p className="mt-1 text-xs text-[#777285]">
                          Add your first income or expense to see it here.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="rounded-2xl border border-[#E8E5F2] bg-white p-5 shadow-sm sm:p-6"
                >
                  <h2 className="font-bold">Quick Actions</h2>

                  <p className="mt-1 text-xs text-[#777285]">
                    Manage your money
                  </p>

                  <div className="mt-6 space-y-3">
                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={openIncomeModal}
                      className="flex w-full items-center gap-4 rounded-xl border border-[#E8E5F2] p-4 text-left transition hover:border-[#6C63FF] hover:bg-[#F8F7FC]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E9FDF1] font-bold text-[#249653]">
                        +
                      </span>

                      <div>
                        <p className="text-sm font-semibold">Add Amount</p>

                        <p className="mt-1 text-xs text-[#777285]">
                          Record new income
                        </p>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={openExpenseModal}
                      className="flex w-full items-center gap-4 rounded-xl border border-[#E8E5F2] p-4 text-left transition hover:border-[#FF9275] hover:bg-[#FFF0EC]/40"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF0EC] font-bold text-[#FF9275]">
                        −
                      </span>

                      <div>
                        <p className="text-sm font-semibold">Add Expense</p>

                        <p className="mt-1 text-xs text-[#777285]">
                          Record money spent
                        </p>
                      </div>
                    </motion.button>
                  </div>

                  <div className="mt-6 rounded-xl bg-[#F0EEFF] p-4">
                    <p className="text-xs font-semibold text-[#6C63FF]">
                      Financial tip
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#777285]">
                      Keep an eye on your available balance after every
                      transaction.
                    </p>
                  </div>
                </motion.div>
              </section>
            </>
          )}

          {activeMenu === "Transactions & Updates" && <TransactionsUpdates />}
          {activeMenu === "Profile" && <Profile />}
        </div>
      </main>

      {activeModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-[#777285] shadow-sm transition hover:bg-[#F8F7FC] hover:text-[#211D35]"
              aria-label="Close modal"
            >
              ×
            </button>

            {activeModal === "income" && <AddIncome onSuccess={closeModal} />}

            {activeModal === "expense" && <AddExpense onSuccess={closeModal} />}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

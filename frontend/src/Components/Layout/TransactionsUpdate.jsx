import { useSelector } from "react-redux";
const TransactionsUpdates = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const formatAmount = (amount) => {
    return `Rs. ${Number(amount).toLocaleString()}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const getMessage = (transaction) => {
    if (transaction.type === "income") {
      return `You received ${formatAmount(transaction.amount)} as ${transaction.category}.`;
    }

    return `You spent ${formatAmount(transaction.amount)} on ${transaction.category}.`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Transactions & Updates
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View your complete transaction history and account updates.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          All Transactions
        </h2>

        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500">No transactions yet.</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.category}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {transaction.description || "No description"}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {formatDate(transaction.date)}
                  </p>
                </div>

                <p
                  className={`font-semibold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatAmount(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">Updates</h2>

        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500">No updates yet.</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={`update-${transaction._id}`}
                className="rounded-xl border border-gray-100 p-4"
              >
                <p className="text-sm font-medium text-gray-800">
                  {getMessage(transaction)}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {formatDate(transaction.date)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsUpdates;

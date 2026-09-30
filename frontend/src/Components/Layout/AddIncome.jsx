import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addIncome } from "../../API/transactionsAPI";

const AddIncome = ({ onSuccess }) => {
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const incomeMutation = useMutation({
    mutationFn: addIncome,

    onSuccess: () => {
      setMessage("Income added successfully!");

      setFormData({
        amount: "",
        category: "",
        description: "",
      });

      queryClient.invalidateQueries({
        queryKey: ["transactions", user?.id],
      });

      onSuccess?.();
    },

    onError: (error) => {
      console.error("Error adding income:", error);
      setMessage("Failed to add income.");
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

    if (!user?.id) {
      setMessage("User not found. Please login again.");
      return;
    }

    const incomeData = {
      userId: user.id,
      amount: Number(formData.amount),
      category: formData.category,
      description: formData.description,
    };

    setMessage("");
    incomeMutation.mutate(incomeData);
  };

  return (
    <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Add Income</h2>

        <p className="mt-1 text-sm text-gray-500">Add money to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Amount
          </label>

          <input
            id="amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            min="0"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Category
          </label>

          <input
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Salary"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add a description"
            rows="3"
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-gray-400"
          />
        </div>

        {message && (
          <p className="text-sm font-medium text-gray-600">{message}</p>
        )}

        <button
          type="submit"
          disabled={incomeMutation.isPending}
          className="w-full rounded-xl bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {incomeMutation.isPending ? "Adding..." : "Add Income"}
        </button>
      </form>
    </div>
  );
};

export default AddIncome;

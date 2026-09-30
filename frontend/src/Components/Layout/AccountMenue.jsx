import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/authSlice";

const AccountMenue = ({ onAccountClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/login");
  };

  const handleAccount = () => {
    setMenuOpen(false);

    if (onAccountClick) {
      onAccountClick();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3 rounded-xl bg-[#F8F7FC] p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8E5FF] font-bold text-[#6C63FF]">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#211D35]">
            {user?.name || "User"}
          </p>

          <p className="truncate text-xs text-[#777285]">
            Personal Account
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-[#777285] transition hover:bg-white hover:text-[#6C63FF]"
          aria-label="Account menu"
        >
          ⋮
        </button>
      </div>

      {menuOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-40 rounded-xl border border-[#E8E5F2] bg-white p-1.5 shadow-lg">
          <button
            type="button"
            onClick={handleAccount}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#555064] transition hover:bg-[#F8F7FC]"
          >
            Account
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountMenue;


import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const getInitial = () => {
    return user?.name?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account information.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-xl font-semibold text-white">
            {getInitial()}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {user?.name || "User"}
            </h2>

            <p className="text-sm text-gray-500">
              {user?.email || "No email available"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="mt-1 font-medium text-gray-900">
              {user?.name || "Not available"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="mt-1 font-medium text-gray-900">
              {user?.email || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

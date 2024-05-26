import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import UpdateProfile from "../../../components/Modal/UpdateProfile";
import { useState } from "react";
import ChangePassword from "../../../components/Modal/ChangePassword";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenChange, setIsModalOpenChange] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModalChange = () => {
    setIsModalOpenChange(true);
  };

  const handleCloseModalChange = () => {
    setIsModalOpenChange(false);
  };

  if (loading || isLoading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl w-3/5">
        <img
          alt="profile"
          src="https://wallpapercave.com/wp/wp10784415.jpg"
          className="w-full mb-4 rounded-t-lg h-36"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />
          </a>

          {role && (
            <p className="p-2 px-4 text-xs text-white bg-pink-500 rounded-full">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </p>
          )}
          <p className="mt-2 text-xl font-medium text-gray-800">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black">{user?.email}</span>
              </p>

              <div>
                <button
                  className="bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1"
                  onClick={handleOpenModal}
                >
                  Update profile
                </button>
                <UpdateProfile
                  isModalOpen={isModalOpen}
                  handleCloseModal={handleCloseModal}
                />
                <button
                  className="bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]"
                  onClick={handleOpenModalChange}
                >
                  Change Password
                </button>
                <ChangePassword
                  isModalOpenChange={isModalOpenChange}
                  handleCloseModalChange={handleCloseModalChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
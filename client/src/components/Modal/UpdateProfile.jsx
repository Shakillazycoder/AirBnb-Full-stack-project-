import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../api/utilities";

const UpdateProfile = ({ isModalOpen, handleCloseModal }) => {
  const { user, updateUserProfile } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    console.log(name, image);

    try {
      const imageURL = await imageUpload(image);
      await updateUserProfile(name, imageURL);
      toast.success("SingUp Successfully");
      handleCloseModal();
    } catch (err) {
      console.log("error");
      toast.error(err.message);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div
          id="hs-slide-down-animation-modal"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
        >
          <form onSubmit={handleSubmit}>
            <div className="bg-white border shadow-sm rounded-xl dark:bg-white dark:border-white dark:shadow-white-700/70">
              <div className="flex justify-between items-center py-3 px-4 border-b dark:border-white-700">
                <h3 className="font-bold text-gray-800 dark:text-gray-800">
                  Update Profile
                </h3>
                <button
                  type="button"
                  className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-800 dark:hover:bg-neutral-700"
                  onClick={handleCloseModal}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <div className="mt-1 text-gray-800 dark:text-gray-800 space-y-4">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user.displayName}
                      id="name"
                      placeholder="Enter Your Name Here"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                      data-temp-mail-org="0"
                    />
                  </div>
                  <div>
                    <label htmlFor="image" className="block mb-2 text-sm">
                      Select Image:
                    </label>
                    <input
                      required
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-white-700">
                <button
                  type="submit"
                  className=" inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  Update Info
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;

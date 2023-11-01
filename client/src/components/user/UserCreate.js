import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faTimes,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import InputFields from "../login/InputFields";

const UserCreate = (props) => {
  const {
    closeModal,
    user,
    submitHandler,
    handleChange,
    togglePassword,
    showPassword,
  } = props;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <button
          className=" absolute right-[-10px] top-[-20px] text-dark uppercase font-semibold mt-4 py-2  hover:transition-all ms-3  px-6 rounded text-[30px]"
          onClick={closeModal}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <form
          className="className= md:w-[600px] p-[60px]  rounded "
          onSubmit={submitHandler}
          key={user._id}
        >
          <InputFields
            iconname={faUserSecret}
            type="text"
            name="userName"
            id="userName"
            value={user.userName}
            onChange={handleChange}
            placeholder="Username"
            className="border  border-[#86a4c3]  w-[100%] p-3 border-l-0 rounded rounded-l-none outline-none focus:border-0"
          />
          <InputFields
            iconname={faLock}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            variant="pass"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            className="border  border-[#86a4c3]  w-[100%] p-3 border-l-0 rounded rounded-l-none outline-none "
            togglepassword={togglePassword}
            showpassword={showPassword}
          />

          <InputFields
            iconname={faUserSecret}
            type="text"
            name="role"
            id="role"
            value={user.role}
            onChange={handleChange}
            placeholder="Role"
            className="border  border-[#86a4c3]  w-[100%] p-3 border-l-0 rounded rounded-l-none outline-none focus:border-0"
          />

          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className=" hover:bg-gray-800 text-white uppercase font-semibold mt-4 py-2 bg-[#000] hover:transition-all  px-6 rounded"
            >
              Create User
            </button>
            <button
              className="hover:bg-gray-800  text-white uppercase font-semibold mt-4 py-2 bg-teal-500 hover:transition-all ms-3  px-6 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreate;

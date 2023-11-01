import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <div className="modal">
          <p className="text-[16px]">
            Are you sure you want to delete this user?
          </p>
          <div className="flex gap-2 justify-center">
            <button
              className=" hover:bg-gray-800 capitalize text-white font-semibold mt-4 py-1 bg-[#000] hover:transition-all  px-4 text-[14px] rounded"
              onClick={onDelete}
            >
              Delete
            </button>
            <button
              className="hover:bg-gray-800  text-white capitalize font-semibold mt-4 py-1 bg-teal-500 hover:transition-all ms-3 text-[14px]  px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

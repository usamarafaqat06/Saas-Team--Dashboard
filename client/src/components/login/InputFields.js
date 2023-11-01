import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

function InputFields(props) {
  return (
    <>
      <div className="flex items-center  mb-4 relative">
        <FontAwesomeIcon
          icon={props.iconname}
          className=" border  border-[#86a4c3]  p-[16px] rounded rounded-r-none "
        />
        <input {...props} />
        {props.variant === "pass" && (
          <FontAwesomeIcon
            icon={props.showpassword ? faEye : faEyeSlash}
            className="absolute right-[10px] cursor-pointer"
            onClick={props.togglepassword}
          />
        )}
      </div>
    </>
  );
}

export default InputFields;

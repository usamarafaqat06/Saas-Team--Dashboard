import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useTaskSeenMutation } from "../../redux/apiCalls/apiSlice";
import { UserToken } from "../../redux/utils/adminAuth";
function Notification({ notifications, profileDropdown, notificationDropDown, setNotificationDropDown }) {

  const [taskSeen] = useTaskSeenMutation();
  const userToken = UserToken();
  const updateHandler = async (id) => {
    try {
      const res = await taskSeen({ task_id: id, userToken });
    } catch (err) {
      console.log(err);
    }
  };
  const newNotificationHandler = () => {
    const hasNotifications = notifications && notifications.getAllTasks;
    const unseenNotifications = hasNotifications
      ? notifications.getAllTasks.filter((item) => !item.seen)
      : 0;
      return unseenNotifications.length
  }
  


  return (
    <div className="mx-auto relative">
      <button className="relative" onClick={() => {
            setNotificationDropDown(!notificationDropDown);
          }}>
      <FontAwesomeIcon icon={faBell} className="text-[22px] text-[#50a3ee]"/>
      <span className="block bg-[#ea4754] rounded-full px-2 absolute top-[-17px] right-[-16px] text-[#fff]">
        {newNotificationHandler()}
      </span>
      </button>
      <div>
        <ul className="bg-white rounded-sm absolute text-start shadow-lg w-[300px] top-[41px] right-0 rounded-b-lg">
          {profileDropdown ? (
            notifications && notifications.getAllTasks.length > 0 ? (
              notifications.getAllTasks.map((item, index) => (
                <li
                  onClick={() => updateHandler(item._id)}
                  key={index}
                  className={`${
                    item.seen
                      ? "bg-[#f5f5f5] text-[#660079]"
                      : "bg-[#fff]  text-[#000]"
                  } border-t flex cursor-pointer py-2 hover:bg-[#fff4f1] items-center gap-3  px-3 hover:text-[#660079] font-medium`}
                >
                  <div>
                  <input checked={item.seen} id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 cursor-pointer bg-gray-100 border-gray-300 rounded" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] text-dark">{item.seen? "Task is Seen by you" : "New Task Available"}</span>
                    <span className="text-[18px] text-dark font-semibold">{item.task.slice(0, 20)}</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="border-t text-[18px] py-4 px-5 text-dark py-[5px] px-1 font-medium">
                No task found
              </li>
            )
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export default Notification;

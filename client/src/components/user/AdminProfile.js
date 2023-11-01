import Sidebar from "../Sidebar";
export const AdminProfile = (props) => {
  const { profileData, getData } = props;
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex  md:pl-[300px] gap-[20px] pr-[80px] pt-[60px]">
        <div className="w-[179px] p-[10px] bg-[#F0F8FF] flex items-center justify-center rounded-[4px] ">
          <img
            src="assets/avatar-1.png"
            alt="AdminImage"
            className="  w-[80px] h-[80px] rounded-[80px] "
          />
        </div>
        <div className=" w-[100%] px-[20px] py-[15px] bg-[#F0F8FF] rounded-[4px]">
          <ul>
            <li className="flex gap-2 text-[18px]">
              Name : <span className="font-bold">{profileData && profileData.data.name}</span>
            </li>
            <li className="flex gap-2 text-[18px]">
              Username :{" "}
              <span className="font-bold">{profileData && profileData.data.userName}</span>{" "}
            </li>
            <li className="flex gap-2 text-[18px]">
              Email : <span className="font-bold">{profileData && profileData.data.email}</span>
            </li>
            <li className="flex gap-2 text-[18px]">
              CreateAt :{" "}
              <span className="font-bold">
                {getData(profileData && profileData.data.createdAt)}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 flex  md:pl-[300px] gap-[20px] pr-[80px] pt-[60px]">
        <div className="w-[179px] p-[10px] bg-[#F0F8FF]  items-center justify-center rounded-[4px] text-center ">
          <img
            src="assets/task.svg"
            alt="AdminImage"
            className="   w-[55px] h-[80%] rounded-[80px]  mx-auto relative mt-[-50px]"
          />
          <div>
            <span className="text-[20px] font-bold">Total Task</span>
          </div>
          <div>
            <span className="text-[20px] font-bold">{profileData && profileData.tasksCount}</span>
          </div>
        </div>
        <div className="w-[100%] px-[20px] py-[15px] bg-[#F0F8FF] rounded-[4px] text-center ">
          <img
            src="assets/users.svg"
            alt="AdminImage"
            className="  w-[90px] h-[80%] rounded-[80px]  mx-auto relative mt-[-50px] "
          />
          <div>
            <span className="text-[20px] font-bold">Total Users</span>
          </div>
          <div>
            <span className="text-[20px] font-bold">{profileData && profileData.userCount}</span>
          </div>
        </div>
      </div>
    </>
  );
};

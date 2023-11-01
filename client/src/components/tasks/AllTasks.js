import { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function AllTasks(props) {
  const { taskRoles, updateTaskHandler } = props;

  const data = [
    {
      name: "Completed Tasks",
      value: taskRoles && taskRoles.completedTasksCount,
    },
    {
      name: "To be Completed",
      value: taskRoles && taskRoles.notCompletedTasksCount,
    },
  ];
  const COLORS = ["#fd7e50", "#95cfd5"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <h2 className=" text-[30px] font-bold text-[#3E1D47] ps-[40px] pt-[40px] ">
        Tasks for today
      </h2>
      <div className="flex justify-between flex-wrap">
        <div className="flex flex-col w-[45%] ps-[40px] my-[40px] ">
          {taskRoles && taskRoles.getAllTasks.length > 0 ? (
            taskRoles &&
            taskRoles.getAllTasks.map((item, index) => (
              <div
                className={`w-[100%] rounded-[10px] shadow-2xl border-l-[8px] hover:transition-all ${"bg-[#FBFBFB]"} ${
                  index % 2 === 0 ? "border-[#70367C]" : "border-[#000]"
                } flex justify-between items-center mb-[30px]`}
                key={index}
              >
                <div className="flex flex-col p-[30px]">
                  <h3
                    className={`text-[30px] font-bold  
                  text-[#3E1D47]
                  } capitalize `}
                  >
                    {item.assigned_to_role}
                  </h3>
                  <span
                    className={`inline-block  mt-[20px]  normal-case font-bold  
                   "text-[#70367C]"
                   `}
                  >
                    {item.task}
                  </span>
                </div>
                <div className="flex items-center mr-4">
                  <input
                    id="red-checkbox"
                    type="checkbox"
                    checked={item.status}
                    className="w-5 rounded-[50%] h-5 text-[#000] bg-[#fff] focus:ring-0 dark:bg-0 dark:border-[#000]"
                    onClick={(e) => {
                      updateTaskHandler(item._id);
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <span>No Tasks for Today.</span>
          )}
        </div>
        <PieChart width={600} height={400}>
          <Tooltip />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </>
  );
}

export default AllTasks;

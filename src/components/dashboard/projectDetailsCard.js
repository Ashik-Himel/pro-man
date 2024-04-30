'use client';
import { Button } from "antd";
import { FaXmark } from "react-icons/fa6";
import { FaBars, FaUser } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { useState } from "react";

export default function ProjectDetailsCard({ project }) {
  const { name, toDo, doing, done, activities, members } = project;
  const [sidebarShow, setSidebarShow] = useState(false);

  return (
    <>
      <div className="bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center gap-4 mb-6">
          <h2 className="text-xl font-medium text-ellipsis overflow-hidden text-nowrap">{name}</h2>
          <div className="flex justify-center items-center gap-4">
            <Button type="primary" danger>Close Project</Button>
            <button onClick={() => setSidebarShow(true)}>
              <FaBars className="text-2xl text-primary" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 gap-6">
          <div className="border-2 border-primary rounded p-3 bg-[rgba(100,13,107,0.1)] md:col-span-2 xl:col-span-1">
            <h4 className="text-[18px] font-medium uppercase mb-2">ToDo</h4>
            <div className="space-y-2">
              {
                toDo?.map(task => <div key={task} className="bg-primary text-white px-4 py-2 rounded cursor-pointer flex justify-between items-center gap-2">
                  <p>{task}</p>
                  <button>
                    <FaXmark className="text-xl" />
                  </button>
                </div>)
              }
            </div>
          </div>
          <div className="border-2 border-primary rounded p-3 bg-[rgba(100,13,107,0.1)] md:col-span-2 xl:col-span-1">
            <h4 className="text-[18px] font-medium uppercase mb-2">Doing</h4>
            <div className="space-y-2">
              {
                doing?.map(task => <div key={task} className="bg-primary text-white px-4 py-2 rounded cursor-pointer flex justify-between items-center gap-2">
                  <p>{task}</p>
                  <button>
                    <FaXmark className="text-xl" />
                  </button>
                </div>)
              }
            </div>
          </div>
          <div className="border-2 border-primary rounded p-3 bg-[rgba(100,13,107,0.1)] md:col-span-2 xl:col-span-1 md:col-start-2 xl:col-start-auto">
            <h4 className="text-[18px] font-medium uppercase mb-2">Done</h4>
            <div className="space-y-2">
              {
                done?.map(task => <div key={task} className="bg-primary text-white px-4 py-2 rounded cursor-pointer flex justify-between items-center gap-2">
                  <p>{task}</p>
                  <button>
                    <FaXmark className="text-xl" />
                  </button>
                </div>)
              }
            </div>
          </div>
        </div>
      </div>

      <aside className={`fixed top-0 bottom-0 w-4/5 max-w-[300px] bg-white [box-shadow:-5px_0px_50px_rgba(0,0,0,0.2)] pb-8 z-50 transition-[right] duration-300 ${sidebarShow ? "right-0" : "-right-[400px]"}`}>
        <div className="flex justify-start items-center gap-2 py-4 border-b-2 border-gray-300 px-4 bg-gray-100 cursor-pointer select-none absolute top-0 left-0 right-0" onClick={() => setSidebarShow(false)}>
          <RiArrowRightSLine className="text-2xl" />
          <h4 className="text-[18px] font-medium uppercase">Project Information</h4>
        </div>

        <div className="overflow-y-auto h-full">
          <div className="px-6 mt-[85px]">
            <h4 className="text-[18px] font-medium uppercase mb-1">Recent Activities</h4>
            <ul className="space-y-1 list-disc list-inside">
              {
                activities.length ? activities?.map(activity => <li key={activity}>{activity}</li>) : <p className="italic font-medium text-gray-600">No activities to show</p>
              }
            </ul>
          </div>
          <div className="px-6 mt-6">
            <h4 className="text-[18px] font-medium uppercase mb-1">Team Members</h4>
            <div className="space-y-1">
              {
                members.length ? members?.map(member => <div key={member} className="flex justify-start items-center gap-2">
                  <FaUser />
                  <p>{member}</p>
                </div>) : <p className="italic font-medium text-gray-600">No members to show</p>
              }
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
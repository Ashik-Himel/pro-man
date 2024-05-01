import { Button } from "antd";
import { FaBars } from "react-icons/fa";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRef, useState } from "react";
import Link from "next/link";
import Sidebar from "./sidebar";
import TaskColumn from "./taskColumn";

export default function ProjectDetailsCard({ project, refetch }) {
  const { id, name, toDo, doing, done, activities, members } = project;
  const [sidebarShow, setSidebarShow] = useState(false);
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const barRef = useRef(null);

  return (
    <>
      <div className="bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="flex justify-start items-center gap-4 w-[calc(100%-40px)] sm:w-[calc(100%-168px)]">
            <Link href='/dashboard' className="bg-gray-300 flex justify-center items-center gap-1 py-px px-2 rounded font-medium"><RiArrowLeftSLine className="text-xl" /> Back</Link>
            <h2 className="text-xl font-medium text-ellipsis overflow-hidden text-nowrap" title={name}>{name}</h2>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button type="primary" danger className="!hidden sm:!block" onClick={() => setCloseModalOpen(true)}>Close Project</Button>
            <button onClick={() => setSidebarShow(true)} ref={barRef}>
              <FaBars className="text-2xl text-primary" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 gap-6">
          <TaskColumn tasks={toDo} title='toDo' refetch={refetch} projectId={id} members={members} />
          <TaskColumn tasks={doing} title='doing' refetch={refetch} projectId={id} members={members} />
          <TaskColumn tasks={done} title='done' refetch={refetch} projectId={id} members={members} />
        </div>
      </div>

      <Sidebar id={id} name={name} activities={activities} members={members} closeModalOpen={closeModalOpen} setCloseModalOpen={setCloseModalOpen} sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} barRef={barRef} refetch={refetch} />
    </>
  );
}
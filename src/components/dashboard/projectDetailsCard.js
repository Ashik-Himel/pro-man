import { Button, ConfigProvider, Flex, Modal } from "antd";
import { FaXmark } from "react-icons/fa6";
import { FaBars, FaUser } from "react-icons/fa";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { PoweroffOutlined, EditFilled, PlusOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TagsInput } from "react-tag-input-component";
import axiosInstance from "@/lib/axiosInstance";

export default function ProjectDetailsCard({ project, refetch }) {
  const axios = axiosInstance();
  const router = useRouter();
  const { id, name, toDo, doing, done, activities, members } = project;
  const [sidebarShow, setSidebarShow] = useState(false);
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [NewProjectName, setNewProjectName] = useState(name);
  const [newToDo, setNewToDo] = useState(toDo);
  const [newMembers, setNewMembers] = useState(members);
  const barRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleEditProject = () => {
    setCloseModalOpen(false);
    if (!NewProjectName) return;

    const document = {
      name: NewProjectName,
      toDo: newToDo,
      members: newMembers,
    }
    axios.put(`/projects/${id}`, document)
      .then(res => {
        if (res.data?.modifiedCount) {
          refetch();
          setEditModalOpen(false);
          toast.success("Project updated successfully!");
        } else toast.error("Project not updated!");
      })
      .catch(error => toast.error(error.message));
  }
  const handleCloseProject = () => {
    setSidebarShow(false);
    setCloseModalOpen(false);

    axios.put(`/projects/${id}`, {closed: true})
      .then(res => {
        if (res.data?.modifiedCount) {
          refetch();
          toast.success("Project closed successfully!");
          router.push('/dashboard');
        } else toast.error("Project not closed!");
      })
      .catch(error => toast.error(error.message));
  }

  useEffect(() => {
    const handleDocumentClick = e => {
      if (barRef.current && !barRef.current?.contains(e.target) && sidebarRef.current && !sidebarRef.current?.contains(e.target)) setSidebarShow(false);
    }
    window.addEventListener("click", handleDocumentClick);

    return () => window.removeEventListener("click", handleDocumentClick);
  }, [])

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
          <div className="border-2 border-primary rounded p-3 bg-[rgba(100,13,107,0.1)] md:col-span-2 xl:col-span-1">
            <h4 className="text-[18px] font-medium uppercase mb-2">ToDo</h4>
            <div className="space-y-2">
              {
                toDo?.length ? toDo?.map(task => <div key={task} className="bg-primary text-white px-4 py-2 rounded cursor-pointer flex justify-between items-center gap-2">
                  <p>{task}</p>
                  <div className="flex justify-center items-center gap-2">
                    <button>
                      <EditFilled className="text-[18px] relative top-[1.5px]" />
                    </button>
                    <button>
                      <FaXmark className="text-xl" />
                    </button>
                  </div>
                </div>) : <p className="font-medium italic text-gray-600">No task available in doing</p>
              }
            </div>
            <button className="font-medium flex justify-start items-center gap-1 mt-2"><PlusOutlined /> Add Task</button>
          </div>

          <div className="border-2 border-primary rounded p-3 bg-[rgba(100,13,107,0.1)] md:col-span-2 xl:col-span-1">
            <h4 className="text-[18px] font-medium uppercase mb-2">Doing</h4>
            <div className="space-y-2">
              {
                doing.length ? doing?.map(task => <div key={task} className="bg-primary text-white px-4 py-2 rounded cursor-pointer flex justify-between items-center gap-2">
                  <p>{task}</p>
                  <div className="flex justify-center items-center gap-2">
                    <button>
                      <EditFilled className="text-[18px] relative top-[1.5px]" />
                    </button>
                    <button>
                      <FaXmark className="text-xl" />
                    </button>
                  </div>
                </div>) : <p className="font-medium italic text-gray-600">No task available in doing</p>
              }
            </div>
            <button className="font-medium flex justify-start items-center gap-1 mt-2"><PlusOutlined /> Add Task</button>
          </div>

          <div className="border-2 border-primary rounded p-3 bg-[rgba(100,13,107,0.1)] md:col-span-2 xl:col-span-1 md:col-start-2 xl:col-start-auto">
            <h4 className="text-[18px] font-medium uppercase mb-2">Done</h4>
            <div className="space-y-2">
              {
                done?.length ? done?.map(task => <div key={task} className="bg-primary text-white px-4 py-2 rounded cursor-pointer flex justify-between items-center gap-2">
                  <p>{task}</p>
                  <div className="flex justify-center items-center gap-2">
                    <button>
                      <EditFilled className="text-[18px] relative top-[1.5px]" />
                    </button>
                    <button>
                      <FaXmark className="text-xl" />
                    </button>
                  </div>
                </div>) : <p className="font-medium italic text-gray-600">No task available in doing</p>
              }
            </div>
            <button className="font-medium flex justify-start items-center gap-1 mt-2"><PlusOutlined /> Add Task</button>
          </div>
        </div>
      </div>

      <aside className={`fixed top-0 bottom-0 w-4/5 max-w-[300px] bg-white [box-shadow:-5px_0px_50px_rgba(0,0,0,0.2)] pb-8 z-50 transition-[right] duration-300 ${sidebarShow ? "right-0" : "-right-[400px]"}`} ref={sidebarRef}>
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
          
          <div className="px-6 mt-6 pb-8">
            <ConfigProvider theme={{"token": {"colorPrimary": "#640d6b",}}}>
              <Flex gap="middle">
                <Button type="primary" icon={<EditFilled />} onClick={()=> {
                  setSidebarShow(false);
                  setEditModalOpen(true);
                  }}>Edit</Button>
                <Button type="primary" icon={<PoweroffOutlined />} onClick={() => {
                  setSidebarShow(false);
                  setCloseModalOpen(true);
                }} danger>Close</Button>
              </Flex>

              <Modal
                title="Edit Project"
                centered
                open={editModalOpen}
                onOk={handleEditProject}
                onCancel={() => setEditModalOpen(false)}
              >
                <form>
                  <label htmlFor="name" className="font-medium block mb-2">Project Name</label>
                  <input className="border border-gray-300 w-full py-2 px-4 rounded-lg mb-4 focus:border-2 focus:border-blue-600 focus:outline-none" type="text" name="name" id="name" placeholder="Enter project name" onChange={e => setNewProjectName(e.target.value)} value={NewProjectName} required />

                  <label htmlFor="ToDo" className="font-medium block mb-2">ToDo</label>
                  <TagsInput
                    value={newToDo}
                    onChange={setNewToDo}
                    name="ToDo"
                    placeHolder="Enter all task to do"
                  />

                  <label htmlFor="Members" className="font-medium block mb-2 mt-4">Members</label>
                  <TagsInput
                    value={newMembers}
                    onChange={setNewMembers}
                    name="Members"
                    placeHolder="Assign all members to this project"
                  />
                </form>
              </Modal>

              <Modal
                title="Close Project?"
                centered
                open={closeModalOpen}
                onOk={handleCloseProject}
                onCancel={() => setCloseModalOpen(false)}
              >
                <p className="font-medium text-red-600">Are you sure to close this project?</p>
              </Modal>
            </ConfigProvider>
          </div>
        </div>
      </aside>
    </>
  );
}
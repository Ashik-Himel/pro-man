import { Button, ConfigProvider, Flex, Modal } from "antd";
import { FaUser } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { PoweroffOutlined, EditFilled } from '@ant-design/icons';
import { TagsInput } from "react-tag-input-component";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

export default function Sidebar({ id, name, activities, members, closeModalOpen, setCloseModalOpen, sidebarShow, setSidebarShow, barRef, refetch, }) {
  const axios = axiosInstance();
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [NewProjectName, setNewProjectName] = useState(name);
  const [newMembers, setNewMembers] = useState(members);
  const sidebarRef = useRef(null);

  const handleEditProject = () => {
    setCloseModalOpen(false);
    if (!NewProjectName) return;

    const document = {
      name: NewProjectName,
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
              activities?.length ? activities?.map(activity => <li key={activity}>{activity}</li>) : <p className="italic font-medium text-gray-600">No activities to show</p>
            }
          </ul>
        </div>

        <div className="px-6 mt-6">
          <h4 className="text-[18px] font-medium uppercase mb-1">Team Members</h4>
          <div className="space-y-1">
            {
              members?.length ? members?.map(member => <div key={member} className="flex justify-start items-center gap-2">
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
              <form onSubmit={e => e.preventDefault()}>
                <label htmlFor="name" className="font-medium block mb-2">Project Name</label>
                <input className="border border-gray-300 w-full py-2 px-4 rounded-lg mb-4 focus:border-2 focus:border-blue-600 focus:outline-none" type="text" name="name" id="name" placeholder="Enter project name" onChange={e => setNewProjectName(e.target.value)} value={NewProjectName} required />

                <label htmlFor="Members" className="font-medium block mb-2">Members</label>
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
  );
}
import axiosInstance from "@/lib/axiosInstance";
import { ConfigProvider, Modal } from "antd";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaPencilAlt, FaUsers } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { TagsInput } from "react-tag-input-component";

export default function ProjectCard({ project, refetch }) {
  const axios = axiosInstance();
  const { id, name, members, toDo, doing, done, closed } = project;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [NewProjectName, setNewProjectName] = useState(name);
  const [newMembers, setNewMembers] = useState(members);

  let status;
  if (closed) status = "Closed";
  else if (doing.length) status = "Running";
  else if (toDo.length) status = "Pending";
  else status = "Completed";

  const handleEditProject = () => {
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
  const handleDeleteProject = () => {
    axios.delete(`/projects/${id}`)
      .then(res => {
        if (res.data?.deletedCount) {
          refetch();
          setEditModalOpen(false);
          toast.success("Project deleted successfully!");
        } else toast.error("Project not deleted!");
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <div className="border border-gray-300 [box-shadow:0px_0px_20px_rgba(0,0,0,0.1)] rounded-md">
      <div className="flex justify-between items-center gap-2 px-4 py-3 border-b border-gray-300">
        <h4 className="text-[18px] font-medium">{name}</h4>
        <span className={`border-2 rounded-full px-2 text-sm font-medium ${status == "Closed" ? "border-red-500 text-red-500" : status == "Running" || status == "Pending" ? "border-yellow-500 text-yellow-500" : "border-green-500 text-green-500"}`}>{status}</span>
      </div>

      <div className="flex justify-between items-center gap-2 px-4 py-3">
        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center item-center gap-2 text-gray-600" title="Total Members">
            <FaUsers className="text-2xl" />
            <span>{members?.length}</span>
          </div>
          <div className="flex justify-center item-center gap-2 text-gray-600" title="Total Tasks">
            <IoDocumentsSharp className="text-[22px]" />
            <span>{toDo?.length + doing?.length + done?.length}</span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Link href={`/dashboard/${id}`} className="border border-gray-300 p-1.5 rounded-sm cursor-pointer select-none" title="View Project"><FaEye /></Link>
          <button className="border border-gray-300 p-1.5 rounded-sm cursor-pointer select-none" title="Edit Project" onClick={() => setEditModalOpen(true)}><FaPencilAlt /></button>
          <button className="border border-gray-300 p-1.5 rounded-sm cursor-pointer select-none" title="Delete Project" onClick={() => setDeleteModalOpen(true)}><RiDeleteBinLine /></button>
        </div>
      </div>

      <ConfigProvider theme={{"token": {"colorPrimary": "#640d6b",}}}>
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
            
            <p className="my-2 font-medium italic">*** More information can be updated in project details page ***</p>
          </form>
        </Modal>

        <Modal
          title="Delete Project?"
          centered
          open={deleteModalOpen}
          onOk={handleDeleteProject}
          onCancel={() => setDeleteModalOpen(false)}
        >
          <p className="font-medium text-red-600">Are you sure to delete this project?</p>
        </Modal>
      </ConfigProvider>
    </div>
  );
}
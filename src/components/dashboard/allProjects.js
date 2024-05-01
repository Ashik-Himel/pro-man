import ProjectCard from "@/components/dashboard/projectCard";
import { ConfigProvider, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { TagsInput } from "react-tag-input-component";

export default function AllProjects({ projects, refetch }) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [toDo, setToDo] = useState([]);
  const [members, setMembers] = useState([]);

  const handleAddProject = () => {
    if (!projectName) return;

    const document = {
      name: projectName,
      toDo,
      members,
    }
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/projects`, document)
      .then(res => {
        if (res.data?.insertedId) {
          refetch();
          setAddModalOpen(false);
          setProjectName('');
          setToDo([]);
          setMembers([]);
          toast.success("Project added successfully!");
        } else toast.error("Project not added!");
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <>
      <div className="flex justify-start items-center gap-4 mb-4">
        <h2 className="text-xl font-medium uppercase">Projects</h2>
        <button className="border-2 border-primary text-primary rounded-full px-2 py-px text-sm font-medium" onClick={() => setAddModalOpen(true)}>Add Project</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {
          projects?.length ? projects?.map(project => <ProjectCard key={project?._id} project={project} refetch={refetch} />) : <div className="bg-[rgba(100,13,107,0.1)] border-2 border-primary rounded-lg px-6 py-4 font-medium text-center lg:col-span-2">
            <p>No project available to show! <button className="text-primary underline">Create project</button></p>
          </div>
        }
      </div>

      <ConfigProvider theme={{"token": {"colorPrimary": "#640d6b",}}}>
        <Modal
          title="Add Project"
          centered
          open={addModalOpen}
          onOk={handleAddProject}
          onCancel={() => setAddModalOpen(false)}
        >
          <form>
            <label htmlFor="name" className="font-medium block mb-2">Project Name</label>
            <input className="border border-gray-300 w-full py-2 px-4 rounded-lg mb-4 focus:border-2 focus:border-blue-600 focus:outline-none" type="text" name="name" id="name" placeholder="Enter project name" onChange={e => setProjectName(e.target.value)} value={projectName} required />

            <label htmlFor="ToDo" className="font-medium block mb-2">ToDo</label>
            <TagsInput
              value={toDo}
              onChange={setToDo}
              name="ToDo"
              placeHolder="Enter all task to do"
            />

            <label htmlFor="Members" className="font-medium block mb-2 mt-4">Members</label>
            <TagsInput
              value={members}
              onChange={setMembers}
              name="Members"
              placeHolder="Assign all members to this project"
            />
            
            <p className="my-2 font-medium italic">*** More information can be added after project creation in project details page ***</p>
          </form>
        </Modal>
      </ConfigProvider>
    </>
  );
}
import Link from "next/link";
import { FaUsers, FaEye, FaPencilAlt } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

export default function ProjectCard({ project }) {
  const { id, name, members, toDo, doing, done, closed } = project;
  let status;
  if (closed) status = "Closed";
  else if (doing.length) status = "Running";
  else if (toDo.length) status = "Pending";
  else status = "Completed";

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
            <span>{members.length}</span>
          </div>
          <div className="flex justify-center item-center gap-2 text-gray-600" title="Total Tasks">
            <IoDocumentsSharp className="text-[22px]" />
            <span>{toDo.length + doing.length + done.length}</span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Link href={`/projects/${id}`} className="border border-gray-300 p-1.5 rounded-sm cursor-pointer select-none" title="View Project"><FaEye /></Link>
          <button className="border border-gray-300 p-1.5 rounded-sm cursor-pointer select-none" title="Edit Project"><FaPencilAlt /></button>
          <button className="border border-gray-300 p-1.5 rounded-sm cursor-pointer select-none" title="Delete Project"><RiDeleteBinLine /></button>
        </div>
      </div>
    </div>
  );
}
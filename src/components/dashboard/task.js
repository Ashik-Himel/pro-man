import axiosInstance from '@/lib/axiosInstance';
import { Button, ConfigProvider, Modal } from 'antd';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaUser } from "react-icons/fa";
import { FaXmark } from 'react-icons/fa6';
import { MdOutlineWatchLater } from "react-icons/md";
import { EditFilled } from '@ant-design/icons';
import {format, differenceInDays} from 'date-fns'

export default function Task({tasks, task, tasksTitle, projectId, refetch, members}) {
  const axios = axiosInstance();
  const {title, description, deadline, member, completed} = task;
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
  const [taskDetailsModalOpen, setTaskDetailsModalOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskDeadline, setTaskDeadline] = useState(deadline);
  const [assignedMember, setAssignedMember] = useState(member);
  const [taskCompleted, setTaskCompleted] = useState(completed);
  const xmarkRef = useRef(null);

  const handleEditTask = () => {
    const document = {
      [tasksTitle]: tasks?.map(item => {
        if (item?.title != title) {
          return item;
        } else {
          return {
            title: taskTitle,
            description: taskDescription,
            deadline: taskDeadline,
            member: assignedMember,
            completed: taskCompleted
          }
        }
      })
    }
    axios.put(`/projects/${projectId}`, document)
      .then(res => {
        if (res.data?.modifiedCount) {
          refetch();
          setEditTaskModalOpen(false);
          toast.success("Task updated successfully!");
        } else toast.error("Task not updated!");
      })
      .catch(error => toast.error(error.message));
  }

  const handleDeleteTask = () => {
    setDeleteTaskModalOpen(false);

    const document = {
      [tasksTitle]: tasks?.filter(item => item?.title != title)
    }
    axios.put(`/projects/${projectId}`, document)
      .then(res => {
        if (res.data?.modifiedCount) {
          refetch();
          toast.success("Task deleted successfully!");
        } else toast.error("Task not deleted!");
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <div className="bg-primary text-white rounded cursor-pointer flex justify-between items-center gap-2">
      <div className='flex-1 h-full pl-4 py-2' onClick={() => setTaskDetailsModalOpen(true)}>
        <p>{title}</p>
        {
          member || deadline ? <div className='flex flex-wrap justify-start items-center gap-x-4 gap-y-1 mt-2 text-sm'>
            {
              member ? <div className='flex justify-start items-center gap-2'>
                <FaUser /> {member}
              </div> : null
            }
            {
              deadline ? <div className='flex justify-start items-center gap-2'>
                <MdOutlineWatchLater className='text-[17px]' /> {differenceInDays(deadline, new Date())} days
              </div> : null
            }
          </div> : null
        }
      </div>
      <button className='pr-4 py-2' onClick={() => setDeleteTaskModalOpen(true)} ref={xmarkRef}>
        <FaXmark className="text-xl" />
      </button>

      <ConfigProvider theme={{"token": {"colorPrimary": "#640d6b",}}}>
        <Modal
          title={`Title: ${title}`}
          centered
          open={taskDetailsModalOpen}
          onOk={() => setTaskDetailsModalOpen(false)}
          onCancel={() => setTaskDetailsModalOpen(false)}
        >
          <p className='mb-1'><span className='font-medium'>Description: </span>{description}</p>
          <p className='mb-1'><span className='font-medium'>Deadline: </span>{deadline && format(deadline, "dd MMM, yyyy")}</p>
          <p className='mb-1'><span className='font-medium'>Assigned Member: </span>{member}</p>
          <p className='mb-4'><span className='font-medium'>Completed: </span>{completed ? "Yes" : "No"}</p>

          <Button type='primary' icon={<EditFilled />} onClick={() => {
            setTaskDetailsModalOpen(false);
            setEditTaskModalOpen(true);
          }}>Edit Task</Button>
        </Modal>

        <Modal
          title="Edit Task"
          centered
          open={editTaskModalOpen}
          onOk={handleEditTask}
          onCancel={() => setEditTaskModalOpen(false)}
        >
          <form onSubmit={e => e.preventDefault()}>
            <label htmlFor="title" className="font-medium block mb-2">Task Title</label>
            <input className="border border-gray-300 w-full py-2 px-4 rounded-lg mb-4" type="text" name="title" id="title" placeholder="Enter task title" onChange={e => setTaskTitle(e.target.value)} value={taskTitle} required />

            <label htmlFor="description" className="font-medium block mb-2">Task Description</label>
            <textarea className="border border-gray-300 w-full py-2 px-4 rounded-lg mb-4 resize-none h-[100px]" name="description" id="description" placeholder="Enter task description" onChange={e => setTaskDescription(e.target.value)} value={taskDescription} required></textarea>

            <label htmlFor="deadline" className="font-medium block mb-2">Task Deadline</label>
            <input className="border border-gray-300 w-full py-2 px-4 rounded-lg mb-4" type="date" name="deadline" id="deadline" onChange={e => setTaskDeadline(e.target.value)} value={taskDeadline} required />

            <label htmlFor="member" className="font-medium block mb-2">Assigned Member</label>
            <select className="border border-gray-300 w-full py-2 px-4 rounded-lg mb-4" name="member" id="member" value={assignedMember} onChange={e => setAssignedMember(e.target.value)} required >
              {
                members?.map(member => <option key={member} value={member}>{member}</option>)
              }
            </select>

            
            <label htmlFor="completed" className='flex justify-start items-center gap-2'>
              <input type="checkbox" name="completed" id="completed" checked={taskCompleted} onChange={e => setTaskCompleted(!taskCompleted)} required />
              Task Completed
            </label>
          </form>
        </Modal>

        <Modal
          title="Delete Task?"
          centered
          open={deleteTaskModalOpen}
          onOk={handleDeleteTask}
          onCancel={() => setDeleteTaskModalOpen(false)}
        >
          <p className="font-medium text-red-600">Are you sure to close this project?</p>
        </Modal>
      </ConfigProvider>
    </div>
  );
}
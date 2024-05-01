import { PlusOutlined } from '@ant-design/icons';
import Task from './task';
import { useState } from 'react';
import { ConfigProvider, Modal } from 'antd';
import axiosInstance from '@/lib/axiosInstance';
import toast from 'react-hot-toast';

export default function TaskColumn({tasks, title, refetch, projectId, members}) {
  const axios = axiosInstance();
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    const document = {
      [title]: [...tasks,
        {
          title: taskTitle,
          description: "",
          deadline: "",
          member: "",
          completed: false
        },]
    }
    axios.put(`/projects/${projectId}`, document)
      .then(res => {
        if (res.data?.modifiedCount) {
          refetch();
          setAddTaskModalOpen(false);
          setTaskTitle('');
          toast.success("Task added successfully!");
        } else toast.error("Task not added!");
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <div className="border-2 border-primary rounded p-3 bg-[rgba(100,13,107,0.1)] md:col-span-2 xl:col-span-1">
      <h4 className="text-[18px] font-medium uppercase mb-2">{title}</h4>
      <div className="space-y-2">
        {
          tasks?.length ? tasks?.map(task => <Task key={task?.title} tasks={tasks} task={task} tasksTitle={title} projectId={projectId} refetch={refetch} members={members} />) : <p className="font-medium italic text-gray-600">No task available in {title}</p>
        }
      </div>
      <button className="font-medium flex justify-start items-center gap-1 mt-2" onClick={() => setAddTaskModalOpen(true)}><PlusOutlined /> Add Task</button>

      <ConfigProvider theme={{"token": {"colorPrimary": "#640d6b",}}}>
        <Modal
          title="Add Task"
          centered
          open={addTaskModalOpen}
          onOk={handleAddTask}
          onCancel={() => setAddTaskModalOpen(false)}
        >
          <form onSubmit={e => e.preventDefault()}>
            <label htmlFor="taskTitle" className="font-medium block mb-2">Task Title</label>
            <input className="border border-gray-300 w-full py-2 px-4 rounded-lg mb-4 focus:border-2 focus:border-blue-600 focus:outline-none" type="text" name="taskTitle" id="taskTitle" placeholder="Enter the task title" onChange={e => setTaskTitle(e.target.value)} value={taskTitle} required />
            
            <p className="my-2 font-medium italic">*** More information can be added after creating the task ***</p>
          </form>
        </Modal>
      </ConfigProvider>
    </div>
  );
}
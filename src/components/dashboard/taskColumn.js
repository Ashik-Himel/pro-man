import { PlusOutlined } from '@ant-design/icons';
import Task from './task';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { tasksStore } from '@/store/useStore';
import { FaXmark } from 'react-icons/fa6';

export default function TaskColumn({title, tasks, refetch, members, setSearchValue, setFilterValue}) {
  const setTasks = tasksStore(state => state.setTasks);
  const {id: projectId} = useParams();
  const axios = axiosInstance();
  const [addInputShow, setAddInputShow] = useState(false);
  const addTaskRef = useRef(null);
  const addInputRef = useRef(null);

  const handleAddTask = e => {
    e.preventDefault();
    const document = {
      title: e.target.addTask.value,
      status: title
    }
    axios.post(`/projects/${projectId}/tasks`, document)
      .then(res => {
        if (res.data?.modifiedCount) {
          e.target.reset();
          refetch();
          setTasks([...tasks, res.data?.addedTask]);
          setSearchValue('');
          setFilterValue({
            status: "", deadline: "", member: ""
          });
          toast.success("Task added successfully!");
        } else toast.error("Task not added!");
      })
      .catch(error => toast.error(error.message));
  }

  useEffect(() => {
    const handleDocumentClick = e => {
      if (addTaskRef.current && !addTaskRef.current?.contains(e.target) && addInputRef.current && !addInputRef.current?.contains(e.target)) setAddInputShow(false);
    }
    window.addEventListener("click", handleDocumentClick);

    return () => window.removeEventListener("click", handleDocumentClick);
  }, [])

  return (
    <div className="border-2 border-primary rounded p-3 bg-[rgba(100,13,107,0.1)] md:col-span-2 xl:col-span-1">
      <h4 className="text-[18px] font-medium uppercase mb-2">{title}</h4>
      <div className="space-y-2">
        {
          tasks?.length ? tasks?.map(task => <Task key={task?.id} task={task} refetch={refetch} members={members} setSearchValue={setSearchValue} setFilterValue={setFilterValue} />) : <p className="font-medium italic text-gray-600">No task available in {title}</p>
        }
      </div>

      <div className='mt-1 relative'>
        <button className='font-medium flex justify-start items-center gap-1 pt-2 pb-[7px]' ref={addTaskRef} onClick={() => setAddInputShow(true)}><PlusOutlined /> Add Task</button>
        <div className={`absolute top-1 left-0 right-0 z-10 overflow-hidden transition-[width] duration-300 ${addInputShow ? 'w-full' : 'w-0'}`} ref={addInputRef}>
          <form className='flex justify-center items-center bg-white border-2 border-primary rounded' onSubmit={handleAddTask}>
            <input className='flex-1 bg-transparent outline-none pl-4 py-1.5' type="text" name="addTask" id="addTask" placeholder='Task title' required />
            <div className='px-2 py-1.5 text-xl cursor-pointer select-none' onClick={() => setAddInputShow(false)}>
              <FaXmark />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
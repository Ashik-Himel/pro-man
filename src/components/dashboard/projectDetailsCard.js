import { tasksStore } from '@/store/useStore';
import { Button, ConfigProvider, Tooltip } from "antd";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FaBars } from "react-icons/fa";
import { RiArrowLeftSLine } from "react-icons/ri";
import Sidebar from "./sidebar";
import TaskColumn from "./taskColumn";

export default function ProjectDetailsCard({ project, refetch }) {
  const initialTasks = project?.tasks;
  const tasks = tasksStore(state => state.tasks);
  const setTasks = tasksStore(state => state.setTasks);
  const { id, name, activities, members } = project;
  const [sidebarShow, setSidebarShow] = useState(false);
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState({
    status: "", deadline: "", member: ""
  });
  const [showFilter, setShowFilter] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    if (!searchValue) return setTasks(initialTasks);
    if (showFilter) setShowFilter(false);
    if (filterValue?.status !== "" || filterValue?.deadline !== "" || filterValue?.member !== "") {
      setFilterValue({
        status: "", deadline: "", member: ""
      });
    }

    setTasks(initialTasks?.filter(task => task?.title?.toLowerCase()?.trim()?.includes(searchValue?.toLowerCase()?.trim())));
  }, [searchValue]);

  useEffect(() => {
    if (filterValue?.status === "" && filterValue?.deadline === "" && filterValue?.member === "") return setTasks(initialTasks);
    else setSearchValue('');

    const newTasks = initialTasks?.filter(task => {
      if ((filterValue?.status === "" || task?.status === filterValue?.status) && (filterValue?.deadline === "" || task?.deadline === filterValue?.deadline) && (filterValue?.member === "" || task?.member === filterValue?.member)) return true;
      return false;
    })
    
    setTasks(newTasks);
  }, [filterValue])

  const handleDragEnd = (event) => {
    const { source, destination, draggableId } = event;
    if (source?.droppableId === destination?.droppableId && source?.index === destination?.index) return;

    if (source?.droppableId === destination?.droppableId) {
      const newArray = Array.from(tasks);
      const item = newArray.splice(source?.index, 1)[0];
      newArray.splice(destination?.index, 0, item);
      setTasks(newArray);
    }
    else if (source?.droppableId !== destination?.droppableId) {
      const updatedArray = tasks?.map(item => {
        if (item?.id === draggableId) {
          item.status = destination?.droppableId;
          return item;
        }
        return item;
      })

      if (source?.index < destination?.index) {
        const item = updatedArray.splice(source?.index, 1)[0];
        updatedArray.splice(destination?.index - 1, 0, item);
      } else {
        const item = updatedArray.splice(source?.index, 1)[0];
        updatedArray.splice(destination?.index, 0, item);
      }
      setTasks(updatedArray);
    }
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="flex justify-start items-center gap-4 w-[calc(100%-40px)] sm:w-[calc(100%-168px)]">
            <Link href='/dashboard' className="bg-gray-300 flex justify-center items-center gap-1 py-px px-2 rounded font-medium"><RiArrowLeftSLine className="text-xl" /> Back</Link>
            <ConfigProvider theme={{"token": {"colorPrimary": "#640d6b",}}}>
              <Tooltip title={name} placement='bottom' color='#640d6b'>
                <h2 className="text-xl font-medium text-ellipsis overflow-hidden text-nowrap">{name}</h2>
              </Tooltip>
            </ConfigProvider>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button type="primary" danger className="!hidden sm:!block" onClick={() => setCloseModalOpen(true)}>Close Project</Button>
            <button onClick={() => setSidebarShow(true)} ref={barRef}>
              <FaBars className="text-2xl text-primary" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-start items-center gap-4">
          <form className="w-full max-w-[300px]" onSubmit={e => e.preventDefault()}>
            <input type="search" name="search" id="search" placeholder="Search task" className="border border-gray-300 px-4 py-1.5 rounded-md w-full" value={searchValue} onChange={e => setSearchValue(e.target.value)} required />
          </form>

          <button className="text-primary font-medium" onClick={() => setShowFilter(!showFilter)}>{showFilter ? 'Hide Filter' : 'Filter Task'}</button>

          <form onSubmit={e => e.preventDefault()} className={`flex-wrap justify-start items-center gap-4 bg-[rgba(100,13,107,0.1)] p-4 rounded-lg border border-primary 2xl:border-none 2xl:bg-transparent 2xl:p-0 2xl:pl-4 ${showFilter ? 'flex' : 'hidden'}`}>
            <div className="flex justify-center items-center gap-1">
              <label className="font-medium" htmlFor="status">Status: </label>
              <select className="border-2 border-gray-300 px-4 py-1 rounded-md" value={filterValue?.status} onChange={e => setFilterValue({...filterValue, status: e.target.value})} name="status" id="status">
                <option value="">All</option>
                <option value="todo">ToDo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="flex justify-center items-center gap-1">
              <label className="font-medium" htmlFor="due">Due: </label>
              <input className="border-2 border-gray-300 px-4 py-1 rounded-md" value={filterValue?.deadline} onChange={e => setFilterValue({...filterValue, deadline: e.target.value})} type="date" name="due" id="due" />
            </div>
            <div className="flex justify-center items-center gap-1">
              <label className="font-medium" htmlFor="member">Member: </label>
              <select className="border-2 border-gray-300 px-4 py-1 rounded-md" value={filterValue?.member} onChange={e => setFilterValue({...filterValue, member: e.target.value})} name="member" id="member">
                <option value="">All</option>
                {
                  members?.map((member, index) => <option key={index} value={member}>{member}</option>)
                }
              </select>
            </div>
            <button className="text-primary font-medium" onClick={() => {
              setFilterValue({
                status: "", deadline: "", member: ""
              })
            }}>Reset</button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 gap-6 mt-8">
          <DragDropContext onDragEnd={handleDragEnd}>
            <TaskColumn title='todo' refetch={refetch} members={members} setSearchValue={setSearchValue} setFilterValue={setFilterValue} />
            <TaskColumn title='doing' refetch={refetch} members={members} setSearchValue={setSearchValue} setFilterValue={setFilterValue} />
            <TaskColumn title='done' refetch={refetch} members={members} setSearchValue={setSearchValue} setFilterValue={setFilterValue} />
          </DragDropContext>
        </div>
      </div>

      <Sidebar id={id} name={name} activities={activities} members={members} closeModalOpen={closeModalOpen} setCloseModalOpen={setCloseModalOpen} sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} barRef={barRef} refetch={refetch} />
    </>
  );
}
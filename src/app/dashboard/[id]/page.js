'use client';
import NotFound from "@/app/not-found";
import ProjectDetailsCard from "@/components/dashboard/projectDetailsCard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import { Button, ConfigProvider } from "antd";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";

export default function Page() {
  const axios = axiosInstance();
  const params = useParams();
  const {data: project, isLoading, refetch} = useQuery({
    queryKey: ["projects", params?.id],
    queryFn: async() => {
      const res = await axios(`/projects/${params?.id}`);
      return res.data;
    }
  })

  const handleReopen = () => {
    axios.put(`/projects/${project?.id}`, {closed: false})
      .then(res => {
        if (res.data?.modifiedCount) {
          toast.success("Project reopened!");
          refetch();
        } else toast.error("Project not reopened!");
      })
      .catch(error => toast.error(error.message));
  }

  if (isLoading) return <Loading />;
  if (!project) return <NotFound />;
  
  if (project?.closed) {
    return (
      <main className="py-10 bg-primary min-h-screen flex justify-center items-center">
        <div className="w-full py-10 bg-[rgba(0,0,0,0.7)] text-white text-center">
          <p className="text-2xl font-medium mb-4">This Project is closed.</p>
          <ConfigProvider theme={{"token": {"colorPrimary": "#640d6b",}}}>
            <Button type="primary" onClick={handleReopen}>Reopoen</Button>
          </ConfigProvider>
        </div>
      </main>
    );
  }

  return (
    <main className="py-10 bg-primary min-h-screen">
      <div className="container">
        <ProjectDetailsCard project={project} refetch={refetch} />
      </div>
    </main>
  );
}
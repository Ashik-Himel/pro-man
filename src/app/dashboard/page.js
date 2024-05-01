'use client';
import { useQuery } from "@tanstack/react-query";
import AllProjects from "@/components/dashboard/allProjects";
import Loading from "../loading";
import axiosInstance from "@/lib/axiosInstance";

export default function Page() {
  const axios = axiosInstance();
  const {data: projects, isLoading, refetch} = useQuery({
    queryKey: ["projects"],
    queryFn: async() => {
      const res = await axios('/projects');
      return res.data;
    }
  })

  if (isLoading) return <Loading />;
  return (
    <main className="my-10">
      <div className="container">
        <AllProjects projects={projects} refetch={refetch} />
      </div>
    </main>
  );
}

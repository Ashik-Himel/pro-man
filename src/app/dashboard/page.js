'use client';
import { useQuery } from "@tanstack/react-query";
import AllProjects from "@/components/dashboard/allProjects";
import axios from "axios";
import Loading from "../loading";

export default function Page() {
  const {data: projects, isLoading, refetch} = useQuery({
    queryKey: ["projects"],
    queryFn: async() => {
      const res = await axios(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/projects`);
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

import ProjectCard from "@/components/dashboard/projectCard";
import { fetchProjects } from "../../../scripts/seed";

export default async function Page() {
  const projects = await fetchProjects();

  return (
    <main className="my-10">
      <div className="container">
        <h2 className="text-xl font-medium uppercase mb-4">Projects</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {
            projects?.map(project => <ProjectCard key={project?._id} project={project} />)
          }
        </div>
      </div>
    </main>
  );
}

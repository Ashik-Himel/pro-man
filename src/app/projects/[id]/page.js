import { fetchProject } from "../../../../scripts/seed";
import ProjectDetailsCard from "@/components/dashboard/projectDetailsCard";

export default async function Page({ params }) {
  let project = await fetchProject(parseInt(params?.id));

  return (
    <main className="py-10 bg-primary min-h-screen">
      <div className="container">
        <ProjectDetailsCard project={project} />
      </div>
    </main>
  );
}
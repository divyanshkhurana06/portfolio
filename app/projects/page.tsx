import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected things I've built shipped, in progress, and otherwise.",
};

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => b.year - a.year);

  return (
    <div className="container-wide pt-12 sm:pt-16">
      <PageHeader
        eyebrow="projects"
        title="Things I've made."
        lede="A working list of the projects I've shipped, am still shipping, or quietly let drift into the archive. Hover over a card to see a bit more. Most of them taught me something."
      />

      <ul className="grid gap-5 sm:grid-cols-2">
        {sorted.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} variant="full" />
          </li>
        ))}
      </ul>
    </div>
  );
}

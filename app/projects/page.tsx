import type { Metadata } from "next";
import { ProjectsExplorer, type ProjectListItem } from "@/components/project/ProjectsExplorer";
import { SectionHeading } from "@/components/ui/Section";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "All projects",
  description:
    "Every project by Ayushman Jha — industrial, energy, AI/ML, data, software and engineering — ranked by engineering depth, with maturity labels.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const ordered: ProjectListItem[] = [...projects]
    .sort((a, b) => a.rank - b.rank)
    .map(({ slug, title, subtitle, rank, maturity, categories, summary, stack, repos, live }) => ({
      slug,
      title,
      subtitle,
      rank,
      maturity,
      categories,
      summary,
      stack,
      repos,
      live,
    }));
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading
        as="h1"
        eyebrow="All projects"
        title={
          <>
            {ordered.length} projects, ranked.
            <span className="block text-mute">Not all of them equally important.</span>
          </>
        }
        intro="Ranked by engineering depth. Incomplete work is labelled Prototype, Experimental or Archived. Repositories that are empty are not listed, and repositories that hold the same work are shown once."
      />
      <div className="mt-12">
        <ProjectsExplorer projects={ordered} />
      </div>
    </div>
  );
}

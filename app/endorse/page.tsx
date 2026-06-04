import type { Metadata } from "next";
import { EndorseForm } from "@/components/endorse-form";
import { EndorsementList } from "@/components/endorsement-list";
import { PageHeader } from "@/components/page-header";
import { getEndorsements } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Endorse",
  description:
    "Endorsement from people I've worked with: collaborators, teammates or anyone with a thoughtful note to leave. 😁",
};

export const dynamic = "force-dynamic";

export default async function EndorsePage() {
  const endorsements = await getEndorsements();

  return (
    <div className="container-prose pt-12 sm:pt-16">
      <PageHeader
        eyebrow="endorse"
        title="Review."
        lede="If we've worked together on a project, an internship, a hackathon, or even in a class: just leave a short note here."
      />

      <EndorseForm />

      <p className="mt-4 text-xs text-ink-faint">
        Prefer email?{" "}
        <a className="link" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </p>

      <div className="mt-12">
        <EndorsementList endorsements={endorsements} />
      </div>
    </div>
  );
}

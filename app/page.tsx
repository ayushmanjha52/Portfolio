import { Hero } from "@/components/home/Hero";
import { RecruiterBrief } from "@/components/home/RecruiterBrief";
import { EngineeringJourney, HowIWork } from "@/components/home/EngineeringJourney";
import { WhatIBuild } from "@/components/home/WhatIBuild";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Experience } from "@/components/home/Experience";
import { Skills } from "@/components/home/Skills";
import { Achievements } from "@/components/home/Achievements";
import { Contact } from "@/components/home/Contact";
import { education, profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  description: profile.pitch,
  knowsAbout: ["Machine learning", "Software engineering", "Electrical engineering", "Signal processing", "Data engineering"],
  alumniOf: { "@type": "CollegeOrUniversity", name: education[0].institution },
  sameAs: [profile.github, profile.linkedin],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is safe here: the object is static and contains no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <RecruiterBrief />
      <HowIWork />
      <WhatIBuild />
      <FeaturedWork />
      <EngineeringJourney />
      <Experience />
      <Skills />
      <Achievements />
      <Contact />
    </>
  );
}

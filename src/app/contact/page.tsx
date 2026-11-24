import { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactInformation } from "@/components/contact/ContactInformation";
import { ContactForm } from "@/components/contact/ContactForm";
import { profileData } from "@/data/profile";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Contact & Collaboration",
  description: `Get in touch with ${profileData.name} for backend engineering roles, full-stack systems architecture, and technical consultation.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageContainer>
      <div className="space-y-12">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact & Inquiries"
          subtitle="Direct channels for engineering opportunities, technical advisory, and software project collaboration."
          as="h1"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Direct coordinates, availability, and social links */}
          <div className="lg:col-span-5">
            <ContactInformation />
          </div>

          {/* Right Column: Interactive contact form */}
          <div className="border-border bg-card rounded-xl border p-6 sm:p-8 lg:col-span-7">
            <div className="border-border mb-6 space-y-1 border-b pb-4">
              <h2 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
                Send a Message
              </h2>
              <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                Encrypted & Delivered Direct to Inbox
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

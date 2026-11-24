import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getSkillCategories } from "@/data/skills";
import type { SkillCategory } from "@/types";

export function SkillsPreview({
  categories = getSkillCategories(),
}: {
  categories?: readonly SkillCategory[];
}) {
  const populated = categories.filter(({ skills }) => skills.length > 0);
  if (!populated.length) return null;

  return (
    <SectionWrapper withContainer={false} className="border-divider border-t">
      <SectionHeading title="Technical Expertise" />
      <div className="border-divider grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {populated.map((category) => (
          <div key={category.id} className="border-divider min-w-0 border-t pt-4">
            <h3 className="text-lg font-semibold tracking-tight">{category.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {category.skills.map(({ name }) => (
                <li
                  key={name}
                  className="border-border max-w-full rounded-sm border px-2.5 py-1 font-mono text-sm [overflow-wrap:anywhere]"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

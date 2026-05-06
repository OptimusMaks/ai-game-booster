import Link from "next/link";
import type { ReactNode } from "react";
import content from "./figma-content.json";

const linkClass =
  "text-[#475467] underline underline-offset-[3px] decoration-[#475467] transition-colors hover:text-[#344054]";

type LinkRule = { match: string; href: string; internal?: boolean };

const LINK_RULES: LinkRule[] = [
  {
    match: "Gift Card Terms and Conditions",
    href: "#gift-card-terms",
  },
  {
    match: "Managed Account Privacy Policy",
    href: "#managed-account-privacy",
  },
  { match: "HyperUp Kids Privacy Policy", href: "#kids-privacy" },
  { match: "User Guidelines", href: "#user-guidelines" },
  { match: "Privacy Policy", href: "/privacy", internal: true },
  { match: "Terms of Use", href: "/terms", internal: true },
].sort((a, b) => b.match.length - a.match.length);

function linkify(text: string): ReactNode {
  if (!text) {
    return null;
  }

  for (const rule of LINK_RULES) {
    const i = text.indexOf(rule.match);
    if (i === -1) {
      continue;
    }
    const before = text.slice(0, i);
    const after = text.slice(i + rule.match.length);
    const mid =
      rule.internal === true ? (
        <Link href={rule.href} className={linkClass}>
          {rule.match}
        </Link>
      ) : (
        <a href={rule.href} className={linkClass}>
          {rule.match}
        </a>
      );
    return (
      <>
        {linkify(before)}
        {mid}
        {linkify(after)}
      </>
    );
  }

  return text;
}

export default function SubscriptionContent() {
  return (
    <>
      {content.sections.map((section, index) => {
        const isSubsection = /^2\.\d/.test(section.heading);
        const HeadingTag = isSubsection ? "h3" : "h2";
        const headingClass = isSubsection
          ? "text-[24px] font-semibold leading-[32px] text-[#101828]"
          : "text-[30px] font-semibold leading-[38px] text-[#101828]";

        const paragraphs = section.body.split("\n").filter(Boolean);

        return (
          <section
            key={section.heading}
            className={index > 0 ? "mt-10 md:mt-16" : ""}
          >
            <HeadingTag className={headingClass}>{section.heading}</HeadingTag>
            <div className="mt-5 space-y-7 text-[18px] font-normal leading-[28px] text-[#475467] md:space-y-5">
              {paragraphs.map((para, pi) => (
                <p key={pi}>{linkify(para)}</p>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

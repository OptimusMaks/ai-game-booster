import type { ReactNode } from "react";
import content from "./figma-content.json";

const linkClass =
  "text-[#475467] underline underline-offset-[3px] decoration-[#475467] transition-colors hover:text-[#344054]";

function AccountLink({ children }: { children: ReactNode }) {
  return (
    <a href="#account" className={linkClass}>
      {children}
    </a>
  );
}

function SupportLink({ children }: { children: ReactNode }) {
  return (
    <a href="mailto:support@hyperup.gg" className={linkClass}>
      {children}
    </a>
  );
}

function paragraphWithAccountLink(text: string) {
  const marker = "HyperUp Account";
  if (!text.includes(marker)) {
    return text;
  }
  const parts = text.split(marker);
  const nodes: ReactNode[] = [];
  parts.forEach((part, i) => {
    nodes.push(part);
    if (i < parts.length - 1) {
      nodes.push(<AccountLink key={`acc-${i}`}>{marker}</AccountLink>);
    }
  });
  return nodes;
}

function cancellationParagraph() {
  const text = content.cancelBody;
  const markerAccount = "HyperUp Account";
  const markerSupport = "Customer Support";
  const accountIdx = text.indexOf(markerAccount);
  const supportIdx = text.indexOf(markerSupport);
  if (accountIdx === -1 || supportIdx === -1) {
    return text;
  }
  const before = text.slice(0, accountIdx);
  const mid = text.slice(accountIdx + markerAccount.length, supportIdx);
  const after = text.slice(supportIdx + markerSupport.length);
  return (
    <>
      {before}
      <AccountLink>{markerAccount}</AccountLink>
      {mid}
      <SupportLink>{markerSupport}</SupportLink>
      {after}
    </>
  );
}

export default function MoneyBackContent() {
  const introParagraphs = content.intro.split("\n").filter(Boolean);

  return (
    <>
      <div className="space-y-7 text-[18px] font-normal leading-[28px] text-[#475467] md:space-y-5">
        {introParagraphs.map((para, index) => (
          <p key={index}>{paragraphWithAccountLink(para)}</p>
        ))}
      </div>

      <section className="mt-10 md:mt-16">
        <h2 className="text-[30px] font-semibold leading-[38px] text-[#101828]">
          {content.cancelHeading}
        </h2>
        <p className="mt-5 text-[18px] font-normal leading-[28px] text-[#475467]">
          {cancellationParagraph()}
        </p>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import ContactLinePattern from "../components/ContactLinePattern";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TermsContent from "./TermsContent";
import content from "./figma-content.json";

export const metadata: Metadata = {
  title: "Terms of Use — HyperUp",
  description: "Terms governing your use of HyperUp services.",
};

export default function TermsOfUsePage() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
      <Header />

      <main className="relative flex flex-1 flex-col overflow-visible px-5 pb-16 pt-11 md:px-8 md:pb-24 md:pt-16">
        <div
          className="pointer-events-none absolute left-0 top-0 z-0 mr-5 hidden sm:block md:top-[-1.25rem] md:mr-8"
          aria-hidden
        >
          <ContactLinePattern />
        </div>
        <div
          className="pointer-events-none absolute right-0 bottom-0 z-0 ml-5 hidden translate-y-2 sm:ml-6 sm:block md:ml-8 md:translate-y-3"
          aria-hidden
        >
          <ContactLinePattern mirror />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px]">
          <div className="mx-auto w-full max-w-[335px] text-center md:max-w-[768px]">
            <p className="text-[16px] font-normal leading-[24px] text-[#475467]">
              {content.subheading}
            </p>
            <h1 className="mt-1 text-[48px] font-semibold leading-[60px] tracking-[-0.96px] text-[#101828] md:mt-4">
              {content.title}
            </h1>
          </div>

          <article className="mx-auto mt-11 w-full max-w-[335px] text-left md:mt-14 md:max-w-[720px]">
            <TermsContent />
          </article>
        </div>
      </main>

      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
}

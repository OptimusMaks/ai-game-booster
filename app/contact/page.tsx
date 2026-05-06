import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import ContactLinePattern from "../components/ContactLinePattern";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Contact us — HyperUp",
  description: "Get in touch with the HyperUp team.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
      <Header />

      <main className="relative flex min-h-[600px] flex-1 flex-col items-center justify-center overflow-visible px-5 pb-16 pt-11 md:min-h-[calc(100dvh-5rem)] md:px-8 md:pb-32 md:pt-20">
      <div
            className="pointer-events-none absolute left-0 top-0 z-0 mr-5 hidden sm:block md:top-[-1.25rem] md:mr-8"
            aria-hidden
          >
            <ContactLinePattern />
          </div>
          <div
            className="pointer-events-none absolute  right-0 bottom-0 z-0 ml-5 hidden translate-y-2 sm:ml-6 sm:block md:ml-8 md:translate-y-3"
            aria-hidden
          >
            <ContactLinePattern mirror />
          </div>
        <div className="relative mx-auto w-full max-w-[375px] md:max-w-[480px]">
          

          <div className="relative z-10 w-full">
            <ContactForm />
          </div>
        </div>
      </main>
      <div className="mt-11 w-full md:mt-0">
        <Footer />
      </div>
    </div>
  );
}

"use client";

import type { ReactNode } from "react";

const linkClass =
  "text-[#475467] underline underline-offset-[3px] decoration-[#475467] transition-colors hover:text-[#344054]";

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={linkClass}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export default function PolicyContent() {
  return (
    <>
      <section>
        <h2 className="text-[30px] font-semibold leading-[38px] text-[#101828]">
          1. How this policy works
        </h2>
        <div className="mt-4 space-y-5 text-[18px] font-normal leading-[28px] text-[#475467]">
          <p>
            This Privacy Policy applies to the collection, use, disclosure and
            handling of Personal Information by Dovetail Research Pty. Ltd. and
            its related entities (“we”, “us”, or “Dovetail”), including
            information collected via{" "}
            <ExternalLink href="https://hyperapp.com">hyperapp.com</ExternalLink>{" "}
            (our “website”), product pages, mobile and/or web applications
            (collectively, the “Services”). For information about the use of your
            data as it relates to Dovetail Events (such as{" "}
            <a href="#insight-out" className={linkClass}>
              Insight Out
            </a>), please refer to our{" "}
            <a href="#event-release" className={linkClass}>
              Event Release
            </a>
            .
          </p>
          <p>
            As Dovetail Research Pty. Ltd. is an Australian business, this
            Privacy Policy takes into account the requirements of the Australian
            Privacy Principles set out in the{" "}
            <ExternalLink href="https://www.oaic.gov.au/privacy/the-privacy-act">
              Australian Privacy Act
            </ExternalLink>
            , as well as other applicable privacy laws.
          </p>
          <p>
            Any capitalized terms not defined in this Privacy Policy have the
            meanings given to those terms in our{" "}
            <a href="#master-subscription-agreement" className={linkClass}>
              Master Subscription Agreement
            </a>
            .
          </p>
          <p>
            This Policy does not apply to websites, apps, products, or
            services that we do not own or control. Further, where our Services
            are made available to you via an organization (for example, where
            your employer is our Customer and has made you an Authorized User of
            the Services under our contract with them), that organization will
            control the information processed via the Services, including
            Customer Data. This means that this Privacy Policy will not apply to
            that information, and Dovetail will not be responsible for the
            privacy practices of that organization. Rather, your information will
            be subject to that organization’s practices, policies, and collection
            notices. We encourage you to review these materials as they relate
            to the handling of your information.
          </p>
        </div>
      </section>

      <section className="mt-12 md:mt-16">
        <h2 className="text-[30px] font-semibold leading-[38px] text-[#101828]">
          2. What information we collect
        </h2>
        <div className="mt-4 space-y-5 text-[18px] font-normal leading-[28px] text-[#475467]">
          <p>
            We collect Personal Information in several ways. We may collect
            information directly from you or during our dealings with you, for
            example where you use our Services, contact and correspond with us,
            attend our premises or events, or apply for a position of employment
            with us.
          </p>
          <p>
            When you use our Services, you may provide information to us. This
            includes:
          </p>
          <ul className="list-disc space-y-3 pl-6 marker:text-[#475467]">
            <li>
              when you set up a profile, your name, email address, and profile
              photo (“Account Information”);
            </li>
            <li>
              content you provide through the Services (for example, projects,
              notes, tags, files);
            </li>
            <li>
              content, files, or other media that you import to the Services, as
              well as certain account details associated with such integrations;
            </li>
            <li>
              when you subscribe to our paid services, your billing details
              including your billing address;
            </li>
            <li>
              details of services we have provided to you or that you have
              enquired about;
            </li>
            <li>
              your responses to questionnaires, surveys, or requests for
              feedback; and
            </li>
            <li>
              additional Personal Information that you provide to us directly
              or indirectly through your use of our Services, associated social
              media platforms or accounts from which you permit us to collect
              information.
            </li>
          </ul>
          <p>
            We log certain information about your access to and use of our
            Services (“Technical Information”). This includes:
          </p>
          <ul className="list-disc space-y-3 pl-6 marker:text-[#475467]">
            <li>
              device data (including, but not limited to, the type of device you
              use, data on device advertising ID’s and similar hardware
              qualifiers, the browser you use, your operating system, and
              approximate geographic location data);
            </li>
            <li>
              usage data (including, but not limited to, search terms entered,
              pages viewed, and other usage behavior identified by analytics
              events);
            </li>
            <li>
              network and internet information (including, but not limited to,
              URLs, and Internet Protocol addresses); and
            </li>
            <li>
              information we collect via cookies and other tracking technologies
              (please see the “How we use tracking technologies” section below
              for more information).
            </li>
          </ul>
          <p>
            If you apply for a job with Dovetail, we may collect certain
            information in connection with your application such as your name,
            contact details, occupation, education and work history. We may also
            collect certain information necessary to verify your identification or
            working rights.
          </p>
          <p>
            We may receive information about you from third party sources. This
            includes marketing or demographic information about you from third
            party providers, including data about your organization or industry
            or other public information available online, such as through
            professional profiles. We may combine this information with other data
            we have to improve your experience with the Services or inform you of
            Services we think may be of interest to you.
          </p>
        </div>
      </section>
    </>
  );
}

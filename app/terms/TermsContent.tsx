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

const acceptableUseHref = "https://dovetail.com/legal/acceptable-use-policy";
const msaHref = "https://dovetail.com/help/master-subscription-agreement";

export default function TermsContent() {
  return (
    <>
      <div className="space-y-7 text-[18px] font-normal leading-[28px] text-[#475467] md:space-y-5">
        <p>
          This website is operated by Dovetail Research Pty. Ltd. (“we”,
          “our”, or “us”) and is available at{" "}
          <ExternalLink href="https://hyperapp.com">hyperapp.com</ExternalLink>{" "}
          (“Site”).
        </p>
        <p>
          Where you create an account or are invited by an account holder with
          a paid workspace subscription (“Customer”) to create a user account as
          an end user (“User Account”), these User Terms of Service (“User
          Terms”) apply to you. The User Terms describe your rights and
          responsibilities when using our online user research and customer
          feedback analysis, organization, collaboration, and storage tools
          (“Services”). If you are invited by a Customer to their workspace, you
          will be able to use the Services in accordance with the terms of the
          Customer’s chosen workspace subscription.
        </p>
        <p>
          As part of these User Terms, you agree to comply with the most recent
          version of our{" "}
          <ExternalLink href={acceptableUseHref}>Acceptable Use Policy</ExternalLink>
          , which is incorporated by reference into these User Terms. If you
          access or use the Services, or continue accessing or using the
          Services after being notified of a change to the User Terms or the{" "}
          <ExternalLink href={acceptableUseHref}>Acceptable Use Policy</ExternalLink>
          , you confirm that you have read, understand and agree to be bound by
          the User Terms and the{" "}
          <ExternalLink href={acceptableUseHref}>Acceptable Use Policy</ExternalLink>
          .
        </p>
      </div>

      <section className="mt-10 md:mt-16">
        <h2 className="text-[30px] font-semibold leading-[38px] text-[#101828]">
          1. Relationship
        </h2>
        <div className="mt-5 flex flex-col gap-7 text-[18px] font-normal leading-[28px] text-[#475467] md:gap-5">
          <p>
            To the extent you are invited to create an account by or on behalf
            of a Customer, Customer has separately agreed to our{" "}
            <ExternalLink href={msaHref}>Master Subscription Agreement</ExternalLink>{" "}
            or entered into a written agreement with us (in either case, the
            “Contract”) that permitted Customer to create and configure a
            workspace so that you and others could join (each invitee granted
            access to the Services, including you, is an “Authorized User”). The
            Contract contains our commitment to deliver the Services to Customer,
            who may then invite Authorized Users to join its workspace(s). When
            an Authorized User (including, you) submits content or information to
            the Services, such as messages or files (“Customer Data”), you
            acknowledge and agree that the Customer Data is owned by Customer
            and the Contract may provide Customer with choices and control over
            that Customer Data.
          </p>
          <p className="font-normal uppercase">
            AS BETWEEN US AND CUSTOMER, YOU AGREE THAT IT IS SOLELY CUSTOMER’S
            RESPONSIBILITY TO: (A) INFORM YOU AND ANY AUTHORIZED USERS OF ANY
            RELEVANT CUSTOMER POLICIES AND PRACTICES AND ANY SETTINGS THAT MAY
            IMPACT THE PROCESSING OF CUSTOMER DATA; (B) OBTAIN ANY RIGHTS,
            PERMISSIONS OR CONSENTS FROM YOU AND ANY AUTHORIZED USERS THAT ARE
            NECESSARY FOR THE LAWFUL USE OF CUSTOMER DATA AND THE OPERATION OF
            THE SERVICES; (C) ENSURE THAT THE TRANSFER AND PROCESSING OF
            CUSTOMER DATA UNDER THE CONTRACT IS LAWFUL; AND (D) RESPOND TO AND
            RESOLVE ANY DISPUTE WITH YOU AND ANY AUTHORIZED USER RELATING TO OR
            BASED ON CUSTOMER DATA, THE SERVICES OR CUSTOMER’S FAILURE TO FULFILL
            THESE OBLIGATIONS. DOVETAIL MAKES NO REPRESENTATIONS OR WARRANTIES
            OF ANY KIND, WHETHER EXPRESS OR IMPLIED, TO YOU RELATING TO THE
            SERVICES, WHICH ARE PROVIDED TO YOU ON AN “AS IS” AND “AS AVAILABLE”
            BASIS. WE MAKE NO REPRESENTATION THAT THE SERVICES COMPLY WITH THE
            LAWS (INCLUDING INTELLECTUAL PROPERTY LAWS) OF ANY COUNTRY OUTSIDE
            AUSTRALIA AND YOU AGREE THAT YOU USE THE SERVICES AT YOUR OWN RISK
            AND WE ARE NOT RESPONSIBLE FOR ENSURING THAT THE SERVICES ARE
            COMPLIANT WITH THE LAWS, REGULATIONS OR OBLIGATIONS OF ANY PARTICULAR
            INDUSTRY, INCLUDING, PARTICULARLY THE HEALTHCARE INDUSTRY AND
            EDUCATION INDUSTRY.
          </p>
        </div>
      </section>

      <section className="mt-10 md:mt-16">
        <h2 className="text-[30px] font-semibold leading-[38px] text-[#101828]">
          2. Prohibited Conduct
        </h2>
        <div className="mt-5 space-y-7 text-[18px] font-normal leading-[28px] text-[#475467] md:space-y-5">
          <p>
            To the extent prohibited by applicable law, the Services are not
            intended for and should not be used by anyone under the age of
            eighteen. You represent that you are over the legal age and, to the
            extent you are an Authorized User, you are the intended recipient of
            Customer’s invitation to the Services. You may not access or use
            the Services for any purpose if either of the representations in the
            preceding sentence is not true.
          </p>
          <p>
            You must not access or use the Services except as expressly permitted
            and you must not (and must not permit any other person to) use the
            Services in any way which is in breach of any applicable laws or
            which infringes any person’s rights, including intellectual property
            rights.
          </p>
          <p>
            To help ensure a safe and productive work environment, all
            Authorized Users must comply with our{" "}
            <ExternalLink href={acceptableUseHref}>Acceptable Use Policy</ExternalLink>{" "}
            and any applicable policies established by Customer.
          </p>
        </div>
      </section>
    </>
  );
}

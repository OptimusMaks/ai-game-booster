"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type RegionOption = {
  id: string;
  label: string;
  image: string;
};

const regions: RegionOption[] = [
  {
    id: "north-america",
    label: "NORTH AMERICA",
    image: "/assets/north-america.png",
  },
  {
    id: "europe",
    label: "EUROPE",
    image: "/assets/europe.png",
  },
  {
    id: "asia",
    label: "ASIA",
    image: "/assets/asia.png",
  },
  {
    id: "mena",
    label: "MENA",
    image: "/assets/mena.png",
  },
  {
    id: "latin-america",
    label: "LATIN AMERICA",
    image: "/assets/latin-america.png",
  },
  {
    id: "africa",
    label: "AFRICA",
    image: "/assets/africa.png",
  },
];

export default function ChooseRegionPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleSelect = (regionId: string) => {
    setSelectedRegion(regionId);
  };

  return (
    <section className="min-h-[calc(100vh-96px)] px-5 pb-10">
      <div className="mx-auto w-full max-w-[520px]">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[32px] leading-[40px] md:text-[36px] md:leading-[44px] tracking-[-1.2px] text-[#101828]">
            Where do you play from?
          </h1>

          <p className="mt-6 text-[20px] leading-[30px] text-[#475467]">
            We&apos;ll find the closest game servers to you
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {regions.map((region) => (
            <RegionCard
              key={region.id}
              label={region.label}
              image={region.image}
              active={selectedRegion === region.id}
              onClick={() => handleSelect(region.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface RegionCardProps {
  label: string;
  image: string;
  active?: boolean;
  onClick: () => void;
}

function RegionCard({ label, image, active, onClick }: RegionCardProps) {
  return (
    <div
      className={[
        "group rounded-[20px] bg-[#E0E3E9] pb-[3px]",
        "transition-[background-color,padding-bottom] duration-150 ease-out",

        // hover bottom edge
        "hover:bg-[#6C45BF]",

        // pressed: remove bottom edge
        "active:bg-transparent active:pb-0",

        active ? "bg-[#8F68E1]" : "",
      ].join(" ")}
    >
      <Link
        href="/quiz/choose-problem"
        type="button"
        onClick={onClick}
        className={[
          "block w-full overflow-hidden rounded-[20px] bg-white text-center",
          "border border-l-[#E0E3E9] border-t-[#E0E3E9] border-b-0 border-r-[#E0E3E9]",
          "transition-[border-color,border-width] duration-150 ease-out",

          // hover
          "group-hover:border-l-2 group-hover:border-t-2 group-hover:border-r-2 group-hover:border-[#7F56D9]",

          // pressed
          "group-active:border-2 group-active:border-[#8F68E1]",

          // selected
          active ? "border-2 border-[#8F68E1]" : "",
        ].join(" ")}
      >
        <div className="relative flex h-[162px] items-center justify-center bg-white p-4">
          <Image
            src={image}
            alt={label}
            width={170}
            height={120}
            className="h-auto w-full max-w-[170px] object-contain"
          />
        </div>

        <div
          className={[
            "flex h-[56px] items-center justify-center p-4",
            "bg-[#F5F7FB] text-[#101828]",
            "transition-colors duration-150 ease-out",

            "group-hover:bg-[#7F56D9] group-hover:text-white",
            "group-active:bg-[#8F68E1] group-active:text-white",

            active ? "bg-[#8F68E1] text-white" : "",
          ].join(" ")}
        >
          <span className="font-[family-name:var(--font-sf-pro-rounded)] text-[18px] font-medium leading-[24px] md:text-[20px]">
            {label}
          </span>
        </div>
      </Link>
    </div>
  );
}

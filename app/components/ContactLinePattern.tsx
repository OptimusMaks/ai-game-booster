import Image from "next/image";

type ContactLinePatternProps = {
  mirror?: boolean;
  className?: string;
};

/**
 * Декор как на лендинге: тот же ассет, что в {@link PingSection} (`/assets/line-pattern.svg`),
 * а не процедурная сетка — иначе визуал не совпадает с макетом.
 */
export default function ContactLinePattern({
  mirror,
  className,
}: ContactLinePatternProps) {
  return (
    <div className={mirror ? "inline-block scale-x-[-1]" : "inline-block"}>
      <div
        className={`relative h-[232px] w-[170px] md:h-[408px] md:w-[298px] ${className ?? ""}`}
      >
        <Image
          src="/assets/line-pattern.svg"
          alt=""
          fill
          className="object-contain object-left-top"
          sizes="(max-width: 768px) 170px, 298px"
          aria-hidden
        />
      </div>
    </div>
  );
}

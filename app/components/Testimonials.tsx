import Image from "next/image";

const testimonials = [
  {
    row: 0,
    text: 'I am appreciative of the information offered. This given information can help understand some of the "whys" I have question to.',
    initials: "KI",
    name: "Katie",
    flag: "/assets/flag-au.svg",
    avatarColor: "#f2f4f7",
  },
  {
    row: 0,
    text: "After I used HyperUp, my ping went down immediately, and it's smoother than ever and there were no technical problems unless it's a hardware or skill problem, hehe..",
    initials: "LJ",
    name: "Liam Jensen",
    flag: "/assets/flag-dk.svg",
    avatarColor: "#f2f4f7",
  },
  {
    row: 0,
    text: "The important thing is that HyperUp is safe. You can't get banned for it because the app doesn't affect any way to gameplay and only optimizes your connection.",
    initials: "IR",
    name: "ItsMeRioo",
    flag: "/assets/flag-us.svg",
    avatarColor: "#f2f4f7",
  },
  {
    row: 0,
    text: "I used to have a ping of 60-100 using Wi-Fi , there is no need to say more. The important thing is that with this, I managed to lower ping from 68 to about 50.",
    initials: "JV",
    name: "Julian Vance",
    flag: "/assets/flag-gb.svg",
    avatarColor: "#f2f4f7",
  },
  {
    row: 0,
    text: "Before my friends recommended HyperUp to me, I could not connect well to any NA servers. Now with HyperUp, I can finally play on American servers with my friends!",
    initials: "OM",
    name: "Oliver Miller",
    flag: "/assets/flag-us.svg",
    avatarColor: "#f2f4f7",
  },
  {
    row: 1,
    text: "HyperUp helps me reduce the latency by over 50%, which has improved my win rate.",
    initials: "MF",
    name: "Mateo Fernández",
    flag: "/assets/flag-ar.svg",
    avatarColor: "#f2f4f7",
  },
  {
    row: 1,
    text: "Nighttime lag and packet loss on the Korean server used to ruin my games. Now, HyperUp keeps my connection stable so I can play at my best, stress-free!",
    initials: "SJ",
    name: "Seo-jun",
    flag: "/assets/flag-kr.svg",
    avatarColor: "#f2f4f7",
  },
  {
    row: 1,
    text: "My location used to cause constant disconnects and peak-hour lag that made gaming impossible for days. Since finding this app, I have excellent ping and total reliability. I'm finally back on the podium!",
    initials: "NG",
    name: "Noah Garcia",
    flag: "/assets/flag-us.svg",
    avatarColor: "#f2f4f7",
  },
  {
    row: 1,
    text: "Living in the America Far East, geographic hurdles always meant high ping on European and Asian servers. HyperUp changed everything; I finally get sub-50ms ping on the Japan server!",
    initials: "ZH",
    name: "Zoe Hart",
    flag: "/assets/flag-us.svg",
    avatarColor: "#f2f4f7",
  },
];

function StarRating() {
  return (
    <div className="flex gap-[16px]">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="relative w-[24px] h-[24px]">
          <Image src="/assets/star.svg" alt="" fill />
        </div>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="w-[335px] md:w-[453px] shrink-0 bg-white rounded-[16px] border border-[#EAECF0] p-[16px] md:p-[24px] flex flex-col justify-between"
      style={{ minHeight: 252 }}
    >
      <div className="flex flex-col gap-[16px]">
        <StarRating />
        <div className="p-[16px]">
          <p className="text-[14px] leading-[24px] text-[#475467] font-medium font-[family-name:var(--font-inter)]">
            {t.text}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-[8px] mt-[16px]">
        <div className="w-[44px] h-[44px] rounded-full bg-[#F9F5FF] flex items-center justify-center">
          <span className="text-[14px] font-semibold text-[#6941C6]">
            {t.initials}
          </span>
        </div>
        <div className="flex items-center gap-[8px]">
          <span className="text-[14px] font-semibold text-[#101828] font-[family-name:var(--font-inter)]">
            {t.name}
          </span>
          <div className="relative w-[16px] h-[16px]">
            <Image src={t.flag} alt="" fill className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

export type TestimonialsProps = {
  /** Home hero section vs paywall (different heading and layout tweaks). */
  mode?: "home" | "paywall";
};

export default function Testimonials({ mode = "home" }: TestimonialsProps) {
  const row0 = testimonials.filter((t) => t.row === 0);
  const row1 = testimonials.filter((t) => t.row === 1);
  const isPaywall = mode === "paywall";

  return (
    <section
      className={
        isPaywall
          ? "w-full bg-white px-[16px] md:px-[80px] py-[44px] md:py-[64px] overflow-hidden"
          : "w-full bg-white py-[44px] md:pb-[96px] md:pt-0 px-[80px] overflow-hidden"
      }
      id={isPaywall ? undefined : "reviews"}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-[44px] md:gap-[64px]">
        {/* Header */}
        {isPaywall ? (
          <h2 className="mx-auto w-full max-w-[600px] px-4 text-center font-[family-name:var(--font-sf-pro-rounded)] font-semibold text-[#101828] text-[32px] leading-[40px] tracking-[-0.72px] md:text-[36px] md:leading-[44px]">
            See what the gaming community says
          </h2>
        ) : (
          <div className="flex flex-col items-center gap-[20px]">
            <div className="relative w-[32px] h-[32px]">
              <Image src="/assets/heart-icon.svg" alt="" fill />
            </div>
            <h2
              className="font-[family-name:var(--font-sf-pro-rounded)] text-[32px] leading-[40px] font-semibold tracking-[-1.2px] md:text-[36px] text-center md:leading-[44px]"
              style={{
                fontFamily:
                  "'SF Pro Rounded', 'SF Pro Display', -apple-system, sans-serif",
              }}
            >
              <span className="text-[#101828]">Trusted by</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(176deg, #43CBFF 0%, #9708CC 100%)",
                }}
              >
                gamers
              </span>
              <span className="text-[#101828]"> around the world</span>
            </h2>
          </div>
        )}

        {/* Testimonial rows */}
        <div className="w-[calc(100%+604px)] -ml-[302px] flex flex-col gap-[16px] md:gap-[24px]">
          <div className="flex w-max gap-[16px] md:gap-[24px] animate-[marquee-left_40s_linear_infinite]">
            {[...row0, ...row0].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
          <div className="flex w-max gap-[16px] md:gap-[24px] animate-[marquee-right_40s_linear_infinite]">
            {[...row1, ...row1].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

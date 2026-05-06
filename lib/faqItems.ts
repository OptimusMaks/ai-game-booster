export type FaqItem = {
  question: string;
  answer: string | string[];
};

/** Shared FAQ copy for landing (`FaqSection`) and paywall; third item is multi-paragraph with HyperUp branding. */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is HyperUp?",
    answer:
      "HyperUp is a boosting service dedicated to GAMING ONLY. Our technology reduces latency, prevents packet loss, and stabilizes network connection for players trying to play games, especially on a foreign server.",
  },
  {
    question: "How does HyperUp reduce ping?",
    answer:
      "Simply put, HyperUp can avoid congested routes and re-route to a dedicated pathway. The path to the server is the shortest, resulting in the lowest latency. Additionally, because you are using a dedicated route/line that is not shared with everyone like a public network, your connection will no longer experience packet loss, and network stability will be greatly enhanced.",
  },
  {
    question: "Is HyperUp safe to use?",
    answer: [
      "HyperUp promises every user that we ONLY focus on your network connection optimization and NOTHING MORE.",
      "Our services do not interfere with any of your in-game performance and data, so please rest assured that you will NOT be detected or banned by the game by using HyperUp.",
      "Also, we're collaborating with various game-related developers (BattlEye, Bluehole, SONY Playstation, etc.) and with approval from all the games we have in our collection. You can totally trust HyperUp's service.",
    ],
  },
  {
    question: "How many games does HyperUp support?",
    answer:
      "Every day, we add new games to our extensive library, which currently boasts a selection of over 200 supported games — and that number is constantly growing. If you can't find your game, please don't hesitate to contact us.",
  },
  {
    question: "How to add a game to HyperUp?",
    answer:
      "If your favorite game isn't in our portfolio yet, don't worry — we can add it for you. Just contact us, and we'll make sure to add it right away!",
  },
];

/** Paywall copy matches landing FAQ; first answer keeps thin nbsp breaks from the paywall layout. */
export function getPaywallFaqItems(): FaqItem[] {
  return FAQ_ITEMS.map((item, i) => {
    if (i !== 0 || typeof item.answer !== "string") return item;
    return {
      ...item,
      answer: item.answer
        .replace("dedicated to ", "dedicated to\u00A0")
        .replace("GAMING ONLY. ", "GAMING ONLY.\u00A0")
        .replace("especially on", "especially\u00A0on"),
    };
  });
}

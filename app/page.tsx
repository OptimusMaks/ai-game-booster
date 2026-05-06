import Header from "./components/Header";
import Hero from "./components/Hero";
import PopularGames from "./components/PopularGames";
import PingSection from "./components/PingSection";
import Features from "./components/Features";
import CtaBanner from "./components/CtaBanner";
import Testimonials from "./components/Testimonials";
import FaqSection from "./components/FaqSection";
import BottomCta from "./components/BottomCta";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div>
        <Header />
        <Hero />
      </div>
      <PopularGames />
      <PingSection />
      <Features />
      <CtaBanner />
      <Testimonials />
      <FaqSection />
      <BottomCta />
      <Footer />
    </div>
  );
}

import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import TrustedBy from "@/components/home/TrustedBy";
import TargetAudience from "@/components/home/TargetAudience";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <Stats />
      <Features />
      <TargetAudience />
      <CallToAction />
    </>
  );
}

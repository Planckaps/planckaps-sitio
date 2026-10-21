import { Hero } from "@/components/home/Hero";
import { WhyDic } from "@/components/home/WhyDic";
import { Applications } from "@/components/home/Applications";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Comparative } from "@/components/home/Comparative";
import { Professionals } from "@/components/home/Professionals";
import { CostTeaser } from "@/components/home/CostTeaser";
import { Inspiration } from "@/components/home/Inspiration";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyDic />
      <Applications />
      <FeaturedProducts />
      <Comparative />
      <Professionals />
      <CostTeaser />
      <Inspiration />
      <FinalCta />
    </>
  );
}

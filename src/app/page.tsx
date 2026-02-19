import {
  About,
  Advantages,
  Contact,
  Footer,
  Geography,
  Header,
  Hero,
  Partners,
  Services,
} from "@/components";
import { ScrollProgress } from "@/components/ui";
import { content } from "@/content";
import { ORGANIZATION_JSON_LD } from "@/constants";

const RootPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ORGANIZATION_JSON_LD),
        }}
      />
      <ScrollProgress />
      <Header t={content} />
      <main>
        <Hero t={content} />
        <About t={content} />
        <Services t={content} />
        <Advantages t={content} />
        <Geography t={content} />
        <Partners t={content} />
        <Contact t={content} />
      </main>
      <Footer t={content} />
    </>
  );
};

export default RootPage;

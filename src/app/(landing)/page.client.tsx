"use client";

import React from "react";
import { StarsBackground } from "@/components/ui/bg/stars";
import HeroArea from "@/components/landing/hero-area/HeroArea";
import Benefits from "@/components/landing/benefits/Benefits";
import HowItWorks from "@/components/landing/how-it-works/HowItWorks";
import Pricing from "@/components/landing/pricing/Pricing";
import Testimonials from "@/components/landing/testimonials/Testimonials";
import Faq from "@/components/landing/faq/faq";
import Cta from "@/components/landing/CTA/cta";
import { InView } from "@/components/ui/InView";

const LandingPageClient = () => {
  return (
    <div className="relative overflow-hidden">
      <StarsBackground className="fixed inset-0 -z-10 flex items-center justify-center" />

      <HeroArea />

      <InView
        variants={{
          hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95,
            filter: "blur(4px)",
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        viewOptions={{ margin: "0px 0px -350px 0px" }}
      >
        <Benefits />
      </InView>

      <InView
        variants={{
          hidden: {
            opacity: 0,
            x: 100,
          },
          visible: {
            opacity: 1,
            x: 0,
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        viewOptions={{ margin: "0px 0px -350px 0px" }}
      >
        <HowItWorks />
      </InView>

      <InView
        variants={{
          hidden: {
            opacity: 0,
            x: -100,
          },
          visible: {
            opacity: 1,
            x: 0,
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        viewOptions={{ margin: "0px 0px -350px 0px" }}
      >
        <Pricing />
      </InView>

      <InView
        variants={{
          hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95,
            filter: "blur(4px)",
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        viewOptions={{ margin: "0px 0px -350px 0px" }}
      >
        <Testimonials />
      </InView>

      <InView
        variants={{
          hidden: {
            opacity: 0,
            x: 100,
          },
          visible: {
            opacity: 1,
            x: 0,
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        viewOptions={{ margin: "0px 0px -350px 0px" }}
      >
        <Faq />
      </InView>

      <InView
        variants={{
          hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95,
            filter: "blur(4px)",
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        viewOptions={{ margin: "0px 0px -350px 0px" }}
      >
        <Cta />
      </InView>
    </div>
  );
};

export default LandingPageClient;

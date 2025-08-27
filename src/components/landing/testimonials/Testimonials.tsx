"use client";

import React from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import testimonialsData from "@/data/testimonials.json";
import { TestimonialCard } from "@/components/ui/testimonial-card";

const Testimonials = () => {
  return (
    <>
      {/* Testimonials Section */}
      <section
        className="w-full min-h-screen mt-[10rem] overflow-hidden"
        id="testimonials"
      >
        <div className="w-full h-full container mx-auto flex items-center justify-center flex-col gap-20 px-4">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-5xl font-medium">
              Testimonios de usuarios
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Descubre cómo Straumix está transformando la gestión financiera de
              miles de personas
            </p>
          </div>

          {/* Two Rows of Testimonials */}
          <div className="w-full max-w-7xl space-y-5">
            {/* First Row - First 3 testimonials */}
            <div className="w-full flex items-center justify-center">
              <InfiniteSlider
                direction="horizontal"
                speed={50}
                speedOnHover={10}
                gap={32}
                className="py-8"
              >
                {testimonialsData.slice(0, 3).map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    name={testimonial.name}
                    description={testimonial.description}
                    initial={testimonial.initial}
                    gradient={testimonial.gradient}
                    rating={testimonial.rating}
                    testimonial={testimonial.testimonial}
                  />
                ))}
              </InfiniteSlider>
            </div>

            {/* Second Row - Last 3 testimonials */}
            <div className="w-full flex items-center justify-center">
              <InfiniteSlider
                direction="horizontal"
                speed={50}
                speedOnHover={10}
                gap={32}
                className="py-8"
                reverse={true}
              >
                {testimonialsData.slice(3, 6).map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    name={testimonial.name}
                    description={testimonial.description}
                    initial={testimonial.initial}
                    gradient={testimonial.gradient}
                    rating={testimonial.rating}
                    testimonial={testimonial.testimonial}
                  />
                ))}
              </InfiniteSlider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;

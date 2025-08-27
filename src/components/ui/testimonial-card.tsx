import React from "react";

interface TestimonialCardProps {
  name: string;
  description: string;
  initial: string;
  gradient: string;
  rating: number;
  testimonial: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  description,
  initial,
  gradient,
  rating,
  testimonial,
}) => {
  return (
    <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 min-w-[400px] shadow-lg hover:shadow-xl">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-semibold text-lg shadow-lg`}
        >
          {initial}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-3">
        {[...Array(rating)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-yellow-500 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="text-gray-700 dark:text-gray-300 italic leading-relaxed  max-w-[20rem]">
        &ldquo;{testimonial}&rdquo;
      </blockquote>
    </div>
  );
};

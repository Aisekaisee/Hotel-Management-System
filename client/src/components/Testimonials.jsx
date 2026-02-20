import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonials = () => {
  
  return (
    <>
      <div>
        <Title
          title="What Our Guests Say"
          subTitle="Discover why discerning travelers choose QuickStay for their luxury accomodations around the world"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 pt-14">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5"
          >
            <div className="flex flex-col items-center px-5 py-4 relative">
              <img
                className="h-24 w-24 absolute -top-14 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div className="pt-8 text-center">
                <h1 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-gray-800/80">{testimonial.address}</p>
              </div>
            </div>
            <p className="text-gray-500 px-6 text-center">
              {testimonial.review}
            </p>
            <div className="flex justify-center pt-4">
              <StarRating/>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Testimonials;

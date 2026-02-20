import React from "react";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30">
      <div className="flex flex-col md:flex-row items-center md:items-center justify-between w-full gap-8">
        <div className="flex-1">
          <Title
            align="left"
            title="Exclusive Offers"
            subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
          />
        </div>
        <div className="shrink-0">
          <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-all whitespace-nowrap">
            View All Offers
            <img
              src={assets.arrowIcon}
              alt="arrow-icon"
              className="group-hover:translate-x-1 transition-all"
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="group relative flex flex-col items-start justify-between gap-4 p-6 rounded-xl text-white bg-no-repeat bg-cover bg-center overflow-hidden"
            style={{
              backgroundImage: `url(${item.image})`,
              minHeight: "300px",
            }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all"></div>

            <div className="relative z-10">
              <p className="px-3 py-1 text-xs bg-white text-gray-800 font-medium rounded-full w-fit">
                {item.priceOff}% OFF
              </p>
            </div>

            <div className="relative z-10 flex-1">
              <p className="text-2xl font-bold mb-2">{item.title}</p>
              <p className="text-sm opacity-90 mb-2">{item.description}</p>
              <p className="text-xs opacity-75">Expires {item.expiryDate}</p>
            </div>

            <button className="relative z-10 flex items-center gap-2 px-4 py-2 bg-white text-gray-800 font-medium rounded hover:bg-gray-100 transition-all group/btn">
              View Offers
              <img
                className="group-hover/btn:translate-x-1 transition-all"
                src={assets.arrowIcon}
                alt="arrow-icon"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;

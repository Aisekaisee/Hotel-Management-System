import React from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const AllRooms = () => {
  const navigate = useNavigate();
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);
  const [selectedPriceRanges, setSelectedPriceRanges] = React.useState([]);
  const [selectedPopularFilters, setSelectedPopularFilters] = React.useState(
    [],
  );

  const priceRanges = [
    { label: "Under $200", min: 0, max: 199 },
    { label: "$200 - $300", min: 200, max: 300 },
    { label: "Above $300", min: 301, max: Infinity },
  ];

  const popularFilters = [
    "Free WiFi",
    "Free Breakfast",
    "Room Service",
    "Mountain View",
    "Pool Access",
  ];

  const handlePriceRangeToggle = (label) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const handlePopularFilterToggle = (filter) => {
    setSelectedPopularFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter],
    );
  };

  const clearAllFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedPopularFilters([]);
  };

  const filteredRooms = roomsDummyData.filter((room) => {
    const matchesPrice =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((label) => {
        const range = priceRanges.find((item) => item.label === label);
        if (!range) return false;
        return (
          room.pricePerNight >= range.min && room.pricePerNight <= range.max
        );
      });

    const matchesPopularFilters =
      selectedPopularFilters.length === 0 ||
      selectedPopularFilters.every((filter) => room.amenities.includes(filter));

    return matchesPrice && matchesPopularFilters;
  });

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="w-full lg:w-3/4">
        <div>
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Take Advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories
          </p>

          <button
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="lg:hidden mt-4 px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700"
          >
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {filteredRooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
            >
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt="hotel-img"
                title="View Room Details"
                className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer "
              />
              <div className="md:w-1/2 flex flex-col gap-2">
                <p className="text-gray-500">{room.hotel.city}</p>
                <p
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                  className="text-gray-800 font-playfair text-3xl cursor-pointer"
                >
                  {room.hotel.name}
                </p>
                <div className="flex items-center">
                  <StarRating />
                  <p className="ml-2">200+ reviews</p>
                </div>
                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>{room.hotel.address}</span>
                </div>
                {/* Room Amenities */}
                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                    >
                      <img
                        src={facilityIcons[item]}
                        alt={item}
                        className="w-5 h-5"
                      />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>
                {/* Room price per night */}
                <p className="text-xl font-medium text-gray-700">
                  ${room.pricePerNight}/night
                </p>
              </div>
            </div>
          ))}

          {filteredRooms.length === 0 && (
            <div className="py-10 text-gray-500">
              No rooms match selected filters.
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div
        className={`${showMobileFilters ? "block" : "hidden"} fixed top-0 inset-x-0 z-50 max-h-[85vh] overflow-y-auto p-5 border-b border-gray-200 bg-white lg:max-h-none lg:overflow-visible lg:block lg:w-1/4 lg:sticky lg:top-28 lg:mb-0 lg:ml-8 lg:rounded-xl lg:border lg:border-gray-200`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear all
            </button>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="text-sm text-gray-600 lg:hidden"
            >
              Close
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Price</h3>
          <div className="space-y-3">
            {priceRanges.map((range) => (
              <label
                key={range.label}
                className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.includes(range.label)}
                  onChange={() => handlePriceRangeToggle(range.label)}
                  className="w-4 h-4"
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Popular Filters
          </h3>
          <div className="space-y-3">
            {popularFilters.map((filter) => (
              <label
                key={filter}
                className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPopularFilters.includes(filter)}
                  onChange={() => handlePopularFilterToggle(filter)}
                  className="w-4 h-4"
                />
                <span>{filter}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;

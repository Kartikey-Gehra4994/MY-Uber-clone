import { MdLocationPin } from "react-icons/md";

const LocationSearchPanel = (props) => {
  const {
    suggestions = [],
    setPanelOpen,
    setVehiclePanelOpen,
    setPickup,
    setDestination,
    activeField
  } = props;

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
    } else if (activeField === 'destination') {
      setDestination(suggestion);
    }
  };

  const locationsToShow = suggestions;

  return (
    <div className="space-y-6">
      {locationsToShow.map((loc, index) => (
        <div
          onClick={() => handleSuggestionClick(loc)}
          key={index}
          className="relative flex items-center gap-4 p-4 rounded-2xl bg-white/30 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
        >
          {/* Icon circle */}
          <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300">
            <MdLocationPin size={18} />
          </div>

          {/* Location Text */}
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 group-hover:text-black transition-colors duration-200">
              {loc}
            </h4>
            <p className="text-sm text-gray-500">Tap to select this location</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;


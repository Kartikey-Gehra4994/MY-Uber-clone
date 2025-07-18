import { MdLocationPin } from "react-icons/md";

const LocationSearchPanel = (props) => {
  const locations = [
    "123, Green Park, New Delhi",
    "45, Residency Road, Bangalore",
    "89, MG Road, Mumbai",
    "Plot 12, Sector 18, Noida",
  ];

  return (
    <div className="space-y-6">
      {locations.map((loc, index) => (
        <div
          onClick={() => {
            props.setPanelOpen(false);
            props.setVehiclePanelOpen(true)
          }}
          key={index}
          className="relative flex items-center gap-4 p-4 rounded-2xl bg-white/30 backdrop-blur-md border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
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

          {/* Gradient glow border on hover */}
          <div className="absolute -inset-[2px] rounded-2xl z-[-1] opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-lg"></div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;


import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, OverlayView } from "@react-google-maps/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
 
const containerStyle = {
  width: "100%",
  height: "100%",
};
 
const MapComponent = ({ center, properties, onVisiblePropertiesChange }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const mapRef = useRef(null);
  const BASE_URL = "http://localhost:8080"; // Update with your actual backend URL    
 
  const onLoad = useCallback((map) => {
    mapRef.current = map;
    console.log("Google Maps Loaded");
  }, []);
 
  const getAvailableBHKs = (property) => {
    if (!property.availableBHKs || property.availableBHKs.length === 0) return "None";

    return property.availableBHKs
      .map(bhk => bhk.replace("BHK", "")) // Remove "BHK" from each entry
      .join(", ");
    // const availableBHKs = [];
    // if (property.bhk_1) availableBHKs.push("1");
    // if (property.bhk_2) availableBHKs.push("2");
    // if (property.bhk_3) availableBHKs.push("3");
    // if (property.bhk_4) availableBHKs.push("4");
    // return availableBHKs.length > 0 ? availableBHKs.join(", ") : "None";
  };
 
  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    if (mapRef.current) {
      mapRef.current.panTo({
        lat: parseFloat(property.latitude) - 0.03,
        lng: parseFloat(property.longitude),
      });
    }
  };
 
  const closePropertyCard = () => {
    setSelectedProperty(null);
  };
 
  const handleMapClick = () => {
    if (selectedProperty) closePropertyCard();
  };
 
  // ✅ Function to filter properties within visible bounds
  const onBoundsChanged = () => {
    if (!mapRef.current) return;
    const bounds = mapRef.current.getBounds();
    if (!bounds) return;
 
    const visibleProperties = properties.filter((property) => {
      const lat = parseFloat(property.latitude);
      const lng = parseFloat(property.longitude);
      return bounds.contains({ lat, lng });
    });
 
    onVisiblePropertiesChange(visibleProperties); // Update visible properties
  };
 
  useEffect(() => {
    return () => {
      if (mapRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(mapRef.current);
      }
    };
  }, []);
 
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg"
      onError={() => console.error("Error loading Google Maps API")}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{ fullscreenControl: false }}
        onLoad={onLoad}
        onClick={handleMapClick}
        onBoundsChanged={onBoundsChanged} // ✅ Update properties on zoom/pan
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={{ lat: parseFloat(property.latitude), lng: parseFloat(property.longitude) }}
            title={property.projectName || "Property Location"}
            onClick={() => handleMarkerClick(property)}
          />
        ))}
 
        {selectedProperty && (
          <OverlayView
            position={{
              lat: parseFloat(selectedProperty.latitude),
              lng: parseFloat(selectedProperty.longitude),
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              style={{
                width: "250px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                borderRadius: "12px",
                padding: "12px",
                backgroundColor: "#fff",
              }}
            >
              {selectedProperty.projectImages?.length > 0 ? (
                <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="h-50 w-full">
                  {selectedProperty.projectImages.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                       src={img.startsWith("http") ? img : `${BASE_URL}${img}`}
                       alt={`${selectedProperty.projectName || "Property"} ${index + 1}`} className="w-full h-full object-cover" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p className="text-gray-400">No images available.</p>
              )}
              <h2><strong>₹{selectedProperty.budget || "Price Not Available"}</strong></h2>
              <p><strong>BHK :</strong> {getAvailableBHKs(selectedProperty)}</p>
              <p style={{ color: "#666" }}>{selectedProperty.address || "Address Not Available"}</p>
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </LoadScript>
  );
};
 
export default MapComponent;
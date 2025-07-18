import React, { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Building, Search, Loader2, Navigation } from "lucide-react";

function NearbyPharmacies() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    // If user location is set, fetch nearby pharmacies
    if (userLocation) {
      fetchNearbyPharmacies(userLocation.lat, userLocation.lon);
    }
  }, [userLocation]);

  const searchLocation = async (query) => {
    if (!query.trim()) return;
    
    setSearchLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ", India")}&format=json&limit=1`
      );
      const data = await response.json();

      if (data.length === 0) {
        setError("Location not found. Please try a different search term.");
        return;
      }

      const { lat, lon } = data[0];
      setUserLocation({ lat, lon });
    } catch (err) {
      setError("Failed to search location. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchLocation(searchQuery);
  };

  const getUserLocation = () => {
    setLocationError(null);
    setError(null);
    setLoading(true);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Get the address of the user's location
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          
          setUserLocation({
            lat: latitude,
            lon: longitude,
            address: data.display_name
          });
        } catch (err) {
          setUserLocation({
            lat: latitude,
            lon: longitude,
            address: "Location found"
          });
        }
      },
      (error) => {
        setLoading(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Please allow location access to find nearby pharmacies.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out.");
            break;
          default:
            setLocationError("An unknown error occurred while getting your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const fetchPharmacyAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      return data.display_name || "Address not found";
    } catch (err) {
      console.error("Error fetching address:", err);
      return "Error fetching address";
    }
  };

  const fetchNearbyPharmacies = async (lat, lon) => {
    try {
      const radius = 5000; // 5km in meters
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="pharmacy"](around:${radius},${lat},${lon});
          way["amenity"="pharmacy"](around:${radius},${lat},${lon});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      const data = await response.json();

      if (!data.elements.length) {
        setError("No pharmacies found nearby.");
        setPharmacies([]);
        return;
      }

      const pharmaciesWithAddresses = await Promise.all(
        data.elements
          .filter(element => element.type === "node")
          .map(async (element) => {
            const fullAddress = await fetchPharmacyAddress(element.lat, element.lon);
            return {
              id: element.id,
              name: element.tags?.name || "Unknown Pharmacy",
              address: fullAddress,
              phone: element.tags?.phone || "Not available",
              opening_hours: element.tags?.opening_hours || "Hours not available",
              lat: element.lat,
              lon: element.lon,
              distance: calculateDistance(lat, lon, element.lat, element.lon),
            };
          })
      );

      setPharmacies(pharmaciesWithAddresses.sort((a, b) => a.distance - b.distance));
    } catch (err) {
      setError("Failed to fetch nearby pharmacies. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-grey-50 to-cygrey-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Building className="w-12 h-12 text-cyan-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Nearby Pharmacies</h1>
          <p className="text-gray-600 mb-8">Find pharmacies near your location</p>

          <div className="max-w-2xl mx-auto mb-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location (e.g., Mumbai, Delhi)"
                className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pl-12"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="submit"
                disabled={searchLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#0e1630] text-white px-6 py-2 rounded-full hover:bg-[#F4C430] transition-colors duration-300 disabled:bg-[#0e1630]"
              >
                {searchLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
              </button>
            </form>
          </div>

          <div className="flex justify-center">
            <button
              onClick={getUserLocation}
              disabled={loading}
              className="bg-[#0e1630] text-white px-6 py-3 rounded-full hover:bg-[#0e1630] transition-colors duration-300 flex items-center space-x-2 disabled:bg-[#F4C430]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Getting Location...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-5 h-5" />
                  <span>Use My Location</span>
                </>
              )}
            </button>
          </div>

          {locationError && (
            <div className="mt-4 text-red-600">
              {locationError}
            </div>
          )}

          {userLocation?.address && (
            <div className="mt-4 text-green-600">
              Current location: {userLocation.address}
            </div>
          )}
        </header>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-[#F4C430]" />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{pharmacy.name}</h2>
                  <span className="bg-[#F4C430] text-[white-800] text-sm font-medium px-2.5 py-0.5 rounded">
                    {formatDistance(pharmacy.distance)}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 text-[#F4C430] flex-shrink-0 mt-1" />
                    <span className="flex-1">{pharmacy.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-2 text-[#F4C430] flex-shrink-0" />
                    <span>{pharmacy.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2 text-[#F4C430] flex-shrink-0" />
                    <span>{pharmacy.opening_hours}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${pharmacy.lat},${pharmacy.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#F4C430] text-white px-4 py-2 rounded-md hover:bg[#F4C430] transition-colors duration-300"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NearbyPharmacies;

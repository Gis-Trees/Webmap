// initMap();
async function initMap() {
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // Get the user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      // Create the map centered at the user's location
      const map = new Map(document.getElementById("map"), {
        zoom: 17, // You can adjust the initial zoom level
        center: userPosition,
        mapId: "abb6147d4280ec0f",
      });

      // Create a marker at the user's location
      const marker = new AdvancedMarkerElement({
        map: map,
        position: userPosition,
        title: "Your Location",
      });
    });
  } else {
    // Handle the case where geolocation is not available
    console.error("Geolocation is not supported by this browser.");
  }
}

initMap();

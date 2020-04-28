const mapCenter = {
    lat: 44.486280,
    lng: 4.747274


};

// Initialize and add the map
function initMapOneSpot() {

    // The map, centred at spotMarker
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 8,
            center: mapCenter
        });

    // The marker, positioned at spotMarker
    axios.get("/api/spots/").then(apiRes => {
        const spots = apiRes.data;
        spots.forEach(spot => {
            var marker = new google.maps.Marker({
                position: {
                    lat: spot.latitude,
                    lng: spot.longitude
                },
                map: map
            });
        })
    }).catch(apiErr => {
        console.log(apiErr)
    })
    console.log(spotMarker)
}



initMapOneSpot()
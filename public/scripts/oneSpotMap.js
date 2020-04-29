// function initMap() {
//     // The location of Uluru
//     var uluru = {
//         lat: -25.344,
//         lng: 131.036
//     };
//     // The map, centered at Uluru
//     var map = new google.maps.Map(
//         document.getElementById('map'), {
//             zoom: 4,
//             center: uluru
//         });
//     // The marker, positioned at Uluru
//     var marker = new google.maps.Marker({
//         position: uluru,
//         map: map
//     });
// }

// initMap()


// ---------------------------

const mapCenter = {
    lat: 47.824905,
    lng: 2.618787
};

// Initialize and add the map
function initMapOneSpot() {

    // The map, centred at spotMarker
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
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
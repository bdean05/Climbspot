console.log('hey!')
const showOnMap = document.querySelector('#showOnMap');

function initMapOneSpot() {
    console.log('hello')

    // The location of Uluru
    var uluru = {
        lat: Number(showOnMap.dataset.latitude),
        lng: Number(showOnMap.dataset.longitude)

    };
    console.log(uluru)
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 12,
            center: uluru
        });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}


initMapOneSpot()
var marker;
var map;

function initMap(){
// MAP
    var options = {
        zoom: 5,
        center:{lat: 0, lng: 0 } 
    };
    var map = new google.maps.Map(document.getElementById('map'),options);
    
// CURRENT LOCATION
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>{
            var currentLocation = new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            );
            map.setCenter(currentLocation);
            
            
            // DIRECTION
            
            const directionService = new google.maps.DirectionsService();
            const directionRenderer = new google.maps.DirectionsRenderer({
                map: map
            });

            const origin = currentLocation;
            const form = document.getElementById('form');


            form.addEventListener('submit',(e) => {
                e.preventDefault();
                var destination = document.getElementById('inputField').value;
                directionService.route({
                    origin: origin,
                    destination: destination,
                    travelMode: "DRIVING",
                    avoidHighways: true
                },
                (response,status) =>{
                    if(status == "OK"){
                        directionRenderer.setDirections(response);
                        showSteps(response);
                    }
                });
            });
        });
    }
    liveLocation(map);
    
    /* Markerks for safe zones
    markerArray = [
        {coords:{lat:36.9909,lng:35.1812}},
        {coords:{lat:36.9766,lng:35.0727}},
        {coords:{lat:36.9264,lng:34.9432}},
        {coords:{lat:36.8434,lng:34.7726}}
    ];
    
    function addMarker(prop,map){
        var marker = new google.maps.Marker({
            position: prop.coords,
            map: map,
            title: 'Marker Title'
        });
    }
    for(let i = 0; i < markerArray.length;i++){
        addMarker(markerArray[i],map);
    }*/
}

function liveLocation(map){
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          function (position) {
            // Get the user's latitude and longitude
            var userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
    
            if(marker){
              marker.setPosition(userLocation);
            }else{
              marker = new google.maps.Marker({
                position: userLocation,
                map: map,
                label: 'Y'
              });
            }
        });
    }
}

function sensors(min,max,dangerous,id){
    var value = Math.floor(Math.random() * (max - min)) + min;
    var variable = document.getElementById('status');
    if (value >= dangerous) {
        if(document.getElementById(id).name == "MANOMETER VALUE" ){
            variable.innerHTML = "! WARNING "+ document.getElementById(id).name +" IS CHANGED !";
        }else{
            variable.innerHTML = "! WARNING "+ document.getElementById(id).name +" IS INCREASED !";
        }
        variable.style.color = "white";
        variable.style.borderColor = "red";
        variable.style.background = "red";
        variable.style.width = '85%';
        document.getElementById('feedBack').style.display = "inline-block";
    }else{
        variable.innerHTML = "EVERYTHING IS OK";
        variable.style.color = "white";
        variable.style.borderColor = "black";
        variable.style.background = "black";
        variable.style.width = '100%';
        document.getElementById('feedBack').style.display = "none";
    }
    return value;
}


function feedBack(){
    console.log("There is a problem in vehichle");
}
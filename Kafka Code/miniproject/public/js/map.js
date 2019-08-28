
function initMap() {
    var centerPose = {lat: 24.713480, lng: 46.674987};
    var n1PoseT = {lat: 24.729175, lng: 46.660559};
    var n1PoseH = {lat: 24.727947, lng: 46.663220};
    var n2PoseT = {lat: 24.761776, lng: 46.740189};
    var n2PoseS = {lat: 24.759477, lng: 46.739105};
    var n3Pose = {lat: 24.645631, lng: 46.699013};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: centerPose
    });

    var hMarker = createMarker(n1PoseH, "https://png.pngtree.com/svg/20170122/humidity_886295.png", "Humidity");
    //var tMarker = createMarker(n1PoseT, "images/humidity.png", "Humidity");
    //var gMarker = createMarker({lat: 2.33031, lng: 3.42421}, "humidity.png", "Humidity", "Humidity");
}
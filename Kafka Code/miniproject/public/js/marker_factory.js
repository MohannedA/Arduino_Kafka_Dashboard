var createMarker = (latlng, imgUrl, text) => {
    var icon = {
      url: imgUrl, // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0), // anchor
      labelOrigin: new google.maps.Point(16,64)
    };

    var label = {
      text: text,
      color: "black",
      fontWeight: "bold",
      fontSize: "16px",
    }

    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: text,
      icon: icon,
      label: label
    });
}
var map = L.map('map',{minZoom: 2, maxZoom: 8}).setView([30,0], 3);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + API_KEY, {
    id: 'mapbox.light',
    noWrap: true
}).addTo(map);


//Function to determine coloring based on happiness score
function getColor(d) {
  return d > 7.00 ? '#00ECFF' :
         d > 6.5  ? '#00FCC3' :
         d > 6  ? '#00FA77' :
         d > 5.5  ? '#1BF500' :
         d > 5  ? '#EDEC00' :
         d > 4   ? '#EBA400' :
         d > 3.00   ? '#E85E00' :
                    '#E61900';
}


function onEachFeature(feature, layer) {
  var happiness_score = 0
  var flag
    for(i=0;i<happiness_data.length;i++){
      if(feature.properties.ADMIN === happiness_data[i].Country){
      happiness_score = happiness_data[i]['Happiness.Score'].toPrecision(3)
      }
    }
    for(i=0;i<flag_data.length;i++){
      if(feature.properties.ADMIN===flag_data[i].name){
        console.log(feature.properties.ADMIN, flag_data[i].name, flag_data[i].emoji)
        flag=flag_data[i].emoji
      }
    }
    layer.bindPopup("<b><font size =\"+1\">"+feature.properties.ADMIN+" </b>"+flag+"</font><hr>" +"<p>Happiness Score: "+happiness_score+"</p>"+ "<li style=\"background-color:" + getColor(happiness_score) + "\"></li>");
    layer.on({
      // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
      mouseover: function(event) {
        
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.9
        });
      },
      // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
      mouseout: function(event) {
        this.closePopup();
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.6
        });
      },
      // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
 
    });
}

L.geoJson(world_borders, {
	style: function (feature) {
    console.log(feature.properties.ADMIN);
    //Associate world_borders dataset with the countries in happinessdata_2017
    var happiness_color = "#808080"
    for(i=0;i<happiness_data.length;i++){
      if(feature.properties.ADMIN === happiness_data[i].Country){
      console.log(happiness_data[i]['Happiness.Score'])
      happiness_color = getColor(happiness_data[i]['Happiness.Score'])
      }
    }
    //Fill in all the variables
    return {
      fillColor: happiness_color,
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.6
  };
  },
  //onEachFeature
  onEachFeature: onEachFeature
}).addTo(map);


var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var happiness_ranks = [0.00,3,4,5,5.5,6,6.5,7.00];
    var colors = ["#E61900",'#E85E00','#EBA400','#EDEC00','#1BF500','#00FA77','#00FCC3','#00ECFF']
    var labels = [];

    // Add min & max
    var legendInfo = "<h2><center>Happiness Score</center></h2>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + happiness_ranks[0] + "</div>" +
        "<div class=\"max\">" + happiness_ranks[happiness_ranks.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    happiness_ranks.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(map);
var mapImage;
var centerLat = 0;
var centerLong = 0;
var lat = 31.2304;
var long = 121.4737;

//shanghai
//31.2304° N, 121.4737° E
var zoom = 1;
var earthquakes;
function preload() {
  // 0 0 zoom 0 0
  mapImage = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoic2hheWFuamoiLCJhIjoiY2owNDcxN2plMGV5ODJ3b3h6YnRpb2pvNSJ9.1A0E3uzS28DjO2PBeARTxg');
  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

//get X value
function mercX(long) {
  //convert to radians since our values are in degrees
  long = radians(long);
  var a = (256 / PI) * pow(2, zoom);
  var b = long + PI;
  return a * b;
}

//get Y value
function mercY(lat) {
  //convert to radians since our values are in degrees
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(1024, 512);
  //change cneter
  translate(width / 2, height / 2 );
  imageMode(CENTER);
  //render map
  image(mapImage, 0, 0);
  // 2.5 or less	Usually not felt, but can be recorded by seismograph.	900,000
  // 2.5 to 5.4	Often felt, but only causes minor damage.	30,000
  // 5.5 to 6.0	Slight damage to buildings and other structures.	500
  // 6.1 to 6.9	May cause a lot of damage in very populated areas.	100
  // 7.0 to 7.9	Major earthquake. Serious damage.	20
  // 8.0 or greater	Great earthquake. Can totally destroy communities near the epicenter.	One every 5 to 10 years
  //calculate x and y
  var cx = mercX(centerLong);
  var cy = mercY(centerLat);
  for (var i = 0; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/);
    var x = mercX(data[2]) - cx;
    var y = mercY(data[1]) - cy;
    var mag = sqrt(pow(data[4],10));
    var magmax = sqrt(pow(10,9.5));
    var d = map(mag, 0, magmax, 0, 60);
    fill(255, 0, 255, 200);
    //put a dot there
    ellipse(x,y,d ,d);

  }

}

// function draw() {
//
// }
//

// }

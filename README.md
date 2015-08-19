Javascript SDK providing a set of tools for mapping, routing, geocoding and reverse geocoding.



# geokit-javascript

## Introduction

The Geokit is an SDK providing a set of tools performing requests on the OnYourMap platform. Those requests include mapping, geocoding, reverse geocoding and routing. The MapBox mapping SDK is in charge of the map interaction, so this SDK must be included in your project.

More details about MapBox Javascript sdk can be found here:
- Documentation: https://www.mapbox.com/mapbox.js/api/v2.2.1/
- Source code: https://github.com/mapbox/mapbox.js

For more details about OnYourMap, please contact our customer support here: contact@onyourmap.com


## Build

Releases are built by OnYourMap team are are available in the releases/ directory.
Each build is a compressed zip file containing  minified and original version of the geokit, plus internationalized resources for route instruction:
 - x.x.x/oym-geokit.js
 - x.x.x/oym-geokit.min.js
 - x.x.x/i18n/route-yy.js   
  
You can also build from the source code using wro4j maven plugin:
```command
 maven install
```
Merged js files are located in the target/ directory.

 
## Installation

Within your web page, you should define the following <meta> tags:
```html
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
```

Next you should define Mapbox and OnYourMap geokit scripts:
```html
	<script src='https://api.mapbox.com/mapbox.js/v2.2.1/mapbox.js'></script>
	<link href='https://api.mapbox.com/mapbox.js/v2.2.1/mapbox.css' rel='stylesheet' />

	<script type="text/javascript" src="path/to/oym-geokit.js"></script>
	<script type="text/javascript" src="path/to/i18n/route-en.js"></script>
```

## Mapping

The MapBox SDK is in charge of the mapping part. The OnYourMap tiles can be used thanks to the object *co.oym.geokit.OYMLayer* and can be used as a tile source for the MapBox SDK. This is how a map can be created:

First add a Map view container (do not forget to apply correct css styling for width/height) in your page:

```html
	<div id="map"></div>
```

Setup OnYourMap tiles for the Map view:

```javascript
// add onyourmap tile layer as default layer instead of mapbox layer
var OYM_MAPPING_TEMPLATE = OYM_URL + "?f=m&ft=" + OYM_TILE_FORMAT + "&x={oymX}&y={oymY}&z={oymZ}&key={key}";
var oymLayer = new co.oym.geokit.OYMLayer(OYM_MAPPING_TEMPLATE, {
	subdomains: ['t1', 't2', 't3', 't4'],
	key: OYM_APP_KEY,
	attribution: 'onyourmap',
	minZoom: 2, // depending on chosen onyourmap map tile format, 
	maxZoom: 17 // adjust mininum and maximum zoom levels (actually min = 2 and max = 17)
});
```

The values for *OYM_URL*, *OYM_TILE_FORMAT* and *OYM_APP_KEY* should have been given to you by your OnYourMap.

Initialize the Map view:

```javascript
L.mapbox.accessToken = '';
var map = L.mapbox.map('map', null, {
	layers: [ oymLayer ],
	center: [48.8, 2.2],
	zoom: 9,
	attributionControl: false}
);
```


## OnYourMap webservices		

Using OnYourMap webservices for geocoding and routing is done through the object *co.oym.geokit.WSClient*. This class is initialised like this:

```javascript
var geokit = new co.oym.geokit.WSClient(OYM_URL, OYM_APP_KEY);
```
	
## Geocoding

You can search places/adresses using the *search* function.

```javascript
var req = new co.oym.geokit.Place.SearchRequest();
req.address = "rivoli paris";

geokit.PlaceWS.search(null, req, this, function(result) {
    if (result.statusCode == "200") {
        var searchResponse = result.data; 
    }
});
```

All the parameters available for the request/response are described in the javadoc.


## Reverse geocoding

Places can be retrieved around a location using the *nearest* function.

```javascript
var req = new co.oym.geokit.Place.NearestRequest();
req.location = L.latLng(48.862226, 2.350303);
req.radius = 0;
req.maxResponses = 1;

geokit.PlaceWS.nearest(null, req, this, function(result) {
	if (result.statusCode == "200") {
        var nearestResponse = result.data; 
	}
});
```

All the parameters available for the request/response are described in the javadoc.
If the radius is 0, only the nearest place will be returned. Otherwise, everything in the radius will be returned.


## Routing

The function *directions* provides a route between two coordinates.

```javascript
var req = new co.oym.geokit.Route.Request();
req.start = L.latLng(48.860854, 2.340819); 
req.end = L.latLng(48.862226, 2.350303); 
req.transportMode = co.oym.geokit.Route.Constants.TM_PEDESTRIAN;

geokit.RouteWS.directions(null, req, this, function(result) {
	if (result.statusCode == "200") {
        var routeResponse = result.data; 
	}
});
```

All the parameters available for the request/response are described in the javadoc.


## Routing utilities

Some functions are here to simplify the developers life when using the *directions* function.
They can be found in *co.oym.geokit.Route.Utility* object.


### checkDisplayLevel

The route geometry is provided with the maximum accuracy available. In order to speed up the route shape rendering, an array called "levels" is returned in the *co.oym.geokit.Route.Response* object. This array contains, for each point of the route, all the zoom levels this point should be displayed. The method *checkDisplayLevel()* will tell you if a point should be displayed or not, based on this value. That way, the number of points to display can be greatly reduced, with a huge speed boost when rendering long routes.

```javascript
var routeUtility = new co.oym.geokit.Route.Utility();

if (routeUtility.checkDisplayLevel(displayLevelValue, currentZoomLevel)) {
	// keep the point for this zoom level
}
```

### renderInstruction

The instructions returned by the *directions* function must be processed before being displayed on screen. The method *renderInstruction()* will transform an encoded instruction into a human readable string.

```javascript
var routeUtility = new co.oym.geokit.Route.Utility();

// Display all the route instructions 
for (var i in routeResponse.instructions) {
	var humanReadableString = routeUtility.renderInstruction(routeResponse.instructions[i], "en");
}
```

The file listing all the possible instructions is located in the provided bundle i18n/route-xx.js for xx represents the language code. 
This file can be modified if needed. A translation for another language can be added by following the same scheme.
Finally, do not forget to load any needed translated file as a script.


	
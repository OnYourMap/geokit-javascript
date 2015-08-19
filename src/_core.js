/**
 * @namespace Root namespace
 */
var co = co || {}; 
/**
 * @namespace Root OYM namespace
 * @memberOf com
 */
co.oym = co.oym || {};
/**
 * 
 * @namespace geokit namespace
 * @memberOf com.oym
 */
co.oym.geokit = {};

/**
 * OnYourMap Geokit Web Services Client. <br>
 * Features: <br>
 *  - Geocoding (address lookup) <br>
 *  - Reverse geocoding (get address from coordinate) <br>
 *  - Routing (get directions between 2 locations) <br>
 *  - Mapping utility class for MapBox SDK <br><br>
 *  Before starting using this client, you must have first contacted OnYourMap support in order to get credentials for accessing its Web Services.
 *  Two parameters are mandatory: <br>
 *  - webServiceUrl: The url of OnYourMap Web Services <br>
 *  - appKey: Your application key when using OnYourMap Web Services <br>
 *  
 * @memberOf co.oym.geokit
 * @constructor
 * @param {string} [webServiceURL] Web service url.
 * @param {string} [appKey] the application key.
 *
 */

co.oym.geokit.WSClient = function(_webServiceURL, _appKey) {
	/**
	 * URL of the web service
	 * @memberOf co.oym.geokit.WSClient
	 */
	this.webServiceURL = new String(_webServiceURL);
	/**
	 * OYM application key relative to site Referer
	 * @memberOf co.oym.geokit.WSClient
	 */
	this.appKey = new String(_appKey);

	this.PlaceWS = new co.oym.geokit.PlaceWS(_webServiceURL, _appKey);
	this.RouteWS = new co.oym.geokit.RouteWS(_webServiceURL, _appKey);
};

/**
 * 
 * OnYourMap request generator 
 * this method generate requests and send them to the server 
 * @memberOf co.oym.geokit
 * @param {string} [webServiceURL] Web service url.
 * @param {string} [appKey] the application key.
 */
co.oym.geokit.request = function(url, appKey, args, context, callback) {
	if (!appKey) {
		console.error("Trying to preform a request without application Key");
		return;
	}
	if (context && callback) {
		var request = new XMLHttpRequest();
		request.open("POST", url);
		request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		request.setRequestHeader("appKey", appKey);
	
		request.onreadystatechange=function() 
		{
			if (request.readyState == 4 && request.status == 200)
			{
				callback && callback.call(context,JSON.parse(request.responseText));
	    	}
		};
	  
		var reqString = "";
		if (args) reqString = JSON.stringify(args);
	
		request.send(reqString);
		
	} else {
		return co.oym.geokit.requestSync(url, appKey, args);
	}
};

/**
 * 
 * OnYourMap request generator sync
 * this synchronized method generate requests and send them to the server 
 * @memberOf co.oym.geokit
 * @param {string} [webServiceURL] Web service url.
 * @param {string} [appKey] the application key.
 * @return {object} data response
 */
co.oym.geokit.requestSync = function(url, appKey, args) {
	if (!appKey) {
		console.error("Trying to preform a request without application Key");
		return;
	}
	var request = new XMLHttpRequest();
	request.open("POST", url, false);
	request.setRequestHeader("Content-Type", "application/json");
	request.setRequestHeader("appKey", appKey);
	  
	var reqString = "";
	if (args) reqString = JSON.stringify(args);
	
	request.send(reqString);
	return JSON.parse(request.responseText);
};


/**
 * A OnYourMap tile layer.
 * 	Usage within Mapbox SDK:
 *		var oymLayer = new OYMLayer('http://{s}.maps.onyourmap.com/oym?f=m&ft=png_std_256&x={oymX}&y={oymY}&z={oymZ}&key={key}', {
 *			subdomains: ['t1', 't2', 't3', 't4'],
 *			key: "testkey",
 *			attribution: ''
 *		}); 
 *		
 *		var map = L.mapbox.map('map', null, {
 *			layers: [ oymLayer ],
 *			...
 *		};
 * 
 */
co.oym.geokit.OYMLayer = L.TileLayer.extend({
	getTileUrl: function (tilePoint) {
		this._adjustTilePoint(tilePoint);
		return L.Util.template(this._url, {
			s: this._getSubdomain(tilePoint),
			key: this.options.key,
			oymZ: this._getZ(tilePoint),
			oymX: this._getX(tilePoint),
			oymY: this._getY(tilePoint)
		});
   },
	
   _getZ: function(tilePoint) {
		return 18 - tilePoint.z;
   },
   
   _getX: function(tilePoint) {
		return (tilePoint.x - Math.pow(2, tilePoint.z-1));
   },
   
   _getY: function(tilePoint) {
	   return (Math.pow(2, tilePoint.z-1) - 1 - tilePoint.y);
   }
});


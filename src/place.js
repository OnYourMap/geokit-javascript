/**
 * 
 * A Place represents an Address or a Point Of Interest (POI)
 *  
 * @memberOf co.oym.geokit
 */
co.oym.geokit.Place = function() {

	this.id = null;

	/** The representation of the place as one String. For example can the full address. **/
	this.description = null;
	
	/** A list of key/value pairs for this place. Actually used for POIs **/
	this.properties = {};
	
	/** The dataset can be "ADDR" or "POI" **/
	this.dataset = null;
	
	/** The type of place. Can be "C" for a city, "0" for a street, or a POI type **/
	this.type = null;
	
	/** The administrative levels of the address **/
	this.components = {};
	
	/** The geometry of the place **/
	this.geometry = null;
	
};

/**
 * A Geometry represents a place's location and may also contain some additional place geometry.
 * 
 * @memberOf co.oym.geokit.Place
 */
co.oym.geokit.Place.Geometry = function() {
	
	/** The location as a L.LatLng from Mapbox sdk: https://www.mapbox.com/mapbox.js/api/v2.2.1/l-latlng/ **/
	this.location = null;
	
	/** The type of location **/
	this.type = 0;
	
	/** Some additional geometry for a place, like the complete street geometry of the external polygon of a city **/
	this.raw = [[]];
};

/**
 * A Place Search request.
 * 
 * @memberOf co.oym.geokit.Place
 */
co.oym.geokit.Place.SearchRequest = function() {
	
	/** The maximum number of places **/
	this.maxResponses = 10;
	
	/** The iso country code in 2 letters **/
	this.country = null;
	
	/** The city **/
	this.locality = null;
	
	/** the state or county **/
	this.adminArea = null;
	
	/** The postal code **/
	this.postcode = null;
	
	/** The address: full or just street part **/
	this.address = null;
	
	/** The output language **/
	this.lang = null;
	
	/** a L.LatLngBounds from Mapbox SDK: https://www.mapbox.com/mapbox.js/api/v2.2.1/l-latlngbounds/ 
	 *  Places inside the viewport will be better ranked 
	 **/
	this.viewport = null;
	
	/** Places with provided favorite country will be better ranked **/
	this.favoriteCountry = null;
};

/**
 * A Place Search response.
 * 
 * @memberOf co.oym.geokit.Place
 */
co.oym.geokit.Place.SearchResponse = function() {

	/** The response time in milliseconds **/
	this.time = 0;

	/** The number of places **/
	this.totalHits = 0;
	
	/** The status of the response **/
	this.status = null;
	
	/** The nearest places **/
	this.places = null;
};

/**
 * A Place Nearest request.
 * 
 * @memberOf co.oym.geokit.Place
 */
co.oym.geokit.Place.NearestRequest = function() {

	/** The maximum number of places **/
	this.maxResponses = 10;

	/** The location as a L.LatLng from Mapbox sdk: https://www.mapbox.com/mapbox.js/api/v2.2.1/l-latlng/ **/
	this.location = null;
	
	/** The radius of search in meters **/
	this.radius = 0;
	
	/** The output language **/
	this.lang = null;
};

/**
 * A Place Nearest response.
 * 
 * @memberOf co.oym.geokit.Place
 */
co.oym.geokit.Place.NearestResponse = function() {
	
	/** The response time in milliseconds **/
	this.time = 0;
	
	/** The number of places **/
	this.totalHits = 0;
	
	/** The status of the response **/
	this.status = null;
	
	/** The nearest places **/
	this.places = null;

};


/**
 * Place Web Service allows to: <br>
 *  - Search for an address (and get its WGS84 coordinate) <br>
 *  - Get nearest address from a WGS84 coordinate <br>
 *  
 * @memberOf co.oym.geokit
 * @constructor
 * @param {string} [webServiceURL] Web service url.
 * @param {string} [appKey] the application key.
 */
co.oym.geokit.PlaceWS = function(url, appKey) {
	this._url = url;
	this._appKey = appKey;
	
	/**
	 * Search for an address and get its WGS84 coordinate.
	 * @param {String} appKey 
	 * @param {co.oym.geokit.Place.SearchRequest} search request 
	 */
	this.search = function (appKey, request, context, callback) {
		return co.oym.geokit.request(this._url + "/place/search", appKey || this._appKey, request, context, callback);
	};

	/**
	 * Get nearest address from a WGS84 coordinate.
	 * @param {String} appKey 
	 * @param {co.oym.geokit.Place.NearestRequest} nearest request 
	 */
	this.nearest = function (appKey, request, context, callback) {
		return co.oym.geokit.request(this._url + "/place/nearest", appKey || this._appKey, request, context, callback);
	};
};


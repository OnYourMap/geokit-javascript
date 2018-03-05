/**
 * 
 * A Route represents the instructions and the geometry needed to get from a start point to an end point, eventually going through via(s) points.
 *  
 * @memberOf co.oym.geokit
 */
co.oym.geokit.Route = {};

/**
 * Some route constants.
 * 
 * @memberOf co.oym.geokit.Route
 */

co.oym.geokit.Route.Constants = {
		TM_PEDESTRIAN: 0,
		TM_FASTEST_CAR: 1,
		TM_PUBLIC_TRANSPORTATION: 2,
		
		UNIT_KM: "KM",
		UNIT_MILES: "MI"
};


/**
 * A Route section.
 * 
 * @memberOf co.oym.geokit.Route
 */
co.oym.geokit.Route.Section = function() {
	
	/** The type of section **/
	this.type = null;
	
	/** The start vertex of the section in the Route.positions list **/
	this.startVertex = 0;
	
	/** The end vertex of the section in the Route.positions list **/
	this.endVertex = 0;
	
	/** The start instruction in the Route.instructions list **/
	this.startInstruction = 0;
	
	/** The end instruction in the Route.instructions list **/
	this.endInstruction = 0;
	
	/** Some additional info about the type of section **/
	this.trunkCode = null;
};

/**
 * A Route via.
 * 
 * @memberOf co.oym.geokit.Route
 */
co.oym.geokit.Route.Via = function() {
	
	/** The vertex index inside Route.positions list **/
	this.vertexIndex = 0;
	
	/** The WGS84 coordinate of the via as a L.LatLng from Mapbox sdk: https://www.mapbox.com/mapbox.js/api/v2.2.1/l-latlng/ **/
	this.position;
};

/**
 * A Route instruction.
 * 
 * @memberOf co.oym.geokit.Route
 */
co.oym.geokit.Route.Instruction = function() {
	
	/** The Id of the maneuver **/
	this.ID = 0;
	
	/** The length of the maneuver **/
	this.length = 0.0;
	
	/** The time in minutes of the maneuver **/
	this.time = 0.0;;
	
	/** The vertex index inside Route.positions list **/
	this.vertexIndex = 0;
	
	/** The WGS84 coordinate of the maneuver as a L.LatLng from Mapbox sdk: https://www.mapbox.com/mapbox.js/api/v2.2.1/l-latlng/ **/
	this.position = null;
	
	/** The attributes of the maneuver. See Route.Utility.render2() method to automatically decode attributes into a human readable format **/
	this.attributes = {};
};


/**
 * A Route request.
 * 
 * @memberOf co.oym.geokit.Route
 */
co.oym.geokit.Route.Request = function() {
	
	/** The route start coordinate in WGS84 as a L.LatLng from Mapbox sdk: https://www.mapbox.com/mapbox.js/api/v2.2.1/l-latlng/ **/
	this.start = null;
	
	/** The route end coordinate in WGS84 as a L.LatLng from Mapbox sdk: https://www.mapbox.com/mapbox.js/api/v2.2.1/l-latlng/ **/
	this.end = null;
	
	/** The route vias coordinates in WGS84 as a L.LatLng from Mapbox sdk: https://www.mapbox.com/mapbox.js/api/v2.2.1/l-latlng/ **/
	this.vias = [];
	
	/** The transport mode: co.oym.geokit.Route.Constants.TM_PEDESTRIAN or co.oym.geokit.Route.Constants.TM_FASTEST_CAR **/
	this.transportMode = co.oym.geokit.Route.Constants.TM_FASTEST_CAR;
	
	/** The distance unit: co.oym.geokit.Route.Constants.UNIT_KM or co.oym.geokit.Route.Constants.UNIT_MILES **/
	this.distanceUnit = co.oym.geokit.Route.Constants.UNIT_KM;
	
};

/**
 * A Route response.
 * 
 * @memberOf co.oym.geokit.Route
 */
co.oym.geokit.Route.Response = function() {

	/** A unique identifier for this route **/
	this.routeKey = null;
	
	/** The distance unit: Route.Request.UNIT_KM or Route.Request.UNIT_MILES **/
	this.distanceUnit = null;
	
	/** The total length of the route, depending on distanceUnit **/
	this.length = 0.0;
	
	/** The total time of the route, in minutes **/
	this.time = 0.0;
	
	/** A list of route instructions, for navigation **/
	this.instructions = [];
	
	/** A list of route sections, for navigation **/
	this.sections = [];
	
	/** A list of route vias, for navigation **/
	this.vias = [];
	
	/** The bounds of the route as a L.LatLngBounds from Mapbox SDK: https://www.mapbox.com/mapbox.js/api/v2.2.1/l-latlngbounds/ **/
	this.bounds = null;
	
	/** The list of points for the route as L.LatLng from Mapbox sdk: https://www.mapbox.com/mapbox.js/api/v2.2.1/l-latlng/ **/
	this.positions = [];
	
	/** A list of bitmask for each points in positions list (See co.oym.geokit.Route.Utility.checkDisplayLevel() function) **/
	this.levels = [];
};




/**
 * Route Web Service allows to: <br>
 *  - Get directions between 2 WGS84 coordinates
 *  
 * @memberOf co.oym.geokit
 * @constructor
 * @param {string} [webServiceURL] Web service url.
 * @param {string} [appKey] the application key.
 */
co.oym.geokit.RouteWS = function(url, appKey) {
	this._url = url;
	this._appKey = appKey;
	
	/**
	 * Get directions between 2 WGS84 coordinates.
	 * @param {String} appKey 
	 * @param {co.oym.geokit.Route.Request} route request 
	 */
	this.directions = function(appKey, request, context, callback) {
		return co.oym.geokit.request(this._url + "/route/directions", appKey || this._appKey, request, context, callback);
	};


};

/**
 * Some utility methods to decode route isntructions into human readable format
 */
co.oym.geokit.Route.Utility = function() {
	
	/**
	 * Tells if a point at with given level value should be displayed a given zoom level.
	 *
	 * @param displayLevelValue
	 * @param zoomLevel
	 * @return
	 */
	this.checkDisplayLevel = function(displayLevelValue, zoomLevel) {
		/*
		bit 1 : level 00 + 01
		bit 2 : level 02 + 03
		bit 3 : level 04 + 05
		bit 4 : level 06 + 07
		bit 5 : level 08 + 09
		bit 6 : level 10 + 11
		bit 7 : level 12 + 13
		bit 8 : level >= 14
		*/
		var comparableZ = 16 - zoomLevel;
		if (comparableZ < 14) {
			var bitmask = parseInt(Math.pow(2, Math.floor(comparableZ / 2)));
			return ((displayLevelValue & bitmask) == bitmask);
		} else {
			var bitmask = parseInt(Math.pow(2, 14));
			return ((displayLevelValue & bitmask) == bitmask);
		}
	}
	
	/**
	 * Convert route instruction attributes into a human-readable string.
	 * @param instruction
	 * @param language
	 * @return
	 * 
	 */
	this.renderInstruction = function(instruction, language) {
		if (language == null || co.oym.geokit.Route.Resources[language.toLowerCase()] == null) {
			throw "invalid language"; 
		}
		var R = co.oym.geokit.Route.Resources.Keys;
		var res = co.oym.geokit.Route.Resources[language];

		var i = instruction;
		if (i == null) {
			return null;
		}

		var manType = null;
		var manHeading = null;
		var manRd = null;
		var manRdnr = null;
		var manDir = null;
		var manBranch = null;
		var adExitNum = null;
		var adExitRd = null;
		var adExitRdnr = null;
		var adToll = null;
		//var adPedest = null;
		//var adSkipRoadLeft = null;
		//var adSkipRoadRight = null;
		var adBridge = null;
		var adRoundAbout = null;
		var adTunnel = null;
		var adCross = null;
		var adPassBy = null;
		var adContinue = null;
		var adStay = null;
		var adPtType = null;
		//var adPtEnter = null;
		var adPtName = null;
		var adPtDir = null;
		var adPtStop = null;
		var adPtDelay = null;
		var isAd = false;

	    for (var key in i.attributes) {
			var value = i.attributes[key];
			if (key == "man-type") manType = value;
			if (key == "man-heading") manHeading = value;
			if (key == "man-rd") manRd = value;
			if (key == "man-rdnr") manRdnr = value;
			if (key == "man-dir") manDir = value;
			if (key == "man-branch") manBranch = value;
			if (key == "ad-exit-num") adExitNum = value;
			if (key == "ad-exit-rd") adExitRd = value;
			if (key == "ad-exit-rdnr") adExitRdnr = value;
			if (key == "ad-toll") adToll = value;
			//if (key == "ad-pedest") adPedest = value;
			//if (key == "ad-skip-road-left") adSkipRoadLeft = value;
			//if (key == "ad-skip-road-right") adSkipRoadRight = value;
			if (key == "ad-bridge") adBridge = value;
			if (key == "ad-roundabout") adRoundAbout = value;
			if (key == "ad-tunnel") adTunnel = value;
			if (key == "ad-cross") adCross = value;
			if (key == "ad-passby") adPassBy = value;
			if (key == "ad-continue") adContinue = value;
			if (key == "ad-stay") adStay = value;
			if (key == "ad-pt-type") adPtType = value;
			//if (key == "ad-pt-enter") adPtEnter = value;
			if (key == "ad-pt-name") adPtName = value;
			if (key == "ad-pt-dir") adPtDir = value;
			if (key == "ad-pt-stop") adPtStop = value;
			if (key == "ad-pt-delay") adPtDelay = value;
			if (key.indexOf("ad-") == 0) isAd = true;
		}

		if (manType == "HEAD") {

			// heading
			var heading = "";
			if (manHeading == "N") heading = res[R.instr_heading_n];
			if (manHeading == "NE") heading = res[R.instr_heading_ne];
			if (manHeading == "E") heading = res[R.instr_heading_e];
			if (manHeading == "SE") heading = res[R.instr_heading_se];
			if (manHeading == "S") heading = res[R.instr_heading_s];
			if (manHeading == "SW") heading = res[R.instr_heading_sw];
			if (manHeading == "W") heading = res[R.instr_heading_w];
			if (manHeading == "NW") heading = res[R.instr_heading_nw];

			var on = (manRd != null || manRdnr != null) ? this.decodeRoad(manRd, manRdnr, res, R) : "";
			var toward = (manBranch != null) ? this.decodeBranch(manBranch, res, R) : "";

			// on_road
			var onMsg = on != "" ? this.rebuild(res, R.instr_head_on_road, [on]) : "";
			// toward
			var towardMsg = toward != "" ? this.rebuild(res, R.instr_head_toward, [toward]) : "";
			// final: heading + on_road + toward
			return this.rebuild(res, R.instr_head, [heading, onMsg, towardMsg]);


		} else if (manType == "CONTINUE") {

			var on = (manRd != null || manRdnr != null) ? this.decodeRoad(manRd, manRdnr, res, R) : "";
			var bridge = (isAd && adBridge != null) ? adBridge : "";
			var ra = (isAd && adRoundAbout != null) ? adRoundAbout : "";
			var tunnel = (isAd && adTunnel != null) ? adTunnel : "";
			var cross = (isAd && adCross != null) ? adCross : "";
			var passby = (isAd && adPassBy != null) ? adPassBy : "";

			// on
			var onMsg = on != "" ? this.rebuild(res, R.instr_continue_on_road, [on]) : "";
			// advice
			var adviceMsg = (isAd && !bridge == "") ? this.rebuild(res, R.instr_continue_advice_bridge, [bridge]) : "";
			adviceMsg = (isAd && ra != "") ? this.rebuild(res, R.instr_continue_advice_roundabouts, [ra]) : adviceMsg;
			adviceMsg = (isAd && tunnel != "") ? this.rebuild(res, R.instr_continue_advice_tunnel, [tunnel]) : adviceMsg;
			adviceMsg = (isAd && cross != "") ? this.rebuild(res, R.instr_continue_advice_cross, [cross]) : adviceMsg;
			adviceMsg = (isAd && passby != "") ? this.rebuild(res, R.instr_continue_advice_passby, [passby]) : adviceMsg;

			// final: on_road + advice
			return this.rebuild(res, R.instr_continue, [onMsg, adviceMsg]);


		} else if (manType == "TURN") {
			var heading = this.decodeHeading2(manHeading, res, R);
			var merge = (manBranch != null) ? this.decodeBranch(manBranch, res, R) : "";
			var at = (manRd != null || manRdnr != null) ? this.decodeRoad(manRd, manRdnr, res, R) : "";

			// at
			var atMsg = at != "" ? this.rebuild(res, R.instr_turn_at, [at]) : "";
			// merge
			var mergeMsg = merge != "" ? this.rebuild(res, R.instr_turn_merge, [merge]) : "";
			// advice
			var advice = "";
			var adviceMsg = "";
			if (adContinue != null) {
				advice = this.decodeRoad(adContinue, null, res, R);
				adviceMsg = advice != "" ? this.rebuild(res, R.instr_turn_advice_continue, [advice]) : "";
			}
			if (advice == "" && adStay != null && adStay == "YES") {
				advice = this.decodeRoad(null, manRdnr, res, R);
				adviceMsg = advice != "" ? this.rebuild(res, R.instr_turn_advice_stay, [advice]) : "";
			}

			// final: heading + at + merge + advice
			return this.rebuild(res, R.instr_turn, [heading, atMsg, mergeMsg, adviceMsg]);


		} else if (manType == "UTURN") {
			return "";


		} else if (manType == "KEEPLEFT" || manType == "KEEPRIGHT") {

			var keepMsg = manType == "KEEPLEFT" ? res[R.instr_keep_left] : res[R.instr_keep_right];
			var follow = (manDir != null) ? this.decodeDirection(manDir, res, R) : "";
			var merge = (manBranch != null) ? this.decodeBranch(manBranch, res, R) : (manRd != null || manRdnr != null) ? this.decodeRoad(manRd, manRdnr, res, R) : "";

			// advice
			var adviceMsg = (adToll != null) ? res[R.instr_keep_advice_toll] : "";
			// follow
			var followMsg = follow != "" ? this.rebuild(res, R.instr_keep_follow, [follow]) : "";
			// merge
			var mergeMsg = merge != "" ? this.rebuild(res, R.instr_keep_merge, [merge]) : "";
			// final: heading + at + merge + advice
			return this.rebuild(res, R.instr_keep, [keepMsg, followMsg, mergeMsg, adviceMsg]);


		} else if (manType == "ROUNDABOUT") {

			var name = (manRd != null || manRdnr != null) ? this.decodeRoad(manRd, manRdnr, res, R) : "";
			var exitNumber = "";
			if (adExitNum == "1")
				exitNumber = res[R.instr_roundabout_exit_n1];
			if (adExitNum == "2")
				exitNumber = res[R.instr_roundabout_exit_n2];
			if (adExitNum == "3")
				exitNumber = res[R.instr_roundabout_exit_n3];
			if (adExitNum == "4")
				exitNumber = res[R.instr_roundabout_exit_n4];
			if (adExitNum == "5")
				exitNumber = res[R.instr_roundabout_exit_n5];
			if (adExitNum == "6")
				exitNumber = res[R.instr_roundabout_exit_n6];
			if (adExitNum == "7")
				exitNumber = res[R.instr_roundabout_exit_n7];
			if (adExitNum == "8")
				exitNumber = res[R.instr_roundabout_exit_n8];
			if (adExitNum == "9")
				exitNumber = res[R.instr_roundabout_exit_n9];
			var onto = (adExitRd != null || adExitRdnr != null) ? this.decodeRoad(adExitRd, adExitRdnr, res, R) : "";


			// name
			var nameMsg = name != "" ? this.rebuild(res, R.instr_roundabout_name, [name]) : res[R.instr_roundabout_noname];
			// exit
			var exitMsg = exitNumber != "" ? this.rebuild(res, R.instr_roundabout_exit, [exitNumber]) : "";
			// onto
			var ontoMsg = onto != "" ? this.rebuild(res, R.instr_roundabout_on_road, [onto]) : "";

			// final: name + exit + on_road
			return this.rebuild(res, R.instr_roundabout, [nameMsg, exitMsg, ontoMsg]);


		} else if (manType == "RAMP") {

			var onto = (manBranch != null) ? this.decodeBranch(manBranch, res, R) : (manRd != null || manRdnr != null) ? this.decodeRoad(manRd, manRdnr, res, R) : "";
			var turn = "";
			if (onto == "") {
				turn = (manHeading != null) ? this.decodeHeading2(manHeading, res, R) : "";
			}
			var toward = (manDir != null) ? this.decodeDirection(manDir, res, R) : "";
			
			// onto
			var ontoMsg = onto != "" ? this.rebuild(res, R.instr_ramp_on_road, [onto]) : "";
			// turn
			var turnMsg = turn != "" ? this.rebuild(res, R.instr_ramp_turn, [turn]) : "";
			// toward
			var towardMsg = toward != "" ? this.rebuild(res, R.instr_ramp_toward, [toward]) : "";

			// final: on_road | turn + toward
			return this.rebuild(res, R.instr_ramp, [ontoMsg, turnMsg, towardMsg]);


		} else if (manType == "MERGE") {

			if (manRd != null || manRdnr != null || manDir != null) {
				//var heading = this.decodeHeading2(manHeading, res, R);
				var onto = (manRd != null || manRdnr != null) ? this.decodeRoad(manRd, manRdnr, res, R) : "";
				var toward = (manDir != null) ? this.decodeDirection(manDir, res, R) : "";

				// onto
				var ontoMsg = onto != "" ? this.rebuild(res, R.instr_merge_on_road, [onto]) : "";
				// toward
				var towardMsg = toward != "" ? this.rebuild(res, R.instr_merge_toward, [toward]) : "";

				// final: on_road + toward
				return this.rebuild(res, R.instr_merge, [ontoMsg, towardMsg]);

			} else {
				// final: noname
				return this.rebuild(res, R.instr_merge_noname, []);
			}


		} else if (manType == "EXIT") {

			var toward = (manDir != null) ? this.decodeDirection(manDir, res, R) : "";

			// exit_number
			var exitNumberMsg = this.rebuild(res, R.instr_exit_number, [adExitNum]);
			// toward
			var towardMsg = toward != "" ? this.rebuild(res, R.instr_exit_toward, [toward]) : "";

			// final: exit_number + toward
			return this.rebuild(res, R.instr_exit, [exitNumberMsg, towardMsg]);


		} else if (manType == "EMBARK") {

			var transportType = this.decodeTransportType2(adPtType, res, R) + (adPtName != null ? " " + adPtName : "");
			var toward = (adPtDir != null) ? adPtDir : "";
			var stop = (adPtStop != null) ? adPtStop : "";
			var delay = (adPtDelay != null) ? this.renderTime2(adPtDelay, res) : "";

			// name
			var nameMsg = this.rebuild(res, R.instr_embark_name, [transportType]);
			// toward
			var towardMsg = toward != "" ? this.rebuild(res, R.instr_embark_toward, [toward]) : "";
			// next_stop
			var nextStopMsg = stop != "" ? this.rebuild(res, R.instr_embark_next_stop, [stop]) : "";
			// wait_time
			var waitTimeMsg = delay != "" ? this.rebuild(res, R.instr_embark_wait_time, [delay]) : "";

			// final: name + toward + next_stop + wait_time
			return this.rebuild(res, R.instr_embark, [nameMsg, towardMsg, nextStopMsg, waitTimeMsg]);


		} else if (manType == "CHANGE") {

			var transportType = this.decodeTransportType2(adPtType, res, R) + " " + adPtName;
			var toward = (adPtDir != null) ? adPtDir : "";
			var stop = (adPtStop != null) ? adPtStop : "";
			var delay = (adPtDelay != null) ? this.renderTime2(adPtDelay, res) : "";

			// name
			var nameMsg = this.rebuild(res, R.instr_change_name, [transportType]);
			// toward
			var towardMsg = toward != "" ? this.rebuild(res, R.instr_change_toward, [toward]) : "";
			// next_stop
			var nextStopMsg = stop != "" ? this.rebuild(res, R.instr_change_next_stop, [stop]) : "";
			// wait_time
			var waitTimeMsg = delay != "" ? this.rebuild(res, R.instr_change_wait_time, [delay]) : "";

			// final: name + toward + next_stop + wait_time
			return this.rebuild(res, R.instr_change, [nameMsg, towardMsg, nextStopMsg, waitTimeMsg]);

		} else if (manType == "DISEMBARK") {

			var name = (manRd != null || manRdnr != null) ? this.decodeRoad(manRd, manRdnr, res, R) : "";
			var nameMsg = name != "" ? name : "";

			// final: name
			return this.rebuild(res, R.instr_disembark, [nameMsg]);


		} else if (manType == "TOLLBOOTH") {
		} else if (manType == "BOATFERRY") {
		} else if (manType == "RAILFERRY") {
		} else if (manType == "LEAVEYOURCAR") {

			var advice = (manRd != null || manRdnr != null) ? this.decodeRoad(manRd, manRdnr, res, R) : "";
			// advice
			var adviceMsg = advice != "" ? this.rebuild(res, R.instr_leaveyourcar_advice, [advice]) : "";

			// final: advice
			return this.rebuild(res, R.instr_leaveyourcar, [adviceMsg]);

		} else if (manType == "END") {
			return res[R.instr_end];
		}

		return "";
	}

	this.rebuild = function(res, resId, args) {
		var template = res[resId];
		var s = template;
		for (var offset = 0; offset < args.length; offset++) {
			var find = "\\{" + offset + "\\}";
			s = s.replace(new RegExp(find, 'g'), args[offset]);
		}
		return s;
	}

	this.decodeHeading2 = function(manHeading, res, R) {
		if (manHeading != null) {
			if (manHeading == "LEFT1") return res[R.instr_turn_slight_left];
			if (manHeading == "LEFT2") return res[R.instr_turn_left];
			if (manHeading == "LEFT3") return res[R.instr_turn_sharp_left];
			if (manHeading == "RIGHT1") return res[R.instr_turn_slight_right];
			if (manHeading == "RIGHT2") return res[R.instr_turn_right];
			if (manHeading == "RIGHT3") return res[R.instr_turn_sharp_right];
			if (manHeading == "CROSS") return res[R.instr_turn_cross];
		}
		return "";
	}

	this.decodeTransportType2 = function(ptType, res, R) {
		if (ptType != null) {
			if (ptType == "BOATFERRY")
				return res[R.instr_embark_type_boatferry];
			if (ptType == "RAILFERRY")
				return res[R.instr_embark_type_railferry];
		}
		return ptType;
	}

	this.renderTime2 = function(time, res, R) {
		var t = "";
		var tmp = parseInt(time) / 60;
		if (tmp > 0) {
			if (tmp == 1) t += "1 " + res[R.instr_render_time_hour];
			else t += tmp + " " + res[R.instr_render_time_hours];
			t += " ";
		}
		tmp = parseInt(time) % 60;
		if (tmp <= 1) t += "1 " + res[R.instr_render_time_minute];
		else t += tmp + " " + res[R.instr_render_time_minutes];

		return t;
	}

	this.decodeTransportType = function(ptType) {
		return ptType;
	}

	this.decodeBranch = function(manBranch) {
		if (manBranch != null) {
			return manBranch.replace(/§/g, "");
		}
		return manBranch;
	}

	this.decodeDirection = function(manDir) {
		if (manDir != null) {
			var s = manDir;
			s = s.replace(/§/g, "");
			s = s.replace(/\/\//g, " / ");
			s = s.replace(/\+/g, " / ");
			s = s.replace(/\-/g, " / ");
			return s;
		}
		return manDir;
	}

	this.decodeRoad = function(manRd, manRdnr) {
		if (manRd != null) {
			return manRd + (manRdnr != null ? " (" + manRdnr + ")" : "");
		} else {
			return manRdnr;
		}
	}

	this.decodeHeading = function(manHeading, res, R) {
		if (manHeading != null) {
			if (manHeading == "LEFT1") return res[R.instr_9];
			if (manHeading == "LEFT2") return res[R.instr_10];
			if (manHeading == "LEFT3") return res[R.instr_11];
			if (manHeading == "RIGHT1") return res[R.instr_12];
			if (manHeading == "RIGHT2") return res[R.instr_13];
			if (manHeading == "RIGHT3") return res[R.instr_14];
		}
		return "";
	}
};

co.oym.geokit.Route.Resources = {};

co.oym.geokit.Route.Resources.Keys = {
		"instr_head": "",    
	    "instr_head_on_road": "",
	    "instr_head_toward": "",
	    
	    "instr_heading_n": "",
		"instr_heading_ne": "",
		"instr_heading_e": "",
		"instr_heading_se": "",
		"instr_heading_s": "",
		"instr_heading_sw": "",
		"instr_heading_w": "",
		"instr_heading_nw": "",
	    
		"instr_continue": "",
	    "instr_continue_on_road": "",

		"instr_continue_advice_bridge": "",	
		"instr_continue_advice_roundabouts": "",
		"instr_continue_advice_tunnel": "",
		"instr_continue_advice_cross": "",
		"instr_continue_advice_passby": "",
		
		"instr_turn": "",
		"instr_turn_at": "",
		"instr_turn_merge": "",

		"instr_turn_advice_continue": "",
		"instr_turn_advice_stay": "",
						
		"instr_turn_slight_left": "",
		"instr_turn_left": "",
		"instr_turn_sharp_left": "",
		"instr_turn_slight_right": "",
		"instr_turn_right": "",
		"instr_turn_sharp_right": "",
		"instr_turn_cross": "",

		"instr_keep": "",
		"instr_keep_left": "",
		"instr_keep_right": "",
		"instr_keep_follow": "",
		"instr_keep_merge": "",

		"instr_keep_advice_toll": "",
		
		"instr_roundabout": "",    
		"instr_roundabout_name": "",
		"instr_roundabout_noname": "",
		"instr_roundabout_exit": "",
		"instr_roundabout_on_road": "",
		"instr_roundabout_exit_n1": "",
		"instr_roundabout_exit_n2": "",
		"instr_roundabout_exit_n3": "",
		"instr_roundabout_exit_n4": "",
		"instr_roundabout_exit_n5": "",
		"instr_roundabout_exit_n6": "",
		"instr_roundabout_exit_n7": "",
		"instr_roundabout_exit_n8": "",
		"instr_roundabout_exit_n9": "",
		
		"instr_ramp": "",
		"instr_ramp_turn": "",
		"instr_ramp_on_road": "",
		"instr_ramp_toward": "",
		
		"instr_merge": "",
		"instr_merge_noname": "",
		"instr_merge_on_road": "",
		"instr_merge_toward": "",
			
		"instr_exit": "",
		"instr_exit_number": "",
		"instr_exit_toward": "",
		
		"instr_embark": "",
		"instr_embark_name": "",
		"instr_embark_toward": "",
		"instr_embark_next_stop": "",
		"instr_embark_wait_time": "",
		"instr_embark_type_boatferry": "",
		"instr_embark_type_railferry": "",	
		
		"instr_disembark": "",

		"instr_change": "",
		"instr_change_name": "",
		"instr_change_toward": "",
		"instr_change_next_stop": "",
		"instr_change_wait_time": "",

		"instr_leaveyourcar": "",
		"instr_leaveyourcar_advice": "",
		
		"instr_end": "",

		"instr_render_time_hour": "",
		"instr_render_time_hours": "",
		"instr_render_time_minute": "",
		"instr_render_time_minutes": "",

		"instr_9": "",
		"instr_10": "",
		"instr_11": "",
		"instr_12": "",
		"instr_13": "",
		"instr_14": ""
};
for (key in co.oym.geokit.Route.Resources.Keys) {
	co.oym.geokit.Route.Resources.Keys[key] = key;
}
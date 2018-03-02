co.oym.geokit.Route.Resources["en"] = {

	// HEAD instruction: 
	// {0} = instr_heading_x, 
	// {1} = instr_head_on_road, 
	// {2} = instr_head_toward  
	"instr_head": "{0}{1}{2}",    
    "instr_head_on_road": "\u0020on\u0020{0}",
    "instr_head_toward": "\u0020\u0020toward\u0020{0}",
    
    "instr_heading_n": "Head\u0020north",
	"instr_heading_ne": "Head\u0020north-east",
	"instr_heading_e": "Head\u0020east",
	"instr_heading_se": "Head\u0020south-east",
	"instr_heading_s": "Head\u0020south",
	"instr_heading_sw": "Head\u0020south-west",
	"instr_heading_w": "Head\u0020west",
	"instr_heading_nw": "Head\u0020north-west",
    
	// CONTINUE instruction: 
    // {0} = instr_continue_on_road, 
    // {1} = instr_continue_advice_x 
	"instr_continue": "{0}{1}",
    "instr_continue_on_road": "Continue\u0020on\u0020{0}",
    // CONTINUE advices
	"instr_continue_advice_bridge": "\u0020-\u0020Cross\u0020{0}",	
	"instr_continue_advice_roundabouts": "\u0020-\u0020Go\u0020through\u0020{0}\u0020roundabouts",
	"instr_continue_advice_tunnel": "\u0020-\u0020Take\u0020tunnel\u0020{0}",
	"instr_continue_advice_cross": "\u0020-\u0020Cross\u0020{0}",
	"instr_continue_advice_passby": "\u0020-\u0020Pass\u0020by\u0020{0}",
	
	// TURN instruction: 
	// {0} = instr_turn_x, 
	// {1} = instr_turn_at, 
	// {2} = instr_turn_merge, 
	// {3} = instr_turn_advice_x 
	"instr_turn": "{0}{1}{2}{3}",
	"instr_turn_at": "\u0020at\u0020{0}",
	"instr_turn_merge": "\u0020to\u0020merge\u0020onto\u0020{0}",
	// TURN advices
	"instr_turn_advice_continue": "\u0020-\u0020Continue\u0020on\u0020{0}",
	"instr_turn_advice_stay": "\u0020-\u0020Stay\u0020on\u0020{0}",
					
	"instr_turn_slight_left": "Turn\u0020slight\u0020left",
	"instr_turn_left": "Turn\u0020left",
	"instr_turn_sharp_left": "Turn\u0020sharp\u0020left",
	"instr_turn_slight_right": "Turn\u0020slight\u0020right",
	"instr_turn_right": "Turn\u0020right",
	"instr_turn_sharp_right": "Turn\u0020sharp\u0020right",
	"instr_turn_cross": "Turn\u0020straight",
			
	// KEEPLEFT,KEEPRIGHT instructions: 
	// {0} = instr_keep_x, 
	// {1} = instr_keep_follow, 
	// {2} = instr_keep_merge, 
	// {3} = instr_keep_advice_x 
	"instr_keep": "{0}{1}{2}{3}",
	"instr_keep_left": "Keep\u0020left\u0020at\u0020the\u0020fork",
	"instr_keep_right": "Keep\u0020right\u0020at\u0020the\u0020fork",
	"instr_keep_follow": ",\u0020follow\u0020signs\u0020for\u0020{0}",
	"instr_keep_merge": "\u0020and\u0020merge\u0020onto\u0020{0}",
	// KEEPLEFT,KEEPRIGHT advices 
	"instr_keep_advice_toll": "\u0020-\u0020Toll\u0020road",
	
	// ROUNDABOUT instruction: 
	// {0} = instr_roundabout_name | instr_roundabout_noname, 
	// {1} = instr_roundabount_exit 
	// {2} = instr_roundabout_on_road
	"instr_roundabout": "{0}{1}{2}",    
	"instr_roundabout_name": "At\u0020{0}",
	"instr_roundabout_noname": "At\u0020the\u0020roundabout",
	"instr_roundabout_exit": ",\u0020take\u0020the\u0020{0}\u0020exit",
	"instr_roundabout_on_road": "\u0020onto\u0020{0}",
	"instr_roundabout_exit_n1": "1st",
	"instr_roundabout_exit_n2": "2nd",
	"instr_roundabout_exit_n3": "3rd",
	"instr_roundabout_exit_n4": "4th",
	"instr_roundabout_exit_n5": "5th",
	"instr_roundabout_exit_n6": "6th",
	"instr_roundabout_exit_n7": "7th",
	"instr_roundabout_exit_n8": "8th",
	"instr_roundabout_exit_n9": "9th",
	
	// RAMP instruction: 
	// {0} = instr_ramp_on_road, 
	// {1} = instr.ramp.turn (where {0} = instr.turn.x),
	// {2} = instr_ramp_toward  
	"instr_ramp": "{0}{1}{2}",
	"instr_ramp_on_road": "Take\u0020the\u0020ramp\u0020onto\u0020{0}",
	"instr_ramp_turn": "{0}\u0020onto\u0020the\u0020ramp",
	"instr_ramp_toward": "\u0020toward\u0020{0}",
	
	// MERGE instruction: 
	// {0} = instr_merge_on_road (where {0} = instr_heading_x and {1} = road name),
	// {1} = instr_merge_toward 
	"instr_merge": "{0}{1}",
	"instr_merge_noname": "Take\u0020the\u0020ramp",
	"instr_merge_on_road": "Take\u0020the\u0020ramp\u0020to\u0020merge\u0020onto\u0020{0}",
	"instr_merge_toward": "\u0020toward\u0020{0}",
		
	// EXIT instruction: 
    // {0} = instr_exit_number,
	// {1} = instr_exit_toward
	"instr_exit": "{0}{1}",
	"instr_exit_number": "Take\u0020exit\u0020{0}",
	"instr_exit_toward": "\u0020toward\u0020{0}",
	
	// EMBARK instruction:
	// {0} = instr_embark_name,
	// {1} = instr_embark_toward,
	// {2} = instr_embark_next_stop,
	// {3} = instr_embark_wait_time,	
	"instr_embark": "{0}{1}{2}{3}",
	"instr_embark_name": "Take\u0020{0}",
	"instr_embark_toward": "\u0020toward\u0020{0}",
	"instr_embark_next_stop": "\u0020and\u0020stop\u0020at\u0020{0}",
	"instr_embark_wait_time": "wait\u0020time:\u0020{0}",
	"instr_embark_type_boatferry": "boat ferry",
	"instr_embark_type_railferry": "rail ferry",	
	
	// DISEMBARK instruction:
	// {0} = exit name
	"instr_disembark": "Take\u0020exit\u0020{0}",
	
	// CHANGE instruction:
	// {0} = instr_change_name,
	// {1} = instr_change_toward,
	// {2} = instr_change_next_stop,
	// {3} = instr_change_wait_time,
	"instr_change": "{0}{1}{2}{3}",
	"instr_change_name": "Take\u0020{0}",
	"instr_change_toward": "\u0020toward\u0020{0}",
	"instr_change_next_stop": "\u0020and\u0020stop\u0020at\u0020{0}",
	"instr_change_wait_time": "wait\u0020time:\u0020{0}",

	// LEAVEYOURCAR instruction:
	// {0} = instr_leaveyourcar_advice
	"instr_leaveyourcar": "Leave\u0020your\u0020car",
	"instr_leaveyourcar_advice": "\u0020-\u0020Continue\u0020on\u0020{0}",
	
	// END instruction:
	"instr_end": "Arrival",
	
	// RENDER TIME:
	"instr_render_time_hour": "hour",
	"instr_render_time_hours": "hours",
	"instr_render_time_minute": "minute",
	"instr_render_time_minutes": "minutes",


	// LEGACY version
	"instr_9": "slight\u0020left",
	"instr_10": "left",
	"instr_11": "sharp\u0020left",
	"instr_12": "slight\u0020right",
	"instr_13": "right",
	"instr_14": "sharp\u0020right",
};


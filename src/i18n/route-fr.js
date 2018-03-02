co.oym.geokit.Route.Resources["en"] = {

	// HEAD instruction: 
	// {0} = instr_heading_x, 
	// {1} = instr_head_on_road, 
	// {2} = instr_head_toward  
	"instr_head": "{0}{1}{2}",    
    "instr_head_on_road": "\u0020sur\u0020{0}",
    "instr_head_toward": "\u0020\u0020vers\u0020{0}",
    
    "instr_heading_n": "Prendre\u0020la\u0020direction\u0020nord",
	"instr_heading_ne": "Prendre\u0020la\u0020direction\u0020nord-est",
	"instr_heading_e": "Prendre\u0020la\u0020direction\u0020est",
	"instr_heading_se": "Prendre\u0020la\u0020direction\u0020sud-est",
	"instr_heading_s": "Prendre\u0020la\u0020direction\u0020sud",
	"instr_heading_sw": "Prendre\u0020la\u0020direction\u0020sud-ouest",
	"instr_heading_w": "Prendre\u0020la\u0020direction\u0020ouest",
	"instr_heading_nw": "Prendre\u0020la\u0020direction\u0020nord-ouest",
    
	// CONTINUE instruction: 
    // {0} = instr_continue_on_road, 
    // {1} = instr_continue_advice_x 
	"instr_continue": "{0}{1}",
    "instr_continue_on_road": "Continuer\u0020sur\u0020{0}",
    // CONTINUE advices
	"instr_continue_advice_bridge": "\u0020-\u0020Traverser\u0020{0}",	
	"instr_continue_advice_roundabouts": "\u0020-\u0020Passer\u0020par\u0020{0}\u0020ronds-points",
	"instr_continue_advice_tunnel": "\u0020-\u0020Prendre\u0020le\u0020tunnel\u0020{0}",
	"instr_continue_advice_cross": "\u0020-\u0020Traverser\u0020{0}",
	"instr_continue_advice_passby": "\u0020-\u0020Passer\u0020par\u0020{0}",
	
	// TURN instruction: 
	// {0} = instr_turn_x, 
	// {1} = instr_turn_at, 
	// {2} = instr_turn_merge, 
	// {3} = instr_turn_advice_x 
	"instr_turn": "{0}{1}{2}{3}",
	"instr_turn_at": "\u0020sur\u0020{0}",
	"instr_turn_merge": "\u0020pour\u0020rejoindre\u0020{0}",
	// TURN advices
	"instr_turn_advice_continue": "\u0020-\u0020Continuer\u0020sur\u0020{0}",
	"instr_turn_advice_stay": "\u0020-\u0020Rester\u0020sur\u0020{0}",
					
	"instr_turn_slight_left": "Tourner\u0020légèrement\u0020à\u0020gauche",
	"instr_turn_left": "Tourner\u0020à\u0020gauche",
	"instr_turn_sharp_left": "Tourner\u0020à\u0020gauche",
	"instr_turn_slight_right": "Tourner\u0020légèrement\u0020à\u0020droite",
	"instr_turn_right": "Tourner\u0020à\u0020droite",
	"instr_turn_sharp_right": "Tourner\u0020à\u0020droite",
	"instr_turn_cross": "Aller\u0020tout\u0020droit",
			
	// KEEPLEFT,KEEPRIGHT instructions: 
	// {0} = instr_keep_x, 
	// {1} = instr_keep_follow, 
	// {2} = instr_keep_merge, 
	// {3} = instr_keep_advice_x 
	"instr_keep": "{0}{1}{2}{3}",
	"instr_keep_left": "Serrer\u0020à\u0020gauche",
	"instr_keep_right": "Serrer\u0020à\u0020droite",
	"instr_keep_follow": ",\u0020suivre\u0020les\u0020panneaux\u0020pour\u0020{0}",
	"instr_keep_merge": "\u0020et\u0020rejoindre\u0020{0}",
	// KEEPLEFT,KEEPRIGHT advices 
	"instr_keep_advice_toll": "\u0020-\u0020Section\u0020à\u0020péage",
	
	// ROUNDABOUT instruction: 
	// {0} = instr_roundabout_name | instr_roundabout_noname, 
	// {1} = instr_roundabount_exit 
	// {2} = instr_roundabout_on_road
	"instr_roundabout": "{0}{1}{2}",    
	"instr_roundabout_name": "A\u0020{0}",
	"instr_roundabout_noname": "Au\u0020rond-point",
	"instr_roundabout_exit": ",\u0020prendre\u0020la\u0020{0}\u0020sortie",
	"instr_roundabout_on_road": "\u0020onto\u0020{0}",
	"instr_roundabout_exit_n1": "1ère",
	"instr_roundabout_exit_n2": "2ème",
	"instr_roundabout_exit_n3": "3ème",
	"instr_roundabout_exit_n4": "4ème",
	"instr_roundabout_exit_n5": "5ème",
	"instr_roundabout_exit_n6": "6ème",
	"instr_roundabout_exit_n7": "7ème",
	"instr_roundabout_exit_n8": "8ème",
	"instr_roundabout_exit_n9": "9ème",

	
	// RAMP instruction: 
	// {0} = instr_ramp_on_road, 
	// {1} = instr.ramp.turn (where {0} = instr.turn.x),
	// {2} = instr_ramp_toward  
	"instr_ramp": "{0}{1}{2}",
	"instr_ramp_on_road": "Prendre\u0020la\u0020bretelle\u0020pour\u0020rejoindre\u0020{0}",
	"instr.ramp.turn": "{0}\u0020sur\u0020la\u0020bretelle",
	"instr_ramp_toward": "\u0020vers\u0020{0}",

	
	// MERGE instruction: 
	// {0} = instr_merge_on_road (where {0} = instr_heading_x and {1} = road name),
	// {1} = instr_merge_toward 
	"instr_merge": "{0}{1}",
	"instr_merge_noname": "Prendre\u0020la\u0020bretelle",
	"instr_merge_on_road": "Prendre\u0020la\u0020bretelle\u0020pour\u0020rejoindre\u0020{0}",
	"instr_merge_toward": "\u0020vers\u0020{0}",
		
	// EXIT instruction: 
    // {0} = instr_exit_number,
	// {1} = instr_exit_toward
	"instr_exit": "{0}{1}",
	"instr_exit_number": "Prendre\u0020la\u0020sortie\u0020{0}",
	"instr_exit_toward": "\u0020vers\u0020{0}",
	
	// EMBARK instruction:
	// {0} = instr_embark_name,
	// {1} = instr_embark_toward,
	// {2} = instr_embark_next_stop,
	// {3} = instr_embark_wait_time,	
	"instr_embark": "{0}{1}{2}{3}",
	"instr_embark_name": "Prendre\u0020{0}",
	"instr_embark_toward": "\u0020vers\u0020{0}",
	"instr_embark_next_stop": "\u0020et\u0020descendre\u0020à\u0020{0}",
	"instr_embark_wait_time": "temps\u0020d'attente:\u0020{0}",
	"instr_embark_type_boatferry": "le\u0020bateau",
	"instr_embark_type_railferry": "le\u0020train",	
	
	// DISEMBARK instruction:
	// {0} = exit name
	"instr_disembark": "Descendre\u0020à\u0020la\u0020sortie\u0020{0}",
	
	// CHANGE instruction:
	// {0} = instr_change_name,
	// {1} = instr_change_toward,
	// {2} = instr_change_next_stop,
	// {3} = instr_change_wait_time,
	"instr_change": "{0}{1}{2}{3}",
	"instr_change_name": "Prendre\u0020{0}",
	"instr_change_toward": "\u0020vers\u0020{0}",
	"instr_change_next_stop": "\u0020et\u0020descendre\u0020à\u0020{0}",
	"instr_change_wait_time": "temps\u0020d'attente:\u0020{0}",

	// LEAVEYOURCAR instruction:
	// {0} = instr_leaveyourcar_advice
	"instr_leaveyourcar": "Laisser\u0020votre\u0020voiture",
	"instr_leaveyourcar_advice": "\u0020-\u0020Continuer\u0020vers\u0020{0}",
	
	// END instruction:
	"instr_end": "Arrivée",
	
	// RENDER TIME:
	"instr_render_time_hour": "heure",
	"instr_render_time_hours": "heures",
	"instr_render_time_minute": "minute",
	"instr_render_time_minutes": "minutes",


	// LEGACY version
	"instr_9": "légèrement\u0020à\u0020gauche",
	"instr_10": "à\u0020gauche",
	"instr_11": "à\u0020gauche",
	"instr_12": "légèrement\u0020à\u0020droite",
	"instr_13": "à\u0020droite",
	"instr_14": "à\u0020droite",
};


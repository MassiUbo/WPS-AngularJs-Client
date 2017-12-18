	var url = []; //nouveau tableau
	url[0] = ["", ""];
	url[1] = ["http://geoserver.ics.perm.ru/geoserver/topp/ows?", "http://geoserver.ics.perm.ru/geoserver/topp/ows?"]; //nouveau tableau, on va donc avoir url[0][0]="http://geoserver.ics.perm.ru/geoserver/topp/ows?"
	url[2] = ["https://geobretagne.fr/geoserver/dreal_b/ows?", "https://geobretagne.fr/geoserver/ows?"];
	//url[3] = ["p2", "url2"];
	 
	var couche=[];
	
	
	
	
	// url0
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"] = [];
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"][0] =  ["", ""];
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"][1] = ["tasmania_state_boundaries", "tasmania_state_boundaries"];
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"][2] = ["states", "states"];
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"][3] = ["tasmania_roads", "tasmania_roads"];
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"][4] = ["tasmania_water_bodies", "tasmania_water_bodies"];
	couche["http://geoserver.ics.perm.ru/geoserver/topp/ows?"][5] = ["tasmania_cities", "tasmania_cities"];
	 //typeNS = topp
	//typeNS:'topp'
	
	//https://geobretagne.fr/geoserver/ows?service=WFS&version=1.0.0&request=getcapabilities
	
	
	//https://geobretagne.fr/geoserver/ows?
	//couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][12] = ["",""];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"]=[];
	
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][0] =  ["", ""];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][1] = ["stationnement_littoral", "stationnement_littoral"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][2] = ["atlaslitt_3_alea_biblio_lin", "atlaslitt_3_alea_biblio_lin"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][3] = ["l_article_302_5_cch", "l_article_302_5_cch"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][4] = ["synth_indic1_ff2011_zonage2013", "synth_indic1_ff2011_zonage2013"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][5] = ["azibretagne","azibretagne"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][6] = ["l_agences_urbanisme","l_agences_urbanisme"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][7] = ["atlaslitt_3_alea_biblio_ponct","atlaslitt_3_alea_biblio_ponct"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][8] = ["atlaslitt_3_alea_biblio_surf_surf","atlaslitt_3_alea_biblio_surf_surf"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][9] = ["atlaslitt_3_alea_biblio_surf_pct","atlaslitt_3_alea_biblio_surf_pct"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][10] = ["arrondissement","arrondissement"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][11] = ["synth_indic1_ff2011_zonage2013","synth_indic1_ff2011_zonage2013"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][12] = ["n_zrr","n_zrr"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][13] = ["atlaslitt_5_dyn_plages_1950_2009","atlaslitt_5_dyn_plages_1950_2009"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][14] = ["ae_avis_projets","ae_avis_projets"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][15] = ["aeroports","aeroports"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][16] = ["bassins_versants_gp5","bassins_versants_gp5"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][17] = ["cadastre_conchylicole","cadastre_conchylicole"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][18] = ["insee_rgp_pop","insee_rgp_pop"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][19] = ["port_marchand","port_marchand"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][20] = ["RPLS_201","RPLS_201"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][21] = ["sitadel_log_neuf_1011","sitadel_log_neuf_1011"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][22] = ["hydrometrie_qmj","hydrometrie_qmj"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][23] = ["t50m_e25m_bdtopo_bati_2003_022_et8","t50m_e25m_bdtopo_bati_2003_022_et8"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][24] = ["r53_tb_infra_2011","r53_tb_infra_2011"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][25] = ["l_eptb","l_eptb"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][26] = ["atlaslitt_5_cine_plages_2009","atlaslitt_5_cine_plages_2009"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][27] = ["n_unite_urbaine_com","n_unite_urbaine_com"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][28] = ["l_zonage_scellier_r53","l_zonage_scellier_r53"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][29] = ["interdiction_epandage_type2_sur_mais","interdiction_epandage_type2_sur_mais"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][30] = ["zae_bre","zae_bre"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][31] = ["zones_debit_adsl_cete","zones_debit_adsl_cete"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][32] = ["ae_casparcas_edit","ae_casparcas_edit"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][33] = ["d_arti_ff2011_rfl09","d_arti_ff2011_rfl09"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][34] = ["l_communes_2016","l_communes_2016"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][35] = ["sdage_bv3b1","sdage_bv3b1"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][36] = ["territoires_paot","territoires_paot"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][37] = ["l_zonage_abc","l_zonage_abc"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][38] = ["natura2000_bighabitat","natura2000_bighabitat"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][39] = ["atlaslitt_2_terrain_cavites","atlaslitt_2_terrain_cavites"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][40] = ["centre_examen_auto","centre_examen_auto"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][41] = ["cinema","cinema"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][42] = ["hierarchie_comb2_etat","hierarchie_comb2_etat"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][43] = ["commune_bdcarto","commune_bdcarto"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][44] = ["paot_ctxt_contrats_territoriaux","paot_ctxt_contrats_territoriaux"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][45] = ["n_cucs","n_cucs"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][46] = ["hydrometrie_stations_cote_historique","hydrometrie_stations_cote_historique"];
	couche["https://geobretagne.fr/geoserver/dreal_b/ows?"][47] = ["route_accidents_mortels","route_accidents_mortels"];
	
	
	//url2
/*	couche["p2"] = [];
	couche["p2"][0] = ["p2v0", "url2-couche0"];
	couche["p2"][1] = ["p2v1", "url2-couche1"];*/
	 /*
	 
	var rue = [];
	//url0-tasmania_state_boundaries
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v0"] = [];
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v0"][0] = ["http://geoserver.ics.perm.ru/geoserver/topp/ows?v0r0", "url0-tasmania_state_boundaries-rue0"];
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v0"][1] = ["http://geoserver.ics.perm.ru/geoserver/topp/ows?v0r1", "url0-tasmania_state_boundaries-rue1"];
	 
	//url0-states
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1"] = [];
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1"][0] = ["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1r0", "url0-states-rue0"];
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1"][1] = ["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1r1", "url0-states-rue1"];
	rue["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1"][2] = ["http://geoserver.ics.perm.ru/geoserver/topp/ows?v1r2", "url0-states-rue2"];
	 
	 
	//https://geobretagne.fr/geoserver/ows?-couche0
	rue["https://geobretagne.fr/geoserver/ows?v0"] = [];
	rue["https://geobretagne.fr/geoserver/ows?v0"][0] = ["https://geobretagne.fr/geoserver/ows?v0r0", "https://geobretagne.fr/geoserver/ows?-couche0-rue0"];
	rue["https://geobretagne.fr/geoserver/ows?v0"][1] = ["https://geobretagne.fr/geoserver/ows?v0r1", "https://geobretagne.fr/geoserver/ows?-couche0-rue1"];
	 
	//https://geobretagne.fr/geoserver/ows?-couche1
	rue["https://geobretagne.fr/geoserver/ows?v1"] = [];
	rue["https://geobretagne.fr/geoserver/ows?v1"][0] = ["https://geobretagne.fr/geoserver/ows?v1r0", "https://geobretagne.fr/geoserver/ows?-couche1-rue0"];
	rue["https://geobretagne.fr/geoserver/ows?v1"][1] = ["https://geobretagne.fr/geoserver/ows?v1r1", "https://geobretagne.fr/geoserver/ows?-couche1-rue1"];
	 
	 
	//url2-couche0
	rue["p2v0"] = [];
	rue["p2v0"][0] = ["p2v0r0", "url2-couche0-rue0"];
	rue["p2v0"][1] = ["p2v0r1", "url2-couche0-rue1"];
	 
	//https://geobretagne.fr/geoserver/ows?-couche1
	rue["p2v1"] = [];
	rue["p2v1"][0] = ["p2v1r0", "url2-couche1-rue0"];
	rue["p2v1"][1] = ["p2v1r1", "url2-couche1-rue1"];
	rue["p2v1"][2] = ["p2v1r2", "url2-couche1-rue2"];*/
	

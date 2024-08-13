/**
 * User friendly timezone strings defined by Collabify UX team
 */
export enum UserFriendlyTimezones {
  'Newfoundland Time (NT)',
  'Atlantic Time (AT)',
  'Eastern Time (ET)',
  'Central Time (CT)',
  'Mountain Time (MT)',
  'Pacific Time (PT)',
  'Alaska Time (AKT)',
  'Hawaii-Aleutian Time (HT)',
}

/**
 * Standard Universal UTC timezone format
 */
export enum TimezonesUTC {
  '-10:00',
  '-09:00',
  '-08:00',
  '-07:00',
  '-06:00',
  '-05:00',
  '-04:00',
  '-03:30',
}

/**
 * Mapping of standard UTC timezone to Collabify defined user friendly strings
 */
export const utcToCollabifyTimezoneMap = {
  '-10:00': 'Hawaii-Aleutian Time (HT)',
  '-09:00': 'Alaska Time (AKT)',
  '-08:00': 'Pacific Time (PT)',
  '-07:00': 'Mountain Time (MT)',
  '-06:00': 'Central Time (CT)',
  '-05:00': 'Eastern Time (ET)',
  '-04:00': 'Atlantic Time (AT)',
  '-03:30': 'Newfoundland Time (NT)',
}

/**
 * Mapping of Collabify defined user friendly timezone strings to UTC standard
 */
export const collabifyTimezoneToUTCMap = {
  'Hawaii-Aleutian Time (HT)': '-10:00',
  'Alaska Time (AKT)': '-09:00',
  'Pacific Time (PT)': '-08:00',
  'Mountain Time (MT)': '-07:00',
  'Central Time (CT)': '-06:00',
  'Eastern Time (ET)': '-05:00',
  'Atlantic Time (AT)': '-04:00',
  'Newfoundland Time (NT)': '-03:30',
}

/**
 * This will convert offsets to timezones to match dayjs format
 * NOTE: This might not cover daylight savings for some areas
 */

export const convertOffsetToTimezone = {
  '-10:00': {
    timezone: 'America/Adak',
    abbr: 'HT',
  },
  '-09:00': { timezone: 'America/Anchorage', abbr: 'AKT' },
  '-08:00': { timezone: 'America/Los_Angeles', abbr: 'PT' },
  '-07:00': { timezone: 'America/Denver', abbr: 'MT' },
  '-06:00': { timezone: 'America/Chicago', abbr: 'CT' },
  '-05:00': { timezone: 'America/New_York', abbr: 'ET' },
  '-04:00': { timezone: 'America/Halifax', abbr: 'AT' },
  '-03:30': { timezone: 'America/St_Johns', abbr: 'NT' },
}

/**
 * DayJS library data for each timezone in our determind range (North American zones)
 */
export const dayJSformattedTZdata = {
  'America/Adak': {
    label: 'America/Adak (GMT-10:00)',
    name: '(GMT-10:00) Adak',
    utc: '-10:00',
  },
  'Pacific/Honolulu': {
    label: 'Pacific/Honolulu (GMT-10:00)',
    name: '(GMT-10:00) Honolulu, East Honolulu, Pearl City, Hilo, Kailua',
    utc: '-10:00',
  },
  'Pacific/Rarotonga': {
    label: 'Pacific/Rarotonga (GMT-10:00)',
    name: '(GMT-10:00) Avarua',
    utc: '-10:00',
  },
  'Pacific/Tahiti': {
    label: 'Pacific/Tahiti (GMT-10:00)',
    name: '(GMT-10:00) Faaa, Papeete, Punaauia, Pirae, Mahina',
    utc: '-10:00',
  },
  'Pacific/Marquesas': {
    label: 'Pacific/Marquesas (GMT-09:30)',
    name: '(GMT-09:30) Taiohae',
    utc: '-09:30',
  },
  'America/Anchorage': {
    label: 'America/Anchorage (GMT-09:00)',
    name: '(GMT-09:00) Anchorage, Fairbanks, Eagle River, Badger, Knik-Fairview',
    utc: '-09:00',
  },
  'America/Juneau': {
    label: 'America/Juneau (GMT-09:00)',
    name: '(GMT-09:00) Juneau',
    utc: '-09:00',
  },
  'America/Metlakatla': {
    label: 'America/Metlakatla (GMT-09:00)',
    name: '(GMT-09:00) Metlakatla',
    utc: '-09:00',
  },
  'America/Nome': {
    label: 'America/Nome (GMT-09:00)',
    name: '(GMT-09:00) Nome',
    utc: '-09:00',
  },
  'America/Sitka': {
    label: 'America/Sitka (GMT-09:00)',
    name: '(GMT-09:00) Sitka, Ketchikan',
    utc: '-09:00',
  },
  'America/Yakutat': {
    label: 'America/Yakutat (GMT-09:00)',
    name: '(GMT-09:00) Yakutat',
    utc: '-09:00',
  },
  'Pacific/Gambier': {
    label: 'Pacific/Gambier (GMT-09:00)',
    name: '(GMT-09:00) Gambier',
    utc: '-09:00',
  },
  'America/Los_Angeles': {
    label: 'America/Los_Angeles (GMT-08:00)',
    name: '(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle',
    utc: '-08:00',
  },
  'America/Tijuana': {
    label: 'America/Tijuana (GMT-08:00)',
    name: '(GMT-08:00) Tijuana, Mexicali, Ensenada, Rosarito, Tecate',
    utc: '-08:00',
  },
  'America/Vancouver': {
    label: 'America/Vancouver (GMT-08:00)',
    name: '(GMT-08:00) Vancouver, Surrey, Okanagan, Victoria, Burnaby',
    utc: '-08:00',
  },
  'Pacific/Pitcairn': {
    label: 'Pacific/Pitcairn (GMT-08:00)',
    name: '(GMT-08:00) Adamstown',
    utc: '-08:00',
  },
  'America/Boise': {
    label: 'America/Boise (GMT-07:00)',
    name: '(GMT-07:00) Boise, Meridian, Nampa, Idaho Falls, Pocatello',
    utc: '-07:00',
  },
  'America/Cambridge_Bay': {
    label: 'America/Cambridge_Bay (GMT-07:00)',
    name: '(GMT-07:00) Cambridge Bay',
    utc: '-07:00',
  },
  'America/Chihuahua': {
    label: 'America/Chihuahua (GMT-07:00)',
    name: '(GMT-07:00) Chihuahua, Ciudad Delicias, Cuauhtémoc, Parral, Nuevo Casas Grandes',
    utc: '-07:00',
  },
  'America/Creston': {
    label: 'America/Creston (GMT-07:00)',
    name: '(GMT-07:00) Creston',
    utc: '-07:00',
  },
  'America/Dawson': {
    label: 'America/Dawson (GMT-07:00)',
    name: '(GMT-07:00) Dawson',
    utc: '-07:00',
  },
  'America/Dawson_Creek': {
    label: 'America/Dawson_Creek (GMT-07:00)',
    name: '(GMT-07:00) Fort St. John, Dawson Creek',
    utc: '-07:00',
  },
  'America/Denver': {
    label: 'America/Denver (GMT-07:00)',
    name: '(GMT-07:00) Denver, El Paso, Albuquerque, Colorado Springs, Aurora',
    utc: '-07:00',
  },
  'America/Edmonton': {
    label: 'America/Edmonton (GMT-07:00)',
    name: '(GMT-07:00) Calgary, Edmonton, Fort McMurray, Red Deer, Lethbridge',
    utc: '-07:00',
  },
  'America/Fort_Nelson': {
    label: 'America/Fort_Nelson (GMT-07:00)',
    name: '(GMT-07:00) Fort Nelson',
    utc: '-07:00',
  },
  'America/Hermosillo': {
    label: 'America/Hermosillo (GMT-07:00)',
    name: '(GMT-07:00) Hermosillo, Ciudad Obregón, Nogales, San Luis Río Colorado, Navojoa',
    utc: '-07:00',
  },
  'America/Inuvik': {
    label: 'America/Inuvik (GMT-07:00)',
    name: '(GMT-07:00) Inuvik',
    utc: '-07:00',
  },
  'America/Mazatlan': {
    label: 'America/Mazatlan (GMT-07:00)',
    name: '(GMT-07:00) Culiacán, Mazatlán, Tepic, Los Mochis, La Paz',
    utc: '-07:00',
  },
  'America/Ojinaga': {
    label: 'America/Ojinaga (GMT-07:00)',
    name: '(GMT-07:00) Ciudad Juárez, Manuel Ojinaga, Ojinaga',
    utc: '-07:00',
  },
  'America/Phoenix': {
    label: 'America/Phoenix (GMT-07:00)',
    name: '(GMT-07:00) Phoenix, Tucson, Mesa, Chandler, Gilbert',
    utc: '-07:00',
  },
  'America/Whitehorse': {
    label: 'America/Whitehorse (GMT-07:00)',
    name: '(GMT-07:00) Whitehorse',
    utc: '-07:00',
  },
  'America/Yellowknife': {
    label: 'America/Yellowknife (GMT-07:00)',
    name: '(GMT-07:00) Yellowknife',
    utc: '-07:00',
  },
  'America/Bahia_Banderas': {
    label: 'America/Bahia_Banderas (GMT-06:00)',
    name: '(GMT-06:00) Mezcales, San Vicente, Bucerías, Valle de Banderas',
    utc: '-06:00',
  },
  'America/Belize': {
    label: 'America/Belize (GMT-06:00)',
    name: '(GMT-06:00) Belize City, San Ignacio, Orange Walk, Belmopan, Dangriga',
    utc: '-06:00',
  },
  'America/Chicago': {
    label: 'America/Chicago (GMT-06:00)',
    name: '(GMT-06:00) Chicago, Houston, San Antonio, Dallas, Austin',
    utc: '-06:00',
  },
  'America/Costa_Rica': {
    label: 'America/Costa_Rica (GMT-06:00)',
    name: '(GMT-06:00) San José, Limón, San Francisco, Alajuela, Liberia',
    utc: '-06:00',
  },
  'America/El_Salvador': {
    label: 'America/El_Salvador (GMT-06:00)',
    name: '(GMT-06:00) San Salvador, Soyapango, Santa Ana, San Miguel, Mejicanos',
    utc: '-06:00',
  },
  'America/Guatemala': {
    label: 'America/Guatemala (GMT-06:00)',
    name: '(GMT-06:00) Guatemala City, Mixco, Villa Nueva, Petapa, San Juan Sacatepéquez',
    utc: '-06:00',
  },
  'America/Indiana/Knox': {
    label: 'America/Indiana/Knox (GMT-06:00)',
    name: '(GMT-06:00) Knox',
    utc: '-06:00',
  },
  'America/Indiana/Tell_City': {
    label: 'America/Indiana/Tell_City (GMT-06:00)',
    name: '(GMT-06:00) Tell City',
    utc: '-06:00',
  },
  'America/Managua': {
    label: 'America/Managua (GMT-06:00)',
    name: '(GMT-06:00) Managua, León, Masaya, Chinandega, Matagalpa',
    utc: '-06:00',
  },
  'America/Matamoros': {
    label: 'America/Matamoros (GMT-06:00)',
    name: '(GMT-06:00) Reynosa, Heroica Matamoros, Nuevo Laredo, Piedras Negras, Ciudad Acuña',
    utc: '-06:00',
  },
  'America/Menominee': {
    label: 'America/Menominee (GMT-06:00)',
    name: '(GMT-06:00) Menominee, Iron Mountain, Kingsford, Ironwood, Iron River',
    utc: '-06:00',
  },
  'America/Merida': {
    label: 'America/Merida (GMT-06:00)',
    name: '(GMT-06:00) Mérida, Campeche, Ciudad del Carmen, Kanasín, Valladolid',
    utc: '-06:00',
  },
  'America/Mexico_City': {
    label: 'America/Mexico_City (GMT-06:00)',
    name: '(GMT-06:00) Mexico City, Iztapalapa, Ecatepec de Morelos, Guadalajara, Puebla',
    utc: '-06:00',
  },
  'America/Monterrey': {
    label: 'America/Monterrey (GMT-06:00)',
    name: '(GMT-06:00) Monterrey, Saltillo, Guadalupe, Torreón, Victoria de Durango',
    utc: '-06:00',
  },
  'America/North_Dakota/Beulah': {
    label: 'America/North_Dakota/Beulah (GMT-06:00)',
    name: '(GMT-06:00) Beulah',
    utc: '-06:00',
  },
  'America/North_Dakota/Center': {
    label: 'America/North_Dakota/Center (GMT-06:00)',
    name: '(GMT-06:00) Center',
    utc: '-06:00',
  },
  'America/North_Dakota/New_Salem': {
    label: 'America/North_Dakota/New_Salem (GMT-06:00)',
    name: '(GMT-06:00) Mandan',
    utc: '-06:00',
  },
  'America/Rainy_River': {
    label: 'America/Rainy_River (GMT-06:00)',
    name: '(GMT-06:00) Rainy River',
    utc: '-06:00',
  },
  'America/Rankin_Inlet': {
    label: 'America/Rankin_Inlet (GMT-06:00)',
    name: '(GMT-06:00) Rankin Inlet',
    utc: '-06:00',
  },
  'America/Regina': {
    label: 'America/Regina (GMT-06:00)',
    name: '(GMT-06:00) Saskatoon, Regina, Prince Albert, Moose Jaw, North Battleford',
    utc: '-06:00',
  },
  'America/Resolute': {
    label: 'America/Resolute (GMT-06:00)',
    name: '(GMT-06:00) Resolute',
    utc: '-06:00',
  },
  'America/Swift_Current': {
    label: 'America/Swift_Current (GMT-06:00)',
    name: '(GMT-06:00) Swift Current',
    utc: '-06:00',
  },
  'America/Tegucigalpa': {
    label: 'America/Tegucigalpa (GMT-06:00)',
    name: '(GMT-06:00) Tegucigalpa, San Pedro Sula, Choloma, La Ceiba, El Progreso',
    utc: '-06:00',
  },
  'America/Winnipeg': {
    label: 'America/Winnipeg (GMT-06:00)',
    name: '(GMT-06:00) Winnipeg, Brandon, Kenora, Portage la Prairie, Thompson',
    utc: '-06:00',
  },
  'Pacific/Easter': {
    label: 'Pacific/Easter (GMT-06:00)',
    name: '(GMT-06:00) Easter',
    utc: '-06:00',
  },
  'Pacific/Galapagos': {
    label: 'Pacific/Galapagos (GMT-06:00)',
    name: '(GMT-06:00) Puerto Ayora, Puerto Baquerizo Moreno',
    utc: '-06:00',
  },
  'America/Atikokan': {
    label: 'America/Atikokan (GMT-05:00)',
    name: '(GMT-05:00) Atikokan',
    utc: '-05:00',
  },
  'America/Bogota': {
    label: 'America/Bogota (GMT-05:00)',
    name: '(GMT-05:00) Bogotá, Cali, Medellín, Barranquilla, Cartagena',
    utc: '-05:00',
  },
  'America/Cancun': {
    label: 'America/Cancun (GMT-05:00)',
    name: '(GMT-05:00) Cancún, Chetumal, Playa del Carmen, Cozumel, Felipe Carrillo Puerto',
    utc: '-05:00',
  },
  'America/Cayman': {
    label: 'America/Cayman (GMT-05:00)',
    name: '(GMT-05:00) George Town, West Bay, Bodden Town, East End, North Side',
    utc: '-05:00',
  },
  'America/Detroit': {
    label: 'America/Detroit (GMT-05:00)',
    name: '(GMT-05:00) Detroit, Grand Rapids, Warren, Sterling Heights, Ann Arbor',
    utc: '-05:00',
  },
  'America/Eirunepe': {
    label: 'America/Eirunepe (GMT-05:00)',
    name: '(GMT-05:00) Eirunepé, Benjamin Constant, Envira',
    utc: '-05:00',
  },
  'America/Grand_Turk': {
    label: 'America/Grand_Turk (GMT-05:00)',
    name: '(GMT-05:00) Cockburn Town',
    utc: '-05:00',
  },
  'America/Guayaquil': {
    label: 'America/Guayaquil (GMT-05:00)',
    name: '(GMT-05:00) Guayaquil, Quito, Cuenca, Santo Domingo de los Colorados, Machala',
    utc: '-05:00',
  },
  'America/Havana': {
    label: 'America/Havana (GMT-05:00)',
    name: '(GMT-05:00) Havana, Santiago de Cuba, Camagüey, Holguín, Guantánamo',
    utc: '-05:00',
  },
  'America/Indiana/Indianapolis': {
    label: 'America/Indiana/Indianapolis (GMT-05:00)',
    name: '(GMT-05:00) Indianapolis, Fort Wayne, South Bend, Carmel, Bloomington',
    utc: '-05:00',
  },
  'America/Indiana/Marengo': {
    label: 'America/Indiana/Marengo (GMT-05:00)',
    name: '(GMT-05:00) Marengo',
    utc: '-05:00',
  },
  'America/Indiana/Petersburg': {
    label: 'America/Indiana/Petersburg (GMT-05:00)',
    name: '(GMT-05:00) Petersburg',
    utc: '-05:00',
  },
  'America/Indiana/Vevay': {
    label: 'America/Indiana/Vevay (GMT-05:00)',
    name: '(GMT-05:00) Vevay',
    utc: '-05:00',
  },
  'America/Indiana/Vincennes': {
    label: 'America/Indiana/Vincennes (GMT-05:00)',
    name: '(GMT-05:00) Vincennes, Jasper, Washington, Huntingburg',
    utc: '-05:00',
  },
  'America/Indiana/Winamac': {
    label: 'America/Indiana/Winamac (GMT-05:00)',
    name: '(GMT-05:00) Winamac',
    utc: '-05:00',
  },
  'America/Iqaluit': {
    label: 'America/Iqaluit (GMT-05:00)',
    name: '(GMT-05:00) Iqaluit',
    utc: '-05:00',
  },
  'America/Jamaica': {
    label: 'America/Jamaica (GMT-05:00)',
    name: '(GMT-05:00) Kingston, New Kingston, Spanish Town, Portmore, Montego Bay',
    utc: '-05:00',
  },
  'America/Kentucky/Louisville': {
    label: 'America/Kentucky/Louisville (GMT-05:00)',
    name: '(GMT-05:00) Louisville, Jeffersonville, New Albany, Jeffersontown, Pleasure Ridge Park',
    utc: '-05:00',
  },
  'America/Kentucky/Monticello': {
    label: 'America/Kentucky/Monticello (GMT-05:00)',
    name: '(GMT-05:00) Monticello',
    utc: '-05:00',
  },
  'America/Lima': {
    label: 'America/Lima (GMT-05:00)',
    name: '(GMT-05:00) Lima, Arequipa, Callao, Trujillo, Chiclayo',
    utc: '-05:00',
  },
  'America/Nassau': {
    label: 'America/Nassau (GMT-05:00)',
    name: '(GMT-05:00) Nassau, Lucaya, Freeport, West End, Cooper’s Town',
    utc: '-05:00',
  },
  'America/New_York': {
    label: 'America/New_York (GMT-05:00)',
    name: '(GMT-05:00) New York City, Brooklyn, Queens, Philadelphia, Manhattan',
    utc: '-05:00',
  },
  'America/Nipigon': {
    label: 'America/Nipigon (GMT-05:00)',
    name: '(GMT-05:00) Nipigon',
    utc: '-05:00',
  },
  'America/Panama': {
    label: 'America/Panama (GMT-05:00)',
    name: '(GMT-05:00) Panamá, San Miguelito, Juan Díaz, David, Arraiján',
    utc: '-05:00',
  },
  'America/Pangnirtung': {
    label: 'America/Pangnirtung (GMT-05:00)',
    name: '(GMT-05:00) Pangnirtung',
    utc: '-05:00',
  },
  'America/Port-au-Prince': {
    label: 'America/Port-au-Prince (GMT-05:00)',
    name: '(GMT-05:00) Port-au-Prince, Carrefour, Delmas 73, Pétionville, Port-de-Paix',
    utc: '-05:00',
  },
  'America/Rio_Branco': {
    label: 'America/Rio_Branco (GMT-05:00)',
    name: '(GMT-05:00) Rio Branco, Cruzeiro do Sul, Sena Madureira, Tarauacá, Feijó',
    utc: '-05:00',
  },
  'America/Thunder_Bay': {
    label: 'America/Thunder_Bay (GMT-05:00)',
    name: '(GMT-05:00) Thunder Bay',
    utc: '-05:00',
  },
  'America/Toronto': {
    label: 'America/Toronto (GMT-05:00)',
    name: '(GMT-05:00) Toronto, Montréal, Ottawa, Mississauga, Québec',
    utc: '-05:00',
  },
  'America/Anguilla': {
    label: 'America/Anguilla (GMT-04:00)',
    name: '(GMT-04:00) The Valley, Blowing Point Village, Sandy Ground Village, The Quarter, Sandy Hill',
    utc: '-04:00',
  },
  'America/Antigua': {
    label: 'America/Antigua (GMT-04:00)',
    name: '(GMT-04:00) Saint John’s, Piggotts, Bolands, Codrington, Parham',
    utc: '-04:00',
  },
  'America/Aruba': {
    label: 'America/Aruba (GMT-04:00)',
    name: '(GMT-04:00) Oranjestad, Tanki Leendert, San Nicolas, Santa Cruz, Paradera',
    utc: '-04:00',
  },
  'America/Asuncion': {
    label: 'America/Asuncion (GMT-04:00)',
    name: '(GMT-04:00) Asunción, Ciudad del Este, San Lorenzo, Capiatá, Lambaré',
    utc: '-04:00',
  },
  'America/Barbados': {
    label: 'America/Barbados (GMT-04:00)',
    name: '(GMT-04:00) Bridgetown, Speightstown, Oistins, Bathsheba, Holetown',
    utc: '-04:00',
  },
  'America/Blanc-Sablon': {
    label: 'America/Blanc-Sablon (GMT-04:00)',
    name: '(GMT-04:00) Lévis',
    utc: '-04:00',
  },
  'America/Boa_Vista': {
    label: 'America/Boa_Vista (GMT-04:00)',
    name: '(GMT-04:00) Boa Vista',
    utc: '-04:00',
  },
  'America/Campo_Grande': {
    label: 'America/Campo_Grande (GMT-04:00)',
    name: '(GMT-04:00) Campo Grande, Dourados, Corumbá, Três Lagoas, Ponta Porã',
    utc: '-04:00',
  },
  'America/Caracas': {
    label: 'America/Caracas (GMT-04:00)',
    name: '(GMT-04:00) Caracas, Maracaibo, Maracay, Valencia, Barquisimeto',
    utc: '-04:00',
  },
  'America/Cuiaba': {
    label: 'America/Cuiaba (GMT-04:00)',
    name: '(GMT-04:00) Cuiabá, Várzea Grande, Rondonópolis, Sinop, Barra do Garças',
    utc: '-04:00',
  },
  'America/Curacao': {
    label: 'America/Curacao (GMT-04:00)',
    name: '(GMT-04:00) Willemstad, Sint Michiel Liber',
    utc: '-04:00',
  },
  'America/Dominica': {
    label: 'America/Dominica (GMT-04:00)',
    name: '(GMT-04:00) Roseau, Portsmouth, Berekua, Saint Joseph, Wesley',
    utc: '-04:00',
  },
  'America/Glace_Bay': {
    label: 'America/Glace_Bay (GMT-04:00)',
    name: '(GMT-04:00) Sydney, Glace Bay, Sydney Mines',
    utc: '-04:00',
  },
  'America/Goose_Bay': {
    label: 'America/Goose_Bay (GMT-04:00)',
    name: '(GMT-04:00) Labrador City, Happy Valley-Goose Bay',
    utc: '-04:00',
  },
  'America/Grenada': {
    label: 'America/Grenada (GMT-04:00)',
    name: "(GMT-04:00) Saint George's, Gouyave, Grenville, Victoria, Saint David’s",
    utc: '-04:00',
  },
  'America/Guadeloupe': {
    label: 'America/Guadeloupe (GMT-04:00)',
    name: '(GMT-04:00) Les Abymes, Baie-Mahault, Le Gosier, Petit-Bourg, Sainte-Anne',
    utc: '-04:00',
  },
  'America/Guyana': {
    label: 'America/Guyana (GMT-04:00)',
    name: '(GMT-04:00) Georgetown, Linden, New Amsterdam, Anna Regina, Bartica',
    utc: '-04:00',
  },
  'America/Halifax': {
    label: 'America/Halifax (GMT-04:00)',
    name: '(GMT-04:00) Halifax, Dartmouth, Charlottetown, Lower Sackville, Truro',
    utc: '-04:00',
  },
  'America/Kralendijk': {
    label: 'America/Kralendijk (GMT-04:00)',
    name: '(GMT-04:00) Kralendijk, Oranjestad, The Bottom',
    utc: '-04:00',
  },
  'America/La_Paz': {
    label: 'America/La_Paz (GMT-04:00)',
    name: '(GMT-04:00) Santa Cruz de la Sierra, Cochabamba, La Paz, Sucre, Oruro',
    utc: '-04:00',
  },
  'America/Lower_Princes': {
    label: 'America/Lower_Princes (GMT-04:00)',
    name: '(GMT-04:00) Cul de Sac, Lower Prince’s Quarter, Koolbaai, Philipsburg',
    utc: '-04:00',
  },
  'America/Manaus': {
    label: 'America/Manaus (GMT-04:00)',
    name: '(GMT-04:00) Manaus, Itacoatiara, Parintins, Manacapuru, Coari',
    utc: '-04:00',
  },
  'America/Marigot': {
    label: 'America/Marigot (GMT-04:00)',
    name: '(GMT-04:00) Marigot',
    utc: '-04:00',
  },
  'America/Martinique': {
    label: 'America/Martinique (GMT-04:00)',
    name: '(GMT-04:00) Fort-de-France, Le Lamentin, Le Robert, Sainte-Marie, Le François',
    utc: '-04:00',
  },
  'America/Moncton': {
    label: 'America/Moncton (GMT-04:00)',
    name: '(GMT-04:00) Moncton, Saint John, Fredericton, Dieppe, Miramichi',
    utc: '-04:00',
  },
  'America/Montserrat': {
    label: 'America/Montserrat (GMT-04:00)',
    name: '(GMT-04:00) Brades, Saint Peters, Plymouth',
    utc: '-04:00',
  },
  'America/Porto_Velho': {
    label: 'America/Porto_Velho (GMT-04:00)',
    name: '(GMT-04:00) Porto Velho, Ji Paraná, Vilhena, Ariquemes, Cacoal',
    utc: '-04:00',
  },
  'America/Port_of_Spain': {
    label: 'America/Port_of_Spain (GMT-04:00)',
    name: '(GMT-04:00) Chaguanas, Mon Repos, San Fernando, Port of Spain, Rio Claro',
    utc: '-04:00',
  },
  'America/Puerto_Rico': {
    label: 'America/Puerto_Rico (GMT-04:00)',
    name: '(GMT-04:00) San Juan, Bayamón, Carolina, Ponce, Caguas',
    utc: '-04:00',
  },
  'America/Santiago': {
    label: 'America/Santiago (GMT-04:00)',
    name: '(GMT-04:00) Santiago, Puente Alto, Antofagasta, Viña del Mar, Valparaíso',
    utc: '-04:00',
  },
  'America/Santo_Domingo': {
    label: 'America/Santo_Domingo (GMT-04:00)',
    name: '(GMT-04:00) Santo Domingo, Santiago de los Caballeros, Santo Domingo Oeste, Santo Domingo Este, San Pedro de Macorís',
    utc: '-04:00',
  },
  'America/St_Barthelemy': {
    label: 'America/St_Barthelemy (GMT-04:00)',
    name: '(GMT-04:00) Gustavia',
    utc: '-04:00',
  },
  'America/St_Kitts': {
    label: 'America/St_Kitts (GMT-04:00)',
    name: '(GMT-04:00) Basseterre, Fig Tree, Market Shop, Saint Paul’s, Middle Island',
    utc: '-04:00',
  },
  'America/St_Lucia': {
    label: 'America/St_Lucia (GMT-04:00)',
    name: '(GMT-04:00) Castries, Bisee, Vieux Fort, Micoud, Soufrière',
    utc: '-04:00',
  },
  'America/St_Thomas': {
    label: 'America/St_Thomas (GMT-04:00)',
    name: '(GMT-04:00) Saint Croix, Charlotte Amalie, Cruz Bay',
    utc: '-04:00',
  },
  'America/St_Vincent': {
    label: 'America/St_Vincent (GMT-04:00)',
    name: '(GMT-04:00) Kingstown, Kingstown Park, Georgetown, Barrouallie, Port Elizabeth',
    utc: '-04:00',
  },
  'America/Thule': {
    label: 'America/Thule (GMT-04:00)',
    name: '(GMT-04:00) Thule',
    utc: '-04:00',
  },
  'America/Tortola': {
    label: 'America/Tortola (GMT-04:00)',
    name: '(GMT-04:00) Road Town',
    utc: '-04:00',
  },
  'Atlantic/Bermuda': {
    label: 'Atlantic/Bermuda (GMT-04:00)',
    name: '(GMT-04:00) Hamilton',
    utc: '-04:00',
  },
  'America/St_Johns': {
    label: 'America/St_Johns (GMT-03:30)',
    name: "(GMT-03:30) St. John's, Mount Pearl, Corner Brook, Conception Bay South, Bay Roberts",
    utc: '-03:30',
  },
  'America/Araguaina': {
    label: 'America/Araguaina (GMT-03:00)',
    name: '(GMT-03:00) Palmas, Araguaína, Gurupi, Miracema do Tocantins, Porto Franco',
    utc: '-03:00',
  },
  'America/Argentina/Buenos_Aires': {
    label: 'America/Argentina/Buenos_Aires (GMT-03:00)',
    name: '(GMT-03:00) Buenos Aires, La Plata, Mar del Plata, Morón, Bahía Blanca',
    utc: '-03:00',
  },
  'America/Argentina/Catamarca': {
    label: 'America/Argentina/Catamarca (GMT-03:00)',
    name: '(GMT-03:00) San Fernando del Valle de Catamarca, Trelew, Puerto Madryn, Esquel, Rawson',
    utc: '-03:00',
  },
  'America/Argentina/Cordoba': {
    label: 'America/Argentina/Cordoba (GMT-03:00)',
    name: '(GMT-03:00) Córdoba, Rosario, Santa Fe, Resistencia, Santiago del Estero',
    utc: '-03:00',
  },
  'America/Argentina/Jujuy': {
    label: 'America/Argentina/Jujuy (GMT-03:00)',
    name: '(GMT-03:00) San Salvador de Jujuy, San Pedro de Jujuy, Libertador General San Martín, Palpalá, La Quiaca',
    utc: '-03:00',
  },
  'America/Argentina/La_Rioja': {
    label: 'America/Argentina/La_Rioja (GMT-03:00)',
    name: '(GMT-03:00) La Rioja, Chilecito, Arauco, Chamical',
    utc: '-03:00',
  },
  'America/Argentina/Mendoza': {
    label: 'America/Argentina/Mendoza (GMT-03:00)',
    name: '(GMT-03:00) Mendoza, San Rafael, San Martín',
    utc: '-03:00',
  },
  'America/Argentina/Rio_Gallegos': {
    label: 'America/Argentina/Rio_Gallegos (GMT-03:00)',
    name: '(GMT-03:00) Comodoro Rivadavia, Río Gallegos, Caleta Olivia, Pico Truncado, Puerto Deseado',
    utc: '-03:00',
  },
  'America/Argentina/Salta': {
    label: 'America/Argentina/Salta (GMT-03:00)',
    name: '(GMT-03:00) Salta, Neuquén, Santa Rosa, San Carlos de Bariloche, Cipolletti',
    utc: '-03:00',
  },
  'America/Argentina/San_Juan': {
    label: 'America/Argentina/San_Juan (GMT-03:00)',
    name: '(GMT-03:00) San Juan, Chimbas, Santa Lucía, Pocito, Caucete',
    utc: '-03:00',
  },
  'America/Argentina/San_Luis': {
    label: 'America/Argentina/San_Luis (GMT-03:00)',
    name: '(GMT-03:00) San Luis, Villa Mercedes, La Punta, Merlo, Justo Daract',
    utc: '-03:00',
  },
  'America/Argentina/Tucuman': {
    label: 'America/Argentina/Tucuman (GMT-03:00)',
    name: '(GMT-03:00) San Miguel de Tucumán, Yerba Buena, Tafí Viejo, Alderetes, Aguilares',
    utc: '-03:00',
  },
  'America/Argentina/Ushuaia': {
    label: 'America/Argentina/Ushuaia (GMT-03:00)',
    name: '(GMT-03:00) Ushuaia, Río Grande',
    utc: '-03:00',
  },
  'America/Bahia': {
    label: 'America/Bahia (GMT-03:00)',
    name: '(GMT-03:00) Salvador, Feira de Santana, Vitória da Conquista, Itabuna, Camaçari',
    utc: '-03:00',
  },
  'America/Belem': {
    label: 'America/Belem (GMT-03:00)',
    name: '(GMT-03:00) Belém, Ananindeua, Macapá, Parauapebas, Marabá',
    utc: '-03:00',
  },
  'America/Cayenne': {
    label: 'America/Cayenne (GMT-03:00)',
    name: '(GMT-03:00) Cayenne, Matoury, Saint-Laurent-du-Maroni, Kourou, Rémire-Montjoly',
    utc: '-03:00',
  },
  'America/Fortaleza': {
    label: 'America/Fortaleza (GMT-03:00)',
    name: '(GMT-03:00) Fortaleza, São Luís, Natal, Teresina, João Pessoa',
    utc: '-03:00',
  },
  'America/Godthab': {
    label: 'America/Godthab (GMT-03:00)',
    name: '(GMT-03:00) Nuuk, Sisimiut, Ilulissat, Qaqortoq, Aasiaat',
    utc: '-03:00',
  },
  'America/Maceio': {
    label: 'America/Maceio (GMT-03:00)',
    name: '(GMT-03:00) Maceió, Aracaju, Arapiraca, Nossa Senhora do Socorro, São Cristóvão',
    utc: '-03:00',
  },
  'America/Miquelon': {
    label: 'America/Miquelon (GMT-03:00)',
    name: '(GMT-03:00) Saint-Pierre, Miquelon',
    utc: '-03:00',
  },
  'America/Montevideo': {
    label: 'America/Montevideo (GMT-03:00)',
    name: '(GMT-03:00) Montevideo, Salto, Paysandú, Las Piedras, Rivera',
    utc: '-03:00',
  },
  'America/Paramaribo': {
    label: 'America/Paramaribo (GMT-03:00)',
    name: '(GMT-03:00) Paramaribo, Lelydorp, Brokopondo, Nieuw Nickerie, Moengo',
    utc: '-03:00',
  },
  'America/Punta_Arenas': {
    label: 'America/Punta_Arenas (GMT-03:00)',
    name: '(GMT-03:00) Punta Arenas, Puerto Natales',
    utc: '-03:00',
  },
  'America/Recife': {
    label: 'America/Recife (GMT-03:00)',
    name: '(GMT-03:00) Recife, Jaboatão, Jaboatão dos Guararapes, Olinda, Paulista',
    utc: '-03:00',
  },
  'America/Santarem': {
    label: 'America/Santarem (GMT-03:00)',
    name: '(GMT-03:00) Santarém, Altamira, Itaituba, Oriximiná, Alenquer',
    utc: '-03:00',
  },
  'America/Sao_Paulo': {
    label: 'America/Sao_Paulo (GMT-03:00)',
    name: '(GMT-03:00) São Paulo, Rio de Janeiro, Belo Horizonte, Brasília, Curitiba',
    utc: '-03:00',
  },
  'Antarctica/Palmer': {
    label: 'Antarctica/Palmer (GMT-03:00)',
    name: '(GMT-03:00) Palmer',
    utc: '-03:00',
  },
  'Antarctica/Rothera': {
    label: 'Antarctica/Rothera (GMT-03:00)',
    name: '(GMT-03:00) Rothera',
    utc: '-03:00',
  },
  'Atlantic/Stanley': {
    label: 'Atlantic/Stanley (GMT-03:00)',
    name: '(GMT-03:00) Stanley',
    utc: '-03:00',
  },
}

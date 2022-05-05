var lineColors = ['blue', "#F4D16640", "#F7B45560", "#F6864B70", "#DD564770", "#B71D3E70"]
var animatedColors = ['blue', "#F4D166", "#F7B455", "#F6864B", "#DD5647", "#B71D3E"]
var lineSize = [20, 0.5, 1.5, 3, 6, 12, 24]
var animatedSize = [20, 1, 2, 3, 4, 5, 6]
var animatedSizeOffset = [20, 1, 2, 3, 4, 5, 6]
var animatedShadowColor = '#00000000'
var animatedShadowBlur = 5

var aukeratuherria = "Denak";
var aukeratuta = 0;
var aukeratuurtea = 2020;

var selected_id_sek = 0;
var selected_id_uda = 0;
var selected_origin = true;

    var esri_darkgray = "L.esri.basemapLayer('DarkGray').addTo(map)";
    var osm = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
    var stadia_dark = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
    var carto_light = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    var carto_dark = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
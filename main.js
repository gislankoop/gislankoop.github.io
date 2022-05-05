
    //Tidy definitu
    const { tidy, mutate, arrange, desc, filter } = Tidy;

    var map = L.map('map', { zoomControl: false }).setView([43.15, -2.15], 10);

    L.tileLayer(carto_dark).addTo(map);


    function createCanvasFlowmapLayer(csvFilePath, customLayerId, doOneTimeDemoSetup) {
      Papa.parse(csvFilePath, {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {

          if(csvFilePath == "hutsa.csv"){
            var filtratuta = tidy(sekzioak, filter((d) => d.urtea == aukeratuurtea));
          }else{
            var filtratuta = tidy(udalerriak, filter((d) => d.urtea == aukeratuurtea));
          }

          var geoJsonFeatureCollection = {
            type: 'FeatureCollection',
            features: filtratuta.map(function (datum) {
              return {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [datum.s_lon, datum.s_lat]
                },
                properties: datum
              }
            })
          };

          var demoLayer = L.canvasFlowmapLayer(geoJsonFeatureCollection, {
            originAndDestinationFieldIds: {
              originUniqueIdField: 's_city_id',
              originGeometry: {
                x: 's_lon',
                y: 's_lat'
              },
              destinationUniqueIdField: 'e_city_id',
              destinationGeometry: {
                x: 'e_lon',
                y: 'e_lat'
              }
            },
            canvasBezierStyle: {
              type: 'classBreaks',
              field: 's_Volume',
              classBreakInfos: [{
                classMinValue: 0,
                classMaxValue: 1,
                symbol: {
                  strokeStyle: lineColors[1],
                  lineWidth: lineSize[1],
                  lineCap: 'round',
                  shadowColor: lineColors[1],
                  shadowBlur: lineSize[1]
                }
              }, {
                classMinValue: 2,
                classMaxValue: 3,
                symbol: {
                  strokeStyle: lineColors[2],
                  lineWidth: lineSize[2],
                  lineCap: 'round',
                  shadowColor: lineColors[2],
                  shadowBlur: lineSize[2],
                }
              }, {
                classMinValue: 4,
                classMaxValue: 10,
                symbol: {
                  strokeStyle: lineColors[3],
                  lineWidth: lineSize[3],
                  lineCap: 'round',
                  shadowColor: lineColors[3],
                  shadowBlur: lineSize[3],
                }
              }, {
                classMinValue: 11,
                classMaxValue: 30,
                symbol: {
                  strokeStyle: lineColors[4],
                  lineWidth: lineSize[4],
                  lineCap: 'round',
                  shadowColor: lineColors[4],
                  shadowBlur: lineSize[4]
                }
              }, {
                classMinValue: 31,
                classMaxValue: 10000,
                symbol: {
                  strokeStyle: lineColors[5],
                  lineWidth: lineSize[5],
                  lineCap: 'round',
                  shadowColor: lineColors[5],
                  shadowBlur: lineSize[5]
                }
              }],
              // the layer will use the defaultSymbol if a data value doesn't fit
              // in any of the defined classBreaks
              defaultSymbol: {
                strokeStyle: lineColors[0],
                lineWidth: lineSize[0],
                lineCap: 'round',
                shadowColor: lineColors[0],
                shadowBlur: lineSize[0]
              },
            },

            animatedCanvasBezierStyle: {
              type: 'classBreaks',
              field: 's_Volume',
              classBreakInfos: [{
                classMinValue: 0,
                classMaxValue: 1,
                symbol: {
                  strokeStyle: animatedColors[1],
                  lineWidth: animatedSize[1],
                  lineDashOffsetSize: animatedSizeOffset[1], // custom property used with animation sprite sizes
                  lineCap: 'round',
                  shadowColor: animatedShadowColor,
                  shadowBlur: animatedShadowBlur
                }
              },
              {
                classMinValue: 2,
                classMaxValue: 3,
                symbol: {
                  strokeStyle: animatedColors[2],
                  lineWidth: animatedSize[2],
                  lineDashOffsetSize: animatedSizeOffset[2], // custom property used with animation sprite sizes
                  lineCap: 'round',
                  shadowColor: animatedShadowColor,
                  shadowBlur: animatedShadowBlur
                }
              },
              {
                classMinValue: 4,
                classMaxValue: 10,
                symbol: {
                  strokeStyle: animatedColors[3],
                  lineWidth: animatedSize[3],
                  lineDashOffsetSize: animatedSizeOffset[3], // custom property used with animation sprite sizes
                  lineCap: 'round',
                  shadowColor: animatedShadowColor,
                  shadowBlur: animatedShadowBlur
                }
              },
              {
                classMinValue: 11,
                classMaxValue: 30,
                symbol: {
                  strokeStyle: animatedColors[4],
                  lineWidth: animatedSize[4],
                  lineDashOffsetSize: animatedSizeOffset[4], // custom property used with animation sprite sizes
                  lineCap: 'round',
                  shadowColor: animatedShadowColor,
                  shadowBlur: animatedShadowBlur
                }
              },
              {
                classMinValue: 31,
                classMaxValue: 10000,
                symbol: {
                  strokeStyle: animatedColors[5],
                  lineWidth: animatedSize[5],
                  lineDashOffsetSize: animatedSizeOffset[5], // custom property used with animation sprite sizes
                  lineCap: 'round',
                  shadowColor: animatedShadowColor,
                  shadowBlur: animatedShadowBlur
                }
              }],
              defaultSymbol: {
                // use canvas styling options (compare to CircleMarker styling below)
                strokeStyle: animatedColors[0],
                lineWidth: animatedSize[0],
                lineDashOffsetSize: animatedSizeOffset[0], // custom property used with animation sprite sizes
                lineCap: 'round',
                shadowColor: animatedShadowColor,
                shadowBlur: animatedShadowBlur
              }
            },
            pathDisplayMode: 'selection',
            animationStarted: true,
            animationEasingFamily: 'Cubic',
            animationEasingType: 'In',
            animationDuration: 3000,
            customLayerId: customLayerId

          });

          layersArray[customLayerId] = demoLayer;
          layersArray.forEach(function (layer) {
            if (layer.options.customLayerId === aukeratuta) {

                layer.bindTooltip(function (layer) {
                    if (layer.feature.properties.isOrigin) {
                      return layer.feature.properties.s_city;
                    } else {
                      return layer.feature.properties.e_City;
                    }
                  }, { permanent: false, opacity: 0.8 }  
                  ).addTo(map);

              if (aukeratuta === 0){
                document.getElementById('oneToManyLayerButton').click();
              }
              if (aukeratuta === 1){
                document.getElementById('manyToOneLayerButton').click();
              }
            }

            if (layer.options.customLayerId == 0) {
              if (selected_origin){
                if(selected_id_sek != 0 && selected_id_sek != 'all'){layer.selectFeaturesForPathDisplayById('s_city_id', selected_id_sek, true, 'SELECTION_NEW')}
                if(selected_id_sek == 'all'){
                  layer.setStyle({fillOpacity:0 });
                  layer.selectAllFeaturesForPathDisplay();
                };
              }else{
                if(selected_id_sek != 0 && selected_id_sek != 'all'){layer.selectFeaturesForPathDisplayById('e_city_id', selected_id_sek, false, 'SELECTION_NEW')}
                if(selected_id_sek == 'all'){
                  layer.setStyle({fillOpacity:0 });
                  layer.selectAllFeaturesForPathDisplay();
                };
              }
            }

            if (layer.options.customLayerId == 1) {
              if (selected_origin){
                if(selected_id_uda != 0 && selected_id_uda != 'all'){layer.selectFeaturesForPathDisplayById('s_city_id', selected_id_uda, true, 'SELECTION_NEW')}
                if(selected_id_uda == 'all'){
                  layer.setStyle({fillOpacity:0 });
                  layer.selectAllFeaturesForPathDisplay();
                };  
              }else{
                  if(selected_id_uda != 0 && selected_id_uda != 'all'){layer.selectFeaturesForPathDisplayById('e_city_id', selected_id_uda, false, 'SELECTION_NEW')}
                  if(selected_id_uda == 'all'){
                    layer.setStyle({fillOpacity:0 });
                    layer.selectAllFeaturesForPathDisplay();
                  };
                }            }

          });
        }
      });
    }

    

    var layersArray = [];
    createCanvasFlowmapLayer('hutsa.csv', 0, true);
    createCanvasFlowmapLayer('hutsa1.csv', 1);

    // establish references to form elements in the control panel card
    var oneToManyLayerButton = document.getElementById('oneToManyLayerButton');
    var manyToOneLayerButton = document.getElementById('manyToOneLayerButton');
    var showAllPathsButton = document.getElementById('showAllPathsButton');
    var clearAllPathsButton = document.getElementById('clearAllPathsButton');
    var range = document.getElementById('range');


    // 

    range.addEventListener('change', selectUrtea);
    function selectUrtea(evt) {
      layersArray.forEach(function (layer) {
          map.removeLayer(layer)
        })
      aukeratuurtea = evt.target.value;
      createCanvasFlowmapLayer('hutsa.csv', 0, true);
      createCanvasFlowmapLayer('hutsa1.csv', 1);
      layersArray = [];
    }

    // establish actions for form elements in the control panel card
    oneToManyLayerButton.addEventListener('click', toggleActiveLayer);
    manyToOneLayerButton.addEventListener('click', toggleActiveLayer);

    function toggleActiveLayer(evt) {
      oneToManyLayerButton.classList.remove('button-blue');
      manyToOneLayerButton.classList.remove('button-blue');

      layersArray.forEach(function (layer) {
        if (layer.options.customLayerId === Number(evt.target.value)) {
          aukeratuta = Number(evt.target.value)

          layer.bindTooltip(function (layer) {
            if (layer.feature.properties.isOrigin) {
              return layer.feature.properties.s_city;
            } else {
              return layer.feature.properties.e_City;
            }
            //merely sets the tooltip text
          }, { permanent: false, opacity: 0.8 }  //then add your options
          ).addTo(map);

        } else {
          map.removeLayer(layer);
        }
      });

      layerListenerChange({
        target: 'click'
      });

      evt.target.classList.add('button-blue');
    }

    function layerListenerChange(e) {

        layersArray.forEach(function (layer) {
          layer.off('click', handleLayerInteraction);
          layer.on('click', handleLayerInteraction);
        });
    }

    function handleLayerInteraction(e) {

      if (e.sharedOriginFeatures.length) {
        layersArray.forEach(function (layer) {
          if (layer.options.customLayerId == aukeratuta) {layer.setStyle({ fillOpacity: 1 })};
          if (aukeratuta == 0) {selected_id_sek = e.sharedOriginFeatures[0].properties.s_city_id};
          if (aukeratuta == 1) {selected_id_uda = e.sharedOriginFeatures[0].properties.s_city_id};
          selected_origin = true;
        });
        e.target.selectFeaturesForPathDisplay(e.sharedOriginFeatures, 'SELECTION_NEW');
        var lekua = e.sharedOriginFeatures[0].properties.s_city
        var urtea = e.sharedOriginFeatures[0].properties.urtea
        var lati = e.sharedOriginFeatures[0].properties.s_lat
        var long = e.sharedOriginFeatures[0].properties.s_lon


        $("#izena").text("" + lekua);
        $("#urtea").text("Urtea: " + urtea + "  " + selected_id_sek + "  " + selected_id_uda + "  " + selected_origin);
        $("#iritsi").text("Lat: " + Math.round(lati) + "  ");
        $("#joan").text("Long: " + Math.round(long) + "  ");


      }

      if (e.sharedDestinationFeatures.length) {
        layersArray.forEach(function (layer) {
          if (layer.options.customLayerId == aukeratuta) {layer.setStyle({ fillOpacity: 1 })};
          if (aukeratuta == 0) {selected_id_sek = e.sharedDestinationFeatures[0].properties.e_city_id};
          if (aukeratuta == 1) {selected_id_uda = e.sharedDestinationFeatures[0].properties.e_city_id};
          selected_origin = false;
        });
        e.target.selectFeaturesForPathDisplay(e.sharedDestinationFeatures, 'SELECTION_NEW');
        var lekua = e.sharedDestinationFeatures[0].properties.e_City
        var urtea = e.sharedDestinationFeatures[0].properties.urtea
        var lati = e.sharedDestinationFeatures[0].properties.e_lat
        var long = e.sharedDestinationFeatures[0].properties.e_lon


        $("#izena").text("" + lekua);
        $("#urtea").text("Urtea: " + urtea + "  " + selected_id_sek + "  " + selected_id_uda + "  " + selected_origin);
        $("#iritsi").text("Lat: " + Math.round(lati) + "  ");
        $("#joan").text("Long: " + Math.round(long) + "  ");
      }
    }


    showAllPathsButton.addEventListener('click', function () {
      // map.setView([43.2, -2], 10);
      selected_id_sek = 'all';
      selected_id_uda = 'all';
      layersArray.forEach(function (layer) {
        // if (layer.options.customLayerId == aukeratuta) {
          layer.setStyle({fillOpacity:0 });
          layer.selectAllFeaturesForPathDisplay();
        // }
      });
    });


    clearAllPathsButton.addEventListener('click', function () {
      layersArray.forEach(function (layer) {
        layer.clearAllPathSelections();
        layer.setStyle({ fillOpacity: 1 });
      });
    });


// SLIDERRA

const rangeV = document.getElementById('rangeV');

setValue = ()=>{
    const  newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) )
    const  newPosition = 10 - (newValue * 0.2);
    rangeV.innerHTML = `<span>${range.value}</span>`;
    rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };

document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);







var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        labels = ["legenda250px.png"];
 {
        div.innerHTML +=" <img src="+ labels +" height='150' width='155'>";
    }

    return div;
};

legend.addTo(map);




introJs().setOptions({
  showProgress: true,
  steps: [{
    title: 'Ongi etorri!',
    intro: 'Ongi etorri Gipuzkoako mugikortasunaren mapara. Mapa honetan Gipuzkoako herrietako 18-35 urte bitarteko gazteen mugikortasuna erakusten da, errolda aldaketetan oinarriturik.'
  },
  {
    title: 'Kontrol panela',
    element: document.querySelector('.control-panel'),
    intro: 'Panel honen bidez maparen ezaugarriak aldatu daitezke'
  },
  {
    title: 'Udalerriak',
    element: document.querySelector('#manyToOneLayerButton'),
    intro: 'Sekzioez gain udalerriak ere bisualizatu daitezke'
  },
  {
    title: 'Mapa',
    element: document.querySelector('.leaflet-tile'),
    intro: '<p>Puntuaren barruan klikatuz gero, etorrerak bistaratuko dira. Kanpoaldean klikatuta, irteerak. <img src="_marker.gif" /></p>',
    position: 'right'
  },
  {
    title: 'Fluxuak',
    element: document.querySelector('#showAllPathsButton'),
    intro: 'Eremuen arteko fluxu guztiak bistaratu ditzakegu'
  },
  {
    title: 'Legenda',
    element: document.querySelector('.legend'),
    intro: 'Fluxuaren kopuruaren arabera, gezien tamaina eta kolorea aldatzen da'
  },
  {
    title: 'Xehetasunak',
    element: document.querySelector('.face1'),
    intro: 'Marko honetan eremuaren xehetasunak ematen dira'
  }]
}).start();
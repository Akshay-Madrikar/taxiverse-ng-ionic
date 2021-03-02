import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {
  location: any;
  constructor(private modalCtrl: ModalController) {}
  ngOnInit() {}

  ngAfterViewInit() {
    this.getMap(this.modalCtrl);
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  getMap(modalCtrl) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    const instructions = document.getElementById('instructions');
    const map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
      center: [-122.675246, 45.529431], // starting position
      zoom: 13, // starting zoom
      minZoom: 11, // keep it local
    });

    //geocoder here
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      country: 'IN',
    });

    // After the map style has loaded on the page, add a source layer and default
    // styling for a single point.
    map.on('load', function () {
      // Listen for the `result` event from the MapboxGeocoder that is triggered when a user
      // makes a selection and add a symbol that matches the result.
      geocoder.on('result', function (ev) {
        console.log(ev.result.center);
      });
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        line_string: true,
        trash: true,
      },
      styles: [
        // ACTIVE (being drawn)
        // line stroke
        {
          id: 'gl-draw-line',
          type: 'line',
          filter: [
            'all',
            ['==', '$type', 'LineString'],
            ['!=', 'mode', 'static'],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': '#3b9ddd',
            'line-dasharray': [0.2, 2],
            'line-width': 4,
            'line-opacity': 0.7,
          },
        },
        // vertex point halos
        {
          id: 'gl-draw-polygon-and-line-vertex-halo-active',
          type: 'circle',
          filter: [
            'all',
            ['==', 'meta', 'vertex'],
            ['==', '$type', 'Point'],
            ['!=', 'mode', 'static'],
          ],
          paint: {
            'circle-radius': 10,
            'circle-color': '#FFF',
          },
        },
        // vertex points
        {
          id: 'gl-draw-polygon-and-line-vertex-active',
          type: 'circle',
          filter: [
            'all',
            ['==', 'meta', 'vertex'],
            ['==', '$type', 'Point'],
            ['!=', 'mode', 'static'],
          ],
          paint: {
            'circle-radius': 6,
            'circle-color': '#3b9ddd',
          },
        },
      ],
    });
    // add the draw tool to the map
    map.addControl(draw);

    // add create, update, or delete actions
    map.on('draw.create', updateRoute);
    map.on('draw.update', updateRoute);
    map.on('draw.delete', removeRoute);

    //use the coordinates you just drew to make your directions request
    function updateRoute() {
      removeRoute(); // overwrite any existing layers
      const data = draw.getAll();
      const lastFeature = data.features.length - 1;
      const coords = data.features[lastFeature].geometry.coordinates;
      const newCoords = coords.join(';');
      getMatch(newCoords);
    }

    //make a directions request
    function getMatch(e) {
      const url =
        'https://api.mapbox.com/directions/v5/mapbox/cycling/' +
        e +
        '?geometries=geojson&steps=true&access_token=' +
        mapboxgl.accessToken;
      const req = new XMLHttpRequest();
      req.responseType = 'json';
      req.open('GET', url, true);
      req.onload = () => {
        const jsonResponse = req.response;
        const distance =
          Math.round(jsonResponse.routes[0].distance * 0.001 * 100) / 100;
        const duration = Math.round(jsonResponse.routes[0].duration / 60);
        const steps = jsonResponse.routes[0].legs[0].steps;
        const coords = jsonResponse.routes[0].geometry;
        //  console.log(steps);
        // console.log('Coords', coords.coordinates);
        // console.log('Start', coords.coordinates[0]);
        // console.log('Start-Start', coords.coordinates[0][0]);
        // console.log('Start-End', coords.coordinates[0][1]);
        // console.log('End', coords.coordinates.slice(-1)[0]);
        // // console.log('Long', coords[coords.length - 1]);
        // console.log('Distance', distance);
        // console.log('Duration', duration);

        // get route directions on load map
        steps.forEach(function (step) {
          instructions.insertAdjacentHTML(
            'beforeend',
            '<p>' + step.maneuver.instruction + '</p>'
          );
        });
        // get distance and duration
        instructions.insertAdjacentHTML(
          'beforeend',
          '<p>' +
            'Distance: ' +
            distance.toFixed(2) +
            ' km<br>Duration: ' +
            duration.toFixed(2) +
            ' minutes' +
            '</p>'
        );

        // add the route to the map
        addRoute(coords);
        //  console.log(coordinates);
        setTimeout(() => {
          modalCtrl.dismiss({
            dismissed: false,
            source: {
              lng: coords.coordinates[0][0],
              lat: coords.coordinates[0][1],
            },
            destination: {
              lng: coords.coordinates.slice(-1)[0][0],
              lat: coords.coordinates.slice(-1)[0][1],
            },
            distance: distance,
            duration: duration,
          });
        }, 5000);
      };
      req.send();
    }

    //adds the route as a layer on the map
    function addRoute(coords) {
      // check if the route is already loaded
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      } else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: coords,
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#1db7dd',
            'line-width': 8,
            'line-opacity': 0.8,
          },
        });
      }
    }

    // remove the layer if it exists
    function removeRoute() {
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
        instructions.innerHTML = '';
      } else {
        return;
      }
    }

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
  }
}

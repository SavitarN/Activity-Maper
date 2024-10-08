'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');



class App {
   #map;
   #mapEvent;
   constructor() {
      this._getPosition();
      //becuase constructor is always called first as soon as the script loads//
      form.addEventListener('submit', this._newWorkout.bind(this));
      inputType.addEventListener('change', this._toggleElevationField);
   }

   _getPosition() {
      if (navigator.geolocation)
         navigator.geolocation.getCurrentPosition(
            this._loadMap.bind(this),
            function () {
               alert('error getting the cordinates')
            })
   }
   _loadMap(position) {


      const { latitude } = position.coords;
      const { longitude } = position.coords;



      const coords = [latitude, longitude];


      this.#map = L.map('map').setView(coords, 13);
      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {

         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.#map);




      //whenever map is clicked coordinates are added to the map with a popup// 

      this.#map.on('click', this._showForm.bind(this))




   }
   _showForm(mapE) {
      this.#mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus();

   }
   _toggleElevationField() {

      inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

   }
   _newWorkout(e) {

      e.preventDefault();
      inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
      //display the marker//
      const { lat, lng } = this.#mapEvent.latlng;
      L.marker([lat, lng]).addTo(this.#map).bindPopup(L.popup({
         maxWidth: 250,
         minWidth: 100,
         autoClose: false,
         closeOnClick: false,
         className: 'running-popup'
      })).setPopupContent('Workout').openPopup();

   }
}

const app = new App();



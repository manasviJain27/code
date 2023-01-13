'strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
  constructor(distance, duration, coords) {
    this.distance = distance; //in min
    this.duration = duration; //in km
    this.coords = coords; //[lat,lng]
  }
  _setDescription() {
    //Tell Prettier to ignore next line:
    //prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    }, ${this.date.getDate()}`;
  }
  click() {
    this.clicks++;
  }
}

//we always know that running will be running and cycling will be cycling so we can declare it in the classes itself
class Running extends Workout {
  type = 'running';
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.calcPace();
    //Instead of calling this method in the parent class we need to call this method in the child classes because it has the type of workout needed for the code.
    //This method will work perfectly fine because through the scope chain the constructor method will get access to all methods of parent class and as method
    //get executed it will also get access to the type which is why we can use type even though it is defined in child classes.
    this._setDescription();
  }

  calcPace() {
    //min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(distance, duration, coords, elevGain) {
    super(distance, duration, coords);
    this.elevGain = elevGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    //km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

/* --------------------------------------------------------------------------------------------------------------------------------------------------*/
//Application Architecture
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let workout;
class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;
  constructor() {
    //Get user's position
    this._getPosition();
    /* When the user reloads the page we want to display the information again so we will write the code here in the constructor because this is
    //where the code that gets executed when the page loads is in the constructor. */
    //Get data from local storage
    this._getLocalStorage();
    //Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    //We are adding an event listener in the constructor so it is added in the beggining
    containerWorkouts.addEventListener('click', this._movetoPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(pos) {
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;
    // console.log(` https://www.google.ca/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on('click', this._showForm.bind(this));
    this.#workouts.forEach(work => {
      //We are trying to add a marker to the map when the map hasn't been loaded
      this._renderWorkoutMarker(work);
    });
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    //Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // The working application the form will be replaced by the workout on the list
    form.style.display = 'none';
    //Hide from view
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(input));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    const { lat, lng } = this.#mapEvent.latlng;
    //Get Data from form

    //If workout running then create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert('Input has to be positive numbers only.');
      }
      //Building the running object so we can push it into the array
      workout = new Running(distance, duration, [lat, lng], cadence);
    }
    //if cycling create cycling object
    if (type === 'cycling') {
      //Check if data is valid
      const elev = +inputElevation.value;

      //New Method
      if (
        !validInputs(distance, duration, elev) ||
        !allPositive(distance, duration)
      ) {
        return alert('Input has to be positive numbers only.');
      }
      workout = new Cycling(distance, duration, [lat, lng], elev);
    }
    //Add new object to workout array
    this.#workouts.push(workout);

    //Render workout on map as marker
    this._renderWorkoutMarker(workout);
    //Render workout on list
    this._renderWorkout(workout);

    //Hide form + clear input fields
    this._hideForm();

    //Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.description} ${workout.type === 'running' ? '🏃‍♂️' : '🚴🏽‍♀️'}`
      )
      .openPopup();
  }
  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴🏽‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;
    if (workout.type == 'running') {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
    }
    if (workout.type == 'cycling') {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }
    //afterend will add the html as a sibling element at the end of the form
    form.insertAdjacentHTML('afterend', html);
  }
  _movetoPopup(e) {
    //We are looking at the element that is clicked with e.target.closest
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    //using the public interface
    // workout.click();
    // When we converted the object to string then back to an object we lost the prototype chain. When they were converted back to the objects they became regular
    // objects and not objects that were created by the running or cycling class. They no longer inherit methods from their parent class.
    //gives an error because objects coming from local storage will not inherit all methods that they did from before.
  }

  //local storage is an API. It is an API because local storage is an API that the browser provides for us and we can use
  _setLocalStorage() {
    //for the set item in the local storage we need a name (workouts), and a value (string)
    //we can convert an object to a string using JSON.stringify. Baically this method has key-value pairs.
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    //local storage is a very simple API and should be used to store small amounts of data. Local storage is blocking and storing large amounts of data will slow
    //the application.
  }
  _getLocalStorage() {
    //pass in the key which is the identifier of our local storage item because we can set multiple items.
    //JSON.parse parses a string back to the object
    const data = JSON.parse(localStorage.getItem('workouts'));
    //Now we are checking if there actually is data
    //If there is no data then the data variable will be undefined
    if (!data) return;
    //This method will be executed in the beginning so the workouts array will be empty but if we already had some data in the local storage then we will set the
    //workouts array to the data from before.
    this.#workouts = data;
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
      //We are trying to add a marker to the map when the map hasn't been loaded
      //   this._renderWorkoutMarker(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    //location is a big object that has a lot of methods and properties in the browser.
    location.reload();
  }
}

/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
//Moving the map to the position of the workout that was clicked in the sidebar
//We are starting with the beginning of the application where it was a gray screen. Where do we attach the event handler to? Attach it to the parent element that
//has all of the workouts (workouts).

const app = new App();

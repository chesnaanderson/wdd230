var weatherModule = (function() {
    // Set up settings for the API calls
    let proxy                 = 'https://cors-anywhere.herokuapp.com',
        currentWeatherAPIURL  = 'https://api.openweathermap.org/data/2.5/weather',
        forecastWeatherAPIURL = 'https://api.openweathermap.org/data/2.5/forecast',
        iconURL               = 'https://openweathermap.org/img/wn/',
        weatherAPIKey         = '093427f70323ff470e315f773e308498';
    //9f72ffa9eabaa759e8b38618acb9acae
    // Cache HTML elements
    let $widget                = document.getElementById('weather-widget'),
        $todaysDay             = document.querySelector('.weather-now-day'),
        $todaysDate            = document.querySelector('.weather-now-date'),
        $location              = document.querySelector('.weather-now-location'),
        $currentTempIcon       = document.querySelector('.weather-now-icon'),
        $currentTemp           = document.querySelector('.weather-now-tempurature'),
        $currentFeelsLike      = document.querySelector('.weather-now-precipitation'),
        $currentHumidity       = document.querySelector('.weather-now-humidity'),
        $currentWind           = document.querySelector('.weather-now-wind'),
        $forecastList          = document.querySelector('.weather-forecast'),
        $changeLocationButton  = document.getElementById('change-location-button'),
        $mask                  = document.getElementById('mask-background'),
        $maskButton            = document.getElementById('close-mask'),
        $form                  = document.getElementById('change-location-form'),
        $zipcode               = document.getElementById('zipcode'),
        $formSubmit            = document.getElementById('form-submit');
  
    // Set up placeholders for geolcation
    let long,
        lat; 
    
    // Convert a date value to day of the week
    // Usage:
    //    convertToDay(value);
    var convertToDay = function(day) {  
      // Create an array to contain the days of the week
      let weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      
      // Convert the date into a date format
      day = new Date(day);
      
      // Return the day of the week
      return weekdays[day.getDay()];
    }
    
    // Convert a date value to month of the year
    // Usage:
    //    convertoMonth(value);
    var convertToMonth = function(date) {
      // Create an array to contain the months of the year
      let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      
      // Convert the date into a date format
      date = new Date();
      
      // Return the month of the year
      return months[date.getDay()];
    }
    
    // Convert a date value to 12 hour AM/PM time format
    // Usage:
    //    convertToTime(value);
    var convertToTime = function(date) {
      // Convert the date into a date format
      date = new Date(date);
      
      // Get the hours and minutes from the data value
      let hours   = date.getHours();
      let minutes = date.getMinutes();
      
      // Convert 24hrs to 12hrs /w AM or PM
      let ampm  = hours >= 12 ? 'PM' : 'AM';
      hours     = hours % 12;
      hours     = hours ? hours : 12; // convert '0' should to '12'
      minutes   = minutes < 10 ? '0'+minutes : minutes;
  
      // Return the date in AM/PM time format
      return `${hours}:${minutes} ${ampm}`;
    }
    
    // Get the date and format it into day of the week
    // Set the HTML elements for the header of the page
    var setDate = function(element, date) {
      // Get the current date
      let now = new Date();
      
      // Set the HTML
      $todaysDay.textContent = convertToDay(now);
      $todaysDate.textContent = convertToMonth([now.getMonth()])  + " " + now.getDate() + ", " + now.getFullYear();
    };
    
    var fetchCurrentWeather = function(api) {
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // Set response data to variables
          const {name} = data
          const {temp, temp_min, temp_max, pressure, humidity, feels_like} = data.main;
          const {speed, deg} = data.wind;
  
          // Add data to the interface 
          $location.textContent        = name;
          $currentTemp.innerHTML       = `${Math.round(temp)}<sup>&#8457;</sup>`;
          $currentFeelsLike.innerHTML  = `${Math.round(feels_like)}<sup>&#8457;</sup>`;
          $currentHumidity.textContent = `${humidity}%`;
          $currentWind.textContent     = `${speed} m/s`; 
      });
    };
    
    var fetchForecastWeather = function(api) {
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // Set response data to variables
          const {list} = data;
          
          // If a forecast list already exists, remove it
          let elementCheck = document.querySelector('.weather-forecast-list');
          if(typeof(elementCheck) != 'undefined' && elementCheck != null){
              elementCheck.remove();
          }
  
          // Create the forecast as an HTML list
          // then append to the HTML
          // <ul class="weather-forecast-list">
          var forecastListParent = document.createElement('ul');
          forecastListParent.setAttribute("class", "weather-forecast-list");
  
          var listItem,
              listItemIcon,
              listItemDay,
              listItemTime,
              listItemTemp;
  
          list.forEach(function(item) {
            // <li class="weather-forecast-item">
            //   <span class="weather-forecast-item-icon">icon</span>
            //   <span class="weather-forecast-item-day">Monday</span>
            //   <span class="weather-forecast-item-time">7:00AM</span>
            //   <span class="weather-forecast-item-tempurature">23</span>
            // </li>
            listItem = document.createElement('li');
            listItem.setAttribute("class", "weather-forecast-item");
  
            // Add the icon
            listItemIcon = document.createElement('img');
            listItemIcon.setAttribute('class', 'weather-forecast-item-icon');
            listItemIcon.src = `${iconURL}${item.weather[0].icon}@2x.png`;
            listItem.appendChild(listItemIcon);
  
            // Add the day
            listItemDay = document.createElement('span');
            listItemDay.setAttribute('class', 'weather-forecast-item-day');
            listItemDay.innerHTML = convertToDay(item.dt_txt);
            listItem.appendChild(listItemDay);
  
            // Add the time
            listItemTime = document.createElement('span');
            listItemTime.setAttribute('class', 'weather-forecast-item-time');
            listItemTime.innerHTML = convertToTime(item.dt_txt);
            listItem.appendChild(listItemTime);
  
            // console.log(item.dt_txt, convertToTime(item.dt_txt))
  
            // Add the tempurature
            listItemTemp = document.createElement('span');
            listItemTemp.setAttribute('class', 'weather-forecast-item-tempurature');
            listItemTemp.innerHTML = `${Math.round(item.main.temp)}<sup>&#8457;</sup>`;
            listItem.appendChild(listItemTemp);
  
            // Append completed list /w data to the parent UL
            // Count the loops and only render 5            
            forecastListParent.appendChild(listItem);
          });
  
          // Append complete forecast list ot the DOM
          $forecastList.appendChild(forecastListParent);
      });
    };
    
    // Get the geolocation information from the browser
    // User lat/long for Charlotte is the user declines
    // or geolocation is blocked
    var getWeather = function() {  
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(location => {
          
          // Set the lat/long from the browser location
          long = location.coords.longitude;
          lat  = location.coords.latitude;
          
          // Set the API calls
          const apiCurrentWeather  = `${currentWeatherAPIURL}?lat=${lat}&lon=${long}&appid=${weatherAPIKey}&units=Imperial`,
                apiForecastWeather = `${forecastWeatherAPIURL}?lat=${lat}&lon=${long}&cnt=10&appid=${weatherAPIKey}&units=Imperial`;
        
          // AJAX request for current weather data
          fetchCurrentWeather(apiCurrentWeather);
          
          // API request for forecast weather data
          fetchForecastWeather(apiForecastWeather);
        });
      } else {
        // Set default lat/long to Charlotte
        long = '-80.60368033352583';
        lat = '35.01485103949014';
        
        // Set the API calls
        const apiCurrentWeather  = `${currentWeatherAPIURL}?lat=${lat}&lon=${long}&appid=${weatherAPIKey}&units=Imperial`,
              apiForecastWeather = `${forecastWeatherAPIURL}?lat=${lat}&lon=${long}&cnt=10&appid=${weatherAPIKey}&units=Imperial`;
  
        // AJAX request for current weather data
        fetchCurrentWeather(apiCurrentWeather);
  
        // API request for forecast weather data
        fetchForecastWeather(apiForecastWeather);
      };
    };
     
    // Close the modal window
    // Have to double up touch and click events
    var closeModal = function() {  
      $maskButton.addEventListener("touchend", function(e){
        e.preventDefault();
        $widget.classList.toggle('has-modal');
      });
      $maskButton.addEventListener("click", function(e){
        e.preventDefault();
        $widget.classList.toggle('has-modal');
      });
    };
    
    // Open the modal window
    // Have to double up touch and click events
    var changeLocation = function() {   
      $changeLocationButton.addEventListener("touchend", function(e){
        $widget.classList.toggle('has-modal');
        e.preventDefault();
      });
      $changeLocationButton.addEventListener("click", function(e){
        $widget.classList.toggle('has-modal');
        e.preventDefault();
      });
      
      // Get the zip code from the input on submit
      $form.onsubmit = function(e) {
        let zipcode = $zipcode.value;
      
        // Set the API calls
        const apiCurrentWeather  = `${currentWeatherAPIURL}?zip=${zipcode}&appid=${weatherAPIKey}&units=Imperial`,
              apiForecastWeather = `${forecastWeatherAPIURL}?zip=${zipcode}&cnt=10&appid=${weatherAPIKey}&units=Imperial`;
  
        // AJAX request for current weather data
        fetchCurrentWeather(apiCurrentWeather);
  
        // API request for forecast weather data
        fetchForecastWeather(apiForecastWeather);
        
        // Prevent default for behavior
        event.preventDefault();
        
        // Close the modal
        $widget.classList.toggle('has-modal');
      };
    };
      
    return {
      setDate: setDate(),
      getWeather: getWeather(),
      changeLocation: changeLocation(),
      closeModal: closeModal()
    };
  })();
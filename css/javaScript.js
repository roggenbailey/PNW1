(function() {
// Create a hotel object
  var hotel = {
    name: 'Leavenworth Lodge',
    roomRate: 200, // Amount in dollars
    discount: 10,  // Percentage discount
    offerPrice: function() {
      var offerRate = this.roomRate * ((100 - this.discount) / 100);
      return offerRate;
    }
  };
  
// Write out the hotel name, standard rate, and the special rate
  var hotelName, roomRate, specialRate;                    // Declare variables

  hotelName = document.getElementById('hotelName');        // Get elements
  roomRate = document.getElementById('roomRate');
  specialRate = document.getElementById('specialRate');

  hotelName.textContent = hotel.name;                      // Write hotel name
  roomRate.textContent =  '$' + hotel.roomRate.toFixed(2); // Write room rate
  specialRate.textContent = '$' + hotel.offerPrice();      // Write offer price
  
// PART TWO: CALCULATE AND WRITE OUT THE EXPIRY DETAILS FOR THE OFFER
  var expiryMsg; // Message displayed to users
  var today;     // Today's date
  var elEnds;    // The element that shows the message about the offer ending
  
  function offerExpires(today) {
// Declare variables within the function for local scope
    var weekFromToday, day, date, month, year, dayNames, monthNames;
	
// Add 7 days time (added in milliseconds)
   weekFromToday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
	
// Create arrays to hold the names of days / months
   dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   
// Collect the parts of the date to show on the page
    day = dayNames[weekFromToday.getDay()];
    date = weekFromToday.getDate();
    month = monthNames[weekFromToday.getMonth()];
    year = weekFromToday.getFullYear();

// Create the message
   expiryMsg = 'Offer expires next ';
   expiryMsg += day + ' <br />(' + date + ' ' + month + ' ' + year + ')';
   return expiryMsg;
 }
 
today = new Date();                             // Put today's date in variable
  elEnds = document.getElementById('offerEnds');  // Get the offerEnds element
  elEnds.innerHTML = offerExpires(today);         // Add the expiry message

// Finish the immediately invoked function expression
}());

//offer expires close Button
const closePopupBtn = document.getElementById("closePopupBtn");
const offer_expires = document.getElementById("offer_expires");

closePopupBtn.addEventListener("click", () => {
  offer_expires.style.display = "none";
});

$(document).ready(function() {
    $(".gallery img").hover(
        function() {
            $(this).css("transform", "scale(1.2)");
        },
        function() {
            $(this).css("transform", "scale(1)");
        }
    );
});

// weather API
$(document).ready(function() {
	const apiKey = 'd23b6f946bbebfdd7de2a61528d21f34';
	
	const city = 'Seattle';
	const country = 'US';
	
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`;
	
	$.get(url, function(data) {
		if (data.cod === 200) {
		  const temperature = data.main.temp;
		  const description = data.weather[0].description;
		  const icon = data.weather[0].icon;
		  const humidity = data.main.humidity;
		  const windSpeed = data.wind.speed;
		  
		  $('#weather-API').html(`
			<div class="weather">
			  <img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}" />
			  <h3>${city}, ${country}</h3>
			  <p><strong>${Math.round(temperature)}°F</strong> | ${description}</p>
			  <p>Humidity: ${humidity}% | Wind Speed: ${windSpeed} mph</p>
			</div>
		`);
		} else {
			$('#weather-info').html('<p>Could not fetch weather data. Please try again later.</p>');
    }
  });
});

$('.slider').each(function() {              // For every slider
  var $this   = $(this);                    // Current slider
  var $group  = $this.find('.slide-group'); // Get the slide-group (container)
  var $slides = $this.find('.slide');       // Create jQuery object to hold all slides
  var buttonArray  = [];                    // Create array to hold navigation buttons
  var currentIndex = 0;                     // Hold index number of the current slide
  var timeout;                              // Sets gap between auto-sliding

  function move(newIndex) {          // Creates the slide from old to new one
    var animateLeft, slideLeft;      // Declare variables

    advance();                       // When slide moves, call advance() again

    // If it is the current slide / animating do nothing
    if ($group.is(':animated') || currentIndex === newIndex) {  
      return;
    }

    buttonArray[currentIndex].removeClass('active'); // Remove class from item
    buttonArray[newIndex].addClass('active');        // Add class to new item

    if (newIndex > currentIndex) {   // If new item > current
      slideLeft = '100%';            // Sit the new slide to the right
      animateLeft = '-100%';         // Animate the current group to the left
    } else {                         // Otherwise
      slideLeft = '-100%';           // Sit the new slide to the left
      animateLeft = '100%';          // Animate the current group to the right
    }
    // Position new slide to left (if less) or right (if more) of current
    $slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );

    $group.animate( {left: animateLeft}, function() {    // Animate slides and
      $slides.eq(currentIndex).css( {display: 'none'} ); // Hide previous slide      
      $slides.eq(newIndex).css( {left: 0} ); // Set position of the new item
      $group.css( {left: 0} );               // Set position of group of slides
      currentIndex = newIndex;               // Set currentIndex to the new image
    });
  }

  function advance() {                     // Used to set 
    clearTimeout(timeout);                 // Clear previous timeout
    timeout = setTimeout(function() {      // Set new timer
      if (currentIndex < ($slides.length - 1)) { // If slide < total slides
        move(currentIndex + 1);            // Move to next slide
      } else {                             // Otherwise
        move(0);                           // Move to the first slide
      }
    }, 4000);                              // Milliseconds timer will wait
  }

  $.each($slides, function(index) {
    // Create a button element for the button
    var $button = $('<button type="button" class="slide-btn">&bull;</button>');
    if (index === currentIndex) {    // If index is the current item
      $button.addClass('active');    // Add the active class
    }
    $button.on('click', function() { // Create event handler for the button
      move(index);                   // It calls the move() function
    }).appendTo('.slide-buttons');   // Add to the buttons holder
    buttonArray.push($button);       // Add it to the button array
  });

  advance();                          // Script is set up, advance() to move it


});

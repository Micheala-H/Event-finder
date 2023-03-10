// Wrapping main functions to only work after document is ready
$(document).ready(function () {
    // Hiding div with attractions card because there are no events to show
    $(attractions).hide();
    autoCities();
    getAdvice();
    getSearchedCities()
    // Function to when the search button is clicked
    $('#searchBtn').click( function(e){
        e.preventDefault();
        deleteAppends();
        getAdvice();
        // If no value is entered on search box: hides attractions div and shows previous searched cities if any
        if (($('#cities').val() == "")) {
            $(attractions).hide();
            getSearchedCities();
        }
        // If a value is entered on search box: the value is house in a variable that is passed into function that gets events info for city searched and shows previous searched cities if any
        else {
            const city = $('#cities').val();
            getEventByCity(city);
            getSearchedCities()
        }      
    })
    // Function to when any li (previous searched cities) is clicked
    $(document).on ('click', 'li', function(e) {
        e.preventDefault();
        deleteAppends();
        // Saving clicked city into variable to be passed into function that gets events info for city searched and shows previous searched cities if any
        const city = $(this).text();
        getAdvice();
        getEventByCity(city);
        getSearchedCities()
    })  
})

// Function to show suggested city names on searched box when at least three characteres are entered
function autoCities() {
    const availableCities = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
    $('#cities').autocomplete({
        source: availableCities,
        minLength: 3 
    })
}

// Function to call Advide Slip API
function getAdvice() {
    // Variable to house Advide Slip API URL
    const requestAdviceUrl = 'https://api.adviceslip.com/advice'
    fetch(requestAdviceUrl)
        .then(function (response) {
            return response.json();
        })
        // Appending new advice to advice div created in HTML
        .then(function (data) {
            $('#advice').append('<h2>' + data.slip.advice + '</h2>');
        })
}

// Function to call Ticketmaster API with city as query parameter
function getEventByCity(city) {
    // Variable to house Ticketmaster API key
    const apiKey = 'qxKGGKTQOTy8d78ZxhPZOnTRwN2N2pFH'
    // Variable to house Ticketmaster API URL
    const eventsUrl = 'https://app.ticketmaster.com/discovery/v2/events?city=' + city + '&apikey=' + apiKey
    fetch(eventsUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // If the city entered on search box has ticketmaster events available, events' info will be added to page
            if (data.page.totalElements != '0')
            {
                $(attractions).show();
                for (let i = 0; i < 4; i++) {
                    appendEvents(i, i);
                    // Saving name of the city in local storage according to name available in API (corrected name)
                    localStorage.setItem('CityCorrectName', JSON.stringify(data._embedded.events[0]._embedded.venues[0].city.name));
                    saveSearchedCities()
                }
            }
            // If the city entered on search box does not have ticketmaster events available, attractions div will keep hidden
            else {
                $(attractions).hide();
            }
            // Function to append on page title, image, date, time, location and link to buy tickets for the event. Class "is-size" is adding size font; class "has-text-warning" is adding font color with Bulma
            function appendEvents(num, index) {
                $('#attraction-' + num).append('<h2 class= "is-size-4 has-text-warning " >' + data._embedded.events[index].name + '</h2>');
                $('#attraction-' + num).append("<img src='"+ data._embedded.events[index].images[0].url + "' ></img>")
                $('#attraction-' + num).append('<p class= "is-size-5 ">' + 'When? ' + dayjs(data._embedded.events[index].dates.start.dateTime).format('MMM-DD-YYYY') + '</p>');
                $('#attraction-' + num).append('<p class= "is-size-5">' + 'What time? ' + dayjs(data._embedded.events[index].dates.start.dateTime).format('h:mm A') + '</p>');
                $('#attraction-' + num).append('<p class= "is-size-5">' + 'Where? ' + data._embedded.events[index]._embedded.venues[0].name + '</p>');
                $('#attraction-' + num).append('<a target="_blank" href="' + data._embedded.events[index].url + '" class= "has-text-weight-bold has-text-danger-dark is-size-4">Buy Tickets</a>')
            }   
        })
}

// Function to save in local storage searched cities
function saveSearchedCities() {
    // Get correct city name from local storage to add to new array in variable cities
    const CityCorrectName = JSON.parse(localStorage.getItem('CityCorrectName'))
    if (CityCorrectName) {
        const cities = JSON.parse(localStorage.getItem('cities')) || [];
        // Limits number of saved cities in local storage to 4 by removing the last city if more are added
        if (cities.length >= 5) {
            cities.pop()
        }
        // Only saves the city name in local storage once (if it is removed from the array per if statemnt above, it can be added to array again); adds it to the beggining of the array
        if (!cities.includes(CityCorrectName)) {
            cities.unshift(CityCorrectName)
        }
        localStorage.setItem('cities', JSON.stringify(cities))
    }
}

// Function to append searched cities to searchedCities div
function getSearchedCities() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    for (let i = 0; i < cities.length; i++) {
        $('#searchedCities').append('<li>' + cities[i] + '</li>') 
    }    
}

// Delete created elements to ensure there are no duplicate appends when elements need to be appended again
function deleteAppends() {
    for (let num = 0; num < 4; num++) {
        $('#attraction-' + num).empty()
    };
    $('#searchedCities').empty();
    $('#advice').empty()
}

    





  




    
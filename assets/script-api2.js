const apiKey = 'qxKGGKTQOTy8d78ZxhPZOnTRwN2N2pFH'
const city = 'dallas'

function getEventByCity() {
    const eventsUrl = 'https://app.ticketmaster.com/discovery/v2/events?city=' + city + '&apikey=' + apiKey

    fetch(eventsUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (let i = 0; i < 4; i++) {
                
                appendEvents(i, i)
                
            }

            function appendEvents(num, index) {
                $('#attraction-' + num).append('<h2>' + data._embedded.events[index].name + '</h2>');
                $('#attraction-' + num).append("<img src='"+ data._embedded.events[index].images[0].url + "'></img>")
                $('#attraction-' + num).append('<p>' + 'When? ' + data._embedded.events[index].dates.start.localDate + '</p>');
                $('#attraction-' + num).append('<p>' + 'What time? ' + data._embedded.events[index].dates.start.localTime + '</p>');
                $('#attraction-' + num).append('<p>' + 'Where? ' + data._embedded.events[index]._embedded.venues[0].name + '</p>');
                $('#attraction-' + num).append('<a>' + data._embedded.events[index].url + '</a>')
            }


           
        })
}

getEventByCity()



function getAdvice() {
    const requestAdviceUrl = 'https://api.adviceslip.com/advice'

    fetch(requestAdviceUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $('#advice').append('<h2>' + data.slip.advice + '</h2>');
        })
    }

    getAdvice()
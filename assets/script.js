

function getApi() {
    let requestUrl = 'https://cat-fact.herokuapp.com/facts'

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
}

getApi()

function getMmoApi() {
    let requestMmoUrl = 'https://www.mmobomb.com/api1/games'

    fetch(requestMmoUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (Data) {
            console.log(Data)
        })
}

getMmoApi()


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
console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
    console.log('DOM ready');
    // Run getJokes once DOM is ready
    // in order to have jokes array on client
    getJokes()
    // click listener to run addJokes
    $('#addJokeButton').on('click', addJokes)
    // click listener to run cleaarAdded
    $('#clearAdded').on('click', clearAdded)
}

// function to request jokes array from server
function getJokes() {
    $.ajax({
        // finding app.get('/jokes' in sever.js)
        method: "GET",
        url: "/jokes",
        // in this case response is the jokes array
    }).then(function (response) {
        // response is what was in the res.send()
        console.log(response);
        // clear output div so array doesnt stack eack click
        $('#outputDiv').empty()
        // append updated array to the dom
        for (let hack of response) {
            $('#outputDiv').append(`
            <p>${hack.jokeQuestion}, ${hack.punchLine}</p>  <h3> - ${hack.whoseJoke}</h3>
            `)
        }

    });
}

// add jokes to jokes array with text input
function addJokes() {
    $.ajax({
        method: "POST",
        url: "/jokes",
        // data to send to the server
        data: {
            // these keys match keys in jokes array objects
            whoseJoke: $('#whoseJokeIn').val(),
            jokeQuestion: $('#questionIn').val(),
            punchLine: $('#punchlineIn').val()
        }
    }).then(response => {
        // log "Created" from 201 status code from app.post
        console.log(response);
        // run getJokes to bring updated array to client
        getJokes()
    })
}

// return array to original state
function clearAdded() {
    $.ajax({
            method: 'DELETE',
            url: "/jokes"
        })
        .then(function (response) {
            // response is status code
            // this time it will log "created" bc code 201
            console.log(response);
            // run getCalc again with updated jokes array
            getJokes()
        });
}
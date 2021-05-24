console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    // Run getJokes once DOM is ready
    // in order to have jokes array on client
    getJokes()
    $('#addJokeButton').on('click', addJokes)
    $('#clearAdded').on('click', clearAdded)
}

// function to request jokes array from server
function getJokes (){
    $.ajax({
        // finding app.get('/jokes' in sever.js)
        method: "GET",
        url: "/jokes",
        // in this case response is the jokes array
      }).then(function (response) {
        // response is what was in the res.send()
        console.log(response);
        $('#outputDiv').empty()
        for(let hack of response){
            $('#outputDiv').append(`
            <p>${hack.jokeQuestion}, ${hack.punchLine}</p>  <h3> - ${hack.whoseJoke}</h3>
            `)
        }
       
      });
}

function addJokes(){
    $.ajax({
        method: "POST",
        url: "/jokes",
        data:{
            whoseJoke: $('#whoseJokeIn').val(),
            jokeQuestion: $('#questionIn').val(),
            punchLine: $('#punchlineIn').val()
        }
    }).then(response => {
        console.log(response);
        getJokes()
    })
}

// 
function clearAdded(){
    $.ajax({
        method: 'DELETE',
        url: "/jokes"
      })
      .then(function (response) {
        // response is status code
        // this time it will log "created" bc code 201
        console.log(response);
        // run getCalc again with updated numbers array
     getJokes()
      });
}
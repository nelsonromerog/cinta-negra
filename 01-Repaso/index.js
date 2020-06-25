const request = require('request');

/*
    JS Vanilla
    - VAR - variable de alcance global (Mala practica)

    ES6
    - LET - variable de alcance local (Buena practica)
    - CONST - constante alcance local (No se pueden cambiar sus calores)
*/

/*
    --FUNCIONES

    JS Vanilla
    //Funcion convencional
    function mi Funcion(arg1, arg2){
        //esto es el bloque de codigo que ejecuta la funcion
    }

    // Funciones anonimas
    const miFuncion = function (arg1, arg2) {
        //esto es el bloque de codigo que ejecuta la funcion
    }

    ES6
    const miFuncion = () => {
        //esto es el bloque de codigo que ejecuta la funcion
    };
*/

/*
    Esta es una funcion de orden superior
    (Higher Order Function)
        -> funciones que reciben como argumento otra funcion
*/

// API URL breaking-bad-quotes
// const BR_BA_QUOTES = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes';
// request.get(BR_BA_QUOTES, (err, res, body) => {
//     if (res.statusCode === 200) {
//         const json = JSON.parse(body);
//         console.log(json);
//         console.log(json[0].quote);

//     }
//     else console.log(res.statusCode, err);
// })

// API URL the-audio-db API_KEY=1 Artist_Name=coldplay    
const getBandInfo = () => {
    const AUDIO_DB = 'https://theaudiodb.com/api/v1/json/1/discography.php?s=coldplay';
    request.get(AUDIO_DB, (err, res, body) => {
        if (res.statusCode === 200) {
            const json = JSON.parse(body);
            for(let k in json.album) {
                console.log('Album: ' + json.album[k].strAlbum + ' Year: ' + json.album[k].intYearReleased);
            }
        }
        else console.log(res.statusCode, err);
    })
}

getBandInfo()


// request({
//     method: 'get',
//     url: 'https://api.tradier.com/v1/markets/options/strikes',
//     qs: {
//        'symbol': 'VXX',
//        'expiration': '2019-05-17'
//     },
//     headers: {
//       'Authorization': 'Bearer <1OmNdUOuryhraoRvTRyTAEQcMbNA>',
//       'Accept': 'application/json'
//     }
//   }, (error, response, body) => {
//       console.log(response.statusCode);
//       console.log(body);
//   });
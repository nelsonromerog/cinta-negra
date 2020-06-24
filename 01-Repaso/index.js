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
// const API_URL = ''
// request.get(API_URL, () => {
//     /*
//         Esta funciuon que se ejecuta dentro de la funcion de 
//         orden superior se conoce como CALLBACK
//     */

// })

const BR_BA_QUOTES = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes';
request.get(BR_BA_QUOTES, (err, res, body) => {
    if (res.statusCode === 200) {
        const json = JSON.parse(body);
        console.log(json);
        console.log(json[0].quote);

    }
    else console.log(res.statusCode, err);
})
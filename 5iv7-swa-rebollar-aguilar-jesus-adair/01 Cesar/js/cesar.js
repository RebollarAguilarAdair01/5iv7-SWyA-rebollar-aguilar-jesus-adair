var cesar = cesar || (function(){
    var proceso = function(txt, desp, action){
        var replace = (function(){
            //primero necesito tener la matriz del alfabeto
            //hay que recordar que el cifrado lo hace caracter por caracter
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 
                    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var l = abc.length;
            //necesitamos obtener la posición que va a venir por parte de la llave privada
            return function(c){
                //vamos a saber la posición
                var i = abc.indexOf(c.tolowerCase());
                //necesitamos saber donde estamos dentro de la matriz
                //como la vamos a recorrer? y que pasa cuando llegue al final?
                if(i!= -1){
                    //primero tenemos la posición para el desplazamiento
                    var pos = i;
                    //voy a cifrar o descifrar
                    if(action){
                        //cifrar para adelante
                        pos += desp;
                        //como se va a mover
                        pos -= (pos >= l)?l:0;
                    }else{
                        //descifrar para atras
                        pos -= desp;
                        //movimiento
                        pos += (pos < 0)?l:0;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();
        //tenemos que saber que el texto este acorde al abecedario
        var re = (/([a-z])/ig);
        //una función que se encargue del intercambio
        return String(txt).replace(re, function(match){
            return replace(match);
        });

    };
    return{
        encode : function(txt, desp){
            return proceso(txt, desp, true);
        },
        decode : function(txt, desp){
            return proceso(txt, desp, false);
        }
    };
})();

//funcion de cifrado

function cifrar(){
    document.getElementById("resultado").innerHTML =
    cesar.encode(document.getElementById("cadena").value, 3);
}

//funcio de descifrado

function descifrar(){
    document.getElementById("resultado").innerHTML =
    cesar.decode(document.getElementById("cadena").value, 3);
}

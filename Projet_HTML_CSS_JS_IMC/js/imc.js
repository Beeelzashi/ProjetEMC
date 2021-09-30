$(document).ready(function () {
    //quand un curseur est changer on change l imc obtenue 
    $("#idSliderPoids").on('input', function (e) {
        e.preventDefault();
        afficherIMC()

    });
    $("#idSliderTaille").on('input', function (e) {
        e.preventDefault();
        afficherIMC()

    });

    //quand un bouton radio est activé on appelle la fonction a nouveau
    $("input[name = sexe]").on('change', function () {
        afficherIMC();
    });




    //fonction qui calcule l IMC avec l interpretation deriere
    function afficherIMC() {
        // deux variable qui determine le poid et la taille avec les curseurs
        let poids = $("#idSliderPoids").val();
        let taille = $("#idSliderTaille").val();
        //pour que le span indique la valeur du curseur
        $("#textPoids").html(poids);
        $("#textTaille").html(taille);

        // definition de la fonction qui calcule l'IMC
        let imc = poids / (taille * taille);
        //pour mettre un nombre apres la virgule
        imc = imc.toFixed(1);

        let interpretation = "";

        //Les interprettation de l'imc en fonction de l'imc obtenue 

        if (imc < 16.5) {
            interpretation = "(dénutrition)";
        }
        else if (imc < 18.5) {
            interpretation = "(maigreur)";
        }
        else if (imc < 25) {
            interpretation = "(corpulence normale)";
        }
        else if (imc < 30) {
            interpretation = "(surpoid)";
        }
        else if (imc < 35) {
            interpretation = "(obésité modérée)"
        }
        else if (imc < 40) {
            interpretation = "(obésité sévère)"
        }
        else {
            interpretation = "(obésité morbide)"
        }

        let imcinterpretation = imc + "  " + interpretation;

        $("#textIMC").html(imcinterpretation);

        afficherBalance(imc);

        afficherSilhouette(imc);

    };

    function afficherBalance(prmValImc) {
        //si l'iguille est trop a gauche qu'elle se bloque au maximum de l'image 
        if (prmValImc > 45) {
            prmValImc = ((60 / 7) * 45) - (600 / 7);
            let deplacement = prmValImc;
            return $("#aiguille").css("left", deplacement + "px");
        }
        //si l'iguille est trop a droite qu'elle se bloque au maximum de l'image
        else if(prmValImc < 10){
            prmValImc = ((60 / 7) * 10) - (600 / 7);
            let deplacement = prmValImc;
            return $("#aiguille").css("left", deplacement + "px");

        }
        //sinon calculer normalement le deplacement de l'aiguille 
        else {
            prmValImc = Number(prmValImc);
            prmValImc = ((60 / 7) * prmValImc) - (600 / 7);
            let deplacement = prmValImc;
            return $("#aiguille").css("left", deplacement + "px");

        }


    };

    function afficherSilhouette(prmValImc) {
        var sexe = $("input[name=sexe]:checked").val();
        let femme = "femme";
        //si la personne est une femme ne pas changer la silouette 
        //sinon c'est un homme  == changer la silouette
        if (sexe === femme) {
            $("#silhouette").css("background-image", "url(../img/IMC-femme.jpg)");
        }
        else {
            $("#silhouette").css("background-image", "url(../img/IMC-homme.jpg)");
        }

        //decalage correspond au deplacement sur l'image avec bcp de silouette 

        let decalage = 0;

        if (prmValImc < 16.5) {
            decalage = 6;
        }
        else if (prmValImc < 18.5) {
            decalage = 5;
        }
        else if (prmValImc < 25) {
            decalage = 4;
        }
        else if (prmValImc < 30) {
            decalage = 3;
        }
        else if (prmValImc < 35) {
            decalage = 2;
        }
        else {
            decalage = 1;
        }

        decalage = decalage * 105;


        $("#silhouette").css("background-position", decalage + "px");
    }

});
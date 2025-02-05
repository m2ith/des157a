(function () {
    "use strict";
    console.log("reading JS");

    //Scroll to Output
    const button = document.querySelector(`button`);
    const output = document.querySelector(`#output`);

    button.addEventListener("click", function (event) {
        event.preventDefault();
        output.scrollIntoView();
    });

    //MadLibs Input and Form
    const myForm = document.querySelector(`#form`);
    const madLib = document.querySelector(`#madlibs-output`);
    const formData = document.querySelectorAll(`input[type=text]`);
    const submitButton = document.querySelector(`button[type="submit"]`);

    myForm.addEventListener("submit", function (event) {
        event.preventDefault();
        processFormData(formData);
    });

    function processFormData(formData) {
        const words = [];
        const emptyfields = [];
        let counter = 0;

        for (const eachWord of formData) {
            if (eachWord.value) {
                words.push(eachWord.value);
                eachWord.value = "";
            } else {
                emptyfields.push(counter);
            }
            counter++;
        }

        if (emptyfields.length > 0) {
            showErrors(formData, emptyfields);
        } else {
            makeMadLib(words);
        }
    }

    function showErrors(formData, emptyfields) {
        const errorID = formData[emptyfields[0]].id;
        const errorText = `Please fill out this field: ${errorID}.`;
        madLib.innerHTML = errorText;
        document.querySelector(`#${errorID}`).focus();
    }

    function makeMadLib(words) {
        const myText = `<p>They belong to Whiskers, the Biker cat! He loves to rev his <em>${words[0]}</em> motorcycle. He belongs to the <em>${words[1]}</em> gang. They like to go on fun adventures exploring different places, such as <em>${words[2]}</em>. Whiskers is a big foodie so he LOVES eating food. He enjoys eating: <em>${words[3]}</em>, <em>${words[4]}</em>, and <em>${words[5]}</em>. He also loves listening to music! A favorite genre of music he likes to listen to is <em>${words[6]}</em>. Whiskers also enjoys going on <em>${words[7]}</em> rides with his friends.</p>`
        madLib.innerHTML = myText;

        for (const eachField of formData) {
            eachField.value = "";
        }
    }
    
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        processFormData(myForm.elements);
    });
})();
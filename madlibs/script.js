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

    //MadLibs Form
    const myForm = document.querySelector(`#myform`);
    const madLib = document.querySelector(`#madlibs-output`);
    const formData = document.querySelectorAll(`input[type=text]`);

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
        //madLib.innerHTML = "";
        madLib.innerHTML = errorText;
        document.querySelector(`#${errorID}`).focus();
    }

    function makeMadLib(words) {
        //const myText = `Here are the words you entered: ${words[0]}, ${words[1]}, ${words[2]}, and ${words[3]}.`;
        const myText = `They belong to Whiskers, the Biker cat! He loves to rev his <em>${words[0]}</em> motorcycle. He belongs to the <em>${words[1]}</em> gang. They like to go on fun adventures exploring different places, such as <em>${words[2]}</em>. Whiskers is a big foodie so he LOVES eating food. He enjoys eating: <em>${words[3]}</em>, <em>${words[4]}</em>, and <em>${words[5]}</em>. He also loves listening to music! A favorite genre of music he likes to listen to is <em>${words[6]}</em>. Whiskers also enjoys going on <em>${words[7]}</em> rides with his friends.`;
        madLib.innerHTML = myText;

        for (const eachField of formData) {
            eachField.value = "";
        }
    }
})();
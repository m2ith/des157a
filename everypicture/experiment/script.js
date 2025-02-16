window.addEventListener("load", function() {
    "ue strict";
    console.log("reading JS");

	const sections = document.querySelectorAll("section");
	let sectionTops = [];
	let pageTop;
	let counter = 1;
	let prevCounter = 1;
	let doneResizing;

    const cuijian = new Audio("../music/nothingtomyname_cuijian.mp3");
    const button1 = document.querySelector(`#button1`);
    const blackkeys = new Audio("../music/goldontheceiling_blackkeys.mp3");
    const button2 = document.querySelector(`#button2`);
    const beatles = new Audio("../music/yellowsubmarine_thebeatles.mp3");
    const button3 = document.querySelector(`#button3`);
    let isPlaying = false;

    const myImage = document.querySelector(`#myimage`);

	sections.forEach(function (eachSection) {
        sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
    });

    window.addEventListener("scroll", function () {
        pagetop = window.scrollY + 100;

        if (pagetop > sectionTops[counter]) {
            counter++;
        }
        else if (counter > 1 && pagetop < sectionTops[counter - 1]) {
            counter--;
        }

        if (counter != prevCounter) {
            //onSectionChange();
            prevCounter = counter;
        }
    });

    window.addEventListener("resize", function () {
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function () {
            resetPagePosition();
        }, 500);
    });

    function resetPagePosition() {
        sectionTops = [];
        sections.forEach(function (eachSection) {
            sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
        });

        const pagePosition = window.scrollY + sectionTops[0] + 10;
        counter = 0;
        sectionTops.forEach(function (eachSection) {
            if (pagePosition > eachSection) { counter++; }
        });
    }

    //Trying to get image to change based on section when scrolling
    /* function onSectionChange() {
        const myPhoto = ["photo01.jpg", "photo02.jpg", "photo03.jpg", "photo04.jpg"];
        let currentImage = 0;
        const nextPhoto = document.querySelector(`#myimage`);

        nextPhoto.src = `images/${myPhoto[currentImage]}`;
    }; */

    button1.addEventListener("click", function(){
        if (!isPlaying) {
            cuijian.play();
            isPlaying = true;
            myImage.src = "../images/photo02.jpg";
        } else {
            cuijian.pause();
            isPlaying = false;
            myImage.src = "../images/photo01.jpg";
        }
    });

    button2.addEventListener("click", function(){
        if (!isPlaying) {
            blackkeys.play();
            isPlaying = true;
            myImage.src = "../images/photo03.jpg";
        } else {
            blackkeys.pause();
            isPlaying = false;
            myImage.src = "../images/photo01.jpg";
        }
    });

    button3.addEventListener("click", function(){
        if (!isPlaying) {
            beatles.play();
            isPlaying = true;
            myImage.src = "../images/photo04.jpg";
        } else {
            beatles.pause();
            isPlaying = false;
            myImage.src = "../images/photo01.jpg";
        }
    });
}); //End
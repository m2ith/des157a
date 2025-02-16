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
            onSectionChange();
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

    function onSectionChange() {
        const myPhoto = ["photo01.jpg", "photo02.jpg", "photo03.jpg", "photo04.jpg"];
        let currentImage = 0;
        const nextPhoto = document.querySelector(`#myimage`);

        for (const eachPhoto of sections) {
            eachPost.className = "offscreen";
        }
        document.querySelector(`#section0${counter}`).className = "onscreen";
    };

    button1.addEventListener("click", function(){
        if (!isPlaying) {
            cuijian.play();
            isPlaying = true;
        } else {
            cuijian.pause();
            isPlaying = false;
        }
    });

    button2.addEventListener("click", function(){
        if (!isPlaying) {
            blackkeys.play();
            isPlaying = true;
        } else {
            blackkeys.pause();
            isPlaying = false;
        }
    });

    button3.addEventListener("click", function(){
        if (!isPlaying) {
            beatles.play();
            isPlaying = true;
        } else {
            beatles.pause();
            isPlaying = false;
        }
    });
}); //End
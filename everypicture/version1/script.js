window.addEventListener("load", function() {
    "use strict";
    console.log("reading JS");

    const posts = document.querySelectorAll(`section`);
	let postTops = [];
	let pageTop;
	let counter = 1;
	let doneResizing;

    const cuijian = new Audio("../music/nothingtomyname_cuijian.mp3");
    const blackkeys = new Audio("../music/goldontheceiling_blackkeys.mp3");
    const beatles = new Audio("../music/yellowsubmarine_thebeatles.mp3");
    const ipod1 = document.querySelector(`#ipod1`);
    const ipod2 = document.querySelector(`#ipod2`);
    const ipod3 = document.querySelector(`#ipod3`);
    let playingAudio = null;

    const myImage = document.querySelector(`#myimage`);

    resetPagePosition();

    window.addEventListener("scroll", function () {
		pageTop = window.scrollY + 300;

		if (pageTop > postTops[counter]) {
			counter++;
			//console.log(`scrolling down ${counter}`);
		}
		else if (counter > 1 && pageTop < postTops[counter - 1]) {
			counter--;
			//console.log(`scrolling up ${counter}`);
		}
	});

    window.addEventListener("resize", function () {
		clearTimeout(doneResizing);

		doneResizing = setTimeout(function () {
			resetPagePosition();
		}, 500);
	});

    function resetPagePosition() {
		postTops = [];
		posts.forEach(function(post) {
			postTops.push(Math.floor(post.getBoundingClientRect().top) + window.scrollY);
		});

		const pagePosition = window.scrollY + 300;
		counter = 0;

		postTops.forEach(function(post) { 
            if (pagePosition > post) { 
                counter++;
            } 
        });
	}

    ipod1.addEventListener("click", handleAudio);
    ipod2.addEventListener("click", handleAudio);
    ipod3.addEventListener("click", handleAudio);

    function handleAudio(event) {
        if (playingAudio !== null) {
            playingAudio.pause();
        }

        switch(event.target.id) {
            case "ipod1":
                if (!cuijian.paused) {
                    cuijian.pause();
                }
                cuijian.play();
                playingAudio = cuijian;
                myImage.src = "../images/photo-red.jpg";
                break;
            case "ipod2":
                if (!blackkeys.paused) {
                    blackkeys.pause();
                }
                blackkeys.play();
                playingAudio = blackkeys;
                myImage.src = "../images/photo-brown.jpg";
                break;
            case "ipod3":
                if (!beatles.paused) {
                    beatles.pause();
                }
                beatles.play();
                playingAudio = beatles;
                myImage.src = "../images/photo-yellow.jpg";
                break;
        }
    }
});
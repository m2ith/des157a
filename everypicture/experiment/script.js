window.addEventListener("load", function() {
    "use strict";
    console.log("reading JS");

    const posts = document.querySelectorAll(`section`);
	let postTops = [];
	let pageTop;
	let counter = 1;
	let doneResizing;

    const cuijian = new Audio("../music/nothingtomyname_cuijian.mp3");
    const ipod1 = document.querySelector(`#ipod1`);
    const blackkeys = new Audio("../music/goldontheceiling_blackkeys.mp3");
    const ipod2 = document.querySelector(`#ipod2`);
    const beatles = new Audio("../music/yellowsubmarine_thebeatles.mp3");
    const ipod3 = document.querySelector(`#ipod3`);
    let isPlaying = false;

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

    ipod1.addEventListener("click", function(){
        if (!isPlaying) {
            cuijian.play();
            isPlaying = true;
            myImage.src = "../images/photo-red.jpg";
        } else {
            cuijian.pause();
            isPlaying = false;
            myImage.src = "../images/photo-bw.jpg";
        }
    });

    ipod2.addEventListener("click", function(){
        if (!isPlaying) {
            blackkeys.play();
            isPlaying = true;
            myImage.src = "../images/photo-brown.jpg";
        } else {
            blackkeys.pause();
            isPlaying = false;
            myImage.src = "../images/photo-bw.jpg";
        }
    });

    ipod3.addEventListener("click", function(){
        if (!isPlaying) {
            beatles.play();
            isPlaying = true;
            myImage.src = "../images/photo-yellow.jpg";
        } else {
            beatles.pause();
            isPlaying = false;
            myImage.src = "../images/photo-bw.jpg";
        }
    });
});
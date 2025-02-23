window.addEventListener("load", function() {
    "use strict";
    console.log("reading JS");

    const cuijian = new Audio("../music/nothingtomyname_cuijian.mp3");
    const blackkeys = new Audio("../music/goldontheceiling_blackkeys.mp3");
    const beatles = new Audio("../music/yellowsubmarine_thebeatles.mp3");
    const ipod1 = document.querySelector(`#ipod1`);
    const ipod2 = document.querySelector(`#ipod2`);
    const ipod3 = document.querySelector(`#ipod3`);
    let isCuijianPlaying = false;
    let isBlackkeysPlaying = false;
    let isBeatlesPlaying = false;

    const myImage = document.querySelector(`#myimage`);

    ipod1.addEventListener("click", function() {
        if (isCuijianPlaying) {
            handleCuijianPlay();
        } else {
            handleCuijianPlay();
        }
    });
    
    ipod2.addEventListener("click", function() {
        if (isBlackkeysPlaying) {
            handleBlackkeysPlay();
        } else {
            handleBlackkeysPlay();
        }
    });
    
    ipod3.addEventListener("click", function() {
        if (isBeatlesPlaying) {
            handleBeatlesPlay();
        } else {
            handleBeatlesPlay();
        }
    });

    function handleCuijianPlay() {
        if (isCuijianPlaying) {
            cuijian.pause();
            isCuijianPlaying = false;
            myImage.src = "../images/photo-bw.jpg";
        } else {
            if (isBlackkeysPlaying || isBeatlesPlaying) {
                blackkeys.pause();
                beatles.pause();
                isBlackkeysPlaying = false;
                isBeatlesPlaying = false;
            }
            cuijian.play();
            isCuijianPlaying = true;
            myImage.src = "../images/photo01.jpg";
        }
    }
    
    function handleBlackkeysPlay() {
        if (isBlackkeysPlaying) {
            blackkeys.pause();
            isBlackkeysPlaying = false;
            myImage.src = "../images/photo-bw.jpg";
        } else {
            if (isCuijianPlaying || isBeatlesPlaying) {
                cuijian.pause();
                beatles.pause();
                isCuijianPlaying = false;
                isBeatlesPlaying = false;
            }
            blackkeys.play();
            isBlackkeysPlaying = true;
            myImage.src = "../images/photo02.jpg";
        }
    }
    
    function handleBeatlesPlay() {
        if (isBeatlesPlaying) {
            beatles.pause();
            isBeatlesPlaying = false;
            myImage.src = "../images/photo-bw.jpg";
        } else {
            if (isCuijianPlaying || isBlackkeysPlaying) {
                cuijian.pause();
                blackkeys.pause();
                isCuijianPlaying = false;
                isBlackkeysPlaying = false;
            }
            beatles.play();
            isBeatlesPlaying = true;
            myImage.src = "../images/photo03.jpg";
        }
    }
});
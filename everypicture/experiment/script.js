window.addEventListener("load", function() {
    "ue strict";
    console.log("reading JS");

    const cuijian = new Audio("../music/nothingtomyname_cuijian.mp3");
    const ipod1 = document.querySelector(`#ipod1`);
    const blackkeys = new Audio("../music/goldontheceiling_blackkeys.mp3");
    const ipod2 = document.querySelector(`#ipod2`);
    const beatles = new Audio("../music/yellowsubmarine_thebeatles.mp3");
    const ipod3 = document.querySelector(`#ipod3`);
    let isPlaying = false;

    const myImage = document.querySelector(`#myimage`);

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
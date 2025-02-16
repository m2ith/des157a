window.addEventListener("load", function() {
	const posts = document.querySelectorAll("section");
	let postTops = [];
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

	resetPagePosition();

	window.addEventListener("scroll", function() {
		pageTop = window.scrollY + 300;

		if (pageTop > postTops[counter]) {
			counter++;
			//console.log(`scrolling down ${counter}`);
		}
		else if (counter > 1 && pageTop < postTops[counter - 1]) {
			counter--;
			//console.log(`scrolling up ${counter}`);
		}

		if (counter != prevCounter) {
			document.querySelector(`figure img`).className = "sect" + counter;
			prevCounter = counter;
		}
	});

	window.addEventListener("resize", function() {
		clearTimeout(doneResizing);
		doneResizing = setTimeout(function() {
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
}); //END
(function () {
    "use strict";
    console.log("reading JS");

    /* Variables needed for interface elements in the HTML */
    const cat1 = document.querySelector(`#keva`);
    const cat2 = document.querySelector(`#whispurr`);
    const messages = document.querySelector(`#messages`);
    const startBtn = document.querySelector(`#lets-see`);
    const attackBtn = document.querySelector(`#attack`);
    const quitBtn = document.querySelector(`#quit`);
    const volumeBtn = document.querySelector(`.volume`);
    const volumeImg = document.querySelector(`.volume-img`);
    const infoBtn = document.querySelector(`#info`);
    const overlayCloseBtn = document.querySelector(`.close`);

    // GAME AUDIO
    const gameAudio = new Audio("music/underclocked-ericskiff.mp3");
    let isGameAudioPlaying = false;
    gameAudio.loop = true;

    document.addEventListener('DOMContentLoaded', function () {
        console.log("DOM fully loaded and parsed");

        // GAME AUDIO
        // Add a small delay before executing the volume control logic
        setTimeout(function () {
            volumeBtn.addEventListener("click", function () {
                //console.log("Volume button clicked");
                if (!isGameAudioPlaying) {
                    console.log("Playing audio");
                    gameAudio.play();
                    isGameAudioPlaying = true;
                    if (volumeImg) {
                        volumeImg.src = "../images/volume-on.png";
                        console.log("Changed volume image");
                    } else {
                        console.error("volumeImg is null");
                    }
                } else {
                    console.log("Pausing audio");
                    gameAudio.pause();
                    isGameAudioPlaying = false;
                    if (volumeImg) {
                        volumeImg.src = "../images/volume-off.png";
                        console.log("Changed volume image");
                    } else {
                        console.error("volumeImg is null");
                    }
                }
            });
        }, 500); // 500ms delay
    });

    // QUIT BUTTON
    quitBtn.addEventListener("click", function () {
        window.location.href = "start.html";
    });

    // INFO OVERLAY
    // THIS IS NOT WORKING, NEED TO FIX
    /*     const controls = document.querySelector(`#controls`)
    
        controls.addEventListener(function(){
            const openBtn = document.querySelector(`.open`);
            const closeBtn = document.querySelector(`.close`);
        }); 
        
        document.querySelector(`.open`).addEventListener("click", function(event){
                event.preventDefault();
                document.querySelector(`#overlay`).className = "showing";
            });
    
        document.querySelector(`.close`).addEventListener("click", function(event){
                event.preventDefault();
                document.querySelector(`#overlay`).className = "hidden";
        });
    
        document.addEventListener("keydown", function(event){
                if (event.key == `Escape`) {
                    document.querySelector(`#overlay`).className = "hidden";
                }
        }); */

    // GAME INFORMATION
    /* These variables are assigned later and used to keep track of the state of the game. Attacker and defender will end up just being the name of the monster for the person who is attacking and the person who is defending. DefenderIndex will be 0 or 1, whichever player is not attacking. */
    let attacker;
    let defender;
    let defenderIndex;

    const gameData = {
        cats: ["Keva", "Whispurr"],
        health: [100, 100],
        attack: [5, 15, 25, 35, 50],
        attackMessage: [
            "a very weak attack... -5 HP!",
            "a weak attack... -15 HP!",
            "an attack of -25 HP!",
            "a big attack! -35 HP!",
            "a massive attack! Woah! -50 HP!"
        ],
        defendMessage: [
            "no defense... HP was highly affected!",
            "some defense! Partial hit!",
            "total defense! HP was not affected!"
        ],
        index: 0
    };
    2
    /* This kicks off the game. Note the attack button starts as hidden, and then is only shown at times when the player can attack. I don't want to remove the button entirely, as that would require adding the event listener back every time the button gets put back on the page. */

    startBtn.addEventListener("click", function () {
        gameData.index = Math.round(Math.random());
        messages.innerHTML = `<p>Get ready! <strong>${gameData.cats[gameData.index]}</strong> became agitated. Click the attack button to see what happens.</p>`;
        attackBtn.className = "showing";
    });

    /* Now that the button is showing, the player can attack */
    attackBtn.addEventListener("click", catAttack);

    /* This is where most of the action takes place */
    function catAttack() {

        // hese are images variables for Keva cat[0] attacking or defendings
        const attackKevaImage = "../images/my-cats/k-attack1.png";
        const defendKevaImage = "../images/my-cats/k-defense1.png";
        const neutralKevaImage = "../images/my-cats/k-neutral1.png";

        // Function to change the image of cat0 when cat0 is attacking
        function changeCat0AttackImg() {
            if (document.querySelector(`#${attacker = gameData.cats[0]}`)) {
                document.querySelector(`#${attacker = gameData.cats[0]}`).src = attackKevaImage;
            } else {
                console.error(`Element with ID ${attacker} not found`);
            }
            // This returns the cat0 image back to neutral
            setTimeout(() => {
                document.querySelector(`#${attacker = gameData.cats[0]}`).src = neutralKevaImage;
            }, 2500);
        };

        // Function to change the image of cat0 when cat0 is defending
        function changeCat0DefendImg() {
            if (document.querySelector(`#${defender = gameData.cats[0]}`)) {
                document.querySelector(`#${defender = gameData.cats[0]}`).src = defendKevaImage;
            } else {
                console.error(`Element with ID ${defender} not found`);
            }
            // This returns the cat0 image back to neutral
            setTimeout(() => {
                document.querySelector(`#${defender = gameData.cats[0]}`).src = neutralKevaImage;
            }, 2500);
        };

        // Run the function
        changeCat0AttackImg();
        changeCat0DefendImg();

        // These are images variables for Whispurr cat[1] attacking or defendings
        const attackWhispurrImage = "../images/my-cats/w-attack1.png";
        const defendWhispurrImage = "../images/my-cats/w-defense1.png";
        const neutralWhispurrImage = "../images/my-cats/w-neutral1.png";

        // Function to change the image of cat1 when cat1 is attacking
        function changeCat1AttackImg() {
            if (document.querySelector(`#${attacker = gameData.cats[1]}`)) {
                document.querySelector(`#${attacker = gameData.cats[1]}`).src = attackWhispurrImage;
            } else {
                console.error(`Element with ID ${attacker} not found`);
            }
            // This returns the cat1 image back to neutral
            setTimeout(() => {
                document.querySelector(`#${attacker = gameData.cats[1]}`).src = neutralWhispurrImage;
            }, 2500);
        };

        // Function to change the image of cat1 when cat1 is defending
        function changeCat1DefendImg() {
            if (document.querySelector(`#${defender = gameData.cats[1]}`)) {
                document.querySelector(`#${defender = gameData.cats[1]}`).src = defendWhispurrImage;
            } else {
                console.error(`Element with ID ${defender} not found`);
            }
            // This returns the cat1 image back to neutral
            setTimeout(() => {
                document.querySelector(`#${defender = gameData.cats[1]}`).src = neutralWhispurrImage;
            }, 2500);
        };

        // Run the function
        changeCat1AttackImg();
        changeCat1DefendImg();

        /* If gameData.index is 1, the statement is true and it must be ployer 2's turn. Set the attacker to player 2 and the defender to player 1. Set the defenderIndex to zero. If this statement is false, do the opposite. */
        if (gameData.index) {
            attacker = gameData.cats[1];
            defender = gameData.cats[0];
            defenderIndex = 0;
        }
        else {
            attacker = gameData.cats[0];
            defender = gameData.cats[1];
            defenderIndex = 1;
        }

        // These generate the random attack of 0-4 and the random defense of 0-2
        const thisAttack = Math.floor(Math.random() * 5);
        const thisdDefense = Math.floor(Math.random() * 3);

        // Hide the attack button again, until the next turn
        attackBtn.className = "hidden";

        // Put the correct attack class on the attacking monster
        if (document.querySelector(`#${attacker}`)) {
            document.querySelector(`#${attacker}`).className = `attack${thisAttack}`;
            document.querySelector(`#${attacker}`).style.color = "green";
        } else {
            console.error(`Element with ID ${attacker} not found`);
        }

        // Put the correct message in the message window
        messages.innerHTML = `<p><strong>${attacker}</strong> has completed ${gameData.attackMessage[thisAttack]}</p>`;

        /* Wait 2.5 seconds so the CSS attacking animation can finish and the user can read the attack message*/
        setTimeout(function () {
            //Update the messages div with a defense message
            messages.innerHTML = `<p><strong>${defender}</strong> has ${gameData.defendMessage[thisdDefense]}</p>`;
            // Put the correct defense animation on the defending cat
            document.querySelector(`#${defender}`).className = `defend${thisdDefense}`;

            /* If there is no defense, update the healthbar of the defending cat by subtracting total attack from it's current health. If there was partial defense subtract half the health. If a 2 was rolled, nothing happens to the healthbar, because it was total defense. */
            if (thisdDefense == 0) {
                gameData.health[defenderIndex] = gameData.health[defenderIndex] - gameData.attack[thisAttack];
            } else if (thisdDefense == 1) {
                gameData.health[defenderIndex] = gameData.health[defenderIndex] - gameData.attack[thisAttack] / 2;
            }

            // This variable is used to ensure that the data is convered to a number and is rounded down.
            let health = Math.floor(parseFloat(gameData.health[defenderIndex]));
            /* You can't have less than zero health. That would screw up the health bar, so if the
            health is less than zero, set it to zero. */
            if (health < 0) { health = 0; }
            // Set the width of the healthbar to reflect the correct percentage.
            document.querySelector(`#healthbar${defenderIndex} div`).style.width = `${health}%`;
            // Set the number next to the health bar to reflect the correct percentage.
            document.querySelector(`#health${defenderIndex}`).innerHTML = `${health}%`;

            /* Check to see if the attacking cat has won, passing in the index of the defending cat, so you can check it's health and the name of the attacking cat, so you can use it in the message. */
            checkWinningCondition(defenderIndex, attacker);
        }, 2500);
    }

    function checkWinningCondition(enemy, attackingCat) {
        // Reset the image of both cats
        if (cat1 && cat1.nodeType === Node.ELEMENT_NODE) {
            cat1.src = "../images/my-cats/k-neutral1.png";
        }
        if (cat2 && cat2.nodeType === Node.ELEMENT_NODE) {
            cat2.src = "../images/my-cats/w-neutral1.png";
        }

        // Wait three seconds, so users can read the screen and the animation can finish.
        setTimeout(function () {
            // Remove the animation classes from the cats...
            // cat1.removeAttribute("class");
            // cat2.removeAttribute("class");
            if (cat1 && cat1.nodeType === Node.ELEMENT_NODE) {
                cat1.removeAttribute("class");
            }
            if (cat2 && cat2.nodeType === Node.ELEMENT_NODE) {
                cat2.removeAttribute("class");
            }
            /* As before, we need to make sure the health of the defending cat is converted into a number and rounded down. */
            const health = Math.floor(parseFloat(gameData.health[enemy]));
            // If the health is less than 1, the winning condition has been met for the attacking cat
            if (health < 1) {
                /* Set the message about winning */
                messages.innerHTML = `<p><strong>${attackingCat}</strong> has won the battle! Start another battle?</p>`;
                /* Create a button for a new battle */
                messages.innerHTML += '<button id="reset">Battle Again</button>';
                /* Refresh the page, so everything starts over fresh */
                document.querySelector(`#reset`).addEventListener("click", function () {
                    location.reload();
                });
            } else {
                /* The winning condition has not been met, so switch the player's turn. */
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                // Set the message to reflect that it is the other player's turn
                messages.innerHTML = `<p>It's now <strong>${gameData.cats[gameData.index]}'s</strong> turn!</p>`;
                // Turn on the attack button again, so the other player can attack.
                attackBtn.className = "showing";
            }
        }, 3000);
    }
})();
(function(){
    "use strict";
    console.log("reading JS");

    /* Variables needed for interface elements in the HTML */
    const cat1 = document.querySelector(`#keva`);
    const cat2 = document.querySelector(`#whispurr`);
    const messages = document.querySelector(`#messages`);
    const startBtn = document.querySelector(`#lets-see`);
    const attackBtn = document.querySelector(`#attack`);
    const quitBtn = document.querySelector(`#quit`);

    /* These variables are assigned later and used to keep track of
    the state of the game. Attacker and defender will end up just being
    the name of the monster for the person who is attacking and the person who
    is defending. DefenderIndex will be 0 or 1, whichever player is not attacking. */
    let attacker;
    let defender;
    let defenderIndex;

    const gameData = {
		cats: ["Keva", "Whispurr"],
		health: [100, 100],
		attack: [5, 15, 25, 35, 50],
        attackMessage: [
            "A very weak attack... -5 HP!",
            "A weak attack... -15 HP!",
            "An attack of -25 HP!",
            "A big attack! -35 HP!",
            "A massive attack! Woah! -50 HP!"
        ],
		defendMessage: [
            "No defense... HP was highly affected!", 
            "Some defense! Partial hit!", 
            "Total defense! HP was not affected!"
        ],
		index: 0
	};

    /* this kicks off the game. Note the attack button starts as hidden, and then is
    only shown at times when the player can attack. I don't want to remove the
    button entirely, as that would require adding the event listener back every time
    the button gets put back on the page. */

    startBtn.addEventListener("click", function(){
        gameData.index = Math.round(Math.random());
        messages.innerHTML = `<p>Get ready! <strong>${gameData.cats[gameData.index]}</strong> was randomly selected to attack first. Click the attack button to see what happens.</p>`;
        attackBtn.className = "showing";
    });

    /* Now that the button is showing, the player can attack */
    attackBtn.addEventListener("click", catAttack);

    /* this is where most of the action takes place */
    function catAttack(){
        
        /* If gameData.index is 1, the statement is true and it must
        be ployer 2's turn. Set the attacker to player 2 and the defender to player 1.
        Set the defenderIndex to zero. If this statement is false, do the opposite. */
        if(gameData.index){
            attacker = gameData.cats[1];
            defender = gameData.cats[0];
            defenderIndex = 0;
        }
        else {
            attacker = gameData.cats[0];
            defender = gameData.cats[1];
            defenderIndex = 1;
        }

        //these generate the random attack of 0-4 and the random defense of 0-2
        const thisAttack = Math.floor(Math.random() * 5);
        const thisdDefense = Math.floor(Math.random() * 3);

        // hide the attack button again, until the next turn.
        attackBtn.className = "hidden";

        //put the correct attack class on the attacking monster
        document.querySelector(`#${attacker}`).className = `attack${thisAttack}`;
        // put the correct message in the message window
        messages.innerHTML = `<p><strong>${attacker}</strong> has completed ${gameData.attackMessage[thisAttack]}</p>`;

        /* wait 2.5 seconds so the CSS attacking animation can finish and the user can
        read the attack message*/
        setTimeout(function(){
            // update the messages div with a defense message.
            messages.innerHTML = `<p><strong>${defender}</strong> has ${gameData.defendMessage[thisdDefense]}</p>`;
            // put the correct defense animation on the defending monster
            document.querySelector(`#${defender}`).className = `defend${thisdDefense}`;

            /* If there is no defense, update the healthbar of the defending monster by subtracting
            total attack from it's current health. If there was partial defense subtract half the
            health. If a 2 was rolled, nothing happens to the healthbar, because it was total defense. */
            if( thisdDefense == 0){
                gameData.health[defenderIndex] = gameData.health[defenderIndex] - gameData.attack[thisAttack];
            } else if( thisdDefense == 1 ){
                gameData.health[defenderIndex] = gameData.health[defenderIndex] - gameData.attack[thisAttack]/2;
            }

            // this variable is used to ensure that the data is convered to a number and is rounded down.
            let health = Math.floor(parseFloat(gameData.health[defenderIndex]));
            /* you can't have less than zero health. That would screw up the health bar, so if the
            health is less than zero, set it to zero. */
            if(health < 0) {health = 0;}
            // Set the width of the healthbar to reflect the correct percentage.
            document.querySelector(`#healthbar${defenderIndex} div`).style.width = `${health}%`;
            // set the number next to the health bar to reflect the correct percentage.
            document.querySelector(`#health${defenderIndex}`).innerHTML = `${health}%`;

            /* check to see if the attacking monster has won, passing in the index of the dending
            monster, so you can check it's health and the name of the attacking monster, so you can
            use it in the message. */
            checkWinningCondition(defenderIndex, attacker);
        }, 2500);
    }

    function checkWinningCondition(enemy, attackingCat){
        //Wait three seconds, so users can read the screen and the animation can finish.
        setTimeout(function(){
            //Remove the animation classes from the monsters...
            cat1.removeAttribute("class");
            cat2.removeAttribute("class");
            /* As before, we need to make sure the health of the defending
            monster is converted into a number and rounded down. */
            const health = Math.floor(parseFloat(gameData.health[enemy]));
            // If the health is less than 1, the winning condition has been met for the attacking monster
            if( health < 1 ){
                /* Set the message about winning */
                messages.innerHTML = `<p><strong>${attackingCat}</strong> has won the battle! Start another battle?</p>`;
                /* create a button for a new battle */
                messages.innerHTML += '<button id="reset">Battle Again</button>';
                /* refresh the page, so everything starts over fresh */
                document.querySelector(`#reset`).addEventListener("click", function(){
                    location.reload();
                });
            } else {
                /* The winning condition has not been met, so switch the player's turn. */
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                // Set the message to reflect that it is the other player's turn
                messages.innerHTML = `<p>It's now <strong>${gameData.cats[gameData.index]}'s</strong> turn!</p>`;
                //turn on the attack button again, so the other player can attack.
                attackBtn.className = "showing";
            }
        }, 3000);
    }
})();
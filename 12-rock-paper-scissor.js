 let score = JSON.parse(localStorage.getItem('score')) || {
            wins: 0,
            lose: 0,
            ties: 0
        };

        updateScore();
        // document.querySelector('.js-result').innerHTML=result;
        // document.querySelector('js-moves').innerHTML=`You picked ${playerMove} ----- Computer picked ${computerMove}`;

        let isAutoPlaying= false;
        let intervalID;

        function autoPlay(){
            if (!isAutoPlaying) {
                intervalID=setInterval(function(){
                 const playerMove= PickComputerMove();
                 playGame(playerMove);
                },1000);

                isAutoPlaying=true;
            }else{
                clearInterval(intervalID);
                isAutoPlaying=false;
            }
        }

        document.querySelector('.js-bt-rock').addEventListener('click',()=>{
            playGame('Rock');
        });

        document.querySelector('.js-bt-paper').addEventListener('click',()=>{
            playGame('Paper');
        })

        document.querySelector('.js-bt-scissor').addEventListener('click',()=>{
            playGame('Scissor');
        })

        document.body.addEventListener('keydown',(event)=>{
            if (event.key === 'r') {
                 playGame('Rock');
            }else if (event.key === 'p') {
                playGame('Paper');
            }else if (event.key === 's') {
                playGame('Scissor');
            }
        })

        function playGame(playerMove) {
            let computerMove = PickComputerMove();

            let result = '';

            if (playerMove === 'Scissor') {
                if (computerMove === 'rock') {
                    result = 'you lose';
                } else if (computerMove === 'paper') {
                    result = 'you won';
                } else if (computerMove === 'scissor') {
                    result = 'tie';
                }
            }
            else if (playerMove === 'Paper') {

                if (computerMove === 'rock') {
                    result = 'you won';
                } else if (computerMove === 'paper') {
                    result = 'tie';
                } else if (computerMove === 'scissor') {
                    result = 'you lose';
                }
            }
            else if (playerMove === 'Rock') {
                if (computerMove === 'rock') {
                    result = 'tie';
                } else if (computerMove === 'paper') {
                    result = 'you lose';
                } else if (computerMove === 'scissor') {
                    result = 'you won';
                }
            }

            if (result === 'you won') {
                score.wins += 1;
            } else if (result === 'you lose') {
                score.lose += 1;
            } else if (result === 'tie') {
                score.ties += 1;
            }

            localStorage.setItem('score', JSON.stringify(score));

            updateScore();
            
            // alert(`you picked ${playerMove}. Computer picked ${computerMove}. ${result}\n Win: ${score.wins} --- Lose: ${score.lose} --- Tie ${score.ties}`);
            document.querySelector('.js-result').innerHTML=`Result: ${result}`;
            document.querySelector('.js-moves').innerHTML=` you
        <img  class="move-icon" src="images/${playerMove}.png" alt="">
        <img  class="move-icon" src="images/${computerMove}.png" alt="">
        computer`;

        }



        function updateScore() {
            document.querySelector('.js-score').innerHTML = `Win: ${score.wins} --- Lose: ${score.lose} --- Tie ${score.ties}`
        }


        function PickComputerMove() {
            let computerMove = '';
            const randomNumber = Math.random();
            if (randomNumber >= 0 && randomNumber < 1 / 3) {

                computerMove = 'rock';
                //  console.log('rock');
            } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
                computerMove = 'paper';
                // console.log('paper');

            } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
                computerMove = 'scissor';
                // console.log('scissor');
                // let computermove= 'scissor';
            }

            return computerMove;
        }
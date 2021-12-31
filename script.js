$( function(){

initialProcess();

function initialProcess(){
    $("body").css("background-color", "black")
    $("#main").css("display", "none");
    let initialCount = 3;
    let initialTimer = setInterval(function(){
        initialCount--;
        $("#initTimer").text(initialCount)
        if(initialCount === 0){
            clearInterval(initialTimer);
            $("#main").css("display", "block");
            $("body").css("background-color", "white")
            $("#initTimer").css("display", "none");
            process();
        }
    }, 1000)
}

function process(){

$("#popup > p").css({display: "block", color: "sandybrown"}).html("Tap the black tiles!");
$("#popup > p").delay(1000).fadeOut(500); 

const size = 4;
let row = 1;
let col = 1;
let pointBar = 10;
let score = 0;
let pointer =  setInterval(DecrementCounter, 100);
let duration = 10;
$("#counter").text(duration);
let gameDur = setInterval(DecrementGameDur, 1000) ;

let highScore = localStorage.getItem("highScore") ;
if(highScore === null || isNaN(highScore))
    highScore = 0;
$("#highScore").text(highScore);

matrix = [ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ];
console.log(matrix);

//initial 1'ing of matrix
i=0;
while(i<3){
    let r1 = Math.floor(Math.random()*4);
    let c1 = Math.floor(Math.random()*4);
    if(matrix[r1][c1] === 0){
        matrix[r1][c1] = 1;
        $(`#tile tr:nth-of-type(${r1+1}) td:nth-of-type(${c1+1})`).css("background-color", "black")
        i++;
    }
}

$("#tile tr td").click(function(){
    currentClicked = this;
    for(r=0; r<size; r++)
        for(c=0; c<size; c++)
            if(matrix[r][c] === 1 && `item${r}${c}` === $(this).attr("id") ){
                $(this).css("background-color", 'rgb(0, 255, 0)');
                $(this).animate({backgroundColor: 'white'}, 300)
                if(pointBar !== 0)
                    $(this).text(`+${pointBar}`);
                score += pointBar;
                $("#score").text(score);

                clearInterval(pointer); //pointer = null;
                pointBar = 11;
                pointer = setInterval(DecrementCounter, 100) ;

                let flush = setTimeout(function(){
                    $(currentClicked).text("");
                    for(rf=0; rf<size; rf++)
                        for(cf=0; cf<size; cf++)
                            $(`#tile tr:nth-of-type(${rf+1}) td:nth-of-type(${cf+1})`).text("");
                }, 400)


                console.log(matrix);
                while(true){
                    let r3 = Math.floor(Math.random()*4);
                    let c3 = Math.floor(Math.random()*4);
                    if(matrix[r3][c3] === 0){
                        matrix[r3][c3] = 1;
                        $(`#tile tr:nth-of-type(${r3+1}) td:nth-of-type(${c3+1})`).animate({backgroundColor: 'black'}, 500)
                        break;
                    }
                }
                matrix[r][c] = 0;
            }
})

function DecrementCounter() {
    if(duration <= 0)
    {
        $(`#tile td`).css("background-color", "white")
        matrix = [ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ];
    }

    pointBar-- ;
    //$("#counter").text(pointBar)
    $("#filledPart").width(`${pointBar*10}%`)
    if(pointBar === 0)
        clearInterval(pointer) //pointer = null ;
}

//Any other way?
function animate_loop() {
    $("#playAgain").animate({fontSize: "5vw"}, 500)
                    .animate({fontSize: "4vw"}, 500);
    animate_loop();
}

function confettiAction(){
    $.confetti.start();
    setTimeout( () => { $.confetti.stop();}, 2000 )
}

function DecrementGameDur(){
    duration--;
    $("#counter").text(duration);
    if(duration === 0){
        clearInterval(gameDur);
        
        if(highScore < score)
        {
            $("#popup > p").css({display: "block", color: "green"}).html("New High Score :)");
            highScore = score;
            localStorage.setItem("highScore", highScore);
            confettiAction();
        }
        else
            $("#popup > p").css({display: "block", color: "red", left: "26vw"}).html("Time is up!");

        $(`#tile td`).css("background-color", "white")
        matrix = [ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ];

        animate_loop();
    }
}
}

})
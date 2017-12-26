var bird;
var pipes;
var score;
var over;
var time;
var xScore = 0;
var record = 0;

function setup() {
    createCanvas(600, 900);
    bird = new Bird();
    pipes = [];
    score = 0;
}

function draw() {
    background(51);

    if (!over) {
        bird.update();
        for (var i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();
        }
    }

    bird.show();

    if (frameCount % 100 == 0) {
        var pipe = new Pipe();
        pipes.push(pipe);
    }

    for (var i = pipes.length - 1; i >= 0; i--) {
        if (pipes[i].x + pipes[i].w < -10) {
            pipes.splice(i, 1);
        } else {
            pipes[i].show();
        }

        if (bird.x == pipes[i].x + pipes[i].w / 2) {
            score++;
        }


        if (bird.hits(pipes[i])) {
            gameOver();
        }
    }

    if (bird.offScreen()) {
        gameOver();
    }

    if (!over) {
        showScore();
        time = millis();

    } else {
        //console.log(time);
        if (millis() >= time + 2000) {
            //frameRate(1);
            showOverScreen();
            gameOver();
            frameRate(5);

            if (xScore < score) {
                showProgress();
            } else {
                showRecord();
            }

        }
    }

}

function keyPressed() {
    bird.jump();
}

function mousePressed() {
    bird.jump();
}

function gameOver() {
    over = true;
    textSize(50);
    stroke(51);
    strokeWeight(4);
    fill(255);
    textAlign(CENTER);
    text("GAME OVER", width / 2, height / 2 - 50);

}

function showScore() {
    textStyle(BOLD);
    textAlign(CENTER);
    textSize(50);
    stroke(51);
    strokeWeight(7);
    fill(255);
    text(score, width / 2, height / 4);
}

function showOverScreen() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 224, 189);
    rect(width / 2, height / 2, 3 * (width / 4), height / 4);
    pop();
}

function showProgress() {
    push();
    textAlign(CENTER);
    textSize(35);
    text("Your score: " + xScore, width / 2, height / 2);
    xScore++;
    pop();
}

function showRecord() {
    push();
    textAlign(CENTER);
    textSize(35);
    text("Your score: " + xScore, width / 2, height / 2);

    //record
    if (xScore > record) {
        text("New record!", width / 2, height / 2 + 40);
    }

    pop();


}
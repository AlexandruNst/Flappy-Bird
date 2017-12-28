var bird;
var pipes;
var score;
var over;
var time;
var xScore = 0;
var record = 0;
var play = false;
var countDown;
var initCountDown = false;

function setup() {
    createCanvas(600, 900);
    //createCanvas(windowWidth, windowHeight);
    bird = new Bird();
    // newGame();
    pipes = [];
    score = 0;
}

function draw() {
    background(51);


    if (play === false) {
        showInitScreen();
    } else if (initCountDown) {
        console.log(countDown);
        frameRate(60);
        if (millis() < countDown + 3000) {
            showCountDown();
            bird.show();
        } else {
            initCountDown = false;
            bird.reset();
            bird.show();
        }
    } else {

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
                frameRate(10);

                if (xScore < score) {
                    showProgress();
                } else {
                    showRecord();
                }

                showResetButton();

            }
        }
    }


}

function keyPressed() {
    if (key == ' ') {
        bird.jump();
    }
}

function gameOver() {
    over = true;
    textSize(50);
    stroke(51);
    strokeWeight(4);
    fill(255);
    textAlign(CENTER);
    text("GAME OVER", width / 2, height / 2 - 60);

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
    stroke(30);
    strokeWeight(4);
    fill(255, 224, 189);
    rect(width / 2, height / 2, 3 * (width / 4), height / 4, 20);
    pop();
}

function showProgress() {
    push();
    textAlign(CENTER);
    textSize(35);
    text("Your score: " + xScore, width / 2, height / 2 - 10);
    xScore++;
    pop();
}

function showRecord() {
    push();
    textAlign(CENTER);
    textSize(35);
    text("Your score: " + xScore, width / 2, height / 2 - 10);

    if (xScore > record) {
        text("New record!", width / 2, height / 2 + 30);
    } else {
        text("Your record: " + record, width / 2, height / 2 + 30);

    }

    pop();
}

function showResetButton() {
    push();
    rectMode(CENTER);
    stroke(51);
    strokeWeight(3);
    fill(234, 192, 134);
    rect(width / 2, height / 2 + 70, 0.7 * (width / 2), 0.5 * height / 8, 15);
    textAlign(CENTER);
    textSize(25);
    fill(255);
    text("Start again", width / 2, height / 2 + 80);
    pop();
}

function newGame() {
    frameRate(60);
    over = false;
    pipes = [];
    bird.reset();
    if (score > record) {
        record = score;
    }
    score = 0;
    xScore = 0;
}

function mousePressed() {
    bird.jump();

    if (!play) {
        if (mouseX >= width / 2 - 0.5 * (0.43 * width) && mouseX <= width / 2 + 0.5 * (0.43 * width)) {
            if (mouseY >= 0.65 * height - 0.5 * (0.11 * height) && mouseY <= 0.65 * height + 0.5 * (0.11 * height)) {
                play = true;
                initCountDown = true;
                countDown = millis();
            }
        }
    }
    if (over) {
        if (mouseX >= width / 2 - 0.5 * (0.7 * (width / 2)) && mouseX <= width / 2 + 0.5 * (0.7 * (width / 2))) {
            if (mouseY >= height / 2 + 80 - 0.5 * (0.5 * height / 8) && mouseY <= height / 2 + 80 + 0.5 * (0.5 * height / 8)) {
                newGame();
                countDown = millis();
                initCountDown = true;

            }
        }
    }
}

function showInitScreen() {
    push();

    textSize(60);
    textAlign(CENTER);
    noStroke();
    fill(255);
    text("Flappy Bird", width / 2, height / 3);
    textSize(25);
    textStyle(ITALIC);
    text("a simplistic view", width / 2, height / 3 + 50);

    textSize(20);
    text("Press 'space' or click the screen to jump", width / 2, height / 2);

    fill(255, 224, 189);
    rectMode(CENTER);
    rect(width / 2, 0.65 * height, 0.43 * width, 0.11 * height, 20);

    stroke(51);
    strokeWeight(4);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    textSize(45);
    fill(255);
    text("Play", width / 2, 0.65 * height);

    pop();
}

function showCountDown() {
    push();

    textSize(100);
    textStyle(BOLD);
    fill(255);
    textAlign(CENTER, CENTER);
    text(3 - (int((millis() - countDown) / 1000)), width / 2, height / 2);

    pop();
}
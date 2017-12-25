var bird;
var pipes;
var score;

function setup() {
    createCanvas(600, 900);
    bird = new Bird();
    pipes = [];
    score = 0;
    //pipe = new Pipe();
}

function draw() {
    background(51);

    if (frameCount % 100 == 0) {
        var pipe = new Pipe();
        pipes.push(pipe);
    }

    for (var i = pipes.length - 1; i >= 0; i--) {
        if (pipes[i].x + pipes[i].w < -10) {
            pipes.splice(i, 1);
        } else {
            pipes[i].show();
            pipes[i].update();
        }

        if (bird.x == pipes[i].x + pipes[i].w / 2) {
            score++;
        }

    }


    bird.show();
    bird.update();

    showScore();

}

function keyPressed() {
    bird.jump();
}

function mousePressed() {
    bird.jump();
}

function gameOver() {
    textSize(30);
    noStroke();
    fill(255);
    text("GAME OVER", width / 2, height / 2);

}

function showScore() {
    textSize(30);
    noStroke();
    fill(255);
    text(score, width / 2, height / 2);
}
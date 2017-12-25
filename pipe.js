function Pipe() {

    this.x = width;
    this.y = 0;
    this.w = 50;
    speed = 3;
    this.blankY = random(40, 600);
    this.blankH = random(height / 5, height / 3);

    this.show = function() {
        noStroke();
        fill(255);
        rect(this.x, this.y, this.w, height);

        fill(51);
        rect(this.x, this.blankY, this.w, this.blankH);

    }

    this.update = function() {
        this.x -= speed;
    }

}
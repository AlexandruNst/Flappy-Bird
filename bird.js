function Bird() {

    this.r = 25;
    this.d = this.r * 2;
    this.x = this.r + 30;
    this.y = height / 2;
    gravity = 1;


    this.show = function() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.d, this.d);
    }

    this.jump = function() {
        gravity = -8;
    }

    this.update = function() {


        if (this.y + this.r >= height) {
            gameOver();
            //this.y = height - this.r;
        } else {
            this.y += gravity;
            gravity += 0.5;
        }
    }
}
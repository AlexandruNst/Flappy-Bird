function Bird() {

    this.r = 25;
    this.d = this.r * 2;
    this.x = this.r + 30;
    this.y = height / 2;
    gravity = 1;


    this.show = function() {
        stroke(51);
        strokeWeight(1);
        fill(255);
        ellipse(this.x, this.y, this.d, this.d);
    }

    this.jump = function() {
        gravity = -8;
    }

    this.update = function() {
        this.y += gravity;
        gravity += 0.5;
    }

    this.hits = function(pipe) {
        if (this.x + this.r >= pipe.x && this.x - this.r <= (pipe.x + pipe.w) && (this.y - this.r <= pipe.blankY || this.y + this.r >= (pipe.blankY + pipe.blankH))) {
            return true;
        }
    }

    this.offScreen = function() {
        if (this.y + this.r >= height) {
            return true;
        }

        return false;
    }
}
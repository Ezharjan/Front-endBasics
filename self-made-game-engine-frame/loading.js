//Progress bar
class LoadingAnimation {

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    rad = Math.PI * 2 / 100;

    text(context, loadVelocity) {
        context.save();
        context.strokeStyle = "#49f";
        context.font = "40px Arial";
        context.strokeText(loadVelocity.toFixed(0) + "%", this.centerX - 25, this.centerY + 10);
        context.stroke();
        context.restore();
    }

    blueCircle(context, loadVelocity) {
        context.save();
        context.beginPath();
        context.strokeStyle = Color.Chartreuse4;
        context.lineWidth = 5;
        context.arc(this.centerX, this.centerY, 100, -Math.PI / 2, -Math.PI / 2 + loadVelocity * this.rad, false);
        context.stroke();
        context.closePath();
        context.restore();
    }

    whiteCircle(context) {
        context.save();
        context.beginPath();
        context.strokeStyle = Color.WHITE;
        context.arc(this.centerX, this.centerY, 100, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
        context.restore();
    }
}


const loadAnimation = new LoadingAnimation();

function animationLoad() {
    loadAnimation.whiteCircle(ctx);
    loadAnimation.text(ctx, loadSpeed);
    loadAnimation.blueCircle(ctx, loadSpeed);
}



//Game background
class Bubles {

    howManyBubles = 13;
    bubles = [];
    bubleWidth = canvas.width;
    bubleHeight = canvas.height;

    bubleBG = new ArcRenderer();

    randomBubles() {
        for (var i = 0; i < this.howManyBubles; i++) {
            this.bubles.push([Math.random() * this.bubleWidth, Math.random() * this.bubleHeight, Math.random() * 100, Math.random() / 2]);
        }
    }

    drawBubleBG() {
        for (var i = 0; i < this.howManyBubles; i++) {
            this.bubleBG.posX = this.bubles[i][0];
            this.bubleBG.posY = this.bubles[i][1];
            this.bubleBG.radius = this.bubles[i][2];
            this.bubleBG.color = 'rgba(255, 255, 255, ' + this.bubles[i][3] + ')';
            this.bubleBG.draw(ctx);
        }
    }
}

const bubleSpawner = new Bubles();
bubleSpawner.randomBubles();
/**
 * By Alxeander Ezharjan
 * 2020/04/05
 */

////Rendering system 
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
const pixelPosX = canvas.width / 2;
const pixelPosY = canvas.height - 30;

var gameLoadable = false;
var loadSpeed = 5;


class BaseRenderer {

    posX = 0;
    posY = 20;
    width = 0;
    height = 0;
    color = '#000000';

    draw(context) {
        context.fillStyle = this.color;
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.rect(0, 0, this.width, this.height);
        context.closePath();
        context.fill();
        this.renderer();
    }

    renderer() {}
}



class InfoRenderer extends BaseRenderer {

    textFont = '16px Arial';
    text = 'Rusher';

    draw(context) {
        context.font = this.textFont;
        context.fillStyle = this.color;
        context.fillText(this.text, this.posX, this.posY);
    }
}

class RectRenderer extends BaseRenderer {

    draw(context) {
        context.beginPath();
        context.rect(this.posX, this.posY, this.width, this.height);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
}

class ArcRenderer extends BaseRenderer {

    posX = canvas.width / 2;
    posY = canvas.height / 2;
    radius = 50;
    startAngel = 0;
    endAngel = Math.PI * 2;
    counterClockWise = false;

    draw(context) {
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius,
            this.startAngel, this.endAngel, this.counterClockWise);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
}



class ImageRenderer extends BaseRenderer {

    source = null;
    width = 100;
    height = 100;

    draw(context) {
        var image = new Image();
        image.src = this.source;
        context.drawImage(image, this.posX, this.posY, this.width, this.height);
    }

}


////Physical system 
class Collider {

    isBorder(targetPosX, targetPosY, targetWidth, targetHeight, colliderWidth, colliderHeight) {
        if (targetPosX == 0 || targetPosX == (colliderWidth - targetWidth + 1) ||
            targetPosY == (colliderHeight - targetHeight + 1) || targetPosY == 0) {
            console.log("You arrived at border!");
            return true;
        }
    }

    collidedWithSame(targetPosX, targetPosY, targetWidth, colliderX, colliderY, colliderWidth, colliderHeight) {
        if ((targetPosX >= (colliderX - targetWidth) &&
                targetPosX <= (colliderX + colliderWidth)) &&
            (targetPosY >= (colliderY - colliderHeight) &&
                (targetPosY <= colliderY + colliderHeight))
        ) {
            return true;
        } else {
            return false;
        }
    }

    collidedWidthDiff(targetPosX, targetPosY, colliderWidth, colliderHeight, redLine) {

        if (Math.sqrt(((targetPosX - colliderWidth) * (targetPosX - colliderWidth) -
                (targetPosY - colliderHeight) * (targetPosY - colliderHeight))) < redLine) {
            return true;
        } else {
            return false;
        }
    }

    isInsideRect(point, rectangle) {
        return (
            point.x >= rectangle.x &&
            point.x <= rectangle.x + rectangle.width &&
            point.y >= rectangle.y &&
            point.y <= rectangle.y + rectangle.height
        );
    }
}


var gameState = State.loading;
var canStart = false; //Production mode
// var canStart = true; //Dev mode


class BaseBehaviour {

    loadSpeed = 0.1;


    CollectData(allData) {
        for (let i = allData.length; i < allData.length; i--) {
            console.log('test', i);
        }
    }

    StateMachine() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (loadSpeed < 100) {
            gameState = State.loading;
            loadSpeed += 0.8;
        } else {
            window.canStart = true;
            gameState = State.updating;
        }

        switch (gameState) {
            case State.loading:
                behaviour.loadAssests();
                break;
            case State.updating:
                behaviour.onUpdate();
                break;
            case 3:
                break;
            default:
                break;
        }
    }

    downloadFile(url) {
        try {
            var content = "http://127.0.0.1:88/test1.png";
            var data = new Blob([content], { type: "text/plain;charset=UTF-8" });
            var downloadUrl = window.URL.createObjectURL(data);
            var anchor = document.createElement("a");
            anchor.href = downloadUrl;
            anchor.download = "test1.png";
            anchor.click();
            window.URL.revokeObjectURL(data);
        } catch (e) {
            window.alert("下载异常！");
        }
    }

    loadAssests() {
        (typeof animationLoad != 'undefined') && animationLoad();
        behaviour.onStart()
    }

    onStart(callback) {
        const gameLogo = new LogoLoad();
        setTimeout(gameLogo.loadGame, assestsLoadedTime * 20);
        gameLoadable && callback();
        canStart && callback();
    }

    onUpdate() {}

    onInputDetect(ractanglePoints) {
        window.addEventListener('click', function(e) {
            const mouseGlobalX = e.offsetX;
            const mouseGlobalY = e.offsetY;
            console.log(mouseGlobalX + " : " + mouseGlobalY);
            if (mouseGlobalX > 252 && mouseGlobalX < 332 &&
                mouseGlobalY > 282 && mouseGlobalY < 322) {
                document.getElementById('succeed_music').play();
                alert("Yes! You are right! ");
            } else if (mouseGlobalX > 91 && mouseGlobalX < 168 &&
                mouseGlobalY > 282 && mouseGlobalY < 322) {
                rightButton.color = Color.PURE_RED;
                leftButton.color = Color.Tan4;
                document.getElementById('failed_music').play();
                alert("Sorry! You are wrong!");
            }
            return [mouseGlobalX, mouseGlobalY];
        });
    }

    onDestroy() {}

    onGameOver() {
        if (gameOver) {
            return;
        }
    }
}


var behaviour = new BaseBehaviour();

function startGame() {

    if (!canStart) {
        behaviour.StateMachine();
    } else {
        game.onUpdate();
    }
    requestAnimationFrame(startGame);
}
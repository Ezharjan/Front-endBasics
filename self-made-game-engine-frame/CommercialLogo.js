////Commercialization
var assestsLoadedTime = 2;
class LogoLoad {

    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    constructor() {
        var startImage = new Image();
        startImage.src = "assests/welcome.png";
        var originalImageData = null;
        var interval = null;
        startImage.onload = function() {
            ctx.drawImage(startImage, 0, 0, startImage.width, startImage.height,
                0, 0, canvas.width, canvas.height);
            originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
    }


    loadGame() {
        var loadLogo = new LogoLoad();
        loadLogo.fadeOut(ctx, ctx.getImageData(0, 0, canvas.width, canvas.height),
            0, 0, assestsLoadedTime * 9, assestsLoadedTime * 18);
    }

    fadeOut(context, imageData, pixelPosX, pixelPosY, steps, millisecondsPerStep) {

        var frame = 0;
        var length = imageData.data.length;

        var logoLoad = new LogoLoad();

        var that = this;
        var interval = setInterval(function() {
            frame++;
            if (frame > steps) {
                that.logoDies(interval);
                // Game is startable now
                // gameLoadable = true;
                canStart = true;
            } else {
                logoLoad.increaseTransperency(imageData, steps);
                context.putImageData(imageData, pixelPosX, pixelPosY);
            }
        }, millisecondsPerStep);
    }

    logoDies(logoLoadedTime) {
        return clearInterval(logoLoadedTime);
    }

    increaseTransperency(imageData, steps) {
        var alpha;
        var currentAlpha;
        var alphaStep;
        var length = imageData.data.length;

        for (var i = 3; i < length; i += 4) {

            alpha = this.originalImageData.data[i];

            if (alpha > 0 && imageData.data[i] > 0) {
                currentAlpha = imageData.data[i];
                alphaStep = Math.ceil(alpha / steps);
                if (currentAlpha - alphaStep > 0) {
                    imageData.data[i] -= alphaStep;
                } else {
                    imageData.data[i] = 0;
                }
            }
        }
    }
}
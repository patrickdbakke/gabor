"use strict";
Gabor.prototype.startLevel = function(numPatches, difficulty, callback) {
    var that = this;
    this.difficulty = difficulty;
    that.$emit("levelStart", difficulty);
    var size = Math.max(this.width, this.height) / 8 / 2;
    function makePatches(){
        that.patches = [];
        for(var i = 0; i< numPatches; i++){
            var patch = {
                size: size * (2 / Math.max((Math.log(2 * difficulty) + 1), 1)),
                lambda: Math.floor(1/(Math.log(difficulty) + 1) * 10 * Math.random()) + 1,
                theta: Math.random() * 360,
                phase: 0.5,
                x: (that.width * 0.05 + Math.random() * (that.width - size - that.width * 0.05)),
                y: (that.height * 0.05 + Math.random() * (that.height - size - that.height * 0.05)),
            };
            patch.image = that.patch(patch.size, patch.lambda, patch.theta, patch.phase, {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            });
            patch.image2 = that.patch(patch.size, patch.lambda, patch.theta, (patch.phase + 0.5) % 1, {
                r: 255,
                g: 255,
                b: 255,
                a: 1
            });
            that.patches.push(patch);
        }
    }
    function drawPatches(firstDraw) {
        that.context.clearRect ( 0 , 0 , that.width, that.height );
        _.each(that.patches, function(patch){
            var img = new Image();
            img.src = patch.image;
            that.context.drawImage(img, patch.x, patch.y, patch.size, patch.size);
            img.src = patch.image2;
            that.context.drawImage(img, patch.x, patch.y, patch.size, patch.size);
        });
        if (firstDraw && typeof callback === "function") {
            callback();
        }
    }
    function onClick(event){
        var hitPatch = getHitPatch(event);
        if (hitPatch) {
            that.$emit("hit", hitPatch, difficulty);
            that.patches = _.reject(that.patches, hitPatch);
        } else {
            that.$emit("miss", difficulty);
        }
        drawPatches();
        checkVictory();
    }
    function checkVictory(){
        if(that.patches.length < 1){
            that.$emit("levelFinish", that.difficulty);
        }
    }
    function getHitPatch(event){
        var hitPatch = false;
        _.each(that.patches, function(patch){
            if(distance(patch.x, patch.y, event.offsetX, event.offsetY) < patch.size){
                hitPatch = patch;
            }
        });
        return hitPatch;
    }
    function distance(x1, y1, x2, y2){
        return Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 -y2) * (y1 -y2)));
    }
    this.$off("click");
    this.$on("click", onClick);
    makePatches();
    drawPatches(true);
};
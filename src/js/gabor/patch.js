"use strict";
/*
Gabor Patch
	size: image size (n x n)
	lambda: spatial frequency (px per cycle)
	theta: grating orientation in degrees
	phase: 0 to 1 inclusive
*/
Gabor.prototype.patch = function(size, lambda, theta, phase, color) {
    color = color || {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    };
    lambda = lambda || 0.000001;
    size = Math.max(size, 200);

    function linspace(start, stop, num) {
        var arr = [];
        for (var i = 0; i < num; i += (stop - start) / (num - 1)) {
            arr.push(i);
        }
        return arr;
    }

    function meshGrid(a, b) {
        var i, j,
            c = [],
            d = [];
        for (i = 0; i < a.length; i++) {
            c.push(a);
        }
        for (i = 0; i < b.length; i++) {
            var e = [];
            for (j = 0; j < a.length; j++) {
                e.push(b[i]);
            }
            d.push(e);
        }
        return [c, d];
    }

    /* jshint ignore:start */
    function matrixMultiply(m1, m2) {
        var j, result = [];
        for (j = 0; j < m2.length; j++) {
            result[j] = [];
            for (var k = 0; k < m1[0].length; k++) {
                var sum = 0;
                for (var i = 0; i < m1.length; i++) {
                    sum += m1[i][k] * m2[j][i];
                }
                result[j].push(sum);
            }
        }
        return result;
    }
    /* jshint ignore:end */

    function matrixPairwiseMultiply(m1, m2) {
        var i, j, result = [];
        for (i = 0; i < m1.length; i++) {
            result[i] = [];
            for (j = 0; j < m2.length; j++) {
                result[i][j] = m1[i][j] * m2[i][j];
            }
        }
        return result;
    }

    var i, j;
    var lin = linspace(1, size, size);
    for (i = 0; i < lin.length; i++) {
        lin[i] = (lin[i] / size) - 0.5;
    }
    // Set wavelength and phase
    var freq = size / lambda;
    var phaseRad = phase * 2 * Math.PI;

    // Make 2D grating
    var m = meshGrid(lin, lin);
    var Xm = m[0],
        Ym = m[1];
    // Change orientation by adding Xm and Ym together in different proportions
    var thetaRad = (theta / 360) * 2 * Math.PI;


    var grating = [];

    var canv = document.createElement("canvas");
    var ctx = canv.getContext('2d');
    canv.width = ctx.width = size;
    canv.height = ctx.height = size;

    //use an image for the gaussian, because the math is too slow;
    ctx.drawImage(this.gaussian, 0, 0, size, size);
    var gauss = [];
    for (i = 0; i < Xm.length; i++) {
        grating[i] = [];
        gauss[i] = [];
        for (j = 0; j < Xm[i].length; j++) {
            grating[i][j] = Math.sin((Xm[i][j] * Math.cos(thetaRad) + Ym[i][j] * Math.sin(thetaRad)) * freq * 2 * Math.PI + phaseRad);
            gauss[i][j] = ctx.getImageData(i, j, 1, 1).data[0] / 255;
        }
    }
    ctx.clearRect(0, 0, size, size);
    
    var pix = ctx.createImageData(1, 1);
    var pixel = pix.data;
    var gab = matrixPairwiseMultiply(grating, gauss);
    for (i = 0; i < Xm.length; i++) {
        for (j = 0; j < Xm[i].length; j++) {
            pixel[0] = color.r;
            pixel[1] = color.g;
            pixel[2] = color.b;
            pixel[3] = gab[i][j] * color.a * 255 * 0.5;
            ctx.putImageData(pix, i, j);
        }
    }
    return canv.toDataURL();
};

define([
    "dojo/_base/declare",
    '/poltDraw/ext/cn.js'
], function (declare,cn) {
    return declare("plot.ext.AttackArrow", [cn], {
        headHeightFactor : 0.18,
        headWidthFactor: 0.3,
        neckHeightFactor: 0.85,
        neckWidthFactor: 0.15,
        headTailFactor: 0.8,
        constructor: function (pts) {
            console.log("plot.ext.cn");
            this.setPoints(pts);
        },
        getFgc :function(){
            return 3;
        },
        fw:function(){
            if (this.getFgb() < 2){
                return;
            }
            this.rings = [];
            if (this.getFgb() == 2){
                this.addRing(this.getPoints());
                return;
            }
            var pnts = this.getPoints();
            var tailLeft = pnts[0];
            var tailRight = pnts[1];
            if (this.c0.fi(pnts[0], pnts[1], pnts[2])){
                tailLeft = pnts[1];
                tailRight = pnts[0];
            }
            var midTail = this.c0.fc(tailLeft, tailRight);
            var bonePnts = [midTail].concat(pnts.slice(2));
            var headPnts = this.fx(bonePnts, tailLeft, tailRight);
            var neckLeft = headPnts[0];
            var neckRight = headPnts[4];
            var tailWidthFactor = (this.c0.fa(tailLeft, tailRight) / this.c0.fd(bonePnts));
            var bodyPnts = this.fy(bonePnts, neckLeft, neckRight, tailWidthFactor);
            var count = bodyPnts.length;
            var leftPnts = [tailLeft].concat(bodyPnts.slice(0, (count / 2)));
            leftPnts.push(neckLeft);
            var rightPnts = [tailRight].concat(bodyPnts.slice((count / 2), count));
            rightPnts.push(neckRight);
            leftPnts = this.c0.fv(leftPnts);
            rightPnts = this.c0.fv(rightPnts);
            var pts=leftPnts.concat(headPnts, rightPnts.reverse());
            pts.push(pts[0]);
            this.addRing(pts);
        },
        fx:function(points, tailLeft, tailRight){
            var len = this.c0.fd(points);
            var headHeight = (len * this.headHeightFactor);
            var headPnt = points[(points.length - 1)];
            len = this.c0.fa(headPnt, points[(points.length - 2)]);
            var tailWidth = this.c0.fa(tailLeft, tailRight);
            if (headHeight > (tailWidth * this.headTailFactor)){
                headHeight = (tailWidth * this.headTailFactor);
            }
            var headWidth = (headHeight * this.headWidthFactor);
            var neckWidth = (headHeight * this.neckWidthFactor);
            headHeight = (((headHeight > len)) ? len : headHeight);
            var neckHeight = (headHeight * this.neckHeightFactor);
            var headEndPnt = this.c0.fl(points[(points.length - 2)], headPnt, 0, headHeight, true);
            var neckEndPnt = this.c0.fl(points[(points.length - 2)], headPnt, 0, neckHeight, true);
            var headLeft = this.c0.fl(headPnt, headEndPnt, this.c0.HALF_PI, headWidth, false);
            var headRight = this.c0.fl(headPnt, headEndPnt, this.c0.HALF_PI, headWidth, true);
            var neckLeft = this.c0.fl(headPnt, neckEndPnt, this.c0.HALF_PI, neckWidth, false);
            var neckRight = this.c0.fl(headPnt, neckEndPnt, this.c0.HALF_PI, neckWidth, true);
            return ([neckLeft, headLeft, headPnt, headRight, neckRight]);
        },
        fy:function(points, neckLeft, neckRight, tailWidthFactor){
            var angle;
            var w;
            var left;
            var right;
            var allLen = this.c0.fb(points);
            var len = this.c0.fd(points);
            var tailWidth = (len * tailWidthFactor);
            var neckWidth = this.c0.fa(neckLeft, neckRight);
            var widthDif = ((tailWidth - neckWidth) / 2);
            var tempLen = 0;
            var leftBodyPnts = [];
            var rightBodyPnts = [];
            var i = 1;
            while (i < (points.length - 1)) {
                angle = (this.c0.fh(points[(i - 1)], points[i], points[(i + 1)]) / 2);
                tempLen = (tempLen + this.c0.fa(points[(i - 1)], points[i]));
                w = (((tailWidth / 2) - ((tempLen / allLen) * widthDif)) / Math.sin(angle));
                left = this.c0.fl(points[(i - 1)], points[i], (Math.PI - angle), w, true);
                right = this.c0.fl(points[(i - 1)], points[i], angle, w, false);
                leftBodyPnts.push(left);
                rightBodyPnts.push(right);
                i++;
            }
            return (leftBodyPnts.concat(rightBodyPnts));
        }
    });
}) ;
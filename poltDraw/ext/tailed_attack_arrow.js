
define([
    "dojo/_base/declare",
    '/poltDraw/ext/attack_arrow.js'
], function (declare,AttackArrow) {
    return declare("plot.ext.tailed_attack_arrow", [AttackArrow], {
        amapPoint:null,
        acNumber:0.1,
        adNumber:1,
        constructor: function (pts) {
            console.log("plot.ext.tailed_attack_arrow");
            this.setPoints(pts);
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
            var tailWidth = this.c0.fa(tailLeft, tailRight);
            var allLen = this.c0.fd(bonePnts);
            var len = ((allLen * this.acNumber) * this.adNumber);
            this.amapPoint = this.c0.fl(bonePnts[1], bonePnts[0], 0, len, true);
            var factor = (tailWidth / allLen);
            var bodyPnts = this.fy(bonePnts, neckLeft, neckRight, factor);
            var count = bodyPnts.length;
            var leftPnts = [tailLeft].concat(bodyPnts.slice(0, (count / 2)));
            leftPnts.push(neckLeft);
            var rightPnts = [tailRight].concat(bodyPnts.slice((count / 2), count));
            rightPnts.push(neckRight);
            leftPnts = this.c0.fv(leftPnts);
            rightPnts = this.c0.fv(rightPnts);
            this.addRing(leftPnts.concat(headPnts, rightPnts.reverse(), [this.amapPoint, leftPnts[0]]));
        }
    });
}) ;
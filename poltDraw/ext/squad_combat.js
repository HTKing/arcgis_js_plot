
define([
    "dojo/_base/declare",
    '/poltDraw/ext/attack_arrow.js'
], function (declare,AttackArrow) {
    return declare("plot.ext.squadcombat", [AttackArrow], {
        atoop:0.1,
        constructor: function (pts) {
            console.log("plot.ext.squadcombat");
            this.setPoints(pts);
        },
        getFgc :function(){
            return 2;
        },
        fw:function(){
            if (this.getFgb() < 2){
                return;
            }
            this.rings = [];
            var pnts = this.getPoints();
            var tailPnts = this.fa(pnts);
            var headPnts = this.fx(pnts, tailPnts[0], tailPnts[1]);
            var neckLeft = headPnts[0];
            var neckRight = headPnts[4];
            var bodyPnts = this.fy(pnts, neckLeft, neckRight, this.atoop);
            var count = bodyPnts.length;
            var leftPnts = [tailPnts[0]].concat(bodyPnts.slice(0, (count / 2)));
            leftPnts.push(neckLeft);
            var rightPnts = [tailPnts[1]].concat(bodyPnts.slice((count / 2), count));
            rightPnts.push(neckRight);
            leftPnts = this.c0.fv(leftPnts);
            rightPnts = this.c0.fv(rightPnts);
            var pts=leftPnts.concat(headPnts, rightPnts.reverse());
            pts.push(pts[0]);
            this.addRing(pts);
        },
        fa:function(points, tailLeft, tailRight) {
            var allLen = this.c0.fd(points);
            var tailWidth = (allLen * this.atoop);
            var tailLeft = this.c0.fl(points[1], points[0], this.c0.HALF_PI, tailWidth, false);
            var tailRight = this.c0.fl(points[1], points[0], this.c0.HALF_PI, tailWidth, true);
            return ([tailLeft, tailRight]);
        }
    });
}) ;
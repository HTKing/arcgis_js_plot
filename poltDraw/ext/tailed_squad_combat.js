/**
 * Created by chenzpa on 2015/10/30.
 */
define([
    "dojo/_base/declare",
    '/poltDraw/ext/attack_arrow.js'
], function (declare,AttackArrow) {
    return declare("plot.ext.tailedsquadcombat", [AttackArrow], {
        af:0.1,
        ag:1,
        constructor: function (pts) {
            console.log("plot.ext.tailed_squad_combat");
            this.setPoints(pts);
        },
        getFgc :function(){
            return 2;
        },
        fw:function(){
            if (this.getFgb() < 2){
                return;
            };
            this.rings = [];
            var pnts = this.getPoints();
            var tailPnts = this.fz(pnts);
            var headPnts = this.fx(pnts, tailPnts[0], tailPnts[2]);
            var neckLeft = headPnts[0];
            var neckRight = headPnts[4];
            var bodyPnts = this.fy(pnts, neckLeft, neckRight, this.af);
            var count = bodyPnts.length;
            var leftPnts = [tailPnts[0]].concat(bodyPnts.slice(0, (count / 2)));
            leftPnts.push(neckLeft);
            var rightPnts = [tailPnts[2]].concat(bodyPnts.slice((count / 2), count));
            rightPnts.push(neckRight);
            leftPnts = this.c0.fv(leftPnts);
            rightPnts =this.c0.fv(rightPnts);
            this.addRing(leftPnts.concat(headPnts, rightPnts.reverse(), [tailPnts[1], leftPnts[0]]));
        },
        fz:function(points, tailLeft, tailRight) {
            var allLen = this.c0.fd(points);
            var tailWidth = (allLen * this.af);
            var tailLeft = this.c0.fl(points[1], points[0], this.c0.HALF_PI, tailWidth, false);
            var tailRight = this.c0.fl(points[1], points[0],  this.c0.HALF_PI, tailWidth, true);
            var len = (tailWidth * this.ag);
            var swallowTailPnt = this.c0.fl(points[1], points[0], 0, len, true);
            return ([tailLeft, swallowTailPnt, tailRight]);
        }
    });
}) ;
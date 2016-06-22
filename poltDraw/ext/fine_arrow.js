define([
    "dojo/_base/declare",
    '/poltDraw/ext/cs.js',
    '/poltDraw/ext/cn.js',
    '/poltDraw/ext/cu.js'
], function (declare,cs,cn,cu) {
    return declare("plot.ext.finearrow", [cu,cs,cn], {
        constructor: function (pts) {
            console.log("plot.ext.finearrow");
            this.inherited(arguments);
        },
        aaa: 0.15,
        aac: 0.2,
        aab: 0.25,
        aad: 0.369599135716446,
        aae: 0.241660973353061,
        ga:function(){
            return (2);
        },
        fw:function(){
            this.rings = [];
            var pnts = this.getPoints();
            var pnt1 = pnts[0];
            var pnt2 = pnts[1];
            var len = this.c0.fd(pnts);
            var tailWidth = (len * this.aaa);
            var neckWidth = (len * this.aac);
            var headWidth = (len * this.aab);
            var tailLeft = this.c0.fl(pnt2, pnt1, this.c0.HALF_PI, tailWidth, true);
            var tailRight = this.c0.fl(pnt2, pnt1, this.c0.HALF_PI, tailWidth, false);
            var headLeft = this.c0.fl(pnt1, pnt2, this.aad, headWidth, false);
            var headRight = this.c0.fl(pnt1, pnt2, this.aad, headWidth, true);
            var neckLeft = this.c0.fl(pnt1, pnt2, this.aae, neckWidth, false);
            var neckRight = this.c0.fl(pnt1, pnt2, this.aae, neckWidth, true);
            var pList = [tailLeft, neckLeft, headLeft, pnt2, headRight, neckRight, tailRight];
            pList.push(pList[0]);
            this.addRing(pList);
        }
    });
}) ;
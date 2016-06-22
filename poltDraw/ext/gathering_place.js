define([
    "dojo/_base/declare",
    '/poltDraw/ext/cs.js',
    '/poltDraw/ext/cn.js',
    '/poltDraw/ext/cu.js'
], function (declare,cs,cn,cu) {
    return declare("plot.ext.gatheringplace", [cu,cs,cn], {
        constructor: function (pts) {
            console.log("plot.ext.gatheringplace");
            this.inherited(arguments);
        },
        ga:function(){
            return (3);
        },
        getFgc:function(){
            return 2;
        },
        fw:function(){
            var mid;
            var d;
            var pnt;
            var pnt1;
            var pnt2;
            var pnt3;
            var normalPoints;
            var t;
            this.rings = [];
            var pnts = this.getPoints().slice();
            if (this.getFgb() == 2){
                mid = this.c0.fc(pnts[0], pnts[1]);
                d = (this.c0.fa(pnts[0], mid) / 0.9);
                pnt = this.c0.fl(pnts[0], mid, this.c0.HALF_PI, d, true);
                pnts = [pnts[0], pnt, pnts[1]];
            }
            mid = this.c0.fc(pnts[0], pnts[2]);
            pnts.push(mid, pnts[0], pnts[1]);
            var normals = [];
            var i=0;
            while (i < (pnts.length - 2)) {
                pnt1 = pnts[i];
                pnt2 = pnts[(i + 1)];
                pnt3 = pnts[(i + 2)];
                normalPoints = this.c0.fn(0.4, pnt1, pnt2, pnt3);
                normals = normals.concat(normalPoints);
                i++;
            }
            var count = normals.length;
            normals = [normals[(count - 1)]].concat(normals.slice(0, (count - 1)));
            var pList = [];
            i = 0;
            while (i < (pnts.length - 2)) {
                pnt1 = pnts[i];
                pnt2 = pnts[(i + 1)];
                pList.push(pnt1);
                t = 0;
                while (t <= this.c0.FITTING_COUNT) {
                    pnt = this.c0.fk((t / this.c0.FITTING_COUNT), pnt1, normals[(i * 2)], normals[((i * 2) + 1)], pnt2);
                    pList.push(pnt);
                    t++;
                };
                pList.push(pnt2);
                i++;
            };
            this.addRing(pList);
        }
    });
}) ;
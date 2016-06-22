define([
    "dojo/_base/declare",
    '/poltDraw/ext/cn.js'
], function (declare,cn) {
    return declare("plot.ext.gatheringplace", [cn], {
        constructor: function (pts) {
            console.log("plot.ext.gatheringplace");
            this.inherited(arguments);
        },
        fw:function(){
            var pnts;
            var normals;
            var i=0;
            var count=0;
            var pList;
            var normalPoints;
            var pnt1;
            var pnt2;
            var t;
            var pnt;
            this.rings = [];
            if (this.getFgb() == 2){
                this.addRing(this.getPoints());
            } else {
                pnts = this.getPoints().slice();
                pnts.push(pnts[0], pnts[1]);
                normals = [];
                i = 0;
                while (i < (pnts.length - 2)) {
                    normalPoints = this.c0.fn(0.3, pnts[i], pnts[(i + 1)], pnts[(i + 2)]);
                    normals = normals.concat(normalPoints);
                    i++;
                }
                count = normals.length;
                normals = [normals[(count - 1)]].concat(normals.slice(0, (count - 1)));
                pList = [];
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
                    }
                    pList.push(pnt2);
                    i++;
                }
                this.addRing(pList);
            }
        }
    });
}) ;

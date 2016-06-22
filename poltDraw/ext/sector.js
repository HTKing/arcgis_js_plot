define([
    "dojo/_base/declare",
    '/poltDraw/ext/cs.js',
    '/poltDraw/ext/cn.js',
    '/poltDraw/ext/cu.js'
], function (declare,cs,cn,cu) {
    return declare("plot.ext.sector", [cu,cs,cn], {
        constructor: function (pts) {
            console.log("plot.ext.cn");
            this.inherited(arguments);
        },
        ga:function(){
            return (3);
        },
        getFgc :function(){
            return 3;
        },
        fw:function(){
            var pnts=[];
            var center;
            var pnt2;
            var pnt3;
            var radius;
            var startAngle;
            var endAngle;
            var pList;
            this.rings = [];
            if (this.getFgb() == 2){
                this.addRing(this.getPoints());
            } else {
                pnts = this.getPoints();
                center = pnts[0];
                pnt2 = pnts[1];
                pnt3 = pnts[2];
                radius = this.c0.fa(pnt2, center);
                startAngle = this.c0.fg(pnt2, center);
                endAngle = this.c0.fg(pnt3, center);
                pList = this.c0.fm(center, radius, startAngle, endAngle);
                pList.push(center, pList[0]);
                this.addRing(pList);
            }
        }
    });
}) ;
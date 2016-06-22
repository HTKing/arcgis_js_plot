define([
    "dojo/_base/declare",
    'esri/geometry/Point',
    '/poltDraw/ext/cs.js',
    '/poltDraw/ext/cn.js',
    '/poltDraw/ext/cu.js'
], function (declare,MapPoint,cs,cn,cu) {
    return declare("plot.ext.double_arrow", [cu,cs,cn], {
        constructor: function (pts) {
            console.log("plot.ext.double_arrow");
            this.inherited(arguments);
        },
        ax: 0.25,
        ay: 0.3,
        az: 0.85,
        au: 0.15,
        av: null,
        aw: null,
        ga:function(){
            return (4);
        },
        getFgc :function(){
            return 3;
        },
        fg:function(){
            if ((((this.getFgb() === 3)) && this.aw != null)){
                this.getPoints().push(this.aw);
            }
            if (this.av != null){
                this.getPoints().push(this.av);
            }
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
            var pnt1 = this.getPoints()[0];
            var pnt2 = this.getPoints()[1];
            var pnt3 = this.getPoints()[2];
            if (this.getFgb() == 3){
                this.aw = this.fd(pnt1, pnt2, pnt3);
            } else {
                this.aw = this.getPoints()[3];
            }
            if ((((this.getFgb() == 3)) || ((this.getFgb() == 4)))){
                this.av = this.c0.fc(pnt1, pnt2);
            } else {
                this.av = this.getPoints()[4];
            }
            var leftArrowPnts = [];
            var rightArrowPnts = [];
            if (this.c0.fi(pnt1, pnt2, pnt3)){
                leftArrowPnts = this.fa(pnt1, this.av, this.aw, false);
                rightArrowPnts = this.fa(this.av, pnt2, pnt3, true);
            } else {
                leftArrowPnts = this.fa(pnt2, this.av, pnt3, false);
                rightArrowPnts = this.fa(this.av, pnt1, this.aw, true);
            }
            var m = leftArrowPnts.length;
            var t = ((m - 5) / 2);
            var llBodyPnts = leftArrowPnts.slice(0, t);
            var lArrowPnts = leftArrowPnts.slice(t, (t + 5));
            var lrBodyPnts = leftArrowPnts.slice((t + 5), m);
            var rlBodyPnts = rightArrowPnts.slice(0, t);
            var rArrowPnts = rightArrowPnts.slice(t, (t + 5));
            var rrBodyPnts = rightArrowPnts.slice((t + 5), m);
            rlBodyPnts = this.c0.fs(rlBodyPnts);
            var bodyPnts = this.c0.fs(rrBodyPnts.concat(llBodyPnts.slice(1)));
            lrBodyPnts = this.c0.fs(lrBodyPnts);
            var pnts = rlBodyPnts.concat(rArrowPnts, bodyPnts, lArrowPnts, lrBodyPnts);
            pnts.push(pnts[0]);
            this.addRing(pnts);
        },
        fa:function(pnt1, pnt2, pnt3, clockWise){
            var midPnt = this.c0.fc(pnt1, pnt2);
            var len = this.c0.fa(midPnt, pnt3);
            var midPnt1 = this.c0.fl(pnt3, midPnt, 0, (len * 0.3), true);
            var midPnt2 = this.c0.fl(pnt3, midPnt, 0, (len * 0.5), true);
            midPnt1 = this.c0.fl(midPnt, midPnt1, this.c0.HALF_PI, (len / 5), clockWise);
            midPnt2 = this.c0.fl(midPnt, midPnt2, this.c0.HALF_PI, (len / 4), clockWise);
            var points = [midPnt, midPnt1, midPnt2, pnt3];
            var arrowPnts = this.fb(points);
            var neckLeftPoint = arrowPnts[0];
            var neckRightPoint = arrowPnts[4];
            var tailWidthFactor = ((this.c0.fa(pnt1, pnt2) / this.c0.fd(points)) / 2);
            var bodyPnts = this.fc(points, neckLeftPoint, neckRightPoint, tailWidthFactor);
            var n = bodyPnts.length;
            var lPoints = bodyPnts.slice(0, (n / 2));
            var rPoints = bodyPnts.slice((n / 2), n);
            lPoints.push(neckLeftPoint);
            rPoints.push(neckRightPoint);
            lPoints = lPoints.reverse();
            lPoints.push(pnt2);
            rPoints = rPoints.reverse();
            rPoints.push(pnt1);
            return (lPoints.reverse().concat(arrowPnts, rPoints));
        },
        fb:function(points){
            var len = this.c0.fd(points);
            var headHeight = (len * this.ax);
            var headPnt = points[(points.length - 1)];
            var headWidth = (headHeight * this.ay);
            var neckWidth = (headHeight * this.au);
            var neckHeight = (headHeight * this.az);
            var headEndPnt = this.c0.fl(points[(points.length - 2)], headPnt, 0, headHeight, true);
            var neckEndPnt = this.c0.fl(points[(points.length - 2)], headPnt, 0, neckHeight, true);
            var headLeft = this.c0.fl(headPnt, headEndPnt, this.c0.HALF_PI, headWidth, false);
            var headRight = this.c0.fl(headPnt, headEndPnt, this.c0.HALF_PI, headWidth, true);
            var neckLeft = this.c0.fl(headPnt, neckEndPnt, this.c0.HALF_PI, neckWidth, false);
            var neckRight = this.c0.fl(headPnt, neckEndPnt, this.c0.HALF_PI, neckWidth, true);
            return ([neckLeft, headLeft, headPnt, headRight, neckRight]);
        },
        fc:function(points, neckLeft, neckRight, tailWidthFactor){
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
        },
        fd: function(linePnt1, linePnt2, point){
            var symPnt;
            var distance1;
            var distance2;
            var mid;
            var midPnt = this.c0.fc(linePnt1, linePnt2);
            var len = this.c0.fa(midPnt, point);
            var angle = this.c0.fh(linePnt1, midPnt, point);
            if (angle < this.c0.HALF_PI){
                distance1 = (len * Math.sin(angle));
                distance2 = (len * Math.cos(angle));
                mid = this.c0.fl(linePnt1, midPnt, this.c0.HALF_PI, distance1, false);
                symPnt = this.c0.fl(midPnt, mid, this.c0.HALF_PI, distance2, true);
            } else {
                if ((((angle >= this.c0.HALF_PI)) && ((angle < Math.PI)))){
                    distance1 = (len * Math.sin((Math.PI - angle)));
                    distance2 = (len * Math.cos((Math.PI - angle)));
                    mid = this.c0.fl(linePnt1, midPnt, this.c0.HALF_PI, distance1, false);
                    symPnt = this.c0.fl(midPnt, mid, this.c0.HALF_PI, distance2, false);
                } else {
                    if ((((angle >= Math.PI)) && ((angle < (Math.PI * 1.5))))){
                        distance1 = (len * Math.sin((angle - Math.PI)));
                        distance2 = (len * Math.cos((angle - Math.PI)));
                        mid = this.c0.fl(linePnt1, midPnt, this.c0.HALF_PI, distance1, true);
                        symPnt = this.c0.fl(midPnt, mid, this.c0.HALF_PI, distance2, true);
                    } else {
                        distance1 = (len * Math.sin(((Math.PI * 2) - angle)));
                        distance2 = (len * Math.cos(((Math.PI * 2) - angle)));
                        mid = this.c0.fl(linePnt1, midPnt, this.c0.HALF_PI, distance1, true);
                        symPnt = this.c0.fl(midPnt, mid, this.c0.HALF_PI, distance2, false);
                    }
                }
            }
            return (symPnt);
        }
    });
}) ;
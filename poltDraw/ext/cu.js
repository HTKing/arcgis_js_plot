define([ "dojo/_base/declare"], function (declare) {
    return declare("plot.ext.cu", null, {
        constructor: function () {
            console.log("plot.ext.cu");
        },
        points:[],
        fgd:[],
        setPoints:function(pt){
            this.points=pt;
        },
        getPoints:function(){
            return points;
        },
        getFgb:function(){
            return 0;
        },
        getFgc :function(){
            return 0;
        },
        setFgd:function(fgd){
            this.fgd=fgd;
        },
        getFgd:function(){
            return this.fgd;
        },
        fe :function(MapPoint, int){

        },
        ff:function(MapPoint){

        },
        fg:function(){

        }
    });
}) ;
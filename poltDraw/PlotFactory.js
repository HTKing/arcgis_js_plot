
define([
    "dojo/_base/declare",
    '/poltDraw/ext/sector.js',
    '/poltDraw/ext/double_arrow.js',
    '/poltDraw/ext/fine_arrow.js',
    '/poltDraw/ext/squad_combat.js',
    '/poltDraw/ext/attack_arrow.js',
    '/poltDraw/ext/tailed_squad_combat.js',
    '/poltDraw/ext/tailed_attack_arrow.js',
    '/poltDraw/ext/gathering_place.js',
    '/poltDraw/ext/closed_curve.js'
], function (declare,Sector,DoubleArrow,FineArrow,SquadCombat,AttackArrow,
             TailedSquadCombat,TailedAttackArrow,GatheringPlace,ClosedCurve) {
    console.log("fffffffffffffffffffffffffffffff");
    return declare("plot.PlotFactory", null, {
        ARC                   : "arc",
        ELLIPSE               : "ellipse",
        CURVE                 : "curve",
        CLOSED_CURVE          : "closedcurve",
        LUNE                  : "lune",
        SECTOR                : "sector",
        GATHERING_PLACE       : "gatheringplace",
        STRAIGHT_ARROW        : "straightarrow",
        ASSAULT_DIRECTION     : "assaultdirection",
        ATTACK_ARROW          : "attackarrow",
        TAILED_ATTACK_ARROW   : "tailedattackarrow",
        SQUAD_COMBAT          : "squadcombat",
        TAILED_SQUAD_COMBAT   : "tailedsquadcombat",
        FINE_ARROW            : "finearrow",
        CIRCLE                : "circle",
        DOUBLE_ARROW          : "doublearrow",
        X_ARROW               : "xarrow",
        POLYLINE              : "polyline",
        FREEHAND_POLYLINE     : "freehandpolyline",
        POLYGON               : "polygon",
        FREEHAND_POLYGON      : "freehandpolygon",
        RECTANGLE             : "rectangle",
        POINT                 : "point",
        MULTIPOINT            : "multipoint",
        TRIANGLE              : "triangle",


        constructor: function () {
            console.log("plot.PlotFactory");
        },
        createPlot: function (type,points){
            switch (type){
                case this.SECTOR:
                    return new Sector(points);
                case this.DOUBLE_ARROW:
                    return new DoubleArrow(points);
                case this.FINE_ARROW:
                    return new FineArrow(points);
                case this.SQUAD_COMBAT:
                    return new SquadCombat(points);
                case this.ATTACK_ARROW:
                    return new AttackArrow(points);
                case this.TAILED_SQUAD_COMBAT:
                    return new TailedSquadCombat(points);
                case this.TAILED_ATTACK_ARROW:
                    return new TailedAttackArrow(points);
                case this.GATHERING_PLACE:
                    return new GatheringPlace(points);
                case this.CLOSED_CURVE:
                    return new ClosedCurve(points);
            }
            return null;
        }
    });
}) ;
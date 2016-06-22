define(
    [
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/on',
        'dojo/dom-construct',
        'esri/toolbars/draw',
        'esri/graphic',
        'esri/layers/GraphicsLayer',
        'esri/geometry/Polygon',
        'esri/geometry/Polyline',
        '/poltDraw/PlotFactory.js',
        '/poltDraw/ext/cs.js',
        '/poltDraw/ext/ct.js'
    ],
    function (declare, lang,on,domConstruct,Draw,Graphic,GraphicsLayer,
              Polygon,Polyline,PlotFactory,cs,ct){
        return declare([Draw],{
            extGeometryType:[
                "sector",//扇形
                "doublearrow",//双箭头
                "finearrow",//细直箭头
                "squadcombat",//简单箭头
                "attackarrow",//自定义箭头
                "tailedsquadcombat",//燕尾箭头
                "tailedattackarrow",//自定义燕尾箭头
                "gatheringplace",//集结地
                "closedcurve"//闭合曲线
            ],
            mapMouseMoveHandle : null,
            tipMoveHandle:null,
            tipMoutHandle:null,
            dbClickHandle:null,
            clickHandle:null,
            clickHandle2:null,
            aj:false,
            ai:new GraphicsLayer(),
            ao:[],
            ak:null,
            ap:null,
            an:null,
            tipDiv:null,
            activate:function(geometryType, options){
                console.log(geometryType);
                if(this.extGeometryType.indexOf(geometryType)>=0){
                    this.tipDiv = domConstruct.create("div",{class:"tooltip", style:"position: fixed;display:none" });
                    this.tipDiv.innerHTML="单击开绘制图形";
                    this.map.root.appendChild(this.tipDiv);
                    this.tipMoveHandle=on(this.map, "mouse-move", lang.hitch(this, function (evt) {
                        this.tipDiv.style.left=(evt.screenPoint.x+10)+"px";
                        this.tipDiv.style.top=(evt.screenPoint.y+50)+"px";
                        this.tipDiv.style.display="block";
                    }));
                    this.tipMoutHandle=on(this.map, "mouse-out", lang.hitch(this, function (evt) {
                        this.tipDiv.style.display="none";
                    }));
                    this.clickHandle = on(this.map, "click", lang.hitch(this, function (evt) {
                        this.tipDiv.innerHTML="单击继续绘制图形，双击完成绘制";
                        var tempPlot = new cs();
                        this.aj = false;
                        if(this.clickHandle){
                            this.clickHandle.remove();
                            this.clickHandle=null;
                        }

                        this.dbClickHandle = on(this.map, "dbl-click", lang.hitch(this, function (evt) {
                            console.log("dbl-click");
                           // this.onDrawEnd(evt.mapPoint);
                            //ff
                            this.ff();
                        }));
                        this.mapMouseMoveHandle = on(this.map, "mouse-move", lang.hitch(this, function(evt) {
                            console.log("mouse-move");

                            //fe
                            var pnts=[];
                            var mapPoint = evt.mapPoint;
                            if (this.ap.isInstanceOf(ct)){
                                pnts = this.ap.getPoints();
                                pnts.push(mapPoint);
                            } else {
                                pnts = this.ao.concat([mapPoint]);
                            }
                            this.ap.setPoints (pnts);
                            this.ak.draw();
                        }));
                        this.clickHandle2 = on(this.map, "click", lang.hitch(this, function (evt) {
                            //fd;
                            var tempPlot;
                            if (this.ap.isInstanceOf( ct)){
                                return;
                            }
                            var screenPoint=evt.screenPoint;
                            var lastPoint = this.map.toScreen(this.an);
                            if ((((Math.abs((screenPoint.x - lastPoint.x)) <= 2)) && ((Math.abs((screenPoint.y - lastPoint.y)) <= 2)))){
                                return;
                            }
                            this.ao.push(evt.mapPoint);
                            this.ap.setPoints(this.ao);
                            this.ak.draw();
                            this.an = evt.mapPoint;
                            if ((this.ap.isInstanceOf(cs))){
                                tempPlot = (this.ap);
                                if (tempPlot.ga() == this.ap.getFgb()){
                                    this.ff();
                                }
                            }
                        }));
                        this.ao = [];
                        this.ao.push(evt.mapPoint);
                        this.ap =new PlotFactory().createPlot(geometryType, this.ao);
                        this.ap.spatialReference = this.map.spatialReference;
                        this.ak = new Graphic(this.ap);
                        this.ak.symbol = this.ap.isInstanceOf(Polygon) ? this.fillSymbol : (this.ap.isInstanceOf(Polyline) ? this.lineSymbol : this.markerSymbol);
                        this.fm(this.ak);
                        this.an = evt.mapPoint;
                        if (this.ap.isInstanceOf(cs)){
                            tempPlot = this.ap ;
                            if (tempPlot.ga() == this.ap.getFgb()){
                               this.ff();
                            }
                        }
                    }));

                }else{
                    this.inherited(arguments);
                }
            },
            fm:function(g){
                this.ai.clear();
                this.ai.add(g);
                this.map.addLayer(this.ai);
            },
            fn:function(g){
                this.ai.remove(g);
            },
            ff:function(){
                this.aj = true;
                if (this.ap.getFgb() >= this.ap.getFgc()){
                    this.ap.fg();
                } else {
                    this.fn(this.ak);
                }
                this.an = null;
                this.onDrawEnd(this.ap);
                this.ai.clear();
            },
            deactivate:function(){
                this.inherited(arguments);//父类的取消工具
                //取消我自己加的地图事件
                if(this.mapMouseMoveHandle){
                    this.mapMouseMoveHandle.remove();
                    this.mapMouseMoveHandle=null;
                }if(this.dbClickHandle){
                    this.dbClickHandle.remove();
                    this.dbClickHandle=null;
                }if(this.clickHandle){
                    this.clickHandle.remove();
                    this.clickHandle=null;
                }
                if(this.clickHandle2){
                    this.clickHandle2.remove();
                    this.clickHandle2=null;
                }if(this.tipMoveHandle){
                    this.tipMoveHandle.remove();
                    this.tipMoveHandle=null;
                }if(this.tipMoutHandle){
                    this.tipMoutHandle.remove();
                    this.tipMoutHandle=null;
                }
                if(this.tipDiv){
                    this.map.root.removeChild(this.tipDiv);
                    this.tipDiv=null;
                }
                console.log("deactivate");
            }
        });
    });
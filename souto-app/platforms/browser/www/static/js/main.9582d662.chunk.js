(this["webpackJsonpcom.omerdayan.resortmgr"]=this["webpackJsonpcom.omerdayan.resortmgr"]||[]).push([[0],{108:function(e,t,a){},147:function(e,t,a){e.exports=a(180)},180:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(13),l=a.n(i),o=(a(108),a(85)),c=a(44),s=a(19),u=a(130),m=a(235),h=a(234),d=a(27),p=a(28),f=a(29),g=a(30),v=a(226),E=a(227),y=a(238),b=a(129),w=a(20),O=a(232),S=a(240),C=a(224),j=a(225),x=a(184),D=a(125),T=a.n(D),I=a(242),k=a(216),M=a(222),V=a(182),H=a(221),B=a(220),N=a(124),A=a.n(N),F=a(123),L=a.n(F),R=a(120),K=a.n(R),W=a(122),J=a.n(W),P=a(121),G=a.n(P),z={toolbar:{textAlign:"center"},title:{margin:"10px"},menu:{width:"50vw"},menuItemText:{textAlign:"right"},menuItemIcon:{justifyContent:"flex-end"}},$=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).toggleDrawer=function(){n.setState({isMenuOpen:!n.state.isMenuOpen})},n.getMenu=function(){var e=r.a.createElement("div",{style:z.menu,role:"presentation"},r.a.createElement(k.a,null,r.a.createElement(c.b,{to:"/client/home"},r.a.createElement(V.a,{button:!0,key:"home"},r.a.createElement(B.a,{style:z.menuItemText,primary:"\u05e2\u05de\u05d5\u05d3 \u05d4\u05d1\u05d9\u05ea"}),r.a.createElement(H.a,{style:z.menuItemIcon},r.a.createElement(K.a,null)))),r.a.createElement(V.a,{button:!0,key:"about",disabled:!0},r.a.createElement(B.a,{style:z.menuItemText,primary:"\u05d0\u05d5\u05d3\u05d5\u05ea"}),r.a.createElement(H.a,{style:z.menuItemIcon},r.a.createElement(G.a,null))),r.a.createElement(c.b,{to:"/client/newshift"},r.a.createElement(V.a,{button:!0,key:"shifts"},r.a.createElement(B.a,{style:z.menuItemText,primary:"\u05de\u05e9\u05de\u05e8\u05d5\u05ea"}),r.a.createElement(H.a,{style:z.menuItemIcon},r.a.createElement(J.a,null))))),r.a.createElement(M.a,null),r.a.createElement(k.a,null,r.a.createElement(V.a,{button:!0,key:"contact",disabled:!0},r.a.createElement(B.a,{style:z.menuItemText,primary:"\u05e6\u05d5\u05e8 \u05e7\u05e9\u05e8"}),r.a.createElement(H.a,{style:z.menuItemIcon},r.a.createElement(L.a,null))),r.a.createElement(V.a,{button:!0,key:"settings",disabled:!0},r.a.createElement(B.a,{style:z.menuItemText,primary:"\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea"}),r.a.createElement(H.a,{style:z.menuItemIcon},r.a.createElement(A.a,null)))));return r.a.createElement(I.a,{open:n.state.isMenuOpen,onClose:n.toggleDrawer},e)},n.state={isMenuOpen:!1},n}return Object(p.a)(a,[{key:"render",value:function(){var e=this.getMenu();return r.a.createElement(C.a,{position:"static"},e,r.a.createElement(j.a,{style:z.toolbar},r.a.createElement(x.a,{edge:"start",color:"inherit","aria-label":"menu"},r.a.createElement(T.a,{onClick:this.toggleDrawer})),r.a.createElement("div",{style:z.title},this.props.title)))}}]),a}(n.Component),_=a(52),q=a.n(_),Q=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).getLocalIsoDateString=function(e){return new Date(e-6e4*e.getTimezoneOffset()).toISOString()},n.handleDateChange=function(e){n.setState({date:e})},n.handleTimeChange=function(e){n.setState({time:e})},n.handleDurationChange=function(e){n.setState({duration:e})},n.sendWork=function(e){var t={name:n.state.name,date:n.getLocalIsoDateString(n.state.date).split("T")[0],time:n.getLocalIsoDateString(n.state.time).split("T")[1],duration:n.getLocalIsoDateString(n.state.duration).split("T")[1]};q.a.post("http://3.125.157.104:3001/newwork",t).then((function(){e()})).catch((function(e){console.log(e)}))},n.state={name:"",date:new Date,time:new Date("0000-01-01T12:00:00"),duration:new Date("0000-01-01T00:30:00")},n}return Object(p.a)(a,[{key:"handleNameChange",value:function(e){this.setState({name:e.target.value})}},{key:"render",value:function(){var e=Object(s.g)((function(e){e.history;return r.a.createElement(v.a,{variant:"contained",color:"primary"},"Save")}));return r.a.createElement("div",null,r.a.createElement($,null),r.a.createElement(E.a,{container:!0,direction:"column",justify:"flex-start",alignItems:"center",spacing:3},r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement("h2",null,"Create new work")),r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(y.a,{id:"outlined-basic",label:"Name",variant:"outlined",value:this.state.name,onChange:this.handleNameChange.bind(this)})),r.a.createElement(w.a,{utils:b.a},r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(O.a,{margin:"normal",inputVariant:"outlined",id:"date-picker-dialog",label:"Date",format:"MM/dd/yyyy",value:this.state.date,onChange:this.handleDateChange,KeyboardButtonProps:{"aria-label":"change date"}})),r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(S.a,{ampm:!1,margin:"normal",inputVariant:"outlined",id:"time-picker",label:"Time",minutesStep:5,value:this.state.time,onChange:this.handleTimeChange})),r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(S.a,{ampm:!1,openTo:"minutes",inputVariant:"outlined",views:["hours","minutes"],format:"HH:mm",label:"Duration",minutesStep:5,value:this.state.duration,onChange:this.handleDurationChange}))),r.a.createElement(E.a,{item:!0,xs:12},e)))}}]),a}(n.Component),U=a(54),X=a(93),Y=a(132),Z=a(131),ee=a(92),te=a(133),ae=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).renderDaily=function(){return r.a.createElement(X.a,{plugins:[Y.a],slotLabelFormat:{hour:"numeric",minute:"2-digit",hour12:!1,meridiem:"short"},businessHours:{startTime:"09:00",endTime:"22:00"},slotMinTime:"08:30",slotDuration:"00:15:00",initialView:"timeGridDay",locales:[ee.a],locale:"he",height:600,allDaySlot:!1,headerToolbar:!1,events:e.props.events})},e.renderMonthly=function(){return r.a.createElement(X.a,{plugins:[Z.a,te.a],selectable:!0,locales:[ee.a],locale:"he",initialDate:e.props.month,dateClick:function(t){e.props.onDateChange(t.dateStr)},dayCellClassNames:["dateA"],headerToolbar:!1,initialView:"dayGridMonth",showNonCurrentDates:!1,events:e.props.events})},e}return Object(p.a)(a,[{key:"render",value:function(){var e=this.props.variant;return"day"===e?this.renderDaily():"month"===e?this.renderMonthly():void 0}}]),a}(n.Component),ne=a(233),re=a(230),ie=a(236),le=a(239),oe=a(237);function ce(e){return r.a.createElement(oe.a,Object.assign({elevation:6,variant:"filled"},e))}var se={selectCtrl:{width:"60vw"},monthlyView:{width:"95vw"}},ue=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).sendShift=function(){if("none"!==n.state.hours&&void 0!==n.state.hours){var e={therapistId:1,date:n.props.currentDate,start:n.state.hours.start,end:n.state.hours.end,alertOpen:!1,alertFillOpen:!1};n.props.onDataReady(e,(function(){n.setState({hours:"",shiftType:"morning",alertOpen:!0})}))}else n.setState({alertFillOpen:!0})},n.renderHoursByShiftType=function(e){return n.props.shiftsHours[e].map((function(e){return r.a.createElement(ne.a,{key:e.text,value:e.value},e.text)}))},n.state={shiftType:"morning",hours:"none"},n}return Object(p.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(E.a,{container:!0,direction:"column",justify:"flex-start",alignItems:"center",spacing:3},r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(re.a,{variant:"outlined",style:se.selectCtrl},r.a.createElement(ie.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:this.state.shiftType,onChange:function(t){e.setState({shiftType:t.target.value})}},r.a.createElement(ne.a,{value:"morning"},"\u05d1\u05d5\u05e7\u05e8"),r.a.createElement(ne.a,{value:"noon"},"\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd"),r.a.createElement(ne.a,{value:"evening"},"\u05e2\u05e8\u05d1")))),r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(re.a,{variant:"outlined",style:se.selectCtrl},r.a.createElement(ie.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:this.state.hours,onChange:function(t){e.setState({hours:t.target.value})}},r.a.createElement(ne.a,{value:"none"},"\u05d1\u05d7\u05e8 \u05e9\u05e2\u05d5\u05ea"),this.renderHoursByShiftType(this.state.shiftType)))),r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(v.a,{variant:"contained",color:"primary",onClick:this.sendShift},"\u05e2\u05d3\u05db\u05df")),r.a.createElement(le.a,{open:this.state.alertOpen,autoHideDuration:5e3,onClose:function(){e.setState({alertOpen:!1})}},r.a.createElement(ce,{severity:"success",onClose:function(){e.setState({alertOpen:!1})}},"\u05d4\u05d1\u05e7\u05e9\u05d4 \u05d4\u05ea\u05e7\u05d1\u05dc\u05d4 \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4")),r.a.createElement(le.a,{open:this.state.alertFillOpen,autoHideDuration:5e3,onClose:function(){e.setState({alertOpen:!1})}},r.a.createElement(ce,{severity:"warning",onClose:function(){e.setState({alertFillOpen:!1})}},"\u05d0\u05e0\u05d0 \u05de\u05dc\u05d0 \u05d0\u05ea \u05db\u05dc \u05d4\u05e4\u05e8\u05d8\u05d9\u05dd")))}}]),a}(n.Component),me="https://18.192.53.137:3001",he={selectCtrl:{width:"60vw"},monthlyView:{width:"95vw"}},de={morning:[{text:"09:00 - 17:00",value:{start:"09:00:00",end:"17:00:00"}},{text:"10:00 - 18:00",value:{start:"10:00:00",end:"18:00:00"}}],noon:[{text:"12:00 - 18:00",value:{start:"12:00:00",end:"18:00:00"}}],evening:[{text:"15:00 - 21:00",value:{start:"15:00:00",end:"21:00:00"}},{text:"16:00 - 21:00",value:{start:"16:00:00",end:"21:00:00"}}]},pe=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).componentWillMount=function(){var e=n.props.month.split("-");q.a.get(me+"/monthshifts/".concat(n.props.userId,"/").concat(e[0],"/").concat(e[1])).then((function(e){var t=e.data.map((function(e){return n.parseShiftToEvent(e)}));n.setState({existingShifts:t,calendarKey:Math.random()})})).catch((function(e){alert("\u05de\u05e6\u05d8\u05e2\u05e8\u05d9\u05dd! \u05de\u05e9\u05d4\u05d5 \u05e0\u05db\u05e9\u05dc"),alert(e),console.log(e)}))},n.changeCurrentDate=function(e){n.resetData((function(){n.setState({currentDate:e})}))},n.resetData=function(e){n.setState({shiftType:"morning",hours:""},e)},n.handleShiftTypeChange=function(e){n.setState({shiftType:e.target.value,hours:""})},n.parseShiftToEvent=function(e){var t=void 0===e.date?e.Date.split("T")[0]:e.date;return{title:"S",start:t+"T"+(void 0===e.start?e.Start:e.start),end:t+"T23:00:00"}},n.sendShift=function(e,t){q.a.post(me+"/newshift",e).then((function(){n.setState((function(t){return{existingShifts:[].concat(Object(o.a)(t.existingShifts),[n.parseShiftToEvent(e)])}}),t)})).catch((function(e){console.log(e)}))},n.state={currentDate:n.props.month,month:"1970-01-01",shiftType:"morning",hours:"",existingShifts:[],calendarKey:0},n}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement($,{title:"\u05e0\u05d4\u05dc \u05d0\u05ea \u05d4\u05de\u05e9\u05de\u05e8\u05d5\u05ea \u05e9\u05dc\u05da"}),r.a.createElement(E.a,{container:!0,direction:"column",justify:"flex-start",alignItems:"center",spacing:3},r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement("br",null),r.a.createElement(U.a,{variant:"h4"},this.state.currentDate)),r.a.createElement(ue,{shiftsHours:de,onDataReady:this.sendShift,currentDate:this.state.currentDate}),r.a.createElement(E.a,{item:!0,xs:12,style:he.monthlyView},r.a.createElement("br",null),r.a.createElement(ae,{key:this.state.calendarKey,variant:"month",month:this.props.month,onDateChange:this.changeCurrentDate,events:this.state.existingShifts}))),r.a.createElement("br",null))}}]),a}(n.Component),fe=a(86),ge=a(84),ve=a.n(ge),Ee={page:{width:"100vw",height:"100vh",textAlign:"center",paddingTop:"30vh"},logo:{width:"50vw"}},ye=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).componentDidMount=function(){setTimeout((function(){n.setState({timeout:!0})}),2500),q.a.get(me+"/login/0523768089").then((function(e){q.a.get(me+"/getopenmonth").then((function(t){var a=t.data;n.setState({dataReady:!0},(function(){var t;n.props.changeContext((t={month:a},Object(fe.a)(t,"month",a),Object(fe.a)(t,"logedId",!0),Object(fe.a)(t,"user",e.data),t))}))})).catch((function(e){alert(e)}))})).catch((function(){alert("\u05d0\u05d5\u05e4\u05e1! \u05e0\u05e8\u05d0\u05d4 \u05e9\u05d0\u05ea\u05d4 \u05dc\u05d0 \u05e8\u05e9\u05d5\u05dd \u05db\u05de\u05d8\u05e4\u05dc")}))},n.state={timeout:!1,dataReady:!1},n}return Object(p.a)(a,[{key:"render",value:function(){return this.state.timeout&&this.state.dataReady?r.a.createElement(s.a,{to:"/client/home"}):r.a.createElement("div",{className:"page",style:Ee.page},r.a.createElement("img",{src:ve.a,alt:"logo",style:Ee.logo}))}}]),a}(n.Component),be={pageView:{width:"100vw",textAlign:"center",paddingTop:"10vh"},logo:{width:"50vw"},menu:{marginTop:"5vh"},mainButton:{width:"40vw",height:"40vw"}},we=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement($,{title:"\u05e2\u05de\u05d5\u05d3 \u05d4\u05d1\u05d9\u05ea"}),r.a.createElement("div",{style:be.pageView},r.a.createElement("img",{style:be.logo,src:ve.a,alt:"logo"}),r.a.createElement("br",null),r.a.createElement(E.a,{container:!0,style:be.menu,direction:"row",justify:"center",alignItems:"center",spacing:3},r.a.createElement(E.a,{item:!0},r.a.createElement(v.a,{style:be.mainButton,variant:"contained",color:"primary",disabled:!0},"\u05e1\u05d9\u05db\u05d5\u05dd \u05d7\u05d5\u05d3\u05e9\u05d9")),r.a.createElement(E.a,{item:!0},r.a.createElement(c.b,{to:"/client/newshift"},r.a.createElement(v.a,{style:be.mainButton,variant:"contained",color:"primary"},"\u05e0\u05d9\u05d4\u05d5\u05dc \u05de\u05e9\u05de\u05e8\u05d5\u05ea"))))))}}]),a}(n.Component),Oe=r.a.createContext(),Se=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).updateState=function(e){n.setState(e)},n.state={month:"1970-01-01",logedin:!1,user:{}},n}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement(Oe.Provider,{value:{state:this.state,updateState:this.updateState}},this.props.children)}}]),a}(n.Component),Ce=Oe,je=a(127),xe=a(128),De=a.n(xe),Te=Object(u.a)({palette:{primary:{main:"#464646"}},typography:{allVariants:{color:"#4c4c4c"}},direction:"rtl"}),Ie={app:{height:"100vh",width:"100vw",position:"absolute",overflow:"hidden",color:"#4c4c4c"}},ke=Object(je.a)({plugins:[].concat(Object(o.a)(Object(m.a)().plugins),[De()()])});var Me=function(){return r.a.createElement("div",{className:"App page",style:Ie.app},r.a.createElement(h.a,{theme:Te,jss:ke},r.a.createElement(c.a,null,r.a.createElement(s.d,null,r.a.createElement(Se,null,r.a.createElement(s.b,{exact:!0,path:"/newwork"},r.a.createElement(Q,null)),r.a.createElement(Ce.Consumer,null,(function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.b,{exact:!0,path:"/"},r.a.createElement(ye,{changeContext:e.updateState})),r.a.createElement(s.b,{exact:!0,path:"/client/newshift"},r.a.createElement(pe,{month:e.state.month,userId:e.state.user.Id})),r.a.createElement(s.b,{exact:!0,path:"/client/home"},r.a.createElement(we,null)))})))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));document.addEventListener("deviceready",(function(){window.facebookConnectPlugin.login(["public_profile"],(function(e){alert(JSON.stringify(e))}),(function(e){alert("Err: "+e)})),l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Me,null)),document.getElementById("root"))}),!1),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},84:function(e,t,a){e.exports=a.p+"static/media/logo.c1c41907.png"}},[[147,1,2]]]);
//# sourceMappingURL=main.9582d662.chunk.js.map
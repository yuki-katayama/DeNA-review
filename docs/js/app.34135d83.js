(function(e){function t(t){for(var s,r,c=t[0],a=t[1],d=t[2],l=0,u=[];l<c.length;l++)r=c[l],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&u.push(i[r][0]),i[r]=0;for(s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s]);m&&m(t);while(u.length)u.shift()();return n.push.apply(n,d||[]),o()}function o(){for(var e,t=0;t<n.length;t++){for(var o=n[t],s=!0,c=1;c<o.length;c++){var a=o[c];0!==i[a]&&(s=!1)}s&&(n.splice(t--,1),e=r(r.s=o[0]))}return e}var s={},i={app:0},n=[];function r(t){if(s[t])return s[t].exports;var o=s[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=s,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(o,s,function(t){return e[t]}.bind(null,s));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/dena-review/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],a=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var m=a;n.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("cd49")},"06f6":function(e,t,o){},"0fa9":function(e,t,o){},1009:function(e,t,o){},"11c9":function(e,t,o){"use strict";o("0fa9")},"206c":function(e,t,o){"use strict";o("eb00")},4983:function(e,t,o){"use strict";o("6f2b")},"557d":function(e,t,o){"use strict";o("c53e")},"5c95":function(e,t,o){},"5da4":function(e,t,o){},"5f92":function(e,t,o){"use strict";o("5c95")},"6f2b":function(e,t,o){},"728c":function(e,t,o){"use strict";o("06f6")},a8c6:function(e,t,o){"use strict";o("1009")},c53e:function(e,t,o){},cd49:function(e,t,o){"use strict";o.r(t);var s=o("7a23");function i(e,t,o,i,n,r){const c=Object(s["B"])("router-view");return Object(s["s"])(),Object(s["d"])(c)}var n=o("daa8");class r{constructor(e){this.isConnect=!1,this.url=e,this.createConnection()}createConnection(){console.log("connect to data server: ",this.url),this.socketRef=Object(n["a"])(this.url),this.connect()}connect(){this.socketRef&&!this.isConnect&&(this.isConnect=!0,this.socketRef.connect())}onConnected(e){this.socketRef.connected&&e(),this.socketRef.on("connect",()=>{console.log("connected to data server: ",this.url),e()})}onceConnected(e){this.socketRef.connected&&e(),this.socketRef.once("connect",()=>{console.log("connected to data server: ",this.url),e()})}}class c extends r{onUpdateRoomsState(e){this.socketRef.on("update rooms state",t=>e(t))}onUserJoinRoom(e){this.socketRef.on("user join room",t=>e(t))}onUserLeaveRoom(e){this.socketRef.on("user leave room",t=>e(t))}onSecondUserJoinRoom(e){this.socketRef.on("second user join room",()=>e())}onUserPutCoin(e){this.socketRef.on("user put coin",t=>e(t))}onUserReset(e){this.socketRef.on("user reset",()=>e())}onUserFinish(e){this.socketRef.on("user finish",()=>e())}emitAccessedUser(e){this.socketRef.emit("accessed user",e)}emitJoinRoom(e){this.socketRef.emit("join room",e)}emitAddRoom(e){this.socketRef.emit("add room",e)}emitLeaveRoom(){this.socketRef.emit("leave room")}emitPutCoin(e){this.socketRef.emit("put coin",e)}emitFinish(){this.socketRef.emit("finish")}emitReset(){this.socketRef.emit("reset")}}var a=o("ce1f"),d=o("1b00"),m=o("8ded"),l=o.n(m);class u extends a["b"]{mounted(){let e=new c("http://localhost:8081"),t=l.a.get("userId");void 0===t&&(t=Object(d["uuid"])(),l.a.set("userId",t)),this.$store.commit("SetPlayerDataService",e),this.$store.commit("SetUser",{id:t})}}o("e482");var b=o("6b0d"),h=o.n(b);const p=h()(u,[["render",i]]);var O=p,f=o("6c02");const j=e=>(Object(s["w"])("data-v-1ec82c26"),e=e(),Object(s["t"])(),e),v={class:"home"},y=j(()=>Object(s["g"])("div",{class:"title"}," ４目並べ ",-1)),R={class:"battle-mode"},S=j(()=>Object(s["g"])("br",null,null,-1)),g=j(()=>Object(s["g"])("br",null,null,-1)),k={class:"rooms"},N=Object(s["h"])(" 対戦する部屋を選択してください "),w=["onClick"],_=["disabled"];function C(e,t){const o=Object(s["B"])("AddRoomPopup");return Object(s["s"])(),Object(s["f"])("div",v,[y,Object(s["g"])("div",R,[Object(s["g"])("button",{class:"tool-button",onClick:t[0]||(t[0]=t=>e.start("SOLO","BOTと対戦"))}," BOTと対戦 "),S,Object(s["g"])("button",{class:"tool-button",onClick:t[1]||(t[1]=t=>e.start("OFFLINE","2人で対戦"))}," 2人で対戦 "),g,Object(s["g"])("button",{class:"tool-button",onClick:t[2]||(t[2]=t=>e.showAddModal())}," オンライン対戦 ")]),Object(s["g"])("div",k,[N,(Object(s["s"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(e.roomsState,(t,o)=>(Object(s["s"])(),Object(s["f"])("div",{key:o,class:"rooms"},[Object(s["g"])("button",{class:"tool-button",onClick:o=>e.clickedRoom(t.id)},Object(s["D"])(t.name),9,w)]))),128))]),Object(s["g"])("button",{class:Object(s["o"])(["tool-button",{"tool-button--disabled":!e.canJoin}]),disabled:!e.canJoin,onClick:t[3]||(t[3]=t=>e.start("ONLINE"))}," 参加する ",10,_),Object(s["J"])(Object(s["i"])(o,{"data-service-ref":e.dataServiceRef,rooms:e.roomsState,"is-visible":e.isAddModalVisible,onClose:e.hideAddModal},null,8,["data-service-ref","rooms","is-visible","onClose"]),[[s["G"],e.isAddModalVisible]])])}var T=o("9ab4");const U={class:"bord"};function I(e,t,o,i,n,r){const c=Object(s["B"])("Coin");return Object(s["s"])(),Object(s["f"])("div",U,[(Object(s["s"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(e.map,(t,o)=>(Object(s["s"])(),Object(s["f"])("div",{key:o},[(Object(s["s"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(t,(t,i)=>(Object(s["s"])(),Object(s["f"])("label",{key:i},[Object(s["i"])(c,{"math-stat":t,"my-term":e.myTerm,onSelected:t=>e.onSelected({x:i,y:o})},null,8,["math-stat","my-term","onSelected"])]))),128))]))),128))])}var A=o("1b40");const P=["disabled"],D={key:1,class:"coin__user1"},E={key:2,class:"coin__user2"};function M(e,t,o,i,n,r){return-1===e.mathStat?(Object(s["s"])(),Object(s["f"])("button",{key:0,class:"coin__brank",disabled:!e.myTerm,onClick:t[0]||(t[0]=t=>e.selected())},null,8,P)):0===e.mathStat?(Object(s["s"])(),Object(s["f"])("button",D)):1===e.mathStat?(Object(s["s"])(),Object(s["f"])("button",E)):Object(s["e"])("",!0)}class x extends a["b"]{selected(){}}Object(T["a"])([Object(A["b"])()],x.prototype,"mathStat",void 0),Object(T["a"])([Object(A["b"])()],x.prototype,"myTerm",void 0),Object(T["a"])([Object(A["a"])()],x.prototype,"selected",null);o("206c");const F=h()(x,[["render",M],["__scopeId","data-v-4b3378ca"]]);var $=F;let J=class extends a["b"]{onSelected(e){this.$emit("onSelected",e)}};Object(T["a"])([Object(A["b"])()],J.prototype,"map",void 0),Object(T["a"])([Object(A["b"])()],J.prototype,"myTerm",void 0),J=Object(T["a"])([Object(a["a"])({components:{Coin:$}})],J);var L=J;o("728c");const V=h()(L,[["render",I]]);var B=V;const G=e=>(Object(s["w"])("data-v-2d083bde"),e=e(),Object(s["t"])(),e),q=Object(s["h"])(" 部屋の追加 "),H={class:"popup__popup-dropdown"},z=G(()=>Object(s["g"])("span",{class:"popup__popup-dropdown--title"},"部屋の名前",-1)),K={key:0,class:"error"},W=["disabled"];function Q(e,t,o,i,n,r){const c=Object(s["B"])("popup");return Object(s["s"])(),Object(s["d"])(c,{"is-visible":e.isVisible,"on-enter":e.addRoom,init:e.init,onClose:e.hidePopup},{header:Object(s["I"])(()=>[q]),"body-vertical":Object(s["I"])(()=>[Object(s["g"])("div",H,[z,Object(s["J"])(Object(s["g"])("input",{ref:"popupInputRef","onUpdate:modelValue":t[0]||(t[0]=t=>e.newRoomName=t),placeholder:"部屋の名前を入力してください",class:"popup__popup-dropdown--input",onKeyup:t[1]||(t[1]=Object(s["K"])(t=>e.onNewRoomInputEnterClick(),["enter"])),onInput:t[2]||(t[2]=t=>e.parseNewRoomInput())},null,544),[[s["F"],e.newRoomName]])]),""!==e.addingRoomErrorMessage?(Object(s["s"])(),Object(s["f"])("div",K,Object(s["D"])(e.addingRoomErrorMessage),1)):Object(s["e"])("",!0)]),footer:Object(s["I"])(()=>[Object(s["g"])("button",{class:"popup__popup-button",onClick:t[3]||(t[3]=t=>e.hidePopup())}," キャンセル "),Object(s["g"])("button",{class:Object(s["o"])(["popup__popup-button",{"zawa-button--disabled":!e.isNewRoomReadyToAdd}]),disabled:!e.isNewRoomReadyToAdd,onClick:t[4]||(t[4]=t=>e.addRoom())}," 部屋を追加する ",10,W)]),_:1},8,["is-visible","on-enter","init","onClose"])}const X={class:"popup"},Y={class:"popup__container"},Z={class:"popup__popup-header"},ee={class:"popup__popup-body"},te={class:"popup__popup-body popup__popup-body--vertical"};function oe(e,t,o,i,n,r){return Object(s["s"])(),Object(s["f"])("div",X,[Object(s["g"])("div",Y,[Object(s["g"])("div",Z,[Object(s["g"])("span",null,[Object(s["A"])(e.$slots,"header",{},void 0,!0)]),Object(s["g"])("div",{class:"close-button",onClick:t[0]||(t[0]=(...t)=>e.close&&e.close(...t))},"   ")]),Object(s["g"])("div",ee,[Object(s["A"])(e.$slots,"body",{},void 0,!0)]),Object(s["g"])("div",te,[Object(s["A"])(e.$slots,"body-vertical",{},void 0,!0)]),Object(s["g"])("div",{class:Object(s["o"])(["popup__footer",{"popup__footer--hidden":e.hideFooter}])},[Object(s["A"])(e.$slots,"footer",{},void 0,!0)],2)])])}class se extends a["b"]{constructor(){super(...arguments),this.keyUpListener=this.onKeyUp}onPopupVisibilityChange(e,t){e!==t&&(e?(window.addEventListener("keyup",this.keyUpListener),this.init&&this.init()):window.removeEventListener("keyup",this.keyUpListener))}mounted(){this.isVisible&&window.addEventListener("keyup",this.keyUpListener)}onKeyUp(e){e.preventDefault();const t=e.key||e.keyCode;13===t||"Enter"===t?this.onEnter&&this.onEnter():"Escape"===t&&this.close()}close(){this.$emit("close")}}Object(T["a"])([Object(A["b"])()],se.prototype,"hideFooter",void 0),Object(T["a"])([Object(A["b"])()],se.prototype,"isVisible",void 0),Object(T["a"])([Object(A["b"])()],se.prototype,"onEnter",void 0),Object(T["a"])([Object(A["b"])()],se.prototype,"init",void 0),Object(T["a"])([Object(A["c"])("isVisible")],se.prototype,"onPopupVisibilityChange",null);o("5f92");const ie=h()(se,[["render",oe],["__scopeId","data-v-2fc116ed"]]);var ne=ie;let re=class extends a["b"]{constructor(){super(...arguments),this.addingRoomErrorMessage="",this.newRoomName="",this.isNewRoomReadyToAdd=!1}init(){this.clearAddingRoomErrorMessage(),this.clearNewRoomInput(),this.isNewRoomReadyToAdd=!1}clearAddingRoomErrorMessage(){this.addingRoomErrorMessage=""}clearNewRoomInput(){this.newRoomName=""}onNewRoomInputEnterClick(){this.parseNewRoomInput(),this.addRoom()}addRoom(){if(this.isNewRoomReadyToAdd){const e=this.getConvertedRoomName();this.dataServiceRef.emitAddRoom(e),this.hidePopup(),this.$router.push({path:"/remote",query:{mode:"ONLINE",roomName:e}})}}getConvertedRoomName(){return this.newRoomName.toLowerCase().replace("+","")}isSpaceOrRoomNameOk(e){return!e.includes(" ")}parseNewRoomInput(){const e=this.getConvertedRoomName(),t=this.isSpaceOrRoomNameOk(e);if(!t)return this.addingRoomErrorMessage="部屋の名前はスペースを含めることができません。",void(this.isNewRoomReadyToAdd=!1);const o=!!this.rooms.find(t=>t.name===e);o?(this.isNewRoomReadyToAdd=!1,this.addingRoomErrorMessage="同じスペース名が存在します。"):""!==e?(this.clearAddingRoomErrorMessage(),this.isNewRoomReadyToAdd=!0):(this.addingRoomErrorMessage="スペースの名前を空にすることはできません。",this.isNewRoomReadyToAdd=!1)}hidePopup(){this.$emit("close")}};Object(T["a"])([Object(A["b"])()],re.prototype,"dataServiceRef",void 0),Object(T["a"])([Object(A["b"])()],re.prototype,"rooms",void 0),Object(T["a"])([Object(A["b"])()],re.prototype,"isVisible",void 0),re=Object(T["a"])([Object(a["a"])({components:{Popup:ne}})],re);var ce=re;o("4983");const ae=h()(ce,[["render",Q],["__scopeId","data-v-2d083bde"]]);var de=ae;let me=class extends a["b"]{constructor(){super(...arguments),this.dataServiceRef={},this.isAddModalVisible=!1,this.roomsState=[],this.selectedRoomId="",this.canJoin=!1}get userId(){return this.$store.state.user.id}get selectedRoom(){return this.roomsState.find(e=>e.id===this.selectedRoomId)}mounted(){this.dataServiceRef=this.$store.state.playerDataService,this.dataServiceRef.onceConnected(()=>this.getDataFromDataServer()),this.dataServiceRef.onUpdateRoomsState(e=>this.onUpdateRoomsState(e))}onUpdateRoomsState(e){this.roomsState=e}showAddModal(){this.isAddModalVisible=!0}hideAddModal(){this.isAddModalVisible=!1}clickedRoom(e){this.selectedRoomId=e,this.selectedRoom&&(this.canJoin=!0)}start(e,t){"ONLINE"===e?this.$router.push({path:"/remote",query:{mode:e,roomName:this.selectedRoom.name}}):this.$router.push({path:"/local",query:{mode:e,roomName:t}})}getDataFromDataServer(){this.dataServiceRef.emitAccessedUser(this.userId)}};me=Object(T["a"])([Object(a["a"])({components:{Bord:B,AddRoomPopup:de,Popup:ne}})],me);var le=me;o("557d");const ue=h()(le,[["render",C],["__scopeId","data-v-1ec82c26"]]);var be=ue;const he={class:"game"},pe=Object(s["g"])("h2",null,"あなたの色 青",-1),Oe={key:0,class:"bord__result"},fe={key:1,class:"bord__result"},je={key:2,class:"bord__player"};function ve(e,t){const o=Object(s["B"])("Bord");return Object(s["s"])(),Object(s["f"])("div",he,[Object(s["g"])("h1",null,Object(s["D"])(e.roomName),1),pe,Object(s["g"])("button",{class:"tool-button",onClick:t[0]||(t[0]=t=>e.leaveRoom())}," 部屋を退出する "),Object(s["i"])(o,{map:e.map,"my-term":"OFFLINE"===e.gameMode||e.myTerm,onOnSelected:t[1]||(t[1]=t=>e.onSelected(t))},null,8,["map","my-term"]),Object(s["g"])("button",{class:"tool-button",onClick:t[2]||(t[2]=(...t)=>e.reset&&e.reset(...t))}," リセット "),"FINISH"===e.gameState?(Object(s["s"])(),Object(s["f"])("div",Oe,Object(s["D"])(e.dispPlayer())+": winner ",1)):"DRAW"===e.gameState?(Object(s["s"])(),Object(s["f"])("div",fe," 引き分けです。 ")):(Object(s["s"])(),Object(s["f"])("div",je,Object(s["D"])(e.dispPlayer())+"のターンです ",1))])}const ye=6,Re=7,Se=4;function ge(e,t){return t.y===ye-1||-1!==e[t.y+1][t.x]}function ke(e){for(let t=0;t<ye;t++)for(let o=0;o<Re;o++)if(-1===e[t][o])return!1;return!0}function Ne(e,t,o,s,i){let n=0;const r=e[o][t];for(;;){if(t+=s,o+=i,!(t<Re&&t>=0)||!(o<ye&&o>=0)||e[o][t]!==r)break;n++}return n}function we(e,t,o,s,i){let n=1;return n+=Ne(e,t,o,s,i),n+=Ne(e,t,o,-1*s,-1*i),n===Se}function _e(e,t){return we(e,t.x,t.y,0,1)}function Ce(e,t){return we(e,t.x,t.y,1,0)}function Te(e,t){return we(e,t.x,t.y,1,1)}function Ue(e,t){return we(e,t.x,t.y,1,-1)}function Ie(e,t){return _e(e,t)||Ce(e,t)||Ue(e,t)||Te(e,t)?"FINISH":ke(e)?"DRAW":"CONTINUE"}function Ae(e){let t=0,o=ye-1;for(;;)if(t=Math.floor(Math.random()*Re),-1===e[0][t])break;for(;;o--){if(-1===e[o][t]&&o===ye-1)break;if(-1===e[o][t]&&-1!==e[o+1][t])break}return{x:t,y:o}}let Pe=class extends a["b"]{constructor(){super(...arguments),this.dataServiceRef={},this.map=new Array(ye),this.gameState="CONTINUE",this.myTerm=!0,this.gameMode="",this.roomName="",this.userRoomStates=[]}mounted(){this.gameMode=this.$route.query.mode.toString();for(let e=0;e<ye;e++)this.map[e]=new Array(Re).fill(-1);this.roomName=this.$route.query.roomName.toString()}onSelected(e){this.onDefineGameState(e)}onDefineGameState(e){"CONTINUE"===this.gameState&&ge(this.map,e)&&(this.myTerm?this.map[e.y][e.x]=0:this.map[e.y][e.x]=1,this.gameState=Ie(this.map,e),"CONTINUE"===this.gameState&&this.nextTerm())}nextTerm(){if(this.myTerm=!this.myTerm,!1===this.myTerm&&"SOLO"===this.gameMode){const e=Ae(this.map);this.onDefineGameState(e)}}leaveRoom(){this.$router.push({path:"/"})}getDataFromDataServer(e){this.dataServiceRef.emitJoinRoom(e)}onUserJoinRoom(e){this.userRoomStates=e}dispPlayer(){return this.myTerm?"あなた":"相手"}reset(){this.myTerm=!0,this.gameState="CONTINUE";for(let e=0;e<ye;e++)for(let t=0;t<Re;t++)this.map[e][t]=-1}};Pe=Object(T["a"])([Object(a["a"])({components:{Bord:B}})],Pe);var De=Pe;o("a8c6");const Ee=h()(De,[["render",ve]]);var Me=Ee;const xe={class:"game"},Fe={key:0,class:"bord__result"},$e={key:1,class:"bord__result"},Je={key:2,class:"game__player"};function Le(e,t){const o=Object(s["B"])("Bord");return Object(s["s"])(),Object(s["f"])("div",xe,[Object(s["g"])("h1",null,Object(s["D"])(e.roomName),1),Object(s["g"])("h2",null,"あなたの色 "+Object(s["D"])(e.color),1),Object(s["g"])("button",{class:"tool-button",onClick:t[0]||(t[0]=t=>e.leaveRoom())}," 部屋を退出する "),Object(s["i"])(o,{map:e.map,"my-term":e.myTerm,onOnSelected:t[1]||(t[1]=t=>e.onSelected(t))},null,8,["map","my-term"]),Object(s["g"])("button",{class:"tool-button",onClick:t[2]||(t[2]=t=>e.dataServiceRef.emitReset())}," リセット "),"FINISH"===e.gameState?(Object(s["s"])(),Object(s["f"])("div",Fe,Object(s["D"])(e.resultDispPlayer())+": winner ",1)):"DRAW"===e.gameState?(Object(s["s"])(),Object(s["f"])("div",$e," 引き分けです。 ")):(Object(s["s"])(),Object(s["f"])("div",Je,Object(s["D"])(e.dispPlayer())+"のターンです ",1))])}let Ve=class extends a["b"]{constructor(){super(...arguments),this.dataServiceRef={},this.map=new Array(ye),this.gameState="CONTINUE",this.myTerm=!1,this.gameMode="",this.roomName="",this.userRoomStates=[],this.secondPlayer=!1,this.color="赤"}mounted(){console.log("adwadwa"),this.gameMode=this.$route.query.mode.toString();for(let e=0;e<ye;e++)this.map[e]=new Array(Re).fill(-1);this.roomName=this.$route.query.roomName.toString(),this.dataServiceRef=this.$store.state.playerDataService,this.dataServiceRef.onConnected(()=>this.getDataFromDataServer(this.roomName)),this.dataServiceRef.onUserJoinRoom(e=>this.onUserJoinRoom(e)),this.dataServiceRef.onSecondUserJoinRoom(()=>this.onSecondUserJoinRoom()),this.dataServiceRef.onUserFinish(()=>this.onUserFinish()),this.dataServiceRef.onUserPutCoin(e=>this.onUserPutCoin(e)),this.dataServiceRef.onUserReset(()=>this.onUserReset())}onUserReset(){this.secondPlayer?this.myTerm=!0:this.myTerm=!1,this.gameState="CONTINUE";for(let e=0;e<ye;e++)for(let t=0;t<Re;t++)this.map[e][t]=-1}onUserPutCoin(e){!1===this.myTerm&&(this.secondPlayer?this.map[e.y][e.x]=1:this.map[e.y][e.x]=0),this.myTerm=!this.myTerm}onUserJoinRoom(e){this.userRoomStates=e,console.log(this.userRoomStates),this.myTerm=!1}onSecondUserJoinRoom(){this.color="青",this.secondPlayer=!0,this.myTerm=!0}onSelected(e){this.defineGameState(e)}onUserFinish(){this.gameState="FINISH"}defineGameState(e){"CONTINUE"===this.gameState&&ge(this.map,e)&&(this.secondPlayer?this.map[e.y][e.x]=0:this.map[e.y][e.x]=1,this.gameState=Ie(this.map,e),"CONTINUE"!==this.gameState?(this.dataServiceRef.emitPutCoin(e),this.dataServiceRef.emitFinish()):this.dataServiceRef.emitPutCoin(e))}leaveRoom(){this.dataServiceRef.emitLeaveRoom(),this.$router.push({path:"/"})}getDataFromDataServer(e){this.dataServiceRef.emitJoinRoom(e)}dispPlayer(){return this.myTerm?"あなた":"相手"}resultDispPlayer(){return this.myTerm?"相手":"あなた"}};Ve=Object(T["a"])([Object(a["a"])({components:{Bord:B}})],Ve);var Be=Ve;o("11c9");const Ge=h()(Be,[["render",Le]]);var qe=Ge;const He=[{path:"/",name:"HomeView",component:be},{path:"/local",name:"LocalGameViewGame",component:Me},{path:"/remote",name:"RemoteGameViewGame",component:qe}],ze=Object(f["a"])({history:Object(f["b"])("/dena-review/"),routes:He});var Ke=ze,We=o("5502"),Qe=Object(We["a"])({state:{playerDataService:null,user:{}},mutations:{SetPlayerDataService(e,t){e.playerDataService=t},SetUser(e,t){e.user=t}},actions:{},modules:{}});Object(s["c"])(O).use(Qe).use(Ke).mount("#app")},e482:function(e,t,o){"use strict";o("5da4")},eb00:function(e,t,o){}});
//# sourceMappingURL=app.34135d83.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"74mu":function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"b",function(){return s}),n.d(e,"c",function(){return i}),n.d(e,"d",function(){return r});const i=(t,e)=>null!==e.closest(t),o=(t,e)=>"string"==typeof t&&t.length>0?Object.assign({"ion-color":!0,[`ion-color-${t}`]:!0},e):e,s=t=>{const e={};return(t=>void 0!==t?(Array.isArray(t)?t:t.split(" ")).filter(t=>null!=t).map(t=>t.trim()).filter(t=>""!==t):[])(t).forEach(t=>e[t]=!0),e},a=/^[a-z][a-z0-9+\-.]*:/,r=async(t,e,n,i)=>{if(null!=t&&"#"!==t[0]&&!a.test(t)){const o=document.querySelector("ion-router");if(o)return null!=e&&e.preventDefault(),o.push(t,n,i)}return!1}},"9Uo9":function(t,e,n){"use strict";n.d(e,"a",function(){return r});var i=n("AytR"),o=n("fXoL"),s=n("TEn/");const a=["map"];let r=(()=>{class t{constructor(t,e){this.modalCtrl=t,this.renderer=e,this.center={lat:-34.397,lng:150.644},this.selectable=!0,this.closeButtonText="Cancel",this.title="Pick Location"}ngOnInit(){}ngAfterViewInit(){this.getGoogleMaps().then(t=>{this.googleMaps=t;const e=this.mapElementRef.nativeElement,n=new t.Map(e,{center:this.center,zoom:16});this.googleMaps.event.addListenerOnce(n,"idle",()=>{this.renderer.addClass(e,"visible")}),this.selectable?this.clickListener=n.addListener("click",t=>{const e={lat:t.latLng.lat(),lng:t.latLng.lng()};this.modalCtrl.dismiss(e)}):new t.Marker({position:this.center,map:n,title:"Picked Location"}).setMap(n)}).catch(t=>{console.log(t)})}getGoogleMaps(){const t=window,e=t.google;return e&&e.maps?Promise.resolve(e.maps):new Promise((e,n)=>{const o=document.createElement("script");o.src=`https://maps.googleapis.com/maps/api/js?key=${i.a.googleMapsAPIKey}`,o.async=!0,o.defer=!0,document.body.appendChild(o),o.onload=()=>{const i=t.google;i&&i.maps?(console.log(i),e(i.maps)):n("Google maps SDK not available")}})}onCancel(){this.modalCtrl.dismiss()}ngOnDestroy(){this.clickListener&&this.googleMaps.event.removeListener(this.clickListener)}}return t.\u0275fac=function(e){return new(e||t)(o.Jb(s.Y),o.Jb(o.F))},t.\u0275cmp=o.Db({type:t,selectors:[["app-map-modal"]],viewQuery:function(t,e){if(1&t&&o.mc(a,1),2&t){let t;o.dc(t=o.Vb())&&(e.mapElementRef=t.first)}},inputs:{center:"center",selectable:"selectable",closeButtonText:"closeButtonText",title:"title"},decls:10,vars:2,consts:[["slot","primary"],[3,"click"],[1,"map"],["map",""]],template:function(t,e){1&t&&(o.Mb(0,"ion-header"),o.Mb(1,"ion-toolbar"),o.Mb(2,"ion-title"),o.jc(3),o.Lb(),o.Mb(4,"ion-buttons",0),o.Mb(5,"ion-button",1),o.Ub("click",function(){return e.onCancel()}),o.jc(6),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Mb(7,"ion-content"),o.Kb(8,"div",2,3),o.Lb()),2&t&&(o.zb(3),o.kc(e.title),o.zb(3),o.kc(e.closeButtonText))},directives:[s.r,s.S,s.R,s.h,s.g,s.o],styles:[".map[_ngcontent-%COMP%]{position:absolute;height:100%;width:100%;background-color:initial;opacity:0;transition:opacity .15s ease-in;touch-action:none}.map.visible[_ngcontent-%COMP%]{opacity:1}"]}),t})()},"Bdq+":function(t,e,n){"use strict";n.d(e,"a",function(){return d});var i=n("IzEk"),o=n("eIep"),s=n("lJxs"),a=n("vkgz"),r=n("2Vo4");class c{constructor(t,e,n,i,o,s,a,r,c,l){this.id=t,this.placeId=e,this.userId=n,this.placeTitle=i,this.placeImage=o,this.firstName=s,this.lastName=a,this.guestNumber=r,this.bookedFrom=c,this.bookedTo=l}}var l=n("fXoL"),u=n("qXBG"),h=n("tk/3");let d=(()=>{class t{constructor(t,e){this.authService=t,this.http=e,this._bookings=new r.a([])}get bookings(){return this._bookings.asObservable()}fetchBookings(){let t;return this.authService.userId.pipe(Object(i.a)(1),Object(o.a)(e=>{if(!e)throw new Error("User not found");return t=e,this.authService.token}),Object(i.a)(1),Object(o.a)(e=>this.http.get(`https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/my-bookings.json?orderBy="userId"&equalTo="${t}"&auth=${e}`)),Object(s.a)(t=>{const e=[];for(const n in t)t.hasOwnProperty(n)&&e.push(new c(n,t[n].placeId,t[n].userId,t[n].placeTitle,t[n].placeImage,t[n].firstName,t[n].lastName,t[n].guestNumber,new Date(t[n].bookedFrom),new Date(t[n].bookedTo)));return e}),Object(a.a)(t=>{this._bookings.next(t)}))}addBooking(t,e,n,s,r,l,u,h){let d,p,b;return this.authService.userId.pipe(Object(i.a)(1),Object(o.a)(t=>{if(!t)throw new Error("No user id found!");return b=t,this.authService.token}),Object(i.a)(1),Object(o.a)(i=>(p=new c(Math.random().toString(),t,b,e,n,s,r,l,u,h),this.http.post(`https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/my-bookings.json?auth=${i}`,Object.assign(Object.assign({},p),{id:null})))),Object(o.a)(t=>(d=t.name,this.bookings)),Object(i.a)(1),Object(a.a)(t=>{p.id=d,this._bookings.next(t.concat(p))}))}cancelBooking(t){return this.authService.token.pipe(Object(i.a)(1),Object(o.a)(e=>this.http.delete(`https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/my-bookings/${t}.json?auth=${e}`)),Object(o.a)(()=>this.bookings),Object(i.a)(1),Object(a.a)(e=>{this._bookings.next(e.filter(e=>e.id!==t))}))}}return t.\u0275fac=function(e){return new(e||t)(l.Qb(u.a),l.Qb(h.a))},t.\u0275prov=l.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},JbSX:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var i=n("wEJo"),o=n("qULd"),s=n("iWo5");const a=(t,e)=>{let n,a;const r=(t,i,o)=>{if("undefined"==typeof document)return;const s=document.elementFromPoint(t,i);s&&e(s)?s!==n&&(l(),c(s,o)):l()},c=(t,e)=>{n=t,a||(a=n);const o=n;Object(i.f)(()=>o.classList.add("ion-activated")),e()},l=(t=!1)=>{if(!n)return;const e=n;Object(i.f)(()=>e.classList.remove("ion-activated")),t&&a!==n&&n.click(),n=void 0};return Object(s.createGesture)({el:t,gestureName:"buttonActiveDrag",threshold:0,onStart:t=>r(t.currentX,t.currentY,o.a),onMove:t=>r(t.currentX,t.currentY,o.b),onEnd:()=>{l(!0),Object(o.e)(),a=void 0}})}},Qe3P:function(t,e,n){"use strict";n.d(e,"a",function(){return p});var i=n("2Vo4"),o=n("LRne"),s=n("IzEk"),a=n("eIep"),r=n("lJxs"),c=n("vkgz");class l{constructor(t,e,n,i,o,s,a,r,c){this.id=t,this.title=e,this.description=n,this.imageUrl=i,this.price=o,this.availableFrom=s,this.availableTo=a,this.userId=r,this.location=c}}var u=n("fXoL"),h=n("qXBG"),d=n("tk/3");let p=(()=>{class t{constructor(t,e){this.authService=t,this.http=e,this._places=new i.a([])}get places(){return this._places.asObservable()}fetchPlaces(){return this.authService.token.pipe(Object(s.a)(1),Object(a.a)(t=>this.http.get(`https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/offered-places.json?auth=${t}`)),Object(r.a)(t=>{const e=[];for(const n in t)t.hasOwnProperty(n)&&e.push(new l(n,t[n].title,t[n].description,t[n].imageUrl,t[n].price,new Date(t[n].availableFrom),new Date(t[n].availableTo),t[n].userId,t[n].location));return e}),Object(c.a)(t=>{this._places.next(t)}))}getPlace(t){return this.authService.token.pipe(Object(s.a)(1),Object(a.a)(e=>this.http.get(`https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/offered-places/${t}.json?auth=${e}`)),Object(r.a)(e=>new l(t,e.title,e.description,e.imageUrl,e.price,new Date(e.availableFrom),new Date(e.availableTo),e.userId,e.location)))}uploadImage(t){const e=new FormData;return e.append("image",t),this.authService.token.pipe(Object(s.a)(1),Object(a.a)(t=>(console.log(t),this.http.post("https://us-central1-ionic-angular-course-22b9c.cloudfunctions.net/storeImage",e,{headers:{Authorization:"Bearer "+t}}))))}addPlace(t,e,n,i,o,r,u){let h,d,p;return this.authService.userId.pipe(Object(s.a)(1),Object(a.a)(t=>(d=t,this.authService.token)),Object(s.a)(1),Object(a.a)(s=>{if(!d)throw new Error("No user id found!");return p=new l(Math.random().toString(),t,e,u,n,i,o,d,r),this.http.post(`https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/offered-places.json?auth=${s}`,Object.assign(Object.assign({},p),{id:null}))}),Object(a.a)(t=>(h=t.name,this.places)),Object(s.a)(1),Object(c.a)(t=>{p.id=h,this._places.next(t.concat(p))}))}updatePlace(t,e,n){let i,r;return this.authService.token.pipe(Object(s.a)(1),Object(a.a)(t=>(i=t,this.places)),Object(s.a)(1),Object(a.a)(t=>!t||t.length<=0?this.fetchPlaces():Object(o.a)(t)),Object(a.a)(o=>{const s=o.findIndex(e=>e.id===t);r=[...o];const a=r[s];return r[s]=new l(a.id,e,n,a.imageUrl,a.price,a.availableFrom,a.availableTo,a.userId,a.location),this.http.put(`https://ionic-angular-course-22b9c-default-rtdb.firebaseio.com/offered-places/${t}.json?auth=${i}`,Object.assign(Object.assign({},r[s]),{id:null}))}),Object(c.a)(()=>{this._places.next(r)}))}}return t.\u0275fac=function(e){return new(e||t)(u.Qb(h.a),u.Qb(d.a))},t.\u0275prov=u.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},acej:function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"b",function(){return s});var i=n("1vRN");const o=async(t,e,n,o,s)=>{if(t)return t.attachViewToDom(e,n,s,o);if("string"!=typeof n&&!(n instanceof HTMLElement))throw new Error("framework delegate is missing");const a="string"==typeof n?e.ownerDocument&&e.ownerDocument.createElement(n):n;return o&&o.forEach(t=>a.classList.add(t)),s&&Object.assign(a,s),e.appendChild(a),await new Promise(t=>Object(i.c)(a,t)),a},s=(t,e)=>{if(e){if(t)return t.removeViewFromDom(e.parentElement,e);e.remove()}return Promise.resolve()}},h3R7:function(t,e,n){"use strict";n.d(e,"a",function(){return i});const i={bubbles:{dur:1e3,circles:9,fn:(t,e,n)=>{const i=t*e/n-t+"ms",o=2*Math.PI*e/n;return{r:5,style:{top:9*Math.sin(o)+"px",left:9*Math.cos(o)+"px","animation-delay":i}}}},circles:{dur:1e3,circles:8,fn:(t,e,n)=>{const i=e/n,o=t*i-t+"ms",s=2*Math.PI*i;return{r:5,style:{top:9*Math.sin(s)+"px",left:9*Math.cos(s)+"px","animation-delay":o}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(t,e)=>({r:6,style:{left:9-9*e+"px","animation-delay":-110*e+"ms"}})},lines:{dur:1e3,lines:12,fn:(t,e,n)=>({y1:17,y2:29,style:{transform:`rotate(${30*e+(e<6?180:-180)}deg)`,"animation-delay":t*e/n-t+"ms"}})},"lines-small":{dur:1e3,lines:12,fn:(t,e,n)=>({y1:12,y2:20,style:{transform:`rotate(${30*e+(e<6?180:-180)}deg)`,"animation-delay":t*e/n-t+"ms"}})}}},qULd:function(t,e,n){"use strict";n.d(e,"a",function(){return s}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"d",function(){return c}),n.d(e,"e",function(){return r});const i={getEngine(){const t=window;return t.TapticEngine||t.Capacitor&&t.Capacitor.isPluginAvailable("Haptics")&&t.Capacitor.Plugins.Haptics},available(){return!!this.getEngine()},isCordova:()=>!!window.TapticEngine,isCapacitor:()=>!!window.Capacitor,impact(t){const e=this.getEngine();if(!e)return;const n=this.isCapacitor()?t.style.toUpperCase():t.style;e.impact({style:n})},notification(t){const e=this.getEngine();if(!e)return;const n=this.isCapacitor()?t.style.toUpperCase():t.style;e.notification({style:n})},selection(){this.impact({style:"light"})},selectionStart(){const t=this.getEngine();t&&(this.isCapacitor()?t.selectionStart():t.gestureSelectionStart())},selectionChanged(){const t=this.getEngine();t&&(this.isCapacitor()?t.selectionChanged():t.gestureSelectionChanged())},selectionEnd(){const t=this.getEngine();t&&(this.isCapacitor()?t.selectionEnd():t.gestureSelectionEnd())}},o=()=>{i.selection()},s=()=>{i.selectionStart()},a=()=>{i.selectionChanged()},r=()=>{i.selectionEnd()},c=t=>{i.impact(t)}}}]);
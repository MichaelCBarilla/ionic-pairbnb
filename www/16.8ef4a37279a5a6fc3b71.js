(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"vm+t":function(t,e,i){"use strict";i.r(e),i.d(e,"EditOfferPageModule",function(){return u});var o=i("ofXK"),n=i("3Pt+"),r=i("TEn/"),s=i("tyNb"),a=i("fXoL"),c=i("Qe3P");function b(t,e){1&t&&(a.Mb(0,"div",7),a.Kb(1,"ion-spinner",8),a.Lb())}function l(t,e){1&t&&(a.Mb(0,"ion-row"),a.Mb(1,"ion-col",10),a.Mb(2,"p"),a.jc(3,"Description must between 1 and 180 characters"),a.Lb(),a.Lb(),a.Lb())}function p(t,e){if(1&t&&(a.Mb(0,"form",9),a.Mb(1,"ion-grid"),a.Mb(2,"ion-row"),a.Mb(3,"ion-col",10),a.Mb(4,"ion-item"),a.Mb(5,"ion-label",11),a.jc(6,"Title"),a.Lb(),a.Kb(7,"ion-input",12),a.Lb(),a.Lb(),a.Lb(),a.Mb(8,"ion-row"),a.Mb(9,"ion-col",10),a.Mb(10,"ion-item"),a.Mb(11,"ion-label",11),a.jc(12,"Short Description"),a.Lb(),a.Kb(13,"ion-textarea",13),a.Lb(),a.Lb(),a.Lb(),a.ic(14,l,4,0,"ion-row",14),a.Lb(),a.Lb()),2&t){const t=a.Wb();a.bc("formGroup",t.form),a.zb(14),a.bc("ngIf",!t.form.get("description").valid&&t.form.get("description").touched)}}const f=[{path:"",component:(()=>{class t{constructor(t,e,i,o,n,r){this.route=t,this.placesService=e,this.navCtrl=i,this.router=o,this.loadingCtrl=n,this.alertCtrl=r,this.isLoading=!1}ngOnInit(){this.route.paramMap.subscribe(t=>{t.has("placeId")?(this.placeId=t.get("placeId"),this.isLoading=!0,this.placeSub=this.placesService.getPlace(t.get("placeId")).subscribe(t=>{this.place=t,this.initForm(),this.isLoading=!1},t=>{this.alertCtrl.create({header:"An error occured!",message:"Place could not be fetched. Please try again later.",buttons:[{text:"Okay",handler:()=>{this.router.navigateByUrl("places/tabs/offers")}}]}).then(t=>{t.present()})})):this.navCtrl.navigateBack("/places/tabs/offers")})}initForm(){this.form=new n.d({title:new n.b(this.place.title,{updateOn:"blur",validators:[n.p.required]}),description:new n.b(this.place.description,{updateOn:"blur",validators:[n.p.required,n.p.maxLength(180)]})})}onUpdateOffer(){this.form.valid&&this.loadingCtrl.create({message:"Updating place..."}).then(t=>{t.present(),this.placesService.updatePlace(this.place.id,this.form.value.title,this.form.value.description).subscribe(()=>{t.dismiss(),this.form.reset(),this.router.navigateByUrl("/places/tabs/offers")})})}ngOnDestroy(){this.placeSub&&this.placeSub.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(a.Jb(s.a),a.Jb(c.a),a.Jb(r.Z),a.Jb(s.g),a.Jb(r.W),a.Jb(r.b))},t.\u0275cmp=a.Db({type:t,selectors:[["app-edit-offer"]],decls:12,vars:4,consts:[["slot","start"],[3,"defaultHref"],["slot","primary"],[3,"disabled","click"],["name","checkmark","slot","icon-only"],["class","ion-text-center",4,"ngIf"],[3,"formGroup",4,"ngIf"],[1,"ion-text-center"],["color","primary"],[3,"formGroup"],["size-sm","6","offset-sm","3"],["position","floating"],["type","text","autocomplete","","autocorrect","","formControlName","title"],["rows","3","formControlName","description"],[4,"ngIf"]],template:function(t,e){1&t&&(a.Mb(0,"ion-header"),a.Mb(1,"ion-toolbar"),a.Mb(2,"ion-buttons",0),a.Kb(3,"ion-back-button",1),a.Lb(),a.Mb(4,"ion-title"),a.jc(5,"Edit Offer"),a.Lb(),a.Mb(6,"ion-buttons",2),a.Mb(7,"ion-button",3),a.Ub("click",function(){return e.onUpdateOffer()}),a.Kb(8,"ion-icon",4),a.Lb(),a.Lb(),a.Lb(),a.Lb(),a.Mb(9,"ion-content"),a.ic(10,b,2,0,"div",5),a.ic(11,p,15,2,"form",6),a.Lb()),2&t&&(a.zb(3),a.bc("defaultHref","/places/tabs/offers/"+e.placeId),a.zb(4),a.bc("disabled",!(null!=e.form&&e.form.valid)),a.zb(3),a.bc("ngIf",e.isLoading),a.zb(1),a.bc("ngIf",!e.isLoading))},directives:[r.r,r.S,r.h,r.e,r.f,r.R,r.g,r.s,r.o,o.k,r.K,n.q,n.k,n.e,r.q,r.F,r.n,r.v,r.z,r.u,r.eb,n.j,n.c,r.P],styles:[""]}),t})()}];let d=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.Hb({type:t}),t.\u0275inj=a.Gb({imports:[[s.i.forChild(f)],s.i]}),t})(),u=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.Hb({type:t}),t.\u0275inj=a.Gb({imports:[[o.b,n.n,r.U,d]]}),t})()}}]);
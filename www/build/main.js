webpackJsonp([0],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, camera, DomSanitizer, ngZone) {
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.DomSanitizer = DomSanitizer;
        this.ngZone = ngZone;
    }
    HomePage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            targetWidth: 1000,
            targetHeight: 1000,
            saveToPhotoAlbum: true
        };
        this.ngZone.run(function () {
            _this.camera.getPicture(options).then(function (imageData) {
                //imageData = imageData.replace('file:///', '/');
                // let filename = imageData.substring(imageData.lastIndexOf('/')+1);
                // let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
                //      //then use the method reasDataURL  btw. var_picture is ur image variable
                //      this.file.readAsDataURL(path, filename).then(res=> var_picture = res  );
                console.log('imageData: ', imageData);
                _this.base64Image = imageData;
                WatsonVR.classify('version', 'apikey', imageData, function (success) {
                    console.log(success);
                    var result = JSON.parse(success);
                    var classes = result.images[0].classifiers[0].classes;
                    var array = [];
                    for (var i = 0; i < classes.length; i++) {
                        if (classes[i].score >= 0.6) {
                            var div = '<div>' + classes[i].class + ' ' + ((classes[i].score) * 100).toFixed(1) + '%</div>';
                            array.push(div);
                        }
                    }
                    document.getElementById("result").innerHTML = array.toString();
                }, function (error) {
                    console.log('error: ', error);
                    alert('ERROR: ' + error);
                });
            }, function (err) {
                console.log(err);
            });
        });
    };
    HomePage.prototype.fetchResults = function (result) {
        var classes = result.images[0].classifiers[0].classes;
        var array = [];
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].score >= 0.6) {
                var div = '<div>' + classes[i].class + ' ' + ((classes[i].score) * 100).toFixed(1) + '%</div>';
                array.push(div);
            }
        }
        return array;
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/surbhibhattar/Documents/Projects/Ionic Projects/IonicAppToTestWatsonVRPlugin/src/pages/home/home.html"*/'<meta http-equiv="Content-Security-Policy" content="default-src *; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' *; style-src \'self\' \'unsafe-inline\' *">\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      VR App\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="home">\n    \n  <button ion-button (click)="takePicture()">Take a Picture</button>\n  <img [src]="DomSanitizer.bypassSecurityTrustUrl(base64Image)" *ngIf="base64Image" style="width: 100px; height:100px"/>\n  <div id="result"></div>\n  <!-- <ion-list>\n      <ion-item *ngfor="let eachClass of imageClasses">\n            {{eachClass.class}}\n      </ion-item>\n  </ion-list> -->\n  </ion-content>\n\n  <!-- <ion-header>\n      <ion-toolbar color="primary">\n        <ion-title>\n          Images\n        </ion-title>\n      </ion-toolbar>\n    </ion-header>\n    \n    <ion-content padding>\n    \n      <ion-card *ngFor="let photo of photos">\n        <img src="{{photo}}" />\n      </ion-card>\n    \n    </ion-content>\n    \n    <ion-footer>\n      <ion-toolbar>\n        <button ion-button block (click)="presentActionSheet()">Select Pictures</button>\n      </ion-toolbar>\n    </ion-footer>\n     -->'/*ion-inline-end:"/Users/surbhibhattar/Documents/Projects/Ionic Projects/IonicAppToTestWatsonVRPlugin/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], HomePage);
    return HomePage;
}());

// import { Component } from '@angular/core';
// import { NavController, ActionSheetController} from 'ionic-angular';
// import { Camera } from '@ionic-native/camera';
// import { ImagePicker } from '@ionic-native/image-picker';
// import { Crop } from '@ionic-native/crop';
// import { normalizeURL } from 'ionic-angular';
// @Component({
//   selector: 'page-home',
//template:/*ion-inline-start:"/Users/surbhibhattar/Documents/Projects/Ionic Projects/IonicAppToTestWatsonVRPlugin/src/pages/home/home.html"*/'<meta http-equiv="Content-Security-Policy" content="default-src *; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' *; style-src \'self\' \'unsafe-inline\' *">\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      VR App\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="home">\n    \n  <button ion-button (click)="takePicture()">Take a Picture</button>\n  <img [src]="DomSanitizer.bypassSecurityTrustUrl(base64Image)" *ngIf="base64Image" style="width: 100px; height:100px"/>\n  <div id="result"></div>\n  <!-- <ion-list>\n      <ion-item *ngfor="let eachClass of imageClasses">\n            {{eachClass.class}}\n      </ion-item>\n  </ion-list> -->\n  </ion-content>\n\n  <!-- <ion-header>\n      <ion-toolbar color="primary">\n        <ion-title>\n          Images\n        </ion-title>\n      </ion-toolbar>\n    </ion-header>\n    \n    <ion-content padding>\n    \n      <ion-card *ngFor="let photo of photos">\n        <img src="{{photo}}" />\n      </ion-card>\n    \n    </ion-content>\n    \n    <ion-footer>\n      <ion-toolbar>\n        <button ion-button block (click)="presentActionSheet()">Select Pictures</button>\n      </ion-toolbar>\n    </ion-footer>\n     -->'/*ion-inline-end:"/Users/surbhibhattar/Documents/Projects/Ionic Projects/IonicAppToTestWatsonVRPlugin/src/pages/home/home.html"*/
// })
// export class HomePage {
//   photos : Array<string>;
//   constructor(
//     public navCtrl: NavController,
//     public actionSheetCtrl: ActionSheetController,
//     public imagePicker: ImagePicker,
//     public camera: Camera,
//     public cropService: Crop
//   ) {}
//   presentActionSheet() {
//     let actionSheet = this.actionSheetCtrl.create({
//       title: 'Choose or take a picture',
//       buttons: [
//         {
//           text: 'Take a picture',
//           handler: () => {
//             this.takePicture();
//           }
//         },
//         {
//           text: 'Choose pictures',
//           handler: () => {
//             this.openImagePicker();
//           }
//         }
//       ]
//     });
//     actionSheet.present();
//   }
//   openImagePicker(){
//     let options = {
//       maximumImagesCount: 5,
//     }
//     this.photos = new Array<string>();
//     this.imagePicker.getPictures(options)
//     .then((results) => {
//       this.reduceImages(results).then(() => {
//         console.log('all images cropped!!');
//       });
//     }, (err) => { console.log(err) });
//   }
//   reduceImages(selected_pictures: any) : any{
//     return selected_pictures.reduce((promise:any, item:any) => {
//       return promise.then((result) => {
//         return this.cropService.crop(item, {quality: 75}).then(cropped_image => this.photos.push(cropped_image));
//       });
//     }, Promise.resolve());
//   }
//   takePicture(){
//     let options = {
//       quality: 100,
//       correctOrientation: true
//     };
//     this.camera.getPicture(options)
//     .then((data) => {
//       this.photos = new Array<string>();
//       this.cropService
//       .crop(data, {quality: 75})
//       .then((newImage) => {
//         this.photos.push(newImage);
//       }, error => console.error("Error cropping image", error));
//     }, function(error) {
//       console.log(error);
//     });
//   }
// }
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(218);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/surbhibhattar/Documents/Projects/Ionic Projects/IonicAppToTestWatsonVRPlugin/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/surbhibhattar/Documents/Projects/Ionic Projects/IonicAppToTestWatsonVRPlugin/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[195]);
//# sourceMappingURL=main.js.map
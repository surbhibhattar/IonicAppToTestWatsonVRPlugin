import { Component ,NgZone} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { normalizeURL } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

declare var WatsonVR: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string;
  constructor(public navCtrl: NavController, private camera: Camera, private DomSanitizer: DomSanitizer ,private ngZone:NgZone, private imagePicker: ImagePicker) {
  }
  takePicture(): void{
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        targetWidth: 1000,
        targetHeight: 1000,
        saveToPhotoAlbum: true
      }

      this.ngZone.run(()=>{
        this.camera.getPicture(options).then((imageData) => {
          //imageData = imageData.replace('file:///', '/');


          // let filename = imageData.substring(imageData.lastIndexOf('/')+1);
          // let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
          //      //then use the method reasDataURL  btw. var_picture is ur image variable
          //      this.file.readAsDataURL(path, filename).then(res=> var_picture = res  );


          console.log('imageData: ', imageData);
          this.base64Image = imageData;


          WatsonVR.classify('version', 'apikey', imageData ,function(success){
            console.log(success);
            let result = JSON.parse(success);
            let classes = result.images[0].classifiers[0].classes;
            let array = [];
            for(let i=0;i<classes.length;i++){
              if(classes[i].score >= 0.6) {
                let div = '<div>' + classes[i].class + ' ' + ((classes[i].score)*100).toFixed(1) + '%</div>';
                array.push(div);
              }
            }
            document.getElementById("result").innerHTML = array.toString();
            
          }, function(error){
            console.log('error: ', error);
            alert('ERROR: '+error);
          })


        }, (err) => {
          console.log(err);
        });
      });
      
    }
  
  chooseFromGallery(): void{
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: true
    }

    this.imagePicker.getPictures(options).then((results) => {
      
          console.log('Image URI: ' + results[0]);
          WatsonVR.classify('version', 'apikey', results[0] ,function(success){
            console.log(success);
            let result = JSON.parse(success);
            let classes = result.images[0].classifiers[0].classes;
            let array = [];
            for(let i=0;i<classes.length;i++){
              if(classes[i].score >= 0.6) {
                let div = '<div>' + classes[i].class + ' ' + ((classes[i].score)*100).toFixed(1) + '%</div>';
                array.push(div);
              }
            }
            document.getElementById("result").innerHTML = array.toString();
            
          }, function(error){
            console.log('error: ', error);
            alert('ERROR: '+error);
          })
      
    }, (err) => {console.log(err);});
  }

  fetchResults(result): any[]{
    let classes = result.images[0].classifiers[0].classes;
    let array = [];
    for(let i=0;i<classes.length;i++){
      if(classes[i].score >= 0.6) {
        let div = '<div>' + classes[i].class + ' ' + ((classes[i].score)*100).toFixed(1) + '%</div>';
        array.push(div);
      }
    }
    return array;
  }
}

// import { Component } from '@angular/core';
// import { NavController, ActionSheetController} from 'ionic-angular';
// import { Camera } from '@ionic-native/camera';
// import { ImagePicker } from '@ionic-native/image-picker';
// import { Crop } from '@ionic-native/crop';
// import { normalizeURL } from 'ionic-angular';

// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'
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

import { Component ,NgZone} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

declare var WatsonVR: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(public navCtrl: NavController, private camera: Camera ,private ngZone:NgZone, 
    private imagePicker: ImagePicker, private base64: Base64) {
  }

  takePicture(): void{

    document.getElementById('image').setAttribute('src','');
    document.getElementById("result").innerHTML = '';

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        targetWidth: 1000,
        targetHeight: 1000,
        saveToPhotoAlbum: true,
        correctOrientation: true 
      }

      const self=this;

      this.ngZone.run(()=>{
        this.camera.getPicture(options).then((imageData) => {
         
          this.base64.encodeFile(imageData).then((base64File: string) => {

            document.getElementById('image').setAttribute('src',base64File);
            self.doRecognition(imageData);

          }, (err) => {
            console.log(err);
          });
        }, (err) => {
          console.log(err);
        });
      });
      
    }

  chooseFromGallery(): void{

    document.getElementById('image').setAttribute('src','');
    document.getElementById("result").innerHTML = '';

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
    }
    const self = this;
    this.imagePicker.getPictures(options).then((results) => {
       
      this.base64.encodeFile(results[0]).then((base64File: string) => {

        document.getElementById('image').setAttribute('src',base64File);
        self.doRecognition(results[0]);
      }, (err) => {
        console.log(err);
      });
    }, (err) => {console.log(err);});
  }

  fetchResults(result){
    let classes = result.images[0].classifiers[0].classes;
		let array = [];
		for(let i=0;i<classes.length;i++){
			if(classes[i].score >= 0.6) {
				let div = '<tr><th>' + classes[i].class + '</th>' + '<th>' + ((classes[i].score)*100).toFixed(1) + '%</th></tr>';
				array.push(div);
			}
		}
		return array;
  }

  doRecognition(imageUri){
    const self = this;
    WatsonVR.classify('version', 'apikey', imageUri ,function(success){
      console.log(success);
      let result = JSON.parse(success);
      let array = self.fetchResults(result);
      document.getElementById("result").innerHTML = array.toString();
      
    }, function(error){
      console.log('error: ', error);
      alert('ERROR: '+error);
    })
  }
}
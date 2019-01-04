import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  constructor(public modalController: ModalController, private camera: Camera) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss({
      'result': 'hello world'
    });
    console.log('dismiss button was hit!!');
  }

  setCameraOptions(srcType: number) {
    const options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: srcType,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      cameraDirection: this.camera.Direction.BACK
    };

    return options;
  }

  takePicture() {

    const options: CameraOptions = this.setCameraOptions(this.camera.PictureSourceType.CAMERA);

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      setTimeout(() => {
        alert(imageData);
      }, 0);
    }, (err) => {
      // Handle error
      setTimeout(() => {
        alert(err);
      }, );

    });
  }


}

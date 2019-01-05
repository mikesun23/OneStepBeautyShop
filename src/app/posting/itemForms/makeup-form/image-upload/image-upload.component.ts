import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';



@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  images: any[] = [];

  constructor(
    public modalController: ModalController,
    private camera: Camera,
    // private file: File,
    public actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss({
      'result': 'hello world'
    });
    console.log('dismiss button was hit!!');
  }

  async showActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      subHeader: 'up to 9 photos',
      buttons: [
        {
          text: 'Take a Photo',
          icon: 'camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Load From Library',
          icon: 'images',
          handler: () => {
            this.loadFromLibrary();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.actionSheetCtrl.dismiss();
          }
        }
      ]
    });
    await actionSheet.present();
  }

  setCameraOptions(srcType: number) {
    const options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: srcType,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      cameraDirection: this.camera.Direction.BACK
    };

    return options;
  }

  takePicture() {

    const srcType = this.camera.PictureSourceType.CAMERA;
    const options: CameraOptions = this.setCameraOptions(srcType);

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.images.push(imageData);
      setTimeout(() => {
        alert(imageData);
      }, 0);
    },
      (err) => {
        // Handle error
        setTimeout(() => {
          alert(err);
        });

      });
  }

  loadFromLibrary() {
    const srcType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
    const options: CameraOptions = this.setCameraOptions(srcType);

    this.camera.getPicture(options).then(imageData => {
      this.images.push(imageData);
      setTimeout(() => {
        alert(imageData);
      });
    },
      (err) => {
        setTimeout(() => {
          alert(err);
        });
      });
  }


}

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController, ActionSheetController, Slides } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() imageUrlList: string[];
  @Input() imageOriginalUrlList: any[];
  @ViewChild(Slides) slides: Slides;

  imageMaxAmount = 9;
  imageLoadedAmount = 0;
  images: string[] = [];
  originImageUrlList: any[] = [];

  firstImageIndex = 0;
  firstImageText = 'First Shown Image';
  otherImageText = 'Set As First';

  checkInit = false;

  constructor(
    public modalController: ModalController,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private webView: WebView
  ) { }

  ngOnInit() {
    this.imageLoadedAmount = this.imageUrlList.length;
    this.images = this.imageUrlList;
    this.originImageUrlList = this.imageOriginalUrlList;
    this.checkInit = true;
  }

  dismissModal() {
    this.modalController.dismiss({
      imageUrlList: this.images,
      imageOriginalUrlList: this.originImageUrlList
    });
    console.log('dismiss button was hit!!');
  }

  async imageDeleteActionSheet() {
    const index: number = await this.slides.getActiveIndex().then(res => res);
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            if (index >= 0 && this.images[index] !== undefined) {
              this.actionSheetCtrl.dismiss().then(res => {
                this.imageLoadedAmount--;
                if (index > 0) {
                  this.slides.slideTo(0).then(suc => {
                    this.images.splice(index, 1);
                    this.slides.update();
                  });
                } else {
                  if (this.images.length > 1) {
                    this.slides.slideTo(0).then (suc => {
                      this.images.splice(index, 1);
                      this.slides.update();
                    });
                  } else {
                    this.images.splice(index, 1);
                    this.slides.update();
                  }
                }
              });
            }
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

  async setFirstImage() {
    const index: number = await this.slides.getActiveIndex().then(res => res);
    this.firstImageIndex = index;
  }

  setCameraOptions(srcType: number) {
    const options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: srcType,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      cameraDirection: this.camera.Direction.BACK
    };

    return options;
  }

  takePicture() {
    const srcType = this.camera.PictureSourceType.CAMERA;
    const options: CameraOptions = this.setCameraOptions(srcType);
    this.camera.getPicture(options).then((imageData) => {
      const convertedUrl = this.webView.convertFileSrc(imageData);
      this.images.push(convertedUrl);
      this.originImageUrlList.push(imageData);
      this.imageLoadedAmount++;
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
      const convertedUrl = this.webView.convertFileSrc(imageData);
      this.images.push(convertedUrl);
      this.originImageUrlList.push(imageData);
      this.imageLoadedAmount++;
    },
      (err) => {
        setTimeout(() => {
          alert(err);
        });
      });
  }

  // copyFileToDirectory(namePath: string, currentName: string) {
  //   this.file.copyFile(namePath, currentName, this.file.dataDirectory, currentName).then(res => {
  //     this.testSrc = this.file.dataDirectory + currentName;
  //   });
  // }

  // pathForImage(img) {
  //   if (img === null) {
  //     return '';
  //   } else {
  //     const converted = this.webView.convertFileSrc(img);
  //     return converted;
  //   }
  // }

}

/**
 * how to remove slide from slides???
 * 1. use swiper instead of the wrapper Slides
 * 2. manually remove the element from DOM
 */

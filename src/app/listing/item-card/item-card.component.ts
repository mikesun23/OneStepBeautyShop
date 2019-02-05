import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() itemData: any = null;

  imageUrlList: string[] = [];

  constructor() { }

  ngOnInit() {
    this.imageUrlList = this.itemData.value['imageDownLoadUrl'];
    const end = this.imageUrlList.length && this.imageUrlList.length <= 3 ? 3 : this.imageUrlList.length;
    this.imageUrlList = this.imageUrlList.splice(0, end);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime, concatMap, concat, take, merge } from 'rxjs/operators';
import { VirtualItem, VirtualFooter, InfiniteScroll, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  list: any[] = [];

  listEnd = false;

  offset = new BehaviorSubject(null);

  infinite: Observable<any[]>;

  currentBatchLastItemId = '';
  previousBatchLastItemId = '';

  refreshClicked = false;
  downloadingFlag = false;


  constructor(private db: AngularFireDatabase,
    private ds: AngularFirestore,
    public toastController: ToastController) {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => {
        if (n !== null) {
          if (n['e'] !== null) {
            n['e'].target.complete();
          }
          return this.getBatch(n['lastSeen']);
        } else {
          return this.getBatch(n);
        }
      }),
      scan((acc, batch) => {
        const tmp = [...acc, ...batch];
        this.downloadingFlag = false;
        return [...acc, ...batch];
      }, []),
    );
    this.infinite = batchMap;
  }

  ngOnInit() {
    this.infinite.subscribe(res => {
      this.list = res;
      console.log(res);
    });
  }

  async showRefreshResultToast() {
    const toast = await this.toastController.create({
      message: 'That\'s all! Check later!' ,
      position: 'bottom',
      mode: 'ios',
      duration: 1500,
      color: 'lightBlue'
    });
    toast.present();
  }

  // HTMLIonInfiniteScrollElement
  nextBatch(event) {
    this.downloadingFlag = true;
    setTimeout(() => {
      this.offset.next({ e: event, lastSeen: this.currentBatchLastItemId });
    }, 1000);
  }

  refreshButtonNextBatch(event) {
    this.refreshClicked = true;
    if (this.listEnd === true && event === null) {
      setTimeout(() => {
        this.offset.next({ e: event, lastSeen: this.currentBatchLastItemId });
      }, 1000);
    }
  }

  // get individual batch from database, we need 'lastSeen' item from previous batch
  getBatch(lastSeen: string) {
    console.log('new batch ' + lastSeen);
    let queryFn: (ref: firebase.database.Reference) => firebase.database.Query;

    if (lastSeen === '' || lastSeen === null || lastSeen === undefined) {
      queryFn = ref => ref.orderByKey().limitToFirst(6);
    } else {
      queryFn = ref => ref.orderByKey().startAt(lastSeen).limitToFirst(6);
    }

    return this.db.list('/PostRoot/RawPool/', queryFn)
      .snapshotChanges()
      .pipe(
        tap(arr => {
          // conditions: array length could be any number that <=size
          this.previousBatchLastItemId = this.currentBatchLastItemId;
          this.currentBatchLastItemId = arr[arr.length - 1].payload.key;
          if ((this.previousBatchLastItemId === this.currentBatchLastItemId) && this.currentBatchLastItemId !== '') {
            this.listEnd = true;
            if (this.refreshClicked === true) {
              this.showRefreshResultToast();
              this.refreshClicked = false;
            }
          } else {
            this.listEnd = false;
          }
        }),
        map(arr => this.listEnd ? [] : arr.slice(0, 5)), // take doesn't work, since firebase emitting object one by one
        map(arr => { // keep everything up-todate in real-time across multiple batches
          return arr.map(record => {
            const id = record.payload.key;
            const data = record.payload.val();
            return { key: id, value: data };
          });

        })
      );
  }

}

/**
 * virtualScroll and batchProcess
 * init: featch first batch of data from database
 * render first batch with virtualScroll
 * (virtualScroll is all about rendering the SUBSET of RETRIEVED data)
 * detection: when user viewed the last, or certain position of RETRIEEVED data \
 *     nextBatch of data should be fetched.
 * all batches of data should be merged into a list of Observables, so all items are dynamic to editted changes
 * problem: everytime the items array change will trigger virtualScroll rerender the whole list
 *
 * indicators: endOf List, stop fetching new data.
 *
 * constructor() { init first batch of data }
 *
 * getBatch() { get next batch of data }
 *
 * 1. get batch
 * 2. append new batch to the whole list
 *
 *
 */

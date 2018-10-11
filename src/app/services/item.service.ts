import { Injectable } from '@angular/core';

import {Item} from '../models/item';
import {Observable} from 'rxjs';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument}
from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection <Item>;
  items: Observable<Item[]>

  constructor(public afs: AngularFirestore) {
    this.items= this.afs.collection('items').valueChanges(); //datastream
  }
  getItems(){
    return this.items;
  }
}

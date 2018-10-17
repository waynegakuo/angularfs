import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; //I always need to import this and pipe it
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
  itemDoc: AngularFirestoreDocument <Item>

  constructor(public afs: AngularFirestore) {
    //valueChanges() does not allow us to display ID so we use snapshotChanges() instead
    //this.items= this.afs.collection('items').valueChanges(); //datastream
    this.itemsCollection=this.afs.collection('items'); //we need this to add

    this.items= this.itemsCollection.snapshotChanges().pipe(map(changes=>{
    return changes.map(a=>{
      const data=a.payload.doc.data() as Item;
      data.id=a.payload.doc.id;
      return data
    })
  }));
  }
  getItems(){
    return this.items;
  }
  addItem(item: Item){
    this.itemsCollection.add(item);
  }
  deleteItem(item: Item){
    this.itemDoc=this.afs.doc(`items/${item.id}`); //using template string to fetch
    this.itemDoc.delete();
  }
}

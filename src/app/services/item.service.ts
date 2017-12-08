// ALL THE INTERACTION BETWEEN OUR APP AND FIREBASE
// GOES HERE
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/Item';

@Injectable()
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public afs:AngularFirestore) { 
    this.itemsCollection = this.afs.collection('items', ref => ref.orderBy('title', 'asc'));
    // this.items = this.afs.collection('items').valueChanges();
    // TO GET THE ITEM.ID FROM FIREBASE:
    this.items = this.itemsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getItems() {
    return this.items;
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    // console.log(item);
    // console.log('DELETING......');
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
    // console.log('ITEM DELETED');
  }

  updateItem(item: Item) {
    // console.log('UPDATING.........');
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
    // console.log('ITEM UPDATED');
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class MisService {

  constructor(private angularFirestore: AngularFirestore) {}

  getMisDoc(id) {
    return this.angularFirestore
    .collection('miss')
    .doc(id)
    .valueChanges()
  }

  getMisList() { 
    return this.angularFirestore
    .collection("miss")
    .snapshotChanges();
  }

  createMIS(mis: any) {
    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection("miss")
        .add(mis)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

//   deleteUser(user) {
//     return this.angularFirestore
//       .collection("users")
//       .doc(user.id)
//       .delete();
//   }
  
  updateUser( id, mis: any) {
    return this.angularFirestore
      .collection("miss")
      .doc(id)
      .update(mis);
  }
}
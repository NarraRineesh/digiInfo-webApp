import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './shared/services/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private angularFirestore: AngularFirestore, private httpClient: HttpClient) {}

  getUserDoc(id) {
    return this.angularFirestore
    .collection('users')
    .doc(id)
    .valueChanges();
  }

  getUserList() {
    return this.angularFirestore
    .collection('users')
    .snapshotChanges();
  }

  createUser(user: User) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('users')
        .add(user)
        .then(response => { console.log(response); }, error => reject(error));
    });
  }

  deleteUser(user) {
    return this.angularFirestore
      .collection('users')
      .doc(user.uid)
      .delete();
  }

  updateUser( id, user: any) {
    console.log(user);
    return this.angularFirestore
      .collection('users')
      .doc(id)
      .update(user);
  }
  updateEmail(body: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:5001/jntu-circular/us-central1/updateMail', body);
  }

}

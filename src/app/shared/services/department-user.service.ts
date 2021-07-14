import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})

export class DepartmentUserService {

  constructor(private angularFirestore: AngularFirestore) {}

  getDepartmentDoc(id) {
    return this.angularFirestore
    .collection('department-users')
    .doc(id)
    .valueChanges()
  }

  getDepartmentList() { 
    return this.angularFirestore
    .collection("department-users")
    .snapshotChanges();
  }
  createDepartment(department: any) {
    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection("department-users")
        .add(department)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  deleteDepartment(department) {
    return this.angularFirestore
      .collection("department-users")
      .doc(department.id)
      .delete();
  }
  
  updateDepartment( id, department: any) {
    return this.angularFirestore
      .collection("department-users")
      .doc(id)
      .update(department);
  }
}
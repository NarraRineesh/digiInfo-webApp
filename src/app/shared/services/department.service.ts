import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  constructor(private angularFirestore: AngularFirestore, private toastr: ToastrService,) {}

  getDepartmentDoc(id) {
    return this.angularFirestore
    .collection('departments')
    .doc(id)
    .valueChanges();
  }

  getDepartmentList() {
    return this.angularFirestore
    .collection('departments')
    .snapshotChanges();
  }
  createDepartment(department: any) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('departments')
        .add(department)
        .then(response => { this.toastr.success("Department create success") 
        }, error => reject(error));
    });
  }

  deleteDepartment(department) {
    return this.angularFirestore
      .collection('departments')
      .doc(department.id)
      .delete();
  }

  updateDepartment( id, department: any) {
    return this.angularFirestore
      .collection('departments')
      .doc(id)
      .update(department);
  }
}

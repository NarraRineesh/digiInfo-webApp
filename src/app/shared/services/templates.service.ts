import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Template } from './templates';
const Api_location = 'http://localhost:5001/jntu-circular/us-central1/sendMail';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
private basePath = '/templates';
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private http: HttpClient ) { }
  pushFileToStorage(template: Template, name: string, department: string): Observable<number> {
    const filePath = `${this.basePath}/${name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, template.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          template.url = downloadURL;
          template.name = name;
          template.department = department;
          template.approved = false;
          template.waitingForApproval = false;
          this.saveFileData(template);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(template: Template): void {
    this.db.list(this.basePath).push(template);
  }

  getFiles() {
    return this.db.list(this.basePath);
  }


  deleteFile(template: Template): void {
    this.deleteFileDatabase(template.key)
      .then(() => {
        this.deleteFileStorage(template.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
   updateTemplate( key, value: any) {
    return this.db
      .list(this.basePath)
      .update(key, value);
  }
  addMessage(body): Observable<any> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    let headers = new Headers();
    return this.http.post(Api_location, body);
    // return this.http.post<any>(Api_location , body, requestOptions);
}
}

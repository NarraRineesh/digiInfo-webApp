import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Template } from './templates';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
private basePath = '/templates';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(template: Template, name: string): Observable<number> {
    const filePath = `${this.basePath}/${name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, template.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          template.url = downloadURL;
          template.name = name;
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
    return this.db.list(this.basePath)
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
}
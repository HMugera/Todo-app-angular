import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { map } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr'
import { firestore } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveTodo(data,id:string) {
    this.afs.collection('todos').add(data).then(ref => {
      this.toastr.success("Todo Added succesfully");
    });
  }

  loadTodo() {
    return this.afs.collection('todos').snapshotChanges().
      pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data }
          })
        })
      );
  }

  updateTodo(id: string, updateData: string) {
    this.afs.doc('todos/' + id).update({ title: updateData }).then(() => {
      this.toastr.success("Todo succesfully updated");
    })
  }
  deleteTodo(id: string) {
    this.afs.doc('todos/' + id).delete().then(() => {
      this.toastr.error(" Todo succesfully deleted")
    })
  }
 
}



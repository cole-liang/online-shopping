import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";

@Injectable()
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db
      .list("/categories", ref => ref.orderByChild("name"))
      .snapshotChanges()
      .map(action => {
        return action.map(item => {
          const key = item.payload.key;
          const data = { key, ...item.payload.val()};
          return data;
        });
      });;
  }

}

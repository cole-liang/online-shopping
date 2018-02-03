import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import "rxjs/add/operator/map";

@Injectable()
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list("/products/").push(product);
  }

  getAll() {
    return this.db
      .list("/products/")
      .snapshotChanges()
      .map(action => {
        return action.map(item => {
          const key = item.payload.key;
          const data = { key, ...item.payload.val()};
          return data;
        });
      });
  }

  getProduct(uid: string){
    return this.db.object('/products/' + uid).valueChanges();
  }

  update(uid: string, product){
    return this.db.object('/products/' + uid).update(product);
  }

  delete(uid: string){
    return this.db.object('/products/' + uid).remove();   
  }
}

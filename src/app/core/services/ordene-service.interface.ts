import { Observable } from "rxjs";
import { Assign } from "@core/models/contents/assign.model";
export abstract class OrderService {

  public abstract findOrder(pageNumber:number, pageSize:number, filter:string, companyId:string): Observable<any>;

  public abstract assign(id:string, assign:Assign): Observable<any>;

  public abstract getLink(id:string,  headersData:string): Observable<any>;
 
}

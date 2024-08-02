import { Injectable } from "@angular/core";
import { OrderService } from "@core/services/ordene-service.interface";
import { Observable } from "rxjs";
import { HttpService } from "@infrastructure/http/http.service";
import { Assign } from "@core/models/contents/assign.model";
import { HttpHeaders } from "@angular/common/http";
import { environment, resources } from "@env/environment";

@Injectable({
  providedIn: "root",
})
export class OrderRepository extends OrderService {
  baseUrlOrders = `${environment.orderAppUrl}${environment.apiSuffix}${resources.orders}`;
  baseUrlLinks = `${environment.linkAppUrl}${environment.apiSuffix}${resources.links}`;

  constructor(protected httpService: HttpService) {
    super();
  }

  public findOrder(
    pageNumber: number,
    pageSize: number,
    filter: string,
    companyId: string
  ): Observable<any> {
    if (filter) {
      return this.httpService.doGet<any>(
        this.baseUrlOrders +
          "?pageNumber=" +
          pageNumber +
          "&pageSize=" +
          pageSize +
          "&filter=" +
          filter +
          "&companyId=" +
          companyId
      );
    } else {
      return this.httpService.doGet<any>(
        this.baseUrlOrders +
          "?pageNumber=" +
          pageNumber +
          "&pageSize=" +
          pageSize +
          "&companyId=" +
          companyId
      );
    }
  }

  public assign(id: string, assign: Assign): Observable<void> {
    return this.httpService.doPatch(this.baseUrlOrders + id + "/links", assign);
  }

  public getLink(id: string, headersData: string): Observable<any> {
    const headers = new HttpHeaders({
      tenant: headersData,
    });
    return this.httpService.doGet<any>(this.baseUrlLinks + "/" + id, {
      headers: headers,
    });
  }
}

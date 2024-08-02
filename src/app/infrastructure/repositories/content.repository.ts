import { concatMap, defaultIfEmpty, map, Observable } from "rxjs";
import { HttpService } from "../http/http.service";
import { Injectable } from "@angular/core";
import { ContenService } from "@core/services/content-service.interface";
import { CreateContent } from "@core/models/contents/create-content.model";
import { ContentPaginated } from "@core/models/contents/contents-paginated.model";
import { Options } from "./../http/http-options.model";
import { HttpHeaders } from "@angular/common/http";
import {environment, resources} from "@env/environment";
@Injectable({
  providedIn: "root",
})
export class ContentRepository extends ContenService {
  baseUrl = `${environment.contentAppUrl}${environment.apiSuffix}${resources.contents}`;

  constructor(protected httpService: HttpService) {
    super();
  }

  public createContent(content: CreateContent): Observable<void> {
    return this.postCreateContentId().pipe(
      concatMap((contentId) => this.putCreateContent(contentId, content))
    );
  }

  private postCreateContentId(): Observable<string> {
    return this.httpService
      .doPost<null, { contentId: string }>(this.baseUrl, null)
      .pipe(map((result) => result.contentId));
  }

  public getAllContentPaginated(
    pageNumber: number,
    pageSize: number,
    filter: string = ""
  ): Observable<ContentPaginated> {
    return this.httpService.doGet<ContentPaginated>(
      this.baseUrl +
      `/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&filter=${filter}`
    );
  }

  public override putCreateContent(
    contentId: string,
    content: CreateContent
  ): Observable<void> {
    const formData = new FormData();

    if (content.tag) {
      formData.append('tag', content.tag);
    } else {
      formData.append('tag', '');
    }

    if (content.logo) {
      formData.append('logo', content.logo, content.logo.name);
    } else {
      formData.append('logo', '');
    }

    if (content.carousel) {
      content.carousel.forEach((file) => {
        formData.append('carousel', file, file.name);
      });
    } else {
      formData.append('carousel', '')
    }


    if (content.styles) {
      formData.append('styles.backgroundColor', content.styles['background-color']);
      formData.append('styles.color', content.styles['color']);
    } else {


    }


    if (content.languages) {
      content.languages.forEach((element, index) => {
        //formData.append(languages[${index}], element);
        formData.append('languages', element);
      });
    } else {
      formData.append('languages', '');
    }
    let data:any[] = [];
    if (content.contents[0]) {
      content.contents.forEach((content, index) => {
        formData.append(`contents[${index}].languageIndex`, content.languageIndex.toString());
        formData.append(`contents[${index}].title`, content.title);
        if(content.details.length === 0){
          formData.append(`contents[${index}].details`, JSON.stringify([]));
        }
        /*formData.append(`contents[${index}].details[0].behavior`, '');
        formData.append(`contents[${index}].details[0].label`, '');
        formData.append(`contents[${index}].details[0].data`, '');*/
        content.details.forEach((element, indexdt) => {
          formData.append(`contents[${index}].details[${indexdt}].index`, element.index.toString());
          formData.append(`contents[${index}].details[${indexdt}].behavior`, element.behavior);
          formData.append(`contents[${index}].details[${indexdt}].label`, element.label);
          formData.append(`contents[${index}].details[${indexdt}].data`, element.data);
        });
      }
      )
    } else {
      formData.append('contents', '');
    }



    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    const options = new Options();
    options.headers = headers;
    options.params = formData;

    return this.httpService.doPutFormData<FormData, void>(
      `${this.baseUrl}/${contentId}`,
      formData
    );
  }
  public override deleteContent(id: string): Observable<void> {
    return this.httpService.doDelete(`${this.baseUrl}/${id}`);
  }
}

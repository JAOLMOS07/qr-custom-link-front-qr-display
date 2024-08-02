import { Observable } from "rxjs";
import { CreateContent } from "@core/models/contents/create-content.model";
import { ContentPaginated } from "@core/models/contents/contents-paginated.model";
export abstract class ContenService {
  public abstract createContent(company: CreateContent): Observable<void>;
  public abstract putCreateContent(contentId:string,company: CreateContent): Observable<void>;
  public abstract getAllContentPaginated(
    pageNumber: number,
    pageSize: number,
    filter?: string
  ): Observable<ContentPaginated>;
  abstract deleteContent(id: string): Observable<void>;
}

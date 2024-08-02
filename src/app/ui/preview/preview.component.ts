import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { DetailProductComponent } from "./components/detail-product/detail-product.component";
import { SesionsComponent } from "./components/sesions/sesions.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HttpService } from "@infrastructure/http/http.service";
import { OrderService } from "@core/services/ordene-service.interface";
import { OrderRepository } from "@infrastructure/repositories/order.repository";
import { ActivatedRoute } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "app-preview",
  standalone: true,
  imports: [
    HeaderComponent,
    SharedModule,
    DetailProductComponent,
    SesionsComponent,
    FooterComponent,
  ],
  providers: [
    HttpService,
    { provide: OrderService, useClass: OrderRepository },
  ],
  templateUrl: "./preview.component.html",
  styleUrl: "./preview.component.css",
})
export class PreviewComponent implements OnInit {
  defaultCountry: string = "COL";
  id: string | null = null;
  infoProduct: any;
  currentLanguaje: number = 0;
  public contenido: any[] = [];
  public title: any;
  public isLoading: boolean = false;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
      let VarHeader = this.id?.split("-");

      let headerData: string = "";
      if (VarHeader) {
        if (VarHeader?.length >= 2) {
          headerData = VarHeader[0];
        } else {
          headerData = this.defaultCountry;
        }
      }

      this.orderService.getLink(this.id + "", headerData).subscribe({
        next: (result) => {
          this.isLoading = false;
          this.infoProduct = result;
          this.changeLanguage(0);
        },
        error: () => {
          this.isLoading = false;
        },
      });
    });
  }

  changeLanguage(language: number) {
    this.currentLanguaje = language;
    if (
      this.infoProduct &&
      this.infoProduct.contents &&
      this.infoProduct.contents.length > language
    ) {
      this.title = this.infoProduct.contents[language].title;
      this.contenido = this.infoProduct.contents[language].details;
    } else {
      console.error("No hay datos disponibles para el idioma solicitado.");
    }
  }
}

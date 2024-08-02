import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";
import { SharedModule } from "./shared/shared.module";

interface menu {
  id:Number;
  name:string;
  router:string;
  icon:string
  alt:string;
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, RouterLink],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor() {

  }
}

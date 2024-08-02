import { Routes } from "@angular/router";
import { CONTENTS } from "./routes.constants";
import { PreviewComponent } from "./preview/preview.component";

export const routes: Routes = [
  { path: '', component: PreviewComponent },
  { path: CONTENTS.PREVIEW_CONTENT, component: PreviewComponent },
];

import { NgModule } from '@angular/core';
import { PagesPipe } from './pages.pipe';
import { ImagePipe } from './image.pipe';



@NgModule({
  declarations: [PagesPipe, ImagePipe],
  exports: [ PagesPipe, ImagePipe]
})
export class PipesModule { }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pages'
})
export class PagesPipe implements PipeTransform {

  transform(total: number, pageCount: number): number {
    
    let totalPage = Math.round( total / pageCount );
    const result = (total % pageCount);

    (result > 0 &&  result < 0.5) ? totalPage += 1 : totalPage;

    return totalPage;
  }

}

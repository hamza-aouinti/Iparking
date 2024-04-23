import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDpipe'
})
export class TimeDpipePipe implements PipeTransform {
  transform(value: any, searchName:any): any {
    if (searchName===""){
      return value;
    }
    return value.filter(function(search){
      return search.timeDebut.toLowerCase().includes(searchName.toLowerCase());

    });
  }
}

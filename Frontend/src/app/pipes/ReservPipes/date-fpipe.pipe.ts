import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFpipe'
})
export class DateFpipePipe implements PipeTransform {

  transform(value: any, searchName:any): any {
    if (searchName===""){
      return value;
    }
    return value.filter(function(search){
      return search.dateFin.toLowerCase().includes(searchName.toLowerCase());

    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDpipe'
})
export class DateDpipePipe implements PipeTransform {

  transform(value: any, searchName:any): any {
    if (searchName===""){
      return value;
    }
    return value.filter(function(search){
      return search.dateDebut.toLowerCase().includes(searchName.toLowerCase());


    });
  }

}

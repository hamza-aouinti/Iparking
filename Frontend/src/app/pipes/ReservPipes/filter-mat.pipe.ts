import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMat'
})
export class FilterMatPipe implements PipeTransform {

  transform(value: any, searchName:any): any {
    if (searchName===""){
      return value;
    }
    return value.filter(function(search){
      return search.matricule.toLowerCase().includes(searchName.toLowerCase());

    });
  }

}

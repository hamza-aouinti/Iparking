import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterID'
})
export class FilterIDPipe implements PipeTransform {

  transform(value: any , searchID : any):any {
    if (value.length === 0){
      return value;
    }
    return value.filter(function(search){
      return search.code.toLowerCase().includes(searchID.toLowerCase());

    });  }


}

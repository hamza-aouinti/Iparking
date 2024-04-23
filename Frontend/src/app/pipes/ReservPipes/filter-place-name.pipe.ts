import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPlaceName'
})
export class FilterPlaceNamePipe implements PipeTransform {
  transform(value: any, searchName:any): any {
    if (searchName===""){
      return value;
    }
    return value.filter(function(search){
      return search.palce.toLowerCase().includes(searchName.toLowerCase());

    });
  }

}

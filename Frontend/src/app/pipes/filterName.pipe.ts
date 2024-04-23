import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtername'
})
export class FilterNamePipe implements PipeTransform {

  transform(value: any, searchName:any): any {
    if (searchName===""){
      return value;
    }
    return value.filter(function(search){
      return search.name.toLowerCase().includes(searchName.toLowerCase());


    });
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterparkName'
})
export class FilterparkNamePipe implements PipeTransform {

  transform(value: any, searchName:any): any {
    if (value.length === 0){
      return value;
    }
    return value.filter(function(search){
      return search.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1

    });
  }

}

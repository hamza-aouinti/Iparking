import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFpipe'
})
export class TimeFpipePipe implements PipeTransform {
  transform(value: any, searchName:any): any {
    if (searchName===""){
      return value;
    }
    return value.filter(function(search){
      return search.timeFin.toLowerCase().includes(searchName.toLowerCase());

    });
  }

}

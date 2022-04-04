import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: 'substrIsbn'
})

export class SubIsbnPipe implements PipeTransform {
    transform(value: string) {
        return value.substr(0,3) + "-" + value.substr(3,5) + "...";
    }
}
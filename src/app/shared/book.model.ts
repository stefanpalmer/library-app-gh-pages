import { Story } from "../anthology/story.model";

export class Book {
    constructor (public title: string, public author: string, 
        public publisher: string, public year: number, public pages: number, 
        public series: string, public seriesnum: any, public stories: Story[], 
        public isbn: string, public review: string) {

    }
}
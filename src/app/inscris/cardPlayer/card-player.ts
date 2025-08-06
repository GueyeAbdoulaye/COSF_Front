import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-card-player',
    template: '',
    styleUrls: []
})
export class CardPlayerComponent {
    
    @Input() playerName: string = '';
    @Input() playerFunction: () => void = () => {};
}
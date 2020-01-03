import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'bb-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
    @Input() rate = -1;
    @Input() maxScore = 10;
    @Input() viewMode = true;
    @Input() label: number;
    @Input() loading: string;
    @Input() thresholds = { 0: 'negative', 4: 'neutral', 8: 'positive' };
    @Output() rateChanged = new EventEmitter();

    @Input() captions = ['Very poor', 'Ok', 'Very good'];

    range = new Array(this.maxScore + 1);
    constructor() { }

    ngOnInit() {
        const lastValue = this.thresholds[Object.keys(this.thresholds)[Object.keys(this.thresholds).length - 1]];
        this.thresholds[this.maxScore + 1] = lastValue; // or null
        let lastI = 0;
        for (const th in this.thresholds) {
            if (this.thresholds.hasOwnProperty(th)) {
                if (+th !== lastI) {
                    this.range = this.range.fill(this.thresholds[lastI], lastI, +th);
                }
                lastI = +th;
            }
        }
    }

    mark = (index: number) => {
        if (this.viewMode) { return; }
        this.rate = this.rate === index ? index - 1 : index;
    }

    setClass = (index: number) => index <= this.rate && !this.loading ? this.range[this.rate] : '';

}

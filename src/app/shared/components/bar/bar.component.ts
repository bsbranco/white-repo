import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'bb-bar',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

    @Input() label: string;
    @Input() legend: string;
    @Input() loading: boolean;
    @Input() max: number;
    @Input() value: number;

    constructor() { }

    ngOnInit(): void {}
    setLegend = () => this.value > this.max ? `${this.max}+` : this.value;
}

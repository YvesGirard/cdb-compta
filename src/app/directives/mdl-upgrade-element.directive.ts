import { Directive, AfterViewInit, ElementRef } from '@angular/core';
declare var componentHandler: any;

@Directive({ selector: '[mdl]' })

/** Highlight the attached element in gold */
export class MdlUpgradeElementDirective implements AfterViewInit {
    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
    }   
}
import {
  forwardRef,
  Component,
  HostBinding,
  Input,
  Directive,
  AfterContentInit,
  ContentChild,
  SimpleChange,
  ContentChildren,
  ViewChild,
  ElementRef,
  QueryList,
  OnChanges,
  EventEmitter,
  Output,
  NgModule,
  ModuleWithProviders,
  ViewEncapsulation,
  Renderer,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription ,  Observable } from 'rxjs';
//import { MdError } from '@angular/material/core';
import { MatRippleModule } from '@angular/material';
import { transformPlaceholder, transformPanel, fadeInContent } from './select-animations';

const noop = () => { };

export const CDB_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CdbSelect),
  multi: true,
};

const MD_INPUT_INVALID_INPUT_TYPE = [
  'file',
  'radio',
  'checkbox',
];


let nextUniqueId = 0;

/** A simple change event emitted on selection changes. */
export class CdbOptionSelectEvent {
  index: number;
  option: CdbOption;
}

/** The hint directive, used to tag content as hint labels (going under the input). */
@Component({
  moduleId: module.id,
  selector: 'cdb-option',
  host: {
    '[class.cdb-option]': 'true',
    'matRipple': '',
    '(click)': 'select()',
  },
  template: '<li matRipple [matRippleColor]="black"><ng-content></ng-content></li>',
})
export class CdbOption {

  constructor(private _element: ElementRef, private _renderer: Renderer) { }

  private _value: any = '';
  black = "black"

  @Output() onSelect = new EventEmitter<any>();

  select() {
    this.onSelect.emit();
  }

  get value(): any { return this._value; };

  @Input() set value(v: any) {
    if (v !== this._value) {
      this._value = v;
    }
  }

  get viewValue(): string {
    return this._getHostElement().textContent.trim();
  }

  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }
}


/**
 * Component that represents a text input. It encapsulates the <input> HTMLElement and
 * improve on its behaviour, along with styling it according to the Material Design.
 */
@Component({
  moduleId: module.id,
  selector: 'cdb-select',
  templateUrl: 'select.directive.html',
  styleUrls: ['select.directive.css'],
  animations: [
    transformPlaceholder,
    transformPanel,
    fadeInContent
  ],
  host: {
    '[class.cdb-input-focused]': 'focused',
    '(document: click)': "handleClickEvent( $event )",
  },
  providers: [CDB_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class CdbSelect implements ControlValueAccessor, AfterContentInit/*, OnChanges*/ {
  /** Whether or not the overlay panel is open. */
  private _panelOpen = false;

  private _focused: boolean = false;

  /** The currently selected option. */
  private _selected: CdbOption;

  /** Callback registered via registerOnTouched (ControlValueAccessor) */
  // private _onTouchedCallback: () => void = noop;

  /** The method to be called in order to update ngModel (ControlValueAccessor)  */
  _controlValueAccessorChangeFn: (value: any) => void = (value) => { };

  /** Subscriptions to option events. */
  private _subscriptions: Subscription[] = [];

  @ViewChild('trigger', {static: true}) trigger: ElementRef;
  @ViewChild('input', {static: true}) _inputElement: ElementRef;

  constructor(private _element: ElementRef, private _renderer: Renderer) { }

  /** This position config ensures that the top left corner of the overlay
   * is aligned with with the top left of the origin (overlapping the trigger
   * completely). In RTL mode, the top right corners are aligned instead.
   */
  _positions = [{
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top'
  }];


  /**
   * Content directives.
   */
  @ContentChildren(CdbOption) _optionChildren: QueryList<CdbOption>;

  /** The currently selected option. */
  get selected(): CdbOption {
    return this._selected;
  }

  /** Readonly properties. */
  get focused() { return this._focused; }

  /**
   * Bindings.
   */
  @Input() placeholder: string = null;

  /** Toggles the overlay panel open or closed. */
  toggle(): void {
    this.panelOpen ? this.close() : this.open();
  }

  /** Handle user interactions on the  */
  _handleClick(): void {
    this._focused = true;
    this.toggle();
  }

  /** Set focus on input */
  focus() {
    this._inputElement.nativeElement.focus();
  }


  /** The width of the trigger element. This is necessary to match
   * the overlay width to the trigger width.
   */
  _getWidth(): number {
    return this.trigger.nativeElement.getBoundingClientRect().width;
  }

  /** Opens the overlay panel. */
  open(): void {
    this._panelOpen = true;
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    this._panelOpen = false;
  }

  /** Whether or not the overlay panel is open. */
  panelOpen(): boolean {
    return this._panelOpen;
  }


  /** Listens to selection events on each option. */
  private _listenToOptions(): void {
    this._optionChildren.forEach((option: CdbOption) => {
      const sub = option.onSelect.subscribe(() => {
        this._onSelect(option);
        this._subscriptions.push(sub);
      });
    });
  }

  /** Event triggered when user selects an option */
  private _onSelect(option: CdbOption) {
    this._controlValueAccessorChangeFn(option.value);
    this._selected = option;
    this._focusHost();
    this.close();
  }

  /** Focuses the host element when the panel closes. */
  private _focusHost(): void {
    this._focused = true;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) {
    if (!this._optionChildren) { return; }

    this._optionChildren.forEach((option: CdbOption) => {
      if (option.value == value) {
        option.select();
      }
    });
  }


  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }


  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnTouched(fn: any) {
    // this._onTouchedCallback = fn;
  }


  /** TODO: internal */
  ngAfterContentInit() {
    this._listenToOptions();
  }

  ngOnDestroy() {
    this._dropSubscriptions();
  }

  /** Unsubscribes from all option subscriptions. */
  private _dropSubscriptions(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    this._subscriptions = [];
  }

  handleClickEvent(event) {
    if (!this.eventTriggeredInsideHost(event)) {
      this._focused = false;
      this.close();
    } 
  }

  // local host component DOM (Document Object Model) tree.
  private eventTriggeredInsideHost(event) {
    var current = event.target;

    var host = this._element.nativeElement;

    do {
      if (current === host) {
        return (true);
      }
      current = current.parentNode;
    } while (current);

    return (false);
  }

  /**
    * When the panel is finished animating, emits an event and focuses
    * an option if the panel is open.
    * TODO : Select correct option
    */
  _onPanelDone(): void {
    console.log("done");
    if (this.panelOpen) {
      //this._focusCorrectOption();
      //this.onOpen.emit();
    } else {
      //this.onClose.emit();
    }
 
  }

}

@NgModule({
  declarations: [CdbSelect, CdbOption],
  imports: [CommonModule, FormsModule, MatRippleModule],
  exports: [CdbSelect, CdbOption],
})
export class CdbSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CdbSelectModule,
      providers: []
    };
  }
}
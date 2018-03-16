export class Memento {

    private _state: any;

    constructor(State: any) {
        this._state = State;
    }

    public getState(): any {
        return this._state;
    }
}



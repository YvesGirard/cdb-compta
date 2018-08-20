import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { ParticipantEffects } from './effects/participant.effects';

//import { ParticipantExistsGuard } from './guards/participant-exists.guard';

// services
import * as fromServices from '../../participant/services';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('participants', reducers),
        EffectsModule.forFeature([
            ParticipantEffects,
        ]),
    ],
    providers: [...fromServices.services,
      //  ParticipantExistsGuard,
    ],
})
export class ParticipantModule {
    static forRoot() {
        return {
            ngModule: ParticipantModule,
        };
    }
}

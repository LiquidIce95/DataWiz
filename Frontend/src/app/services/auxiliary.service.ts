import { Injectable } from '@angular/core';

@Injectable()
export class AuxiliaryService {

  constructor() { }

  assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
      throw new Error(msg);
    }
  }


}

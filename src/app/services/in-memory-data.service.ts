import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { QUESTION } from '../models/question';
@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  createDb() {

    const questions: QUESTION[] = [
      {
        number1: Math.floor(Math.random() * 10),
        number2: Math.floor(Math.random() * 10)
      },
      {
        number1: Math.floor(Math.random() * 10),
        number2: Math.floor(Math.random() * 10)
      },
      {
        number1: Math.floor(Math.random() * 10),
        number2: Math.floor(Math.random() * 10)
      },
      {
        number1: Math.floor(Math.random() * 10),
        number2: Math.floor(Math.random() * 10)
      },
      // {
      //   number1: Math.floor(Math.random() * 10),
      //   number2: Math.floor(Math.random() * 10)
      // },
      // {
      //   number1: Math.floor(Math.random() * 10),
      //   number2: Math.floor(Math.random() * 10)
      // },
      // {
      //   number1: Math.floor(Math.random() * 10),
      //   number2: Math.floor(Math.random() * 10)
      // },
      // {
      //   number1: Math.floor(Math.random() * 10),
      //   number2: Math.floor(Math.random() * 10)
      // },
      // {
      //   number1: Math.floor(Math.random() * 10),
      //   number2: Math.floor(Math.random() * 10)
      // },
      // {
      //   number1: Math.floor(Math.random() * 10),
      //   number2: Math.floor(Math.random() * 10)
      // }

    ];

    return { questions };
  }
}

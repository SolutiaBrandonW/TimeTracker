import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }
}

export class APIMetaReturn {
  Message: string;
  Code: number;
}

export class APIReturn<T> extends APIMetaReturn {
  Data: T;
}
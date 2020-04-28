import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Config {
  url = "http://localhost:89";
  
  constructor() { }
}

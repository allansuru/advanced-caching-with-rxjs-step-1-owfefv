import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

export interface Joke {
  id: number;
  joke: string;
  categories: Array<string>;
}

export interface JokeResponse {
  type: string;
  value: Array<Joke>;
}

const API_ENDPOINT = 'https://api.icndb.com/jokes/random/5?limitTo=[nerdy]';
const CACHE_SIZE = 1;

@Injectable()
export class JokeService {
  private cache$: Observable<Array<Joke>>;

  constructor(private http: HttpClient) { }

  get jokes() {
    if (!this.cache$) {
      this.cache$ = this.requestJokes().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  // Helper method to actually fetch the jokes
  private requestJokes() {
    return this.http.get<JokeResponse>(API_ENDPOINT).pipe(
      map(response => response.value)
    );
  }
}
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
const API_ENDPOINT2 = 'https://api.icndb.com/jokes/random/10?limitTo=[nerdy]';
const CACHE_SIZE = 1;

@Injectable()
export class JokeService {
  private cacheJoke1$: Observable<Array<Joke>>;
  private cacheJoke2$: Observable<Array<Joke>>;

  constructor(private http: HttpClient) { }

  get jokes() {
    debugger
    if (!this.cacheJoke1$) {
      this.cacheJoke1$ = this.requestJokes().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cacheJoke1$;
  }


  get jokes2() {
    debugger
    if (!this.cacheJoke2$) {
      this.cacheJoke2$ = this.requestJokes2().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cacheJoke2$;
  }

  // Helper method to actually fetch the jokes
  private requestJokes() {
    return this.http.get<JokeResponse>(API_ENDPOINT).pipe(
      map(response => response.value)
    );
  }

   private requestJokes2() {
    return this.http.get<JokeResponse>(API_ENDPOINT2).pipe(
      map(response => response.value)
    );
  }
}
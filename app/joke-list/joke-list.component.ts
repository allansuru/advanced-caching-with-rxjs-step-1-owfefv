import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Memoize } from 'lodash-decorators';

import { JokeService, Joke } from '../joke.service';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent implements OnInit {
  jokes$: Observable<Array<Joke>>;
  jokes2$: Observable<Array<Joke>>;

  constructor(private jokeService: JokeService) { }

  ngOnInit() {
    this.jokes$ = this.jokeService.jokes;
    this.jokes2$ = this.jokeService.jokes2;
  }

  @Memoize()
  getVotes(id: number) {
    return Math.floor(10 + Math.random() * (100 - 10));
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from './pokemon'; // si la interfaz está en otro archivo

@Injectable()
export class PokeapiService {
  private apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<any>(this.apiURL).pipe(
      switchMap(response => {
        const detalles: Observable<any>[] = response.results.map((pokemon: any) =>
          this.http.get(pokemon.url)
        );
        return forkJoin(detalles);
      }),
      map((pokemons: any[]) => pokemons.map((p: any) => ({
        name: p.name,
        image: p.sprites.front_default,
        stats: p.stats.map((s: any) => ({
          name: s.stat.name,
          base: s.base_stat
        }))
      })))
    );
  }
}

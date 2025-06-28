import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeapiService } from './pokeapi.service';
import { PokemonCardComponent } from './pokemon-card.component';

interface Pokemon {
  name: string;
  image: string;
  stats: {
    name: string;
    base: number;
  }[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PokeapiService]
})
export class AppComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.pokeapiService.getPokemons().subscribe((data: Pokemon[]) => {
      this.pokemons = data;
    });
  }
}

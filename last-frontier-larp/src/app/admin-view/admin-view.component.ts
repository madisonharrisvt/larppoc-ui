import { Component, OnInit } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';
 
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: [ './admin-view.component.css' ]
})
export class AdminViewComponent implements OnInit {
  characters: Character[] = [];
 
  constructor(private characterService: CharacterService) { }
 
  ngOnInit() {
    this.getCharacters();
  }
 
  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe(characters => this.characters = characters.slice(1, 5));
  }
}
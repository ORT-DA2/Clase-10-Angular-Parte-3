import { Component, OnInit } from '@angular/core';
import { Pet } from './pet';
import { PetService } from './pet.service';


@Component({
    selector: 'pm-pets',
    templateUrl: './pet-list.component.html',
    styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
    pageTitle: string = "Pet List";
    listFilter: string = "";
    imageWidth: number = 100;
    imageMargin: number = 1;
    showImage: boolean = false;
    pets: Array<Pet>;

    constructor(private _petsService : PetService) {
     // esta forma de escribir el parametro en el constructor lo que hace es:
     // 1) declara un parametro de tipo PetService en el constructor
     // 2) declara un atributo de clase privado llamado _petService
     // 3) asigna el valor del parámetro al atributo de la clase
    }

    toggleImage(): void {
         this.showImage = !this.showImage;
    }
    
    ngOnInit(): void {
        console.log("aca obtengo datos del backend!");
        this.pets = this._petsService.getPets();
    }

    onRatingClicked(message:string):void {
        this.pageTitle = 'Pet List: ' + message;
    }
}


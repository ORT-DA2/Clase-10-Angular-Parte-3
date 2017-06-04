import { Injectable } from '@angular/core';
import { Pet } from './pet';
@Injectable()
export class PetService {
    
    // esto luego va a ser una llamada a nuestra api REST
    getPets(): Array<Pet> {
        return [
            new Pet("1","Bobby",4,"Grande", new Date(),20,"Golden Retriever", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Golden_Retriever_with_tennis_ball.jpg/1200px-Golden_Retriever_with_tennis_ball.jpg", 3),
            new Pet("2","Diana",4,"Mediana", new Date(),10,"Perro", "https://scontent.fmvd2-1.fna.fbcdn.net/v/t1.0-9/11056439_10152650173091621_5526444138839272280_n.jpg?oh=4f2cf438d3ecd07824ccb23fe148ad05&oe=59E7EAB0", 4),
            new Pet("3","Lupita",4,"Chica", new Date(),2.5,"Perro", "https://scontent.fmvd2-1.fna.fbcdn.net/v/t31.0-8/14991469_742030209278747_4126962164878937004_o.jpg?oh=1101068589fc36de2f6d25f9b858c4cf&oe=59DC5DDD", 5),
        ];
    }

}
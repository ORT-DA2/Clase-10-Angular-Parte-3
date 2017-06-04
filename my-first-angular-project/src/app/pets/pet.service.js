"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var pet_1 = require("./pet");
var PetService = (function () {
    function PetService() {
    }
    // esto luego va a ser una llamada a nuestra api REST
    PetService.prototype.getPets = function () {
        return [
            new pet_1.Pet("1", "Bobby", 4, "Grande", new Date(), 20, "Golden Retriever", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Golden_Retriever_with_tennis_ball.jpg/1200px-Golden_Retriever_with_tennis_ball.jpg", 3),
            new pet_1.Pet("2", "Diana", 4, "Mediana", new Date(), 10, "Perro", "https://scontent.fmvd2-1.fna.fbcdn.net/v/t1.0-9/11056439_10152650173091621_5526444138839272280_n.jpg?oh=4f2cf438d3ecd07824ccb23fe148ad05&oe=59E7EAB0", 4),
            new pet_1.Pet("3", "Lupita", 4, "Chica", new Date(), 2.5, "Perro", "https://scontent.fmvd2-1.fna.fbcdn.net/v/t31.0-8/14991469_742030209278747_4126962164878937004_o.jpg?oh=1101068589fc36de2f6d25f9b858c4cf&oe=59DC5DDD", 5),
        ];
    };
    return PetService;
}());
PetService = __decorate([
    core_1.Injectable()
], PetService);
exports.PetService = PetService;
//# sourceMappingURL=pet.service.js.map
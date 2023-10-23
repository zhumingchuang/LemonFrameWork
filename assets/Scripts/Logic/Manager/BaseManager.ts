import { Game } from "../Game"
export class BaseManager {
    game: Game = null;
    constructor(game: Game) {
        this.game = game;
    }
}
import { Competitor } from './competitor';
import * as _ from 'lodash';

export class Tournament {

    name: String;
    competitors: Competitor[];

    constructor() {}
  
}

export class SingleEliminationTournament extends Tournament {

    grid: any[] = [];

    constructor() {
        super();
    }

    generateGrid() {
        let n = 0;
        let pow = 0;
        while(n < this.competitors.length) {
        pow++;
        n = Math.pow(2, pow);
        }

        const N = n;
        const NB_COMPETITORS = this.competitors.length;
        const NB_ROUNDS = pow;
        const NB_GAMES_R1 = (N/2)-(N-NB_COMPETITORS);

        let competitors = [...this.competitors];

        // Initialiser la grille vierge
        for (let i=0; i<pow; i++) {
            this.grid[i] = [];
            const NB_GAMES = Math.pow(2, pow-(i+1));
            for(let j=0; j<NB_GAMES; j++) {
                this.grid[i][j] = { c1: null, c2: null };
            }
        }
        // Ajouter les matchs du premier tour
        for (let i=0; i<NB_GAMES_R1; i++) {
            let c1 = competitors[Math.floor(Math.random() * competitors.length)];
            competitors.splice(competitors.indexOf(c1), 1);
            let c2 = competitors[Math.floor(Math.random() * competitors.length)];
            competitors.splice(competitors.indexOf(c2), 1);
        
            let game = { c1: c1, c2: c2 };
            this.grid[0][i] = game;
        }
        //Ajouter les compétiteurs exempt au premier tour
        for (let i=0; i<(N/2)-NB_GAMES_R1; i++) {
            let c1 = competitors[Math.floor(Math.random() * competitors.length)];
            competitors.splice(competitors.indexOf(c1), 1);
            let game = { c1: c1, c2: null };
            this.grid[0][NB_GAMES_R1+i] = game;
        }
        this.grid[0] = _.shuffle(this.grid[0]);
    };
}
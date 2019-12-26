import { Team } from './team';

export class Game {
  _id: string;
  address: string;
  category: string;
  championship: string;
  datetime: Date;
  date: string;
  time: string;
  color: string;
  localTeam: Team;
  awayTeam: Team;

  constructor() {
    this.localTeam = new Team();
    this.awayTeam = new Team();
  }
}
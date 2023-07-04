import { TennisGame } from './TennisGame';

const pointToScoreMapping: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];

export class TennisGame3 implements TennisGame {
  private player2Points: number = 0;
  private player1Points: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore(): string {
    if (this.bothPlayersHaveLessThan4Points() && !this.isDeuce()) {
      let player1Score = pointToScoreMapping[this.player1Points]
      let player2Score = this.isTied() ? 'All' : pointToScoreMapping[this.player2Points];
      return player1Score + '-' + player2Score;
    } else {
      if (this.isDeuce())
        return 'Deuce';
      else {
        let winningPlayer: string = this.player1Points > this.player2Points ?
          this.player1Name :
          this.player2Name;
        let absolutePointDiff: number = Math.abs(this.player1Points - this.player2Points);
        return (this.isAdvantage(absolutePointDiff)) ?
          'Advantage ' + winningPlayer :
          'Win for ' + winningPlayer;
      }
    }
  }

  private bothPlayersHaveLessThan4Points() {
    return this.player1Points < 4 && this.player2Points < 4;
  }

  private isAdvantage(absolutePointDiff: number) {
    return absolutePointDiff === 1;
  }

  private isTied() {
    return this.player1Points === this.player2Points;
  }

  private isDeuce() {
    return this.player1Points === this.player2Points && this.player1Points >= 3;
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name)
      this.player1Points += 1;
    else
      this.player2Points += 1;
  }
}

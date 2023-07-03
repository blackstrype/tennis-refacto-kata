import { TennisGame } from './TennisGame';

export class TennisGame1 implements TennisGame {
  private player1Points: number = 0;
  private player2Points: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name)
      this.player1Points += 1;
    else
      this.player2Points += 1;
  }

  getScore(): string {
    let score: string = '';
    if (this.isDeuce()) {
      score = 'Deuce';
    } else if (this.player1Advantage()) {
      score = 'Advantage ' + this.player1Name;
    } else if (this.player2Advantage()) {
      score = 'Advantage ' + this.player2Name;
    } else if (this.player1Wins()) {
      score = 'Win for ' + this.player1Name;
    } else if (this.player2Wins()) {
      score = 'Win for ' + this.player2Name;
    } else if (this.isTiedAndNotDeuce()) {
      score = this.getPlayer1Score() + '-' + this.getPlayer2Score();
    } else {
      score = this.getPlayer1Score() + '-All';
    }
    return score;
  }

  private pointsDifference() {
    return this.player1Points - this.player2Points;
  }

  private player1Wins() {
    return this.aPlayerHas4Points() && this.pointsDifference() >= 2;
  }

  private player2Wins() {
    return this.aPlayerHas4Points() && this.pointsDifference() <= 2;
  }

  private player2Advantage() {
    return this.aPlayerHas4Points() && this.pointsDifference() === -1;
  }

  private player1Advantage() {
    return this.aPlayerHas4Points() && this.pointsDifference() === 1;
  }

  private aPlayerHas4Points() {
    return this.player1Points >= 4 || this.player2Points >= 4;
  }

  private isDeuce() {
    return this.player1Points === this.player2Points && this.player1Points >= 3;
  }

  private isTiedAndNotDeuce() {
    return this.pointsDifference() === 0 && this.player1Points < 3;
  }

  private getPlayer1Score() {
    return this.getPlayerScore(this.player1Points);
  }

  private getPlayer2Score() {
    return this.getPlayerScore(this.player2Points);
  }
  
  private getPlayerScore(points: number) {
    switch (points) {
      case 0:
        return 'Love';
      case 1:
        return 'Fifteen';
      case 2:
        return 'Thirty';
      default:
        return 'Forty';
    }
  }
}

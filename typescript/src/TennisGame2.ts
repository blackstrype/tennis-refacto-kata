import { TennisGame } from './TennisGame';

export class TennisGame2 implements TennisGame {
  player1Points: number = 0;
  player2Points: number = 0;

  player1Score: string = '';
  player2Score: string = '';

  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore(): string {
    let pointDiff: number = this.player1Points - this.player2Points;
    if (this.isTied() && !this.aPlayerHasThreeOrMorePoints()) {
      return this.getPlayerScore(this.player1Points) + '-All';
    } else if (this.isTied() && this.aPlayerHasThreeOrMorePoints()) {
      return 'Deuce';
    } else if (!this.isTied() && this.bothPlayersHaveThreeOrLessPoints()) {
      return this.getPlayerScore(this.player1Points) + '-' + this.getPlayerScore(this.player2Points);
    } else if (this.aPlayerHasThreeOrMorePoints() && pointDiff === 1) {
      return 'Advantage ' + this.player1Name;
    } else if (this.aPlayerHasThreeOrMorePoints() && pointDiff === -1) {
      return 'Advantage ' + this.player2Name;
    } else if (this.aPlayerHasThreeOrMorePoints() && pointDiff >= 2) {
      return 'Win for ' + this.player1Name;
    } else if (this.aPlayerHasThreeOrMorePoints() && pointDiff <= -2) {
      return 'Win for ' + this.player2Name;
    } else {
      return 'Win for ' + this.player2Name;
    }
  }

  private getPlayerScore(points: number) {
    switch (points) {
      case (0):
        return 'Love';
      case (1):
        return 'Fifteen';
      case (2):
        return 'Thirty';
      default:
        return 'Forty';
    }
  }

  private aPlayerHasThreeOrMorePoints() {
    return this.player1Points >= 3 || this.player2Points >= 3;
  }

  private bothPlayersHaveThreeOrLessPoints() {
    return this.player1Points <= 3 && this.player2Points <= 3;
  }

  private isTied() {
    return this.player1Points === this.player2Points;
  }

  wonPoint(player: string): void {
    if (player === this.player1Name) {
      this.player1Points++;
    } else {
      this.player2Points++;
    }
  }
}

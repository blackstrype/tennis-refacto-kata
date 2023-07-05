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
    const strategies: ScoringStrategy[] = [
      new DeuceStrategy(),
      new Player1AdvantageStrategy(),
      new Player2AdvantageStrategy(),
      new Player1WinStrategy(),
      new Player2WinStrategy(),
      new TiedButNotDeuceStrategy(),
      new DefaultScoringStrategy()
    ]

    let strategy: ScoringStrategy = strategies.filter(strategy => strategy.matches(this.player1Points, this.player2Points))[0];
    return strategy.getScore(this.player1Name, this.player1Points, this.player2Name, this.player2Points);
  }
}

interface ScoringStrategy {
  matches(player1Points: number, player2Points: number): boolean;
  getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string;
}

class DeuceStrategy implements ScoringStrategy {
  public matches(player1Points: number, player2Points: number): boolean {
    return player1Points === player2Points && player1Points >= 3;
  }

  public getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
    return 'Deuce';
  }
}

class Player1AdvantageStrategy implements ScoringStrategy {
  public matches(player1Points: number, player2Points: number): boolean {
    return (player1Points >= 4 || player2Points >= 4)
      && player1Points - player2Points === 1;
  }

  public getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
    return 'Advantage ' + player1Name;
  }
}

class Player2AdvantageStrategy implements ScoringStrategy {
  public matches(player1Points: number, player2Points: number): boolean {
    return (player1Points >= 4 || player2Points >= 4)
      && player2Points - player1Points === 1;
  }

  public getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
    return 'Advantage ' + player2Name;
  }
}

class Player1WinStrategy implements ScoringStrategy {
  public matches(player1Points: number, player2Points: number): boolean {
    return (player1Points >= 4 || player2Points >= 4)
      && player1Points - player2Points >= 2;
  }

  public getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
    return 'Win for ' + player1Name;
  }
}

class Player2WinStrategy implements ScoringStrategy {
  public matches(player1Points: number, player2Points: number): boolean {
    return (player1Points >= 4 || player2Points >= 4)
      && player2Points - player1Points >= 2;
  }

  public getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
    return 'Win for ' + player2Name;
  }
}

class RunningScoreStrategy {
  public getPlayerScore(points: number): string {
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

class TiedButNotDeuceStrategy  extends RunningScoreStrategy implements ScoringStrategy{
  public matches(player1Points: number, player2Points: number): boolean {
    return player1Points - player2Points === 0 && player1Points < 3;
  }

  public getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
    return this.getPlayerScore(player1Points) + '-All';
  }
}

class DefaultScoringStrategy extends RunningScoreStrategy implements ScoringStrategy {
  public matches(player1Points: number, player2Points: number): boolean {
    return player1Points <= 3 && player1Points <= 3 && player1Points != player2Points;
  }

  public getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
    return this.getPlayerScore(player1Points) + '-' + this.getPlayerScore(player2Points);
  }
}
import { TennisGame } from './TennisGame';

function getPlayerScore(points: number): string {
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

const scoringStrategies = {
  of: function (player1Points: number, player2Points: number) {
    return this.values.filter(strategy => strategy.matches(player1Points, player2Points))[0];
  },
  values: [
    {
      id: 'Deuce',
      matches(player1Points: number, player2Points: number): boolean {
        return player1Points === player2Points && player1Points >= 3;
      },
      getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
        return 'Deuce';
      }
    },
    {
      id: 'AdvantagePlayer1Strategy',
      matches(player1Points: number, player2Points: number): boolean {
        return player1Points > 3 && player1Points - player2Points === 1;
      },
      getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
        return 'Advantage ' + player1Name;
      }
    },
    {
      id: 'AdvantagePlayer2Strategy',
      matches(player1Points: number, player2Points: number): boolean {
        return player2Points > 3 && player1Points - player2Points === -1;
      },
      getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
        return 'Advantage ' + player2Name;
      }
    },
    {
      id: 'DefaultScoringStrategy',
      matches(player1Points: number, player2Points: number): boolean {
        return player1Points <= 3 && player2Points <= 3 && player1Points !== player2Points;
      },
      getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
        return getPlayerScore(player1Points) + '-' + getPlayerScore(player2Points);
      }
    },
    {
      id: 'TiedNotDeuceScoringStrategy',
      matches(player1Points: number, player2Points: number): boolean {
        return player1Points < 3 && player1Points === player2Points;
      },
      getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
        return getPlayerScore(player1Points) + '-All';
      }
    },
    {
      id: 'WinPlayer1Strategy',
      matches(player1Points: number, player2Points: number): boolean {
        return player1Points >= 3 && player1Points - player2Points >= 2;
      },
      getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
        return 'Win for ' + player1Name;
      }
    },
    {
      id: 'WinPlayer2Strategy',
      matches(player1Points: number, player2Points: number): boolean {
        return player2Points >= 3 && player1Points - player2Points <= -2;
      },
      getScore(player1Name: string, player1Points: number, player2Name: string, player2Points: number): string {
        return 'Win for ' + player2Name;
      }
    },
  ]
}

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
    return scoringStrategies.of(this.player1Points, this.player2Points)
      .getScore(this.player1Name, this.player1Points, this.player2Name, this.player2Points);
  }
  
  wonPoint(player: string): void {
    if (player === this.player1Name) {
      this.player1Points++;
    } else {
      this.player2Points++;
    }
  }
}


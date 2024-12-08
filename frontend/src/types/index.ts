export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface StatsItem {
  name: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

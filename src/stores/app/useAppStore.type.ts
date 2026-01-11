export interface AppState {
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
}

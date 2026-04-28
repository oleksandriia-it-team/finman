export interface RecoveryState {
  email: string;
  code: string;
  setEmail: (email: string) => void;
  setCode: (code: string) => void;
  clear: () => void;
}

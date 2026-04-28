export interface RecoveryState {
  email: string;
  code: string;
  setEmail: (email: string) => void;
  setCode: (code: string) => void;
  setNavigating: (value: boolean) => void;
  isNavigating: boolean;
  clear: () => void;
}

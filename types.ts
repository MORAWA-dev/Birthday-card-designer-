
export interface BirthdayCardRequest {
  name: string;
  age: string;
  hobby: string;
  tone: 'funny' | 'savage' | 'punny' | 'wholesome';
}

export interface BirthdayCardResult {
  id: string;
  recipientName: string;
  message: string;
  imageUrl?: string;
  timestamp: number;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

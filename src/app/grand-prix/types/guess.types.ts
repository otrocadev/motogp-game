export type UserGuess = {
  grand_prix_id: number;
  session_type: SessionType;
  rider: number;
  position: number;
  user_id: string | null;
};

export type AdminGuess = {
  grand_prix_id: number;
  session_type: SessionType;
  rider: number;
  position: number;
};

export type SessionType = 'QUALY' | 'SPRINT' | 'RACE';

export type StandingInfo = {
  rider_id: number;
  rider_name: string;
  rider_surname: string;
  team: string;
  races: number;
  wins: number;
  podiums: number;
  points: number;
};

export type Top5StandingInfo = {
  number: number;
  name: string;
  surname: string;
  img_url: string;
  points: number;
};

export type User = {
  id: string;
  name: number;
};

export type SoilMoisture = {
  measured_at: string;
  moisture: number;
  karakara_id: number;
  notified: boolean;
};

export type Irrigation = {
  id: number;
  irrigated_at: string;
  user: User;
};
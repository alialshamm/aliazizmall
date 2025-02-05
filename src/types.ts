
export interface UserData {
  name: string;
  mobile: string;
  email: string;
  city: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export type AlertMessage = {
  type: 'success' | 'error' | 'warning';
  message: string;
};

export { };
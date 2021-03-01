export interface LocationData {
  source: {
    lat: number;
    lng: number;
  };
  destination: {
    lat: number;
    lng: number;
  };
  distance: number;
  duration: number;
}

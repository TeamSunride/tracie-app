export interface TelemetryData {
  position: TelemetryPositionData;
  velocity: TelemetryVelocityData;
  acceleration: TelemetryAccelerationData;
  orientation: TelemetryOrientationData;
  angularVelocity: TelemetryAngularVelocityData;
  altitude: number;
  speed: number;
  distanceTravelled: number;
  flightTime: number;
  verticalSpeed: number;
  horizontalSpeed: number;
  trajectoryAngle: number;
  accelerationMagnitude: number;
  longitudeAndLatitude: TelemetryLongitudeAndLatitudeData;
  maxAltitude: number;
  maxVerticalSpeed: number;
}

export interface TelemetryPositionData {
  x: number;
  y: number;
  z: number;
}

export interface TelemetryVelocityData {
  x: number;
  y: number;
  z: number;
}

export interface TelemetryAccelerationData {
  x: number;
  y: number;
  z: number;
}

export interface TelemetryOrientationData {
  pitch: number;
  yaw: number;
}

export interface TelemetryAngularVelocityData {
  pitch: number;
  yaw: number;
}

export interface TelemetryLongitudeAndLatitudeData {
  longitude: number;
  latitude: number;
}

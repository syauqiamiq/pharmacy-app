export const VITAL_SIGN_TYPES = [
    { label: 'Tinggi Badan', value: 'Tinggi Badan' },
    { label: 'Berat Badan', value: 'Berat Badan' },
    { label: 'Suhu Tubuh', value: 'Suhu Tubuh' },
    { label: 'Tekanan Darah', value: 'Tekanan Darah' },
    { label: 'Detak Jantung', value: 'Detak Jantung' },
    { label: 'Laju Pernapasan', value: 'Laju Pernapasan' },
];

export const VITAL_SIGN_UNITS: { [key: string]: string } = {
    height: 'cm',
    weight: 'kg',
    body_temperature: '°C',
    blood_pressure: 'mmHg',
    heart_rate: 'bpm',
    respiratory_rate: 'rpm',
};

export const VITAL_SIGN_DEFAULTS: { [key: string]: number } = {
    height: 0,
    weight: 0,
    body_temperature: 36.5,
    blood_pressure: 120,
    heart_rate: 80,
    respiratory_rate: 20,
};

export const VITAL_SIGN_NORMAL_RANGES: { [key: string]: [number, number] } = {
    height: [50, 250], // in cm
    weight: [3, 300], // in kg
    body_temperature: [36.1, 37.2], // in °C
    blood_pressure: [90, 120], // systolic in mmHg
    heart_rate: [60, 100], // in bpm
    respiratory_rate: [12, 20], // in rpm
};

export const VITAL_SIGN_COLORS: { [key: string]: string } = {
    height: 'blue',
    weight: 'green',
    body_temperature: 'red',
    blood_pressure: 'purple',
    heart_rate: 'orange',
    respiratory_rate: 'teal',
};

export const VITAL_SIGN_DESCRIPTIONS: { [key: string]: string } = {
    height: 'Tinggi badan pasien dalam sentimeter (cm).',
    weight: 'Berat badan pasien dalam kilogram (kg).',
    body_temperature: 'Suhu tubuh pasien dalam derajat Celsius (°C).',
    blood_pressure: 'Tekanan darah sistolik pasien dalam milimeter merkuri (mmHg).',
    heart_rate: 'Detak jantung pasien dalam denyut per menit (bpm).',
    respiratory_rate: 'Laju pernapasan pasien dalam napas per menit (rpm).',
};

export const VITAL_SIGN_HELP_LINKS: { [key: string]: string } = {
    height: 'https://www.who.int/news-room/fact-sheets/detail/height-for-age',
    weight: 'https://www.who.int/news-room/fact-sheets/detail/weight-for-age',
    body_temperature: 'https://www.cdc.gov/temperature/index.html',
    blood_pressure: 'https://www.heart.org/en/health-topics/high-blood-pressure',
    heart_rate: 'https://www.heart.org/en/health-topics/heart-rate',
    respiratory_rate: 'https://www.lung.org/lung-health-diseases/wellness/respiratory-rate',
};

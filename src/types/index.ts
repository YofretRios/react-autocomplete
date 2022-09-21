export type CountryPromise = {
  ccn3: string,
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
  };
}

export type Country = {
  ccn3: string;
  common: string;
  official: string;
  flag: string;
};

export enum CountryTypes {
  idle = 'idle',
  pending = 'pending',
  resolved = 'resolved',
  rejected = 'rejected',
  reset = 'reset'
}

export interface CountryAction {
  type: CountryTypes;
  payload?: any;
}

export interface CountryState {
  status: string;
  suggestions: Country[] | [];
  error?: string | null;
}

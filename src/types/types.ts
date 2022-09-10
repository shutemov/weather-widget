export enum EStorageKeys {
  Cities = "cities",
}

export type TCity = {
  name: string;
  isoCode: string;
};

export type TDataRow = {
  id?: number;
  name: string;
};

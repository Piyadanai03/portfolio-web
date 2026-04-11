export interface Contact {
  id: string;
  userID: string;
  platformName: string; // เช่น GitHub, Facebook, Phone
  urlValue: string;
  iconURL?: string;
  isActive: boolean;
}
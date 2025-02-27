export interface FeUser {
  id: string;
  email: string;
  username?: string;
  drsId?: string;
  practice?: string;
  address?: string;
  town?: string;
  country?: string;
  countryCode?: string;
  phone?: string;
  firstName?: string; 
  lastName?: string;  
  jobTitle?: string; 
  deviceCompany?: string;
  emrProvider?: string;
  current?: boolean; 
  firstTime?: boolean;
  admin?: boolean;
  doctors?: { firstName: string; lastName: string; drsId: string; email: string }[];
  selectedDevices?: { manufacturer: string; device: string }[];
}

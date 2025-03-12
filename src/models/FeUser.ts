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
  current?: boolean;
  firstTime?: boolean;
  admin?: boolean;
  doctors?: {
    firstName: string;
    lastName: string;
    drsId: string;
    email: string;
  }[];
  emrProviders?: {
    name: string; // "CareConnect
    incomingFormat: string; //"XML"
    outgoingFormat: string; //"KMEHR XML"
    inputFolder?: string; //"C:\\Nexumed\\inFromDevice\\xml-output",
    outputFolder?: string; ////"C:\\Nexumed\\toCareConnect"
  }[];
  selectedDevices?: {
    manufacturer: string;// "Mesi",
    device: string;////"ECG"
    deviceId: string; //  //"MESI-001",
    format: string;  //"Mesi GDT"
  }[];
}
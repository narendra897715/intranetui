export interface ImageProperties  {
  imageName: string;
  imageType: string;
  Image: string;
  updatedBy: number;
  createdBy: number;
}

export class IPostupdateobject {
  categoryId: number;
  eventStartDat: string;
  eventEndDate: string;
  eventName: string;
  eventDescription: string;
  updatedBy: number;
  createdBy: number;
  imageData: any;
}

export interface Itab {
  categoryName: string;
  categoryId: number;
  typeId: string;
  catergoryURL: string;
  // tslint:disable-next-line:eofline
}

export interface DialogData {
  status: string;
}

export interface INewimageuploadforexistingarray {
  newsAndUpdatesId: number;
  imageData: any;
}
export interface INewimageuploadforexistingarrayForIF {
  interactionForumsId: number;
  imageData: any;
}
export interface IRecentlypostdynamicbinding {
  search: string;
  filterId: number;
  pageNo: number;
  pageSize: number;
  categoryId?: number;

}

export interface IJoiness {
  search: string;
  filterId: number;
  pageNo: number;
  pageSize: number;
}

export interface IEmployeedynamicbinding {
  search?: string;
  sortById?: number;
  pageNo: number;
  pageSize: number;
  workLocationId?: number;
  domainId: number;
//  designationId: number;
}

export interface IEmployeeindividualData {
  domain: string;
  employeeName: string;
  mail: string;
  skype: string;
  designation:  string;
  employeeId: number;
  dateOfJoining: string;
  contact: string;
  technologiesKnown: any;
  email: string;
  workLocation: string;
  reportingManager: string;
}
export interface IinteractiveforumsCategories {
  search: string;
  categoryId: number;
  pageNo: number;
  pageSize: number;
  employeeId: number;
  filterId?: number;
}

export interface Ipollingoptions {
  optionumber: number;
  optionDescription: string;
  updatedBy: number;
  createdBy: number;
}

export class IinteractionForumDailog {
  categoryId: number;
  eventStartDate: any;
  eventEndDate: any;
  eventName: string;
  eventDescription: string;
  updatedBy: number;
  createdBy: number;
  imageData: any;
  pollingOptions: any;

}

export class IinteractionForumEventCompleteData {
  eventName: string;
  updatedByName: string;
  updatedDate: number;
  CLDData: any;
  eventDescription: string;
  commentsData: any;
  createdByName: string;
  eventStartDate: number;
  eventEndDate: number;
  pollingOptions: any;
  pollingEmployeeInfo: any;
  imageData: any;
  categoryId: number;
  interactionForumsId: number;
  newsAndUpdatesId: number;
  createdBy: number;
  overallPercentage: number;
  totalPollingCount: number;
  mail: string;
  skype: string;
  createdDate: number;
}


export interface FileProperties {
  resourcesCategoryId?: number;
  fileName: string;
  fileType: string;
  files: string;
  updatedBy: number;
  createdBy: number;
}

export interface IFormsObject {
  search: string;
  categoryId: number;
  pageNo: number;
  pageSize: number;
}

export interface ISuggestedOption {
  suggestedByName: string;
  suggestedOption: string;
  suggestedDate: Date;
}

export interface IEmployeeInfo {
  employeeID: number;
  emailId: string;
  roleID: number;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfJoining: number;
  isActive: boolean;
  designation: string;
  domainName: string;
  reportingManager: string;
  workLocation: string;
  isAdmin: string;
  isSuperAdmin: boolean;
}

export interface IAppreciation {
  employeeId: number;
  pageNo: number;
  pageSize: number;
}

export class IinteractionForumEvent {
  interactionForumsId: number;
  newsAndUpdatesId: number;
  categoryId: number;
  categoryName: string;
  eventName: string;
  colourCode: string;
  eventDescription: string;
  eventStartDate: number;
  eventEndDate: number;
  createdBy: number;
  createdByName: string;
  updatedBy: number;
  updatedByName: string;
  createdDate: number;
  updatedDate: number;

  CLDData: any;
  imageData: any;
  pollingOptions: any;
}

export class Inotification {
  name: string;
}


export interface IIndividualEmployeeData {
  'employeeId': number;
  'employeeName': string;
  'dateOfJoining': Date;
  'designation': string;
  'domain': string;
  'technologiesKnown': any;
  'reportingManager': string;
  'workLocation': string;
  'contact': number;
  'email': string;
  'skype': string;
  'mail': string;
}

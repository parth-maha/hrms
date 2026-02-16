export type OnwerType = "HR" | "MANAGER" | "EMPLOYEE";
export type ExpenseStaus = "PENDING" | "APPROVED" | "REJECTED";
export type ExpenseCategory = "FOOD" | "MISCELLANEOUS" | "COMMUTE" | "STAY";

export interface CreateTravelFormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  employeeIds: string[];
  documents: File[];
}

export interface Travel {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  createdBy: string;
  files : FileType[];
  employeeIds : EmployeeDto[];
  documents: TravelDocument[];
}

export interface FilterOptions {
  name : string;
  createdBy : string;
  startDate: string;
  endDate: string;
  employeeIds : string;
}
export interface FileType{
    id : string;
    fileName : string;
    url : string;
}

export interface EmployeeDto{
    id : string;
    name : string;
}

export interface TravelDocument {
  id: string;
  fileName: string;
  url: string;
}

export interface TravelListProps {
  travels: Travel[] | undefined;
  onAddTravel: () => void;
  onEditTravel: (data: Travel) => void;
  onDeleteTravel: (id: string) => void;
}

export interface TravelFormProps {
  initialData?: Travel;
  onSuccess: () => void;
  onCancel: () => void;
}

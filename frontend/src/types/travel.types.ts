import type { EmployeeOption } from "./job.types";

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
  files: FileType[];
  employeeIds: { id: string; name: string }[];
  documents: TravelDocument[];
}

export interface FilterOptions {
  name: string;
  createdBy: string;
  startDate: string;
  endDate: string;
  employeeIds: string;
}
export interface FileType {
  id: string;
  fileName: string;
  url: string;
}

export interface TravelDocument {
  id: string;
  fileName: string;
  url: string;
}
export interface ExpenseListProps{
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
}

export interface TravelListProps {
  travels: Travel[] | undefined;
  onAddTravel: () => void;
  onEditTravel: (data: Travel) => void;
  onDeleteTravel: (id: string) => void;
  onAddExpense : (data : Travel) => void
}

export interface TravelFormProps {
  initialData?: Travel;
  onSuccess: () => void;
  onCancel: () => void;
}

export interface ExpenseFilterProps {
  filters: {
    employeeId: string | null;
    travelId: string | null;
    category: string | null;
    status: string | null;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      employeeId: string | null;
      travelId: string | null;
      category: string | null;
      status: string | null;
    }>
  >;
  options: {
    employees: EmployeeOption[]
    travels: { travelId: string; travelName: string }[];
    categories: string[];
  };
  onApply: () => void;
  onReset: () => void;
}
export interface ExpenseFormProps{
  open: boolean;
  onClose: () => void;
  initialTravel: Travel | undefined;
}
export interface FileItem {
  id?: string;
  fileName: string;
  url?: string;
  file?: File;
}

export interface UpdateExpenseDto{
  status : string;
  remarks : string;
}

export interface Expense {
  id: string;
  travelId?: string;
  travelName: string;
  description: string;
  amount: number;
  employeeName : string;
  category: ExpenseCategory;
  expenseDate: string;
  proof: File | null;
  status: ExpenseStaus;
  document: string;
  hrRemarks? : string
  fileName: string;
}

export interface AddExpenseFormData {
  travelId: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  expenseDate: string;
  expenseType : string
  proof : File
}

export interface ExpenseFilterDto{
  employeeId? : string;
  travelId? : string;
  category? : string;
  status? : string;
}

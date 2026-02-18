import dayjs from "dayjs";
import type {
  AddExpenseFormData,
  CreateTravelFormData,
  Travel,
  UpdateExpenseDto,
} from "../types/travel.types";
import api from "./axios";

export const getTravelForEmployee = async () => {
  const response = await api.get<Travel[]>("/Travel/my");
  return response.data;
};

export const getAllTravels = async () => {
  const response = await api.get<Travel[]>("/Travel/all");
  return response.data;
};

export const createTravelByHr = async (data: CreateTravelFormData) => {
  const formData = getCreateTravelForm(data);
  const response = await api.post("/Travel/plan", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteTravel = async (id: string) => {
  const response = await api.delete(`/Travel/${id}`);
  return response.data;
};

export const updateTravel = async (id: string, data: CreateTravelFormData) => {
  const formData = getCreateTravelForm(data);
  const response = await api.put(`/Travel/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getMyExpenses = async () => {
  const response = await api.get("/Travel/expenses/my");
  return response.data;
};

export const getAllExpenses = async () => {
  const response = await api.get("/Travel/expenses/all");
  return response.data;
};

export const addExpesne = async (data: AddExpenseFormData) => {
  const formData = getExpenseForm(data);
  const response = await api.post("Travel/expenses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateExpenseStatus = async (id:string, data : UpdateExpenseDto) => {
    const response = await api.put(`/Travel/expenses/status/${id}`,data)
    return response.data
}

export const updateExpense = async (id: string, formData: FormData) => {
    const response = await api.put(`/Travel/expenses/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// ======================== HELPERS ==================

const getExpenseForm = (data: AddExpenseFormData) => {
  const formData = new FormData();
  formData.append("travelId", data.travelId);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("amount", data.amount.toString());
  formData.append("expenseType", data.category);
  formData.append("expenseDate", dayjs(data.expenseDate).format("YYYY-MM-DD"));
  formData.append("proof", data.proof[0]);
  return formData;
};

const getCreateTravelForm = (data: CreateTravelFormData) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("startDate", data.startDate);
  formData.append("endDate", data.endDate);

  if (data.employeeIds && Array.isArray(data.employeeIds)) {
    data.employeeIds.forEach((id: string) => {
      formData.append("employeeIds", id);
    });
  }

  if (data.documents) {
    data.documents.forEach((doc) => {
      formData.append("documents", doc.file);
    });
  }

  return formData;
};

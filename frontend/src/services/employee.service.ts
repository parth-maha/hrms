import type { OrgChartNode } from "../types/employee.types"
import api from "./axios"

export const getOrgChart = async () =>{
    const response = await api.get<OrgChartNode[]>('/Employee/org-chart')
    return response.data
}
export interface OrgChartNode {
    id: string;
    name: string;
    position: string;
    directReports: OrgChartNode[];
}
import { Color } from "chart.js";

export interface BasicChart {
  labels: string[]; // "frontend developer"
  datasets: [{
    label: string,
    data: number[]
  }];
}



export interface PieChart {
  labels: string[]
  datasets: [{
    data: number[],
    backgroundColor: Color[];
    hoverBackgroundColor: Color[]
  }]
}


export interface BarChart {
  labels: string[],
  datasets: [{
    type: string,
    label?: string,
    backgroundColor: string[],
    data: number[]
  }]
};

export interface BasicData {
  labels: string[],
  datasets: [{
    label?: string[],
    backgroundColor: Color[],
    data: number[]
  }]
}

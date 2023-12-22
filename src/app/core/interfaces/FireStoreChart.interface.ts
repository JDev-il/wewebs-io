export interface FireStoreChart {
  name: string;
  work_percentage: {
    backend: number,
    frontend: number
  };
  stacks: {
    backend: [{
      stack: string,
      usage: number
    }];
    frontend: [{
      stack: string,
      usage: number
    }]
  }
}

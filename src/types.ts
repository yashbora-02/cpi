export interface ClassRecord {
    id: string;
    program: string;
    date: string;
    status: string;
  }
  
  export interface Student {
    firstName: string;
    lastName: string;
    email: string;
    site: string;
    status: string;
    history: ClassRecord[];
  }
  
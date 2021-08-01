export class Template {
    key: string;
    name: string;
    department: string;
    waitingForApproval: boolean;
    approved: boolean;
    url: string;
    file: File;

    constructor(file: File) {
      this.file = file;
    }
  }

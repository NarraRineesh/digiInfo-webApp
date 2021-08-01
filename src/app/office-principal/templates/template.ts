
export interface Template {
    key: string;
    name: string;
    department: string;
    waitingForApproval: boolean;
    approved: boolean;
    url: string;
    participants: Iparticipant[];

}
export interface IValue {
    name: string;
    url: string;
    department: string;
    waitingForApproval: boolean;
    approved: boolean;
    file: File;
}
export interface Iparticipant {
    view: boolean;
    email: string;
}

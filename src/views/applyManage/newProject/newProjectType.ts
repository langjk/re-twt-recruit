export type QuestionInstance = {  
    clearSelect: () => void;  
}  
export type selectQ = {
    type:string,
    title:string,
    optionDetail:{
        options:{label:string,id:number}[],
        maxSelect:number,
        minSelect:number,
        optionsIdCount:number,
    }
    required:boolean,
    groups:string[]
}
export type textQ = {
    type:string,
    title:string,
    required:boolean,
    groups:string[]
}
export type describeQ = {
    type:string,
    title:string,
    required:boolean,
    groups:string[]
}


export type Department = {    
    id: number;    
    name: string;    
    code: string;    
};    

export type DepartmentsResponse = {    
    code: number;    
    result: Department[];    
};   
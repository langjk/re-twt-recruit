import http from '@/utils/http';  
import { Department,DepartmentsResponse } from './newProjectType';

export const getDepartments = async (): Promise<Department[]> => {    
    try {  
        const res: DepartmentsResponse = await http.get("/v1/user/departments", {});  
        if (res.code == 200) {    
            return res.result;    
        } else {   
            throw new Error('Failed to fetch departments');    
        }  
    } catch (error) {  
        throw error;  
    }  
};
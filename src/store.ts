import { createStore } from 'vuex';  

// 定义状态  
interface State {  
    name: string;
    scale: number;
    clubName: string;
    accountType: number;
}  

// 定义 mutations  
const mutations = {  

SET_USER_INFO(state: State, name: string) {  
    state.name = name;  
}, 
SET_USER_SCALE(state: State, scale: number) {  
    state.scale = scale;  
}, 
SET_CLUB_NAME(state: State, name: string) {  
    state.clubName = name;  
},  
SET_USER_TYPE(state: State, type: number) {  
    state.accountType = type;  
},  
};  

// 创建 store  
const store = createStore<State>({  
state: {   
    name: '未登录', 
    scale: 0 ,
    clubName: '未登录',
    accountType: 0,
},  
mutations,  
});  

export default store;
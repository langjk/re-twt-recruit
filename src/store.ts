import { createStore } from 'vuex';  

// 定义状态  
interface State {  
    name: string;
    scale: number;
    clubName: string;
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
};  

// 创建 store  
const store = createStore<State>({  
state: {   
    name: '未登录', 
    scale: 0 ,
    clubName: '未登录'
},  
mutations,  
});  

export default store;
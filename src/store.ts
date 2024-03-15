import { createStore } from 'vuex';  

// 定义状态  
interface State {  
    name: string;
}  

// 定义 mutations  
const mutations = {  

SET_USER_INFO(state: State, name: string) {  
    state.name = name;  
},  
};  

// 创建 store  
const store = createStore<State>({  
state: {   
    name: '未登录',  
},  
mutations,  
});  

export default store;
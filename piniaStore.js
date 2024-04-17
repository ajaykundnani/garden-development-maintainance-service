import { defineStore } from "pinia";

export const loginStore = defineStore({
    id: "LoginStoreId",

    state: () => ({
        token: localStorage.getItem("jwt"),
        user_name:localStorage.getItem('user_name'),
        
    }),
    actions: {
        
        SetTokenUserData: function (token,user_name) {
            this.token = token;
            this.user_name = user_name;
            localStorage.setItem("jwt",token)
            localStorage.setItem("user_name",user_name)
            
        },
        removeEveryThing()
        {
            this.token='';
            this.user_name='';
            localStorage.clear();
        }
        
    },
});

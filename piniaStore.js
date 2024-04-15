import { defineStore } from "pinia";

export const loginStore = defineStore({
    id: "LoginStoreId",

    state: () => ({
        token: localStorage.getItem("jwt"),
        
    }),
    actions: {
        
        setToken: function (token) {
            this.token = token;
            localStorage.setItem("jwt",token)
            
        },
        removeEveryThing()
        {
            this.token='';
            localStorage.clear();
        }
        
    },
});

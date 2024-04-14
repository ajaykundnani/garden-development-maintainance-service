<template>
    <div>

        <h1>Welcome User Dashboard</h1>
        <span @click="logout()">Logout</span>
        
    </div>
</template>
<script>
export default{
    data()
    {
        return{

        }
    },
    methods:{
        logout()
        {
            this.$root.store_login_data.removeEveryThing();
            this.$router.push('/login');
        }
    }
}
</script>
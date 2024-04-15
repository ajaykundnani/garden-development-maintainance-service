<template>
  <div>
    <h1>Welcome User Dashboard</h1>
    <span class="danger" @click="logout()">Logout</span>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$router.push("/");
      this.$root.store_login_data.removeEveryThing();
    },
  },
  mounted() {},
};
</script>

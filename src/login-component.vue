<template>
  <div class="wrapper centered" :class="is_active">
    <div class="form signup" @click="active_add_remove(1)">
      <header @click="clear_all_form()">Signup</header>
      <form action="#">
        <input
          type="text"
          placeholder="Full name"
          v-model="name"
          @input="required_name = ''"
        />
        <span class="error" v-if="required_name != ''">{{ required_name }}</span>
        <input
          type="text"
          placeholder="Email address"
          v-model="email"
          @input="check_email(0)"
        />
        <span class="error" v-if="required_email != ''">{{ required_email }}</span>
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          @input="required_password = ''"
        />
        <span class="error" v-if="required_password != ''">{{ required_password }}</span>
        <input
          type="password"
          @input="check_passwords()"
          placeholder="Confirm Password"
          v-model="c_password"
        />
        <span class="error" v-if="required_c_password != ''">{{
          required_c_password
        }}</span>
        <!-- 
        <div class="checkbox">
          <input type="checkbox" id="signupCheck" />
          <label for="signupCheck">I accept all terms & conditions</label>
        </div> -->
        <input type="button" value="Signup" @click="register()" />
      </form>
    </div>
    <div class="form login" @click="active_add_remove(0)">
      <header>Login</header>
      <form action="#">
        <input
          type="text"
          placeholder="Email address"
          v-model="l_email"
          @input="check_email(1)"
        />
        <span class="error" v-if="required_l_email != ''">{{ required_l_email }}</span>
        <input
          type="password"
          placeholder="Password"
          v-model="l_password"
          @input="required_l_password = ''"
        />
        <span class="error" v-if="required_l_password != ''">{{
          required_l_password
        }}</span>
        <a href="#">Forgot password?</a>
        <input type="button" value="Login" @click="login()" />
      </form>
    </div>
  </div>
</template>
<script>
import { loginStore } from "../piniaStore";
export default {
  data() {
    return {
      is_active: "",
      l_email: "",
      required_l_email: "",
      required_l_password: "",
      l_password: "",
      email: "",
      required_email: "",
      name: "",
      required_name: "",
      password: "",
      required_password: "",
      c_password: "",
      required_c_password: "",
      store_login_data: loginStore(),
    };
  },
  methods: {
    clear_all_form() {
      this.email = "";
      this.l_email = "";
      this.required_l_email = "";
      this.l_password = "";
      this.required_l_password = "";
      this.required_email = "";
      this.required_name = "";
      this.name = "";
      this.password = "";
      this.required_password = "";
      this.c_password = "";
      this.required_c_password = "";
    },
    active_add_remove(x) {
      this.is_active = x == 1 ? "" : "active";
    },
    check_passwords() {
      if (this.password !== this.c_password) {
        this.required_c_password = "Password not match";
      } else {
        this.required_c_password = "";
      }
    },
    check_email(check_email_coming_from = 1) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailToCheck = check_email_coming_from === 0 ? this.email : this.l_email;
      const targetProperty =
        check_email_coming_from === 0 ? "required_email" : "required_l_email";
      this[targetProperty] = regex.test(emailToCheck) ? "" : "Invalid Email Address";
    },
    check_all_required_fileds() {
      if (this.name == "") {
        this.required_name = "Enter Name";
        return false;
      }
      if (this.email == "") {
        this.required_email = "Enter E-mail Address";
        return false;
      }
      if (this.password == "") {
        this.required_password = "Enter Password";
        return false;
      }
      if (this.c_password == "") {
        this.required_c_password = "Enter confirm password";
        return false;
      }
      return true;
    },
    register() {
      let check = this.check_all_required_fileds();
      if (check) {
        let regist = {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.c_password,
        };
        this.$http.post("register", regist).then((res) => {
          if (res.data.status_code == 200) {
            this.$toast.open({
              message: "Registration Success!",
              type: "success",
              position: "top-right",
            });
            this.active_add_remove(0);
          }
        });
      }
    },
    login() {
      // this.$router.replace("/");
      // this.store_login_data.setToken("123");
      if (this.l_email && this.l_password) {
        const loginForm = {
          email: this.l_email,
          password: this.l_password,
        };
        this.$http.post("login", loginForm).then((res) => {
          if (res.data.status_code === 200) {
            this.$toast.open({
              message: "Login Success!",
              type: "success",
              position: "top-right",
            });
          }
          this.$router.replace("/");
          this.store_login_data.setToken(res.data.token);
        });
      } else {
        if (!this.l_email) {
          this.required_l_email = "Enter email Address";
        }
        if (!this.l_password) {
          this.required_l_password = "Enter password";
        }
      }
    },
  },
  mounted() {
  },
};
</script>
<style scoped>
.danger {
  color: red !important;
}
.centered {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}
.error {
  color: red;
}
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0faff;
}
.wrapper {
  position: relative;
  max-width: 470px;
  width: 143%;
  border-radius: 12px;
  padding: 20px 30px 120px;
  background: #4070f4;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.form.login {
  position: absolute;
  left: 50%;
  bottom: -86%;
  transform: translateX(-50%);
  width: calc(100% + 220px);
  padding: 20px 140px;
  border-radius: 50%;
  height: 100%;
  background: #fff;
  transition: all 0.6s ease;
}
.wrapper.active .form.login {
  bottom: -15%;
  border-radius: 35%;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.1);
}
.form header {
  font-size: 30px;
  text-align: center;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.form.login header {
  color: #333;
  opacity: 0.6;
}
.wrapper.active .form.login header {
  opacity: 1;
}
.wrapper.active .signup header {
  opacity: 0.6;
}
.wrapper form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}
form input {
  height: 60px;
  outline: none;
  border: none;
  padding: 0 15px;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  border-radius: 8px;
  background: #fff;
}
.form.login input {
  border: 1px solid #aaa;
}
.form.login input:focus {
  box-shadow: 0 1px 0 #ddd;
}
form .checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
}
.checkbox input[type="checkbox"] {
  height: 16px;
  width: 16px;
  accent-color: #fff;
  cursor: pointer;
}
form .checkbox label {
  cursor: pointer;
  color: #fff;
}
form a {
  color: #333;
  text-decoration: none;
}
form a:hover {
  text-decoration: underline;
}
form input[type="submit"] {
  margin-top: 15px;
  padding: none;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
}
.form.login input[type="submit"] {
  background: #4070f4;
  color: #fff;
  border: none;
}
</style>

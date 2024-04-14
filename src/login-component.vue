
<template>
  <section class="wrapper" :class="is_active">
    <div class="form signup" @click="active_add_remove(1)">
      <header>Signup</header>
      <form action="#">
        <input type="text" placeholder="Full name" v-model="name"  />
        <input type="text" placeholder="Email address" v-model="email"  />
        <input type="password" placeholder="Password" v-model="password" />
        <input type="password" placeholder="Password" v-model="c_password" />

        <div class="checkbox">
          <input type="checkbox" id="signupCheck" />
          <label for="signupCheck">I accept all terms & conditions</label>
        </div>
        <input type="button" value="Signup" @click="register()" />
      </form>
    </div>

    <div class="form login"  @click="active_add_remove(0)">
      <header>Login</header>
      <form action="#">
        <input type="text" placeholder="Email address" v-model="email"  />
        <input type="password" placeholder="Password" v-model="password" />
        <a href="#">Forgot password?</a>
        <input type="button" value="Login" @click="login()" />
      </form>
    </div>


  </section>
</template>
<script>
import { loginStore } from "../piniaStore";

export default {
  data() {
    return {
      is_active:'',
      email: '',
      required_email: '',
      name: '',
      required_name: '',
      password: '',
      required_password: '',
      c_password: '',
      required_c_password: '',
      store_login_data: loginStore(),



    }
  },
  methods:
  {
    active_add_remove(x)
    {
      this.is_active = x == 1 ? '' : 'active'

    },
    check_passwords() {
      console.log('pass=>', this.password);
      console.log('c=>', this.c_password);
      if (this.password !== this.c_password) {
        this.required_c_password = 'Password not match'
      }
      else {
        this.required_c_password = ''
      }

    },
    check_email() {
      var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (regex.test(this.email)) {
        this.required_email = ''
      }
      else {
        this.required_email = 'Invalid Email Address'
      }

      console.log(this.email);

    },
    check_all_required_fileds() {
      let flag = true;
      if (this.required_email == '') {
        this.required_email = 'Enter E-mail Address'
        return false;

      }
      if (this.required_name == '') {
        this.required_email = 'Enter Name'
        return false;

      }
      if (this.required_password == '') {
        this.required_email = 'Enter Password'
        return false;

      }
      if (this.required_c_password == '') {
        this.required_email = 'Enter confirm password'
        return false;

      }
      console.log(flag);
      return true;

    },
    register() {
      this.$toast.open({
        message: 'Registration Success!',
        type: 'success',
        position: 'top-right'

        // all of other options may go here
      });
      this.$http.get("test").then((res) => {
        console.log(res.data);
      })
      let check = this.check_all_required_fileds();


      if (check) {

        console.log('Name->', this.name);
        console.log('Email->', this.email);
        console.log('Password->', this.password);
        console.log('C Password->', this.c_password);
        this.store_login_data.setToken('123')

      }


    },
    login() {
      console.log('Email->', this.email);
      console.log('Password->', this.password);
      this.store_login_data.setToken('123')
      this.$router.replace('/');

    }

  },
  mounted() {
  

   


  }
}
</script>
<style>
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
  width: 100%;
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
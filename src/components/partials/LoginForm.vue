<template>
  <form @submit.prevent="submit">
    <InputField
      id="loginEmail"
      type="email"
      label="Email"
      placeholder="onefeed@mail.dk"
      @input-change="setEmail"
    />
    <InputField
      id="loginPassword"
      type="password"
      label="Password"
      placeholder="*******"
      @input-change="setPassword"
    />
    <ButtonMain type="submit" classes="submit" text="Log In" />
  </form>
</template>

<script>
import InputField from "@/components/InputField.vue";
import ButtonMain from "@/components/ButtonMain.vue";

import { reactive } from "vue";

export default {
  name: "LoginForm",
  setup(props, { emit }) {
    const data = reactive({
      email: "",
      password: "",
    });

    const submit = async () => {
      // await fetch("https://onefeed-api-test.herokuapp.com/api/login", {
      await fetch(`${process.env.VUE_APP_API_URI}/api/login`, {
        method: "POST",
        // mode: "no-cors", // no-cors mode can ONLY request opaque resources -- Opaque responses CANNOT be accessed with JavaScript
        headers: { "Content-Type": "application/json" },

        // credentials: "include",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          res.status == 200 ? emit("login", res) : emit("login", false);
        });
    };

    const setEmail = (val) => {
      data.email = val;
    };

    const setPassword = (val) => {
      data.password = val;
    };

    return {
      data,
      submit,
      setEmail,
      setPassword,
    };
  },

  components: {
    InputField,
    ButtonMain,
  },
};
</script>

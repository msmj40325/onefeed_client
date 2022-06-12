<template>
  <form @submit.prevent="submit">
    <InputField
      Id="registerFirstName"
      type="text"
      label="First name"
      :required="true"
      placeholder="Enter your first name"
      @input-change="setFirstName"
    />
    <InputField
      Id="registerLastName"
      type="text"
      label="Last name"
      :required="true"
      placeholder="Enter your last name"
      @input-change="setLastName"
    />
    <InputField
      Id="registerEmail"
      type="email"
      label="Email"
      :required="true"
      placeholder="example@mail.com"
      @input-change="setEmail"
    />
    <InputField
      Id="registerPassword"
      type="password"
      label="Password"
      :required="true"
      placeholder="Enter password"
      @input-change="setPassword"
    />
    <InputField
      Id="registerPasswordRepeat"
      type="password"
      label="Enter password again"
      :required="true"
      placeholder="Repeat password"
      @input-change="setPasswordRepeat"
    />

    <ButtonMain type="submit" classes="submit" text="Sign up" />
  </form>
</template>

<script>
import InputField from "@/components/InputField.vue";
import ButtonMain from "@/components/ButtonMain.vue";
import { reactive } from "vue";

export default {
  name: "LoginForm",
  components: {
    InputField,
    ButtonMain,
  },

  emits: ["register"],

  setup(props, { emit }) {
    const data = reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordRepeat: "",
    });

    const submit = async () => {
      // await fetch("https://onefeed-api-test.herokuapp.com/api/post", {
      await fetch(`${process.env.VUE_APP_API_URI}/api/new/user`, {
        method: "POST",
        // mode: "no-cors", // no-cors mode can ONLY request opaque resources -- Opaque responses CANNOT be accessed with JavaScript
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (!response.user)
            return /* TODO: make error response */ console.log(response);
          emit("register", true);
        });
    };

    const setFirstName = (val) => {
      data.firstName = val;
    };

    const setLastName = (val) => {
      data.lastName = val;
    };

    const setEmail = (val) => {
      data.email = val;
    };

    const setPassword = (val) => {
      data.password = val;
    };

    const setPasswordRepeat = (val) => {
      data.passwordRepeat = val;
    };

    return {
      data,
      submit,
      setFirstName,
      setLastName,
      setEmail,
      setPassword,
      setPasswordRepeat,
    };
  },

  //   data() {
  //     return {
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       password: "",
  //       passwordRepeat: "",
  //     };
  //   },
};
</script>

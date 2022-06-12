<template>
  <div class="grid-item">
    <!-- Button -->
    <div
      @click="toggled = !toggled"
      :class="{ connected: connected }"
      :id="soMeName"
      class="connect-socials"
    >
      <div class="name">
        <p>{{ soMeName }}</p>
        <span v-if="connected">Connected</span>
        <span v-else>Connect</span>
      </div>
      <div class="icon"></div>
    </div>

    <!-- Modal -->
    <div @click.self="toggled = !toggled" v-if="toggled" class="overlay">
      <!-- Connect twitter -->
      <div v-if="!connected && soMeName == 'Twitter'" class="not-connected">
        <div class="input-controller">
          <label>Enter your {{ soMeName }} username</label>
          <input type="text" ref="soMeUsername" />
        </div>
        <button
          @click="
            connectTwitter($refs.soMeUsername.value);
            toggled = !toggled;
          "
        >
          Connect {{ soMeName }}
        </button>
      </div>

      <!-- Connect twitter -->
      <div v-if="!connected && soMeName == 'Facebook'" class="not-connected">
        <button
          @click="
            connectFacebook();
            toggled = !toggled;
          "
        >
          Connect to {{ soMeName }}
        </button>
      </div>

      <!-- Already connected -->
      <div v-if="connected" class="connected">
        <p>
          {{ soMeName }} is connected! {{ this.$store.getters.getRandomEmoji }}
        </p>
        <button
          @click="
            disconnect(mediaId);
            toggled = !toggled;
          "
          class="disconnect"
        >
          Disconnect
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Swal from "sweetalert2";

export default {
  name: "ButtonSoMe",
  props: {
    disconnect: {
      type: Function,
      require: true,
    },
    connected: {
      type: Boolean,
      // required: true,
      default: false,
    },
    soMeName: {
      type: String,
      require: true,
    },
    mediaId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      toggled: false,
    };
  },

  methods: {
    /* Get Twitter ID from username */
    async connectTwitter(username) {
      if (!username)
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please provide a Twitter username!",
        });

      try {
        await fetch(
          `${process.env.VUE_APP_API_URI}/proxy/twitter/users/by/username/${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization:
                "Bearer AAAAAAAAAAAAAAAAAAAAAEVvaAEAAAAAhluPly2R0UNBm4o8Ht%2FlN2wXPIQ%3DCQMMFMSOPNbSkhgy6EkU8iuaoVxhwylMylJ5vHhxjLzLfFzKIb",
            },
          }
        )
          .then((response) => response.json())
          .then(async (response) => {
            if (response.errors)
              return Swal.fire({
                icon: "error",
                title: "Error",
                text: "No Twitter user exists with this username",
              });

            /* Save connection to DB */
            await fetch(`${process.env.VUE_APP_API_URI}/api/twitter/connect/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*",
              },
              body: JSON.stringify({
                social_id: 1,
                user_id: this.$store.getters.getUserId,
                social_user_id: response.data.id,
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.error)
                  return console.log(
                    "Error connecting to social media!",
                    res.error
                  );

                // Save Twitter connection to Vuex store
                // this.$store.dispatch("setTwitterConnection", true);
                this.$store.dispatch("setTwitterId", response.data.id);
                window.localStorage.setItem("TwitterId", response.data.id);

                /* Update socials in parent */
                this.$emit("getSocials");

                // Fire success message
                return Swal.fire({
                  icon: "success",
                  title: `Connection established!`,
                  text: "Twitter is now added to OneFeed 🎉",
                });
              });
          });
      } catch (e) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${e}`,
        });
      }
    },

    async connectFacebook() {
      await FB.login((authResponse) => {
        const reqBody = {
          auth: authResponse,
          social_id: 2,
          user_id: this.$store.getters.getUserId,
        };

        fetch(`${process.env.VUE_APP_API_URI}/api/facebook/connect`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
          },
          body: JSON.stringify(reqBody),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.error) return console.log("err", res.error);

            /* Update socials in parent */
            this.$emit("getSocials");

            // Fire success message
            return Swal.fire({
              icon: "success",
              title: `Connection established!`,
              text: "Facebook is now added to OneFeed 🎉",
            });
          })
          .catch((error) => {
            console.log("error:", error);
          });
      });
    },
  },
};
</script>

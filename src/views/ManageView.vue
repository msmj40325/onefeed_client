<template>
  <div class="wrapper">
    <ButtonBack />
    <div class="some-grid">
      <ButtonSoMe
        v-for="social in socials"
        :key="social.id"
        :mediaId="social.id"
        :connected="social.connected"
        :soMeName="social.name"
        :disconnect="disconnectSoMe"
        @getSocials="getSocials"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Swal from "sweetalert2";

// @ is an alias to /src
import ButtonBack from "@/components/ButtonBack.vue";
import ButtonSoMe from "@/components/ButtonSoMe.vue";

export default {
  name: "ManageView",
  components: {
    ButtonBack,
    ButtonSoMe,
  },
  data() {
    return {
      socials: [],
    };
  },

  methods: {
    async getSocials() {
      try {
        /*
         ** Get all social medias
         */
        await fetch(`${process.env.VUE_APP_API_URI}/api/socials`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
          },
        })
          .then((res) => res.json())
          .then(async (res) => {
            // console.log(res);
            const dbSocials = [];
            for (let i = 0; i < res.length; i++) {
              dbSocials.push(res[i]);
            }

            /*
             ** Get user socials connections
             */

            try {
              await fetch(
                `${process.env.VUE_APP_API_URI}/api/socials/user/${this.$store.getters.getUserId}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "access-control-allow-origin": "*",
                  },
                }
              )
                .then((res) => res.json())
                .then((res) => {
                  const connections = res;

                  /* Default connected to false */
                  this.socials = dbSocials.map((social) => {
                    return { ...social, connected: false };
                  });

                  if (connections.null) return;

                  /* Update connected value to true for connected social medias */
                  for (let i = 0; i < connections.length; i++) {
                    this.handleSoMeConnection(connections[i].social_id);
                  }
                });
            } catch (e) {
              console.log(e);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },

    handleSoMeConnection(id) {
      this.socials.map((social) => {
        if (social.id == id) social.connected = !social.connected;
      });
    },

    async disconnectSoMe(social_id) {
      await fetch(`${process.env.VUE_APP_API_URI}/api/socials/disconnect/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        body: JSON.stringify({
          social_id: social_id,
          user_id: this.$store.getters.getUserId,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error)
            return console.log("Error: failed disconnecting social media!");

          switch (social_id) {
            case 1:
              localStorage.removeItem("TwitterId");
              this.$store.dispatch("setTwitterId", null);
              /* Clear stored feed */
              localStorage.removeItem("feed");
              break;
            case 2:
              this.$store.dispatch("setFacebookId", null);
              localStorage.removeItem("FacebookId");
              break;
            default:
              return;
          }

          this.getSocials();

          // Fire success message
          return Swal.fire({
            icon: "success",
            title: "Connection successfully removed",
            text: "Connection has been removed from OneFeed",
          });
        });
    },
  },

  mounted() {
    /* Get social medias */
    this.getSocials();
  },
};
</script>

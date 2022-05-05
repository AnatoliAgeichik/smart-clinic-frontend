<template>
  <div id="app">
    <div id="nav">
      <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push('/')
        })
      }
    },
  }
</script>
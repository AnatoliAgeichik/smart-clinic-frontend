<template>
  <div>
    <h1>Home</h1>
    <h3>{{userStatus}}</h3>
  </div>
  <span>
    {{this.$store.state.profile.user.id}}
  </span>
  <span>
    {{this.$store.state.profile.user.email}}
  </span>
  <span>
    {{this.$store.state.profile.user.name}}
  </span>
</template>

<script>
export default {
  computed:{
    userStatus(){
      return this.$store.state.auth.status
    }

  },
  created() {
    //this.$store.dispatch('profile/fetchUsers', {self: this})
  }
}

</script>
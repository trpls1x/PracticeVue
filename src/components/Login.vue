<template>
    <div>
        <input v-model="login">
        <button @click="auth">OK</button>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        data() {
            return {
                login:''
            }
        },
        methods: {
            auth() {
                Vue.axios.get("http://46.101.212.195:3000/students/name/"+this.login).then((response) =>{
                    if(response.data === null) {
                        return
                    }
                    this.$store.commit('setUser', response.data);
                    this.$router.push('/')
                })
            }
        }
    }
</script>
<template>
    <div>
        <img :src="student.photo">
        <h2>{{student.name}}</h2>
        <p>Group: {{student.group}}</p>
        <p>Mark: {{student.mark}}</p>
    </div>
</template>
<script>
import Vue from 'vue'

export default {
    props: {
           id: '',
    },
    data: function() {
        return {
            student: {}
        };
    },
    mounted: function() {
        Vue.axios.get("http://46.101.212.195:3000/students/"+this.id).then((response) =>{
            console.log(response.data);
            this.student = response.data;
        })
    }
}
</script>
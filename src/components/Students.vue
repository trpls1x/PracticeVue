<template>
    <div>
        <template v-if="!change">
            <link rel="stylesheet" href="./css/dark.css">
            <button @click="changeTheme">Change to light</button>
        </template>
        <template v-else>
            <link rel="stylesheet" href="./css/light.css">
            <button @click="changeTheme">Change to dark</button>
        </template>
        <input type="text" v-model="surname">
        <table>
            <tr>
                <th>Name</th>
                <th>Group</th>
                <th>Mark</th>
                <th>PW</th>
                <th></th>
                <th></th>
            </tr>
            <tr v-for="stud in students" v-bind:key="stud._id">
                <td v-bind:style="stud.name.includes(surname) ? 'color:red' : 'color:black'"><router-link v-bind:to="'/student-info/'+stud._id">{{stud.name}}</router-link></td>
                <td>{{stud.group}}</td>
                <td>{{stud.mark}}</td>
                <td><input type="checkbox" v-model="stud.isDonePr"></td>
                <td><button @click.prevent="deleteStudent(stud._id)" v-show="stud.group==getCurrentUser.group">Видалити</button></td>
                <td><button @click="showUpdateForm(stud._id)">update</button></td>
           </tr>
        </table>

        <input type="text" v-model="student.name" placeholder="Name">
        <select v-model="student.group">
            <option value="RPZ1">RPZ1</option>
            <option value="RPZ2">RPZ2</option>
            <option value="повернувся">Повернувся</option>
        </select>
        <input type="text" v-model="student.mark" placeholder="Mark">
        <input type="checkbox" v-model="student.isDonePr">Здав ПР
        <button @click="addStudent">ОК</button>

        <div id="updateForm">
            <input type="text" v-model="updatedStudent.name" placeholder="Name">
            <select v-model="updatedStudent.group">
                <option value="RPZ1">RPZ1</option>
                <option value="RPZ2">RPZ2</option>
            </select>
            <input type="text" v-model="updatedStudent.mark" placeholder="Mark">
            <input type="checkbox" v-model="updatedStudent.isDonePr">Здав ПР
            <button @click="updateStudent">ОК</button>
        </div>
        <p>Students count:{{studentsCount}}</p>
        <hr>

        <router-link :to="'/converter/'"><button>Converter</button></router-link>
        
        <router-link :to="'/nova-poshta/'"><button>Нова Пошта</button></router-link>
        
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    data () {
        return { 
            students: [],
            student: { name: '', group: '',  mark: '', isDonePr: false},
            updatedStudent: { name: '', group: '',  mark: '', isDonePr: false, id: ''},
            surname: '-',
        }
    },
    computed:{
        studentsCount () {
            return this.$store.getters.getCount
        },
        change () {
            return this.$store.getters.getChange
        },
        getCurrentUser() {
            return this.$store.getters.getUser
        } 
    },
    mounted: async function() {
            let response = await Vue.axios.get("http://46.101.212.195:3000/students");
            console.log(response.data)
            this.students = response.data;
            this.$store.commit('setCount', this.students.length);
    },
    methods: {
        deleteStudent: function(id) {
            Vue.axios.delete("http://46.101.212.195:3000/students/" + id)
        },
        addStudent: function() {
            Vue.axios.post("http://46.101.212.195:3000/students", this.student)
            .then((response) => {
                console.log(response.data)
            });
        },
        showUpdateForm: function(id) {
		    var form = document.getElementById("updateForm");
            form.style.visibility = "visible";

            Vue.axios.get("http://46.101.212.195:3000/students/"+id).then((response) =>{
                this.updatedStudent.name = response.data.name;
                this.updatedStudent.group = response.data.group;
                this.updatedStudent.mark = response.data.mark;
                this.updatedStudent.isDonePr = response.data.isDonePr;
                this.updatedStudent.id = response.data._id;
            })
        },
        updateStudent: function() {
            var form = document.getElementById("updateForm");
            form.style.visibility = "hidden"

            Vue.axios.put("http://46.101.212.195:3000/students/" + this.updatedStudent.id, this.updatedStudent)
        },
        changeTheme: function(){
            this.$store.commit('setStyle', !this.$store.getters.getChange);
            localStorage.setItem('change', this.$store.getters.getChange)
        }
    }
}
</script>

<style scoped>

</style>


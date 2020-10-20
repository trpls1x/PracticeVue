<template>
    <div>
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
                <td v-bind:style="stud.name.includes(surname) ? 'color:red' : 'color:black'">{{stud.name}}</td>
                <td>{{stud.group}}</td>
                <td>{{stud.mark}}</td>
                <td><input type="checkbox" v-model="stud.isDonePr"></td>
                <td><button @click="deleteStudent(stud._id)">Видалити</button></td>
                <td><button @click="showUpdateForm(stud._id)">update</button></td>
           </tr>
        </table>

        <input type="text" v-model="student.name" placeholder="Name">
        <select v-model="student.group">
            <option value="RPZ1">RPZ1</option>
            <option value="RPZ2">RPZ2</option>
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
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
    data () {
        return { 
            students: [],
            student: { name: '', group: '',  mark: '', isDonePr: false},
            updatedStudent: { name: '', group: '',  mark: '', isDonePr: false, id: ''},
            surname: '-'
        }
    },
    mounted: function(){
        axios.get("http://46.101.212.195:3000/students").then((response) =>{
            console.log(response.data);
            this.students = response.data;
        })
    },
    methods: {
        deleteStudent: function(id) {
            axios.delete("http://46.101.212.195:3000/students/" + id)
        },
        addStudent: function() {
            axios.post("http://46.101.212.195:3000/students", this.student)
            .then((response) => {
                console.log(response.data)
            });
        },
        showUpdateForm: function(id) {
		    var form = document.getElementById("updateForm");
            form.style.visibility = "visible";

            axios.get("http://46.101.212.195:3000/students/"+id).then((response) =>{
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

            axios.put("http://46.101.212.195:3000/students/" + this.updatedStudent.id, this.updatedStudent)
        }
    }
}
</script>

<style scoped>
    
</style>


import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


new Vue({
    el: "#app",
    data: {
        students: [],
        surname: '-',
        name: '',
        group: '',
        birth: '',
        check: false
    },
    mounted: function(){
        axios.get("http://46.101.212.195:3000/students").then((response) =>{
            console.log(response.data);
            this.students = response.data;
        })
    },
    methods: {
        deleteStudent: function(index) {
            this.students.splice(index, 1);
        },
        addStudent: function() {
            var temp = {
                "name": this.name,
                "group": this.group,
                "birth": this.birth,
                "pw": this.check
            }
            this.students.push(temp)
        }
    }
    
})
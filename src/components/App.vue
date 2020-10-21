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

        <hr>
        <div class="converter">
            <h2>Currency converter</h2>

            <span>Enter amount:</span>
            <input type="text" v-model="amount"><br><br>
            
            <span>Convert from:</span>
            <select v-model="currencyToSell">
                <option value="UAH">Hryvna</option>
                <option value="EUR">Euro</option>
                <option value="USD">US Dollar</option>
                <option value="RUR">Ruble</option>
            </select>

            <span>Convert to:</span>
            <select v-model="currencyToBuy">
                <option value="UAH">Hryvna</option>
                <option value="EUR">Euro</option>
                <option value="USD">US Dollar</option>
                <option value="RUR">Ruble</option>
            </select>
            <button @click="convertCurrency">Convert</button>
            <p>{{amount}} {{currencyToSell}} equals {{convertedAmount}} {{currencyToBuy}}</p>
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
            surname: '-',
            //converter
            exchangeRates: [],
            amount: 0,
            currencyToSell: '',
            currencyToBuy: '',
            convertedAmount: 0
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
        },
        convertCurrency: function() {
            var action, ccy;
            if(this.currencyToBuy == 'UAH') {
                ccy = this.currencyToSell;
                action = 'buy'
            } else if (this.currencyToSell == 'UAH') {
                ccy = this.currencyToBuy;
                action = 'sell'
            } else
                alert('Choose UAH')

            axios.get("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11").then((response) =>{
                console.log(response.data);
                this.exchangeRates = response.data;
                let rightExchangeRate = this.exchangeRates.find((element) => {
                    return element.ccy == ccy;
                })
            
                console.log(rightExchangeRate)
                if(action == 'buy')
                    this.convertedAmount = this.amount * rightExchangeRate.buy
                else if (action == 'sell')
                    this.convertedAmount = this.amount / rightExchangeRate.sale
            })
        }
    }
}
</script>

<style scoped>
    
</style>


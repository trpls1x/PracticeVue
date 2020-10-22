<template>
    <div>
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
        <p>{{amount}} {{currencyToSell}} equals {{convertedAmount | toFixed}} {{currencyToBuy}}</p>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    data () {
        return {
            exchangeRates: [],
            amount: 0,
            currencyToSell: '',
            currencyToBuy: '',
            convertedAmount: 0
        }
    },
    filters: {
        toFixed: function(value) {
            return value.toFixed(2);
        }
    },
    methods: {
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

            Vue.axios.get("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11").then((response) =>{
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
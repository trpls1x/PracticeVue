<template>
    <div>
        <p>Населенний пункт:</p>
        <select @change="getWarehouses" v-model="city">
            <option v-for="item in cities" v-bind:key="item.CityID" :value="item.Description">{{item.Description}}</option>
        </select>

        <p>Відділення міста:</p>
        <select>
            <option v-for="warehouse in warehouses" v-bind:key="warehouse.SiteKey" :value="warehouse.Description">{{warehouse.Description}}</option>
        </select>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    data () {
        return {
            cities: [],
            city: '',
            warehouses: []
        };
    },
    mounted: function(){
        Vue.axios.post("https://api.novaposhta.ua/v2.0/json/", 
        {
            "modelName": "Address",
            "calledMethod": "getCities",
            "apiKey": "bdba1e5efa3d130a016ecf9be22a6609"
        }).then((response) => {
            this.cities = response.data.data;
        })
    },
    methods: {
        getWarehouses:  function(){
            Vue.axios.post("https://api.novaposhta.ua/v2.0/json/", 
            {
                "modelName": "Address",
                "calledMethod": "getWarehouses",
                "methodProperties": {
                    "CityName": this.city
                },
                "apiKey": "bdba1e5efa3d130a016ecf9be22a6609"
            }).then((response) => {
                this.warehouses = response.data.data;
            })
        }
    }
}
</script>
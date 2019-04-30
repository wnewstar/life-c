<script>
import echarts from 'echarts'

import { Group, Alert, Loading, TransferDom } from 'vux'

var labelPie = {
    normal: {
        formatter: '{a|{b}}\n{b|}\n{d|占比 {d}%}\n{c|金额 {c}}',
        padding: [2, 4],
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 2,
        backgroundColor: '#eee',
        rich: {
            a: {
                color: '#999',
                align: 'center',
                fontSize: 12,
                lineHeight: 20,
                backgroundColor: '#eee'
            },
            b: {
                width: '100%',
                height: 0,
                borderWidth: 1,
                borderColor: '#aaa',
                backgroundColor: '#334455'
            },
            c: {
                color: '#eee',
                align: 'left',
                width: 70,
                padding: 2,
                fontSize: 10,
                lineHeight: 22,
                borderRadius: 2,
                backgroundColor: '#334455'
            },
            d: {
                color: '#f90',
                align: 'left',
                width: 70,
                padding: 2,
                fontSize: 10,
                lineHeight: 22,
                borderRadius: 2,
                backgroundColor: '#334455'
            }
        }
    }
}
var charOptionPie = {
    title: { text: null },
    legend: {
        data: [],
        left: 'right',
        orient: 'vertical'
    },
    series: [
        {
            data: [],
            type: 'pie',
            radius: '20%',
            center: ['50%', '50%']
        }
    ],
    tooltip: { trigger: 'item', formatter: '{b} {c} {d}%' }
}

export default {
    components: {
        Group,
        Alert,
        Loading
    },
    directives: {
        TransferDom
    },
    data () {
        return {
            api: {
                bill: this.apim.bill,
                conf: this.apim.conf
            },
            alert: {
                show: false,
                title: null,
                content: null
            },
            flaga: true,
            flagb: true,
            temporary: {
                ios: { i: '收入', o: '支出' },
                conflist: {}
            },
            chartdata: { a: {}, i: {}, o: {} }
        }
    },
    created () {
        this.getconf()
    },
    watch: {
        flagb (newv, oldv) {
            this.render()
        },
        flaga (newv, oldv) {
            newv !== false ? null : this.getbill()
        }
    },
    methods: {
        render () {
            var data = this.chartdata

            data.a.title.text = '收支统计'
            data.i.title.text = '收入统计'
            data.o.title.text = '支出统计'

            this.dealarray(data.a.legend.data)
            this.dealarray(data.i.legend.data)
            this.dealarray(data.o.legend.data)
            this.dealarray(data.a.series[0].data)
            this.dealarray(data.i.series[0].data)
            this.dealarray(data.o.series[0].data)

            echarts.init(document.getElementById('charta')).setOption(data.a, true)
            echarts.init(document.getElementById('charti')).setOption(data.i, true)
            echarts.init(document.getElementById('charto')).setOption(data.o, true)
        },
        getbill () {
            this.http.get(this.api.bill.list).then(
                response => {
                    if (response.body.code === '0') {
                        this.getchartdata(response.body.data)
                    }
                }
            )
        },
        getconf () {
            this.http.get(this.api.conf.list).then(
                response => {
                    if (response.body.code === '0') {
                        var data = response.body.data
                        this.flaga = false
                        for (var i in data) {
                            this.temporary.conflist[data[i].id] = {
                                id: data[i].id, pid: data[i].pid, name: data[i].name
                            }
                        }
                    }
                }
            )
        },
        dealarray (arr) {
            for (var i in arr) {
                var row = arr[i]
                arr.push(row), delete arr[i]
                row.value === undefined ? 0 : (row.value = row.value.toFixed(2))
            }
        },
        getchartdata (data) {
            this.chartdata.a = Object.assign(
                {},
                JSON.parse(JSON.stringify(charOptionPie))
            )
            this.chartdata.i = Object.assign(
                {},
                JSON.parse(JSON.stringify(charOptionPie))
            )
            this.chartdata.o = Object.assign(
                {},
                JSON.parse(JSON.stringify(charOptionPie))
            )
            this.flagb = false
            for (var i in data) {
                var io = data[i].io
                var tid = data[i].tid
                var namea = this.temporary.ios[io].trim()
                var namet = this.temporary.conflist[tid].name.trim()

                if (this.chartdata.a.legend.data[io] === undefined) {
                    this.chartdata.a.legend.data[io] = {
                        name: null
                    }
                }
                if (this.chartdata.a.series[0].data[io] === undefined) {
                    this.chartdata.a.series[0].data[io] = {
                        name: null,
                        value: 0,
                        label: labelPie
                    }
                }
                this.chartdata.a.legend.data[io].name = namea
                this.chartdata.a.series[0].data[io].name = namea
                this.chartdata.a.series[0].data[io].value += parseFloat(data[i].money)

                if (this.chartdata[io].legend.data[tid] === undefined) {
                    this.chartdata[io].legend.data[tid] = {
                        name: null
                    }
                }
                if (this.chartdata[io].series[0].data[tid] === undefined) {
                    this.chartdata[io].series[0].data[tid] = {
                        name: null,
                        value: 0,
                        label: labelPie
                    }
                }
                this.chartdata[io].legend.data[tid].name = namet
                this.chartdata[io].series[0].data[tid].name = namet
                this.chartdata[io].series[0].data[tid].value += parseFloat(data[i].money)
            }
        }
    }
}
</script>

<template>
    <div>
        <group>
            <div style="margin: 10px;">
                <div id="charta" style="width: 100%; height: 100%; min-height: 400px;"></div>
            </div>
        </group>
        <group>
            <div style="margin: 10px;">
                <div id="charti" style="width: 100%; height: 100%; min-height: 400px;"></div>
            </div>
        </group>
        <group>
            <div style="margin: 10px;">
                <div id="charto" style="width: 100%; height: 100%; min-height: 400px;"></div>
            </div>
        </group>

        <loading v-bind:show="flagb"></loading>
        <div v-transfer-dom><alert v-model="alert.show" v-bind:title="alert.title" v-bind:content="alert.content"></alert></div>
    </div>
</template>

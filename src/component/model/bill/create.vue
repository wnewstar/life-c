<script>
import base from '@/component/common/mixin/base'

import NPopupRadioTree from '@/component/widget/popupradiotree'
import { Group, Datetime, XInput, XButton, XTextarea, PopupRadio } from 'vux'


export default {
    components: {
        Alert,
        Loading,
        Group,
        Datetime,
        XInput,
        XButton,
        XTextarea,
        PopupRadio,
        NPopupRadioTree
    },
    mixins: [base],
    data () {
        var time = (new Date()).getTime()
        return {
            temp: { ttid: '0' },
            create: {
                item: {
                    io: String(),
                    tid: 0,
                    tag: String(),
                    money: '0.00',
                    remark: String(),
                    datetime: this.$moment(time).format('YYYY-MM-DD HH:mm')
                }
            },
            optiondata: {
                ios: [ { key: 'i', value: '收入' }, { key: 'o', value: '支出' } ]
            }
        }
    },
    created () {
        this.initConf()
    },
    methods: {
        initCreate () {
            var time = (new Date()).getTime()
            this.temp.ttid = '0'
            this.create.item = {
                io: String(),
                tid: 0,
                tag: String(),
                money: '0.00',
                remark: String(),
                datetime: this.$moment(time).format('YYYY-MM-DD HH:mm')
            }
        },
        itemCreate () {
            var data = this.create.item
            var temp = this.temp.ttid.split('-')
            for (var i = 1; i < temp.length; i++) {
                temp[i] <= 0 ? 0 : (data.tid = parseInt(temp[i]))
            }
            
            Promise
            .all([
                this.curlCreate(data)
            ])
            .then(back => {
                (back[0].body.code !== '0') ? null : this.initCreate()
            })
        }
    }
}
</script>

<template>
    <div>
        <n-layer
            :alert="alert"
            :confirm="cponfirm"
            :loading="loading"></n-layer>
        <div>
            <group>
                <datetime
                    title="时间"
                    format="YYYY-MM-DD HH:mm"
                    v-model="create.item.datetime"></datetime>
            </group>
            <group>
                <popup-radio
                    title="收支"
                    v-model="create.item.io"
                    :options="optiondata.ios"></popup-radio>
            </group>
            <group>
                <n-popup-radio-tree
                    title="分类"
                    v-model="temp.ttid"
                    :items="confdata.tree"></n-popup-radio-tree>
            </group>
            <group>
                <x-input
                    required
                    type="text"
                    title="金额"
                    text-align="right"
                    v-model="create.item.money"></x-input>
            </group>
            <group>
                <x-textarea
                    title="标签"
                    v-model="create.item.tag"></x-textarea>
            </group>
            <group>
                <x-textarea
                    title="备注"
                    v-model="create.item.remark"></x-textarea>
            </group>
            <group>
                <x-button type="primary" @click.native="itemCreate">保存</x-button>
            </group>
        </div>
    </div>
</template>

<script>
import model from '@/component/common/mixin/model'

import NPopupRadioTree from '@/component/widget/popupradiotree'
import { Group, Datetime, XInput, XTextarea, PopupRadio } from 'vux'

export default {
    components: {
        Alert,
        Loading,
        Group,
        Datetime,
        XInput,
        XTextarea,
        PopupRadio,
        NPopupRadioTree
    },
    directives: {
        TransferDom
    },
    mixins: [model],
    data () {
        return {
            temp: { ttid: '0' }
        }
    },
    created () {
        this.initConf()
    },
    methods: {
        itemDetail () {
            var data = { id: parseInt(this.$route.query.id) }
            
            Promise
            .all([
                this.curlDetail(data)
            ])
            .then(back => {
                if (back[0].body.code === '0') {
                    var item = back[0].body.data
                    this.detail.item = item
                    !parseInt(item.tid) ? null : (this.temp.ttid = this.confdata.list[item.tid].path)
                }
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
        <div v-if="detail.item !== null">
            <group>
                <datetime
                    title="时间"
                    format="YYYY-MM-DD HH:mm"
                    v-model="detail.item.datetime"></datetime>
            </group>
            <group>
                <popup-radio
                    title="收支"
                    v-model="detail.item.io"
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
                    v-model="detail.item.money"></x-input>
            </group>
            <group>
                <x-textarea
                    title="标签"
                    v-model="detail.item.tag"></x-textarea>
            </group>
            <group>
                <x-textarea
                    title="备注"
                    v-model="detail.item.remark"></x-textarea>
            </group>
        </div>
    </div>
</template>

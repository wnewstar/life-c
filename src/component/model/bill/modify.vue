<script>
import Common from '@/component/common/common'
import PopupRadioTree from '@/component/widget/popupradiotree'
import { Group, Datetime, XInput, XButton, XTextarea, PopupRadio, Alert, Loading, TransferDom } from 'vux'

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
        PopupRadioTree
    },
    directives: {
        TransferDom
    },
    mixins: [Common],
    data () {
        return {
            api: {
                bill: this.apim.bill,
                conf: this.apim.conf
            },
            modify: {
                item: null
            },
            optionm: {
                ios: [
                    { key: 'i', value: '收入' },
                    { key: 'o', value: '支出' }
                ]
            },
            temporary: { ttid: '0', confdata: {}, conftree: {} }
        }
    },
    created () {
        this.init()
        this.setLoading(true)
    },
    methods: {
        init () {
            this.setLoading(true)
            Promise
            .all([
                this.getConfTree(),
                this.getConfData()
            ])
            .then(data => {
                this.setConfTree(data[0])
                this.setConfData(data[1])
                this.detailBill()
            })
            .catch(data => {
                this.setLoading(false)
                this.showAlertMessage({ title: '错误', content: '获取数据失败' })
            })
        },
        detailBill () {
            var data = { id: parseInt(this.$route.query.id) }
            this.http.post(this.api.bill.detail, data).then(
                response => {
                    if (response.body.code === '0') {
                        var item = response.body.data
                        this.modify.item = item
                        this.temporary.ttid = this.temporary.confdata[item.tid].path
                    }
                    this.setLoading(false)
                    this.showAlertMessage({ title: '提示', content: response.body.text })
                },
                response => {
                    this.setLoading(false)
                    this.showAlertMessage({ title: '错误', content: response.body.text })
                }
            )
        },
        modifyBill () {
            this.setLoading(true)
            var data = this.modify.item
            var temp = this.temporary.ttid.split('-')
            for (var i = 1; i < temp.length; i++) {
                temp[i] <= 0 ? 0 : (data.tid = parseInt(temp[i]))
            }
            this.http.post(this.api.bill.modify, data).then(
                response => {
                    this.setLoading(false)
                    this.showAlertMessage({ title: '提示', content: response.body.text })
                },
                response => {
                    this.setLoading(false)
                    this.showAlertMessage({ title: '错误', content: response.body.text })
                }
            )
        }
    }
}
</script>

<template>
    <div>
        <div v-if="modify.item !== null">
            <group>
                <datetime
                    title="时间"
                    format="YYYY-MM-DD HH:mm"
                    v-model="modify.item.datetime"></datetime>
            </group>
            <group>
                <popup-radio
                    title="收支"
                    v-model="modify.item.io"
                    :options="optionm.ios"></popup-radio>
            </group>
            <group>
                <popup-radio-tree
                    title="分类"
                    v-model="temporary.ttid"
                    :items="temporary.conftree"></popup-radio-tree>
            </group>
            <group>
                <x-input
                    required
                    type="text"
                    title="金额"
                    text-align="right"
                    v-model="modify.item.money"></x-input>
            </group>
            <group>
                <x-textarea
                    title="标签"
                    v-model="modify.item.tag"></x-textarea>
            </group>
            <group>
                <x-textarea
                    title="备注"
                    v-model="modify.item.remark"></x-textarea>
            </group>
            <group>
                <x-button type="primary" @click.native="modifyBill">更新</x-button>
            </group>
        </div>

        <loading :show="flagm.a"></loading>
        <div v-transfer-dom><alert v-model="alert.show" :title="alert.title" :content="alert.content"></alert></div>
    </div>
</template>

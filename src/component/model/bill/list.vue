<script>
import Common from '@/component/common/common'
import { Card, Flexbox, FlexboxItem, Swipeout, SwipeoutItem, SwipeoutButton, Alert, Confirm, Loading, TransferDom } from 'vux'

export default {
    components: {
        Card,
        Alert,
        Confirm,
        Loading,
        Flexbox,
        FlexboxItem,
        Swipeout,
        SwipeoutItem,
        SwipeoutButton
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
            list: [],
            iconm: {
                detail: 'fa fa-fw fa-file',
                delete: 'fa fa-fw fa-trash',
                modify: 'fa fa-fw fa-pencil'
            },
            optionm: {
                ios: {
                    i: ['+', 'red'],
                    o: ['-', 'green']
                }
            },
            temporary: { confdata: {}, conftree: {} }
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
                this.getConfData(),
                this.getBillList()
            ])
            .then(data => {
                this.setConfData(data[0])
                this.setBillList(data[1])
                this.setLoading(false)
            })
            .catch(data => {
                this.setLoading(false)
                this.showAlertMessage({ title: '错误', content: '获取数据失败' })
            })
        },
        detailBill (id) {
            this.$router.push({ path: '/bill/detail', query: { id: id } })
        },
        modifyBill (id) {
            this.$router.push({ path: '/bill/modify', query: { id: id } })
        },
        deleteBill (id) {
            this.deleteid = id
            this.showConfirmMessage(
                {
                    title: '警告',
                    content: '确定删除吗',
                    oncancel: () => {},
                    onconfirm: () => { this.removeBill(this) }
                }
            )
        },
        removeBill (that) {
            var data = { id: that.deleteid }
            that.http.post(that.api.bill.delete, data).then(
                response => {
                    that.list = []
                    that.init()
                    that.showAlertMessage({ title: '提示', content: response.body.text })
                },
                response => {
                    that.setLoading(false)
                    that.showAlertMessage({ title: '错误', content: response.body.text })
                }
            )
        },
        setBillList (data) {
            if (data.body.code === '0') {
                var list = data.body.data
                for (var i in list) {
                    var tid = list[i].tid
                    this.list.push(list[i])
                    this.list[i].tname = this.temporary.confdata[tid].name
                }
            } else {
                this.showAlertMessage({ title: '错误', content: data.body.text })
            }
        },
        getBillList (bool) {
            return new Promise((resolve, reject) => {
                this.http.get(this.api.bill.list).then(response => { resolve(response) }, response => { reject(response) })
            })
        }
    }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';

.card-flex { display: flex; }
.card-content { padding: 6px; }
.card-flex > div { flex: 1; }
.card-flex.card-content { font-size: 14px; }
</style>

<template>
    <div style="margin-top: 10px;">
        <swipeout v-for="(item, key) in list" :key="key" style="margin-bottom: 10px;">
            <swipeout-item transition-mode="follow">
                <div slot="content" class="vux-1px-t">
                    <card>
                        <div slot="content">
                            <div class="card-flex card-content">
                                <div style="text-align: left;">
                                    <span>{{ item.datetime }}</span>
                                </div>
                                <div style="text-align: right;">
                                    <span>{{ item.tname }}</span>
                                </div>
                            </div>
                            <div class="card-flex card-content">
                                <div style="text-align: left;">
                                    <span>{{ item.tag }}</span>
                                </div>
                                <div style="text-align: right;">
                                    <span :style="{ color: optionm.ios[item.io][1] }">
                                        <b>{{ optionm.ios[item.io][0] + item.money }}</b>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </card>
                </div>
                <div slot="right-menu" style="font-size: 0px;">
                    <swipeout-button background-color="#D23934" :width="70" @click.native="deleteBill(item.id)">
                        <i :class="iconm.delete"></i>
                    </swipeout-button>
                    <swipeout-button background-color="#1AAD19" :width="70" @click.native="detailBill(item.id)">
                        <i :class="iconm.detail"></i>
                    </swipeout-button>
                    <swipeout-button background-color="#336DD6" :width="70" @click.native="modifyBill(item.id)">
                        <i :class="iconm.modify"></i>
                    </swipeout-button>
                </div>
            </swipeout-item>
        </swipeout>

        <loading :show="flagm.a"></loading>
        <div v-transfer-dom>
            <alert v-model="alert.show" :title="alert.title" :content="alert.content"></alert>
        </div>
        <div v-transfer-dom>
            <confirm v-model="confirm.show" :title="confirm.title" @on-cancel="confirm.oncancel" @on-confirm="confirm.onconfirm">{{ confirm.content }}</confirm>
        </div>
    </div>
</template>

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
                conf: this.apim.conf
            },
            list: [],
            iconm: {
                detail: 'fa fa-fw fa-file',
                delete: 'fa fa-fw fa-trash',
                modify: 'fa fa-fw fa-pencil'
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
                this.getConfTree(),
                this.getConfList()
            ])
            .then(data => {
                this.setConfTree(data[0])
                this.setConfList(data[1])
                this.setLoading(false)
            })
            .catch(data => {
                this.setLoading(false)
                this.showAlertMessage({ title: '错误', content: '获取数据失败' })
            })
        },
        detailConf (id) {
            this.$router.push({ path: '/conf/detail', query: { id: id } })
        },
        modifyConf (id) {
            this.$router.push({ path: '/conf/modify', query: { id: id } })
        },
        deleteConf (id) {
            this.deleteid = id
            this.showConfirmMessage(
                {
                    title: '警告',
                    content: '确定删除吗',
                    oncancel: () => {},
                    onconfirm: () => { this.removeConf(this) }
                }
            )
        },
        removeConf (that) {
            var data = { id: that.deleteid }
            that.http.post(that.api.conf.delete, data).then(
                response => {
                    that.init()
                    that.showAlertMessage({ title: '提示', content: response.body.text })
                },
                response => {
                    that.setLoading(false)
                    that.showAlertMessage({ title: '错误', content: response.body.text })
                }
            )
        },
        setConfList (data) {
            if (data.body.code === '0') {
                this.list = data.body.data
            } else {
                this.showAlertMessage({ title: '错误', content: data.body.text })
            }
        },
        getConfList (bool) {
            return new Promise((resolve, reject) => {
                this.http.get(this.api.conf.list).then(response => { resolve(response) }, response => { reject(response) })
            })
        }
    }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';

.card-flex { display: flex; }
.card-content { padding: 6px; }
.main-content { min-height: 40px; }
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
                            <div class="card-flex card-content main-content">
                                <div style="text-align: left;">{{ item.name }}</div>
                                <div style="text-align: right;">{{ getPathText(item.path) }}</div>
                            </div>
                        </div>
                    </card>
                </div>
                <div slot="right-menu" style="font-size: 0px;">
                    <swipeout-button background-color="#D23934" :width="70" @click.native="deleteConf(item.id)">
                        <i :class="iconm.delete"></i>
                    </swipeout-button>
                    <swipeout-button background-color="#1AAD19" :width="70" @click.native="detailConf(item.id)">
                        <i :class="iconm.detail"></i>
                    </swipeout-button>
                    <swipeout-button background-color="#336DD6" :width="70" @click.native="modifyConf(item.id)">
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

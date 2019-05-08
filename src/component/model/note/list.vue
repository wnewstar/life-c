<script>
import Common from '@/component/common/common'
import DataNull from '@/component/widget/datanull'
import { Card, Flexbox, FlexboxItem, Swipeout, SwipeoutItem, SwipeoutButton, Alert, Confirm, Loading, TransferDom } from 'vux'

export default {
    components: {
        DataNull,
        Card,
        Alert,
        Loading,
        Confirm,
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
                note: this.apim.note,
                conf: this.apim.conf
            },
            list: [],
            iconm: {
                read: 'fa fa-fw fa-book',
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
                this.getConfData(),
                this.getNoteList()
            ])
            .then(data => {
                this.setConfData(data[0])
                this.setNoteList(data[1])
                this.setLoading(false)
            })
            .catch(data => {
                console.log(data)
                this.setLoading(false)
                this.showAlertMessage({ title: '错误', content: '获取数据失败' })
            })
        },
        readNote (id) {
            this.$router.push({ path: '/note/read', query: { id: id } })
        },
        detailNote (id) {
            this.$router.push({ path: '/note/detail', query: { id: id } })
        },
        modifyNote (id) {
            this.$router.push({ path: '/note/modify', query: { id: id } })
        },
        deleteNote (id) {
            this.deleteid = id
            this.showConfirmMessage(
                {
                    title: '警告',
                    content: '确定删除吗',
                    oncancel: () => {},
                    onconfirm: () => { this.removeNote(this) }
                }
            )
        },
        removeNote (that) {
            var data = { id: that.deleteid }
            that.http.post(that.api.note.delete, data).then(
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
        setNoteList (data) {
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
        getNoteList (bool) {
            return new Promise((resolve, reject) => {
                this.http.get(this.api.note.list).then(response => { resolve(response) }, response => { reject(response) })
            })
        }
    }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
</style>

<template>
    <div>
        <swipeout v-for="(item, key) in list" :key="key" style="margin-bottom: 10px;">
            <swipeout-item transition-mode="follow">
                <div slot="content" class="vux-1px-t">
                    <card>
                        <div slot="content">
                            <div slot="content" class="card-flex card-content">
                                <div style="text-align: left;">
                                    <span>{{ item.title }}</span>
                                </div>
                            </div>
                            <div slot="content" class="card-flex card-content">
                                <div style="text-align: left;">
                                    <span>{{ item.tname }}</span>
                                </div>
                                <div style="text-align: right;">
                                    <span>{{ item.tag }}</span>
                                </div>
                            </div>
                             <div slot="content" class="card-flex card-content">
                                <div style="text-align: left;">
                                    <span>{{ item.datetime }}</span>
                                </div>
                                <div style="text-align: right;">
                                    <span>{{ item.datetime }}</span>
                                </div>
                            </div>
                        </div>
                    </card>
                </div>
                <div slot="right-menu" style="font-size: 0px;">
                    <swipeout-button background-color="#FFA500" :width="70" @click.native="readNote(item.id)">
                        <i :class="iconm.read"></i>
                    </swipeout-button>
                    <swipeout-button background-color="#1AAD19" :width="70" @click.native="detailNote(item.id)">
                        <i :class="iconm.detail"></i>
                    </swipeout-button>
                    <swipeout-button background-color="#336DD6" :width="70" @click.native="modifyNote(item.id)">
                        <i :class="iconm.modify"></i>
                    </swipeout-button>
                    <swipeout-button background-color="#D23934" :width="70" @click.native="deleteNote(item.id)">
                        <i :class="iconm.delete"></i>
                    </swipeout-button>
                </div>
            </swipeout-item>
        </swipeout>

        <data-null v-if="list.length == 0"></data-null>

        <loading :show="flagm.a"></loading>
        <div v-transfer-dom>
            <alert v-model="alert.show" :title="alert.title" :content="alert.content"></alert>
        </div>
        <div v-transfer-dom>
            <confirm v-model="confirm.show" :title="confirm.title" @on-cancel="confirm.oncancel" @on-confirm="confirm.onconfirm">{{ confirm.content }}</confirm>
        </div>
    </div>
</template>

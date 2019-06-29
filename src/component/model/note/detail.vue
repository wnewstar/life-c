<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/monokai-sublime.css'

import hljs from 'highlight.js'

import Common from '@/component/common/common'
import PopupRadioTree from '@/component/widget/popupradiotree'
import { Group, Datetime, XInput, XTextarea, Alert, Loading, TransferDom } from 'vux'

export default {
    components: {
        Alert,
        Loading,
        Group,
        Datetime,
        XInput,
        XTextarea,
        PopupRadioTree
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
            detail: {
                item: null
            },
            temporary: { ttid: '0', confdata: {}, conftree: {} }
        }
    },
    created () {
        this.init()
        this.setLoading(true)
    },
    mounted () {
        this.highlight()
    },
    updated () {
        this.highlight()
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
                this.detailNote()
            })
            .catch(data => {
                this.setLoading(false)
                this.showAlertMessage({ title: '错误', content: '获取数据失败' })
            })
        },
        highlight () {
            document.querySelectorAll('pre').forEach((v) => {
                hljs.highlightBlock(v)
            })
        },
        detailNote () {
            var data = { id: parseInt(this.$route.query.id) }
            this.http.post(this.api.note.detail, data).then(
                response => {
                    if (response.body.code === '0') {
                        var item = response.body.data
                        this.detail.item = item
                        this.temporary.ttid = this.temporary.confdata[item.tid].path
                    }
                    this.setLoading(false)
                    this.showAlertMessage({ title: '提示', content: response.body.note })
                },
                response => {
                    this.setLoading(false)
                    this.showAlertMessage({ title: '错误', content: response.body.note })
                }
            )
        }
    }
}
</script>

<template>
    <div>
        <div v-if="detail.item !== null">
            <group>
                <datetime
                    title="时间"
                    format="YYYY-MM-DD HH:mm"
                    v-model="detail.item.datetime"></datetime>
            </group>
            <group>
                <popup-radio-tree
                    title="分类"
                    v-model="temporary.ttid"
                    :items="temporary.conftree"></popup-radio-tree>
            </group>
            <group>
                <x-textarea
                    title="标题"
                    v-model="detail.item.title"></x-textarea>
            </group>
            <group>
                <x-textarea
                    title="标签"
                    v-model="detail.item.tag"></x-textarea>
            </group>
            <group>
                <div v-html="detail.item.content" class="ql-editor rich-text" v-highlight></div>
            </group>
        </div>

        <loading :show="flagm.a"></loading>
        <div v-transfer-dom><alert v-model="alert.show" :title="alert.title" :content="alert.content"></alert></div>
    </div>
</template>

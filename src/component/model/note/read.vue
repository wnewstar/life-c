<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/monokai-sublime.css'

import Common from '@/component/common/common'
import { Datetime, Alert, Loading, TransferDom } from 'vux'

export default {
    components: {
        Alert,
        Loading,
        Datetime
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
        <div v-if="detail.item !== null">
            <div class="note-read">
                <p class="title">{{ detail.item.title }}</p>
                <p class="datetime">{{ detail.item.datetime }}</p>
            </div>
            <div v-html="detail.item.content" class="ql-editor rich-text" v-highlight></div>
        </div>

        <loading :show="flagm.a"></loading>
        <div v-transfer-dom><alert v-model="alert.show" :title="alert.title" :content="alert.content"></alert></div>
    </div>
</template>

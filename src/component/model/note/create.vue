<script>
import Quill from 'quill'

import { quillEditor } from 'vue-quill-editor'
import { ImageResize } from '@/plugin/ImageResize.js'
import { ImageExtend, QuillWatch } from 'quill-image-extend-module'

import hljs from 'highlight.js'

import moment from 'moment'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/monokai-sublime.css'

import Common from '@/component/common/common'
import PopupRadioTree from '@/component/widget/popupradiotree'
import { Group, Datetime, XInput, XButton, XTextarea, Alert, Loading, TransferDom } from 'vux'

Quill.register('modules/ImageResize', ImageResize, true)
Quill.register('modules/ImageExtend', ImageExtend, true)

var datetime = moment((new Date()).getTime()).format('YYYY-MM-DD HH:mm')

export default {
    components: {
        Alert,
        Loading,
        Group,
        Datetime,
        XInput,
        XButton,
        XTextarea,
        quillEditor,
        PopupRadioTree
    },
    directives: {
        TransferDom
    },
    mixins: [Common],
    data () {
        return {
            create: {
                item: {
                    tid: 0,
                    tag: null,
                    title: null,
                    content: '内容',
                    datetime: datetime
                }
            },
            temporary: { ttid: '0', confdata: {}, conftree: {} },
            editoroption: {
                modules: {
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value
                    },
                    toolbar: {
                        handlers: {
                            'image': function () {
                                QuillWatch.emit(this.quill.id)
                            }
                        },
                        container: Array.prototype.concat(
                            ['bold', 'italic', 'underline', 'code-block', 'link', 'image'],
                            [{ 'align': [] }, { 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }, { 'color': [] }, { 'font': [] }, { 'size': [] }]
                        )
                    },
                    ImageResize: {
                        displaySize: true,
                        handleStyles: {
                            color: '#fff',
                            border: 'blue',
                            backgroundColor: '#000'
                        }
                    },
                    ImageExtend: {
                        size: 10,
                        name: 'file',
                        action: this.apim.file.upload,
                        headers: (request) => {
                            request.setRequestHeader('X-AUTH-TOKEN', localStorage.token)
                        },
                        response: (response) => {
                            var temp = { title: '错误', content: response.text }
                            return response.code === '0' ? this.apim.base + response.data : (this.showAlertMessage(temp), null)
                        }
                    }
                }
            }
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
                this.setLoading(false)
            })
            .catch(data => {
                this.setLoading(false)
                this.showAlertMessage({ title: '错误', content: '获取数据失败' })
            })
        },
        createNote () {
            this.setLoading(true)
            var data = this.create.item
            var temp = this.temporary.ttid.split('-')
            for (var i = 1; i < temp.length; i++) {
                temp[i] <= 0 ? 0 : (data.tid = parseInt(temp[i]))
            }
            this.http.post(this.apim.note.create, data).then(
                response => {
                    if (response.body.code === '0') {
                        this.temporary.ttid = '0'
                        this.create.item = {
                            tid: 0,
                            tag: null,
                            title: null,
                            content: '内容',
                            datetime: datetime
                        }
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
        <div>
            <group>
                <datetime
                    title="时间"
                    format="YYYY-MM-DD HH:mm"
                    v-model="create.item.datetime"></datetime>
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
                    v-model="create.item.title"></x-textarea>
            </group>
            <group>
                <x-textarea
                    title="标签"
                    v-model="create.item.tag"></x-textarea>
            </group>
            <group>
                <div>
                    <quill-editor
                        v-model="create.item.content"
                        :options="editoroption"></quill-editor>
                </div>
            </group>
            <group>
                <x-button type="primary" @click.native="createNote">保存</x-button>
            </group>
        </div>

        <loading :show="flagm.a"></loading>
        <div v-transfer-dom><alert v-model="alert.show" :title="alert.title" :content="alert.content"></alert></div>
    </div>
</template>

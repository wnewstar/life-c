<script>
import Common from '@/component/common/common'
import PopupRadioTree from '@/component/widget/popupradiotree'
import { Group, XInput, XButton, Alert, Loading, TransferDom } from 'vux'

export default {
    components: {
        Alert,
        Loading,
        Group,
        XInput,
        XButton,
        PopupRadioTree
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
            modify: {
                item: null
            },
            temporary: { tpid: '0', confdata: {}, conftree: {} }
        }
    },
    created () {
        this.init()
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
                this.detailConf()
            })
            .catch(data => {
                this.setLoading(false)
                this.showAlertMessage({ title: '错误', content: '获取数据失败' })
            })
        },
        detailConf () {
            var data = { id: parseInt(this.$route.query.id) }
            this.http.post(this.api.conf.detail, data).then(
                response => {
                    if (response.body.code === '0') {
                        var item = response.body.data
                        this.modify.item = item
                        this.temporary.tpid = this.temporary.confdata[item.id].path
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
        modifyConf () {
            this.setLoading(true)
            var data = this.modify.item
            var temp = this.temporary.tpid.split('-')
            var path = [0]
            for (var i = 1; i < temp.length; i++) {
                temp[i] <= 0 ? 0 : (path[i] = data.pid = parseInt(temp[i]))
            }
            data.path = path.join('-')
            this.http.post(this.api.conf.modify, data).then(
                response => {
                    if (response.body.code === '0') {
                        this.init()
                    }
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
                <popup-radio-tree
                    title="上级"
                    v-model="temporary.tpid"
                    :items="temporary.conftree"></popup-radio-tree>
            </group>
            <group>
                <x-input
                    required
                    type="text"
                    title="名称"
                    text-align="right"
                    v-model="modify.item.name"></x-input>
            </group>
            <group>
                <x-button type="primary" @click.native="modifyConf">更新</x-button>
            </group>
        </div>

        <loading :show="flagm.a"></loading>
        <div v-transfer-dom><alert v-model="alert.show" :title="alert.title" :content="alert.content"></alert></div>
    </div>
</template>

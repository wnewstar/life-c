<script>
import BaseRadioTree from '@/component/widget/baseradiotree'
import { Cell, Popup, PopupHeader, TransferDom } from 'vux'

export default {
    components: {
        Cell,
        Popup,
        PopupHeader,
        BaseRadioTree
    },
    directives: {
        TransferDom
    },
    name: 'popup-radio-tree',
    data () {
        return {
            showValue: [],
            showPopup: false
        }
    },
    created () {
        this.getShowValue(this.value)
    },
    props: {
        value: String,
        items: Object,
        title: String,
        pathDeep: { type: Number, default: 1 }
    },
    watch: {
        value (val) {
            this.getShowValue(this.value)
        },
        items (val) {
            this.getShowValue(this.value)
        }
    },
    methods: {
        show () {
            this.showPopup = true
        },
        hide () {
            this.showPopup = false
        },
        cancel () {
            this.hide()
            this.getShowValue(this.value)
        },
        confirm () {
            this.hide()
            this.getShowValue(this.value)
        },
        changeValue (val) {
            this.$emit('input', val)
        },
        getShowValue (val) {
            var items = this.items
            var paths = this.value.split('-').map(Number)
            this.showValue = []
            for (var i = 1; i < paths.length; i++) {
                if (paths[i] === 0) {
                    continue
                }
                var item = items[paths[i]]
                this.showValue.push(item['conf']['name']), items = item['list']
            }
        }
    }
}
</script>

<template>
    <cell is-link :title="title" @click.native="show">
        <span class="vux-cell-value">{{ showValue.join('*') }}</span>
        <div v-transfer-dom>
            <popup
                style="background-color: #fff;"
                v-model="showPopup">
                <popup-header
                    left-text="取消"
                    right-text="确定"
                    @on-click-left="cancel"
                    @on-click-right="confirm"></popup-header>
                <base-radio-tree v-model="value" :items="items" :path-deep="1" @changevalue="changeValue"></base-radio-tree>
            </popup>
        </div>
    </cell>
</template>

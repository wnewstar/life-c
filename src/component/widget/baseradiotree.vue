<script>
import { Group, Radio } from 'vux'

export default {
    components: {
        Group,
        Radio
    },
    name: 'base-radio-tree',
    data () {
        return {
            paths: [],
            options: [],
            selfValue: null,
            nodeStatus: null,
            pathDeepNext: this.pathDeep + 1
        }
    },
    created () {
        this.update()
    },
    props: {
        value: String,
        items: Object,
        pathDeep: { type: Number, default: 1 }
    },
    watch: {
        value (val) {
            this.update()
        },
        items (val) {
            this.update()
        }
    },
    methods: {
        update () {
            this.getPaths()
            this.getOptions()
            this.selfValue = this.paths[this.pathDeep]
            this.nodeStatus = !(this.paths.length - 1 > this.pathDeep)
        },
        getPaths () {
            this.paths = this.value.split('-').map(Number)
        },
        getOptions () {
            var _this = this
            var items = this.items
            for (var i = 1; i < this.pathDeep; i++) {
                items = items[this.paths[i]]['list']
            }
            this.options = []
            Object.keys(items).forEach((key) => {
                if (_this.paths.length > _this.pathDeep + 1 &&
                    items[key].conf.id !== _this.paths[_this.pathDeep]) {
                    return
                }
                _this.options.push(
                    { key: items[key].conf.id, value: items[key].conf.name }
                )
            })
        },
        changeValue (val) {
            this.$emit('changevalue', val)
        },
        changePaths (val) {
            var length = 0
            if (this.nodeStatus) {
                var input = val.target.getElementsByTagName('input')[0]
                var value = parseInt(input.getAttribute('value'))
                length = 0
                if (this.selfValue === value) {
                    length = 1
                } else {
                    this.paths[this.pathDeep] = this.selfValue = value
                }
            }
            length = this.pathDeep + 1 + length
            this.paths.length >= length ? 0 : (this.paths[length - 1] = 0)
            this.changeValue(this.paths.slice(0, length).map(String).join('-'))
        }
    }
}
</script>

<style scoped>
    .node {
        border-bottom: 1px solid #09BB07;
    }
</style>

<template>
    <div v-if="options.length > 0">
        <template v-if="!nodeStatus">
            <base-radio-tree
                style="margin-left: 2em;"
                v-model="value"
                :items="items"
                :path-deep="pathDeepNext"
                @changevalue="changeValue"></base-radio-tree>
            <radio class="node" v-model="selfValue" :options="options" @click.native.prevent="changePaths"></radio>
        </template>
        <template v-else>
            <radio class="node" v-model="selfValue" :options="options" @click.native.prevent="changePaths"></radio>
        </template>
    </div>
</template>

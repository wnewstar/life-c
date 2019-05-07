<script>
import { Grid, GridItem } from 'vux'

export default {
    components: {
        Grid,
        GridItem
    },
    data () {
        return {
            name: this.local.uname,
            grids: {
                bill: { label: '账本', link: '/bill', icon: 'fa fa-fw fa-rmb', style: { color: 'red' } },
                note: { label: '想法', link: '/note', icon: 'fa fa-fw fa-edit', style: { color: 'blue' } },
                plan: { label: '计划', link: '/plan', icon: 'fa fa-fw fa-gear', style: { color: 'white' } },
                rest: { label: '休息', link: '/rest', icon: 'fa fa-fw fa-gear', style: { color: 'white' } },
                work: { label: '工作', link: '/work', icon: 'fa fa-fw fa-gear', style: { color: 'white' } },
                read: { label: '读书', link: '/read', icon: 'fa fa-fw fa-gear', style: { color: 'white' } },
                memo: { label: '备忘', link: '/memo', icon: 'fa fa-fw fa-gear', style: { color: 'white' } },
                oper: { label: '操作', link: '/oper', icon: 'fa fa-fw fa-gear', style: { color: 'white' } },
                conf: { label: '账单', link: '/conf', icon: 'fa fa-fw fa-gear', style: { color: 'green' } }
            }
        }
    }
}
</script>

<template>
    <div>
        <div class="user-image">
            <img src="../../static/logo.jpg">
            <br>
            <span>{{ name }}</span>
        </div>

        <grid :cols="3" style="background: #FFF;">
            <grid-item v-for="(item, key) in grids" :key="key" :link="item.link" :label="item.label"><i slot="icon" :class="item.icon" :style="item.style"></i></grid-item>
        </grid>
    </div>
</template>

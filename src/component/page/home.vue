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
                bill: { label: '账单', link: '/bill', icon: 'fa fa-fw fa-star', style: { color: 'red' } },
                note: { label: '笔记', link: '/note', icon: 'fa fa-fw fa-edit', style: { color: 'blue' } },
                plan: { label: '计划', link: '/plan', icon: 'fa fa-fw fa-list', style: { color: 'black' } },
                work: { label: '工作', link: '/work', icon: 'fa fa-fw fa-code', style: { color: 'black' } },
                rest: { label: '休息', link: '/rest', icon: 'fa fa-fw fa-film', style: { color: 'black' } },
                read: { label: '读书', link: '/read', icon: 'fa fa-fw fa-book', style: { color: 'black' } },
                memo: { label: '备忘', link: '/memo', icon: 'fa fa-fw fa-bell', style: { color: 'black' } },
                oper: { label: '操作', link: '/oper', icon: 'fa fa-fw fa-info', style: { color: 'black' } },
                conf: { label: '配置', link: '/conf', icon: 'fa fa-fw fa-gear', style: { color: 'green' } }
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

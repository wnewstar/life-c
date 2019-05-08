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
            grids: [
                { label: '账单', link: '/bill', icon: 'fa fa-fw fa-star', style: { 'font-size': '18px', 'color': '#DC143C' } },
                { label: '笔记', link: '/note', icon: 'fa fa-fw fa-edit', style: { 'font-size': '18px', 'color': '#4B0082' } },
                { label: '计划', link: '/plan', icon: 'fa fa-fw fa-list', style: { 'font-size': '18px', 'color': '#FFA500' } },
                { label: '工作', link: '/work', icon: 'fa fa-fw fa-code', style: { 'font-size': '18px', 'color': '#DA70D6' } },
                { label: '休息', link: '/rest', icon: 'fa fa-fw fa-play', style: { 'font-size': '18px', 'color': '#FF1493' } },
                { label: '读书', link: '/read', icon: 'fa fa-fw fa-book', style: { 'font-size': '18px', 'color': '#006400' } },
                { label: '备忘', link: '/memo', icon: 'fa fa-fw fa-bell', style: { 'font-size': '18px', 'color': '#556B2F' } },
                { label: '操作', link: '/oper', icon: 'fa fa-fw fa-info', style: { 'font-size': '18px', 'color': '#B22222' } },
                { label: '配置', link: '/conf', icon: 'fa fa-fw fa-gear', style: { 'font-size': '18px', 'color': '#6495ED' } }
            ]
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
            <grid-item v-for="(item, key) in grids" :key="key" :link="item.link">
                <span slot="icon"><i :class="item.icon" :style="item.style"></i></span><span slot="label">{{ item.label }}</span>
            </grid-item>
        </grid>
    </div>
</template>

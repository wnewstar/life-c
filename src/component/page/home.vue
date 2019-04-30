<script>
import { Group, CellBox } from 'vux'

export default {
    components: { Group, CellBox },
    data () {
        return {
            name: localStorage.uname,
            iconm: {
                bill: 'fa fa-fw fa-rmb',
                note: 'fa fa-fw fa-edit',
                conf: 'fa fa-fw fa-gears'
            }
        }
    }
}
</script>

<style scoped>
.logo {
    width: 100px;
    height: 100px;
    margin: 10px;
    border-radius: 50px;
}
</style>

<template>
    <div>
        <div style="text-align: center;">
            <img src="../../static/logo.jpg" class="logo">
            <br>
            <span>{{ name }}</span>
        </div>
        <group><cell-box link="/bill"><i :class="iconm.bill"></i>&nbsp;收支管理</cell-box></group>
        <group><cell-box link="/note"><i :class="iconm.note"></i>&nbsp;笔记管理</cell-box></group>
        <group><cell-box link="/conf"><i :class="iconm.conf"></i>&nbsp;配置管理</cell-box></group>
    </div>
</template>

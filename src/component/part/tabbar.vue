<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
    components: { Tabbar, TabbarItem },
    data () {
        return {
            iconm: {
                bill: 'fa fa-fw fa-rmb',
                note: 'fa fa-fw fa-edit',
                home: 'fa fa-fw fa-home'
            }
        }
    }
}
</script>

<style>
* {
    font-size: 14px;
}
.fa {
    font-size: 18px;
}
</style>

<template>
    <div>
        <tabbar v-model="$route.meta.tarbar - 1" style="position: fixed;">
            <tabbar-item link="/home"><span slot="icon"><i :class="iconm.home"></i></span><span slot="label">首页</span></tabbar-item>
            <tabbar-item link="/bill"><span slot="icon"><i :class="iconm.bill"></i></span><span slot="label">收支</span></tabbar-item>
            <tabbar-item link="/note"><span slot="icon"><i :class="iconm.note"></i></span><span slot="label">笔记</span></tabbar-item>
        </tabbar>
    </div>
</template>

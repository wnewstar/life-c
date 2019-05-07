<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
    components: { Tabbar, TabbarItem },
    data () {
        return {
            tabbars: {
                home: { label: '首页', link: '/home', icon: 'fa fa-fw fa-home' },
                bill: { label: '账单', link: '/bill', icon: 'fa fa-fw fa-star' },
                note: { label: '笔记', link: '/note', icon: 'fa fa-fw fa-edit' }
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
            <tabbar-item v-for="(item, key) in tabbars" :key="key" :link="item.link">
                <span slot="icon"><i :class="item.icon"></i></span><span slot="label">{{ item.label }}</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

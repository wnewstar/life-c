<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
    components: { Tabbar, TabbarItem }
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
            <tabbar-item v-for="(item, key) in $confmenu.tabbars" :key="key" :link="item.link">
                <span slot="icon"><i :class="item.icon"></i></span><span slot="label">{{ item.name }}</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

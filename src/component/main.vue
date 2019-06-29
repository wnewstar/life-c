<script>
import XxHeader from '@/component/frame/header'
import XxTabbar from '@/component/frame/tabbar'

export default {
    components: {
        XxHeader,
        XxTabbar
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>

<template>
    <div id="app">
        <xx-header v-if="$route.meta.header"></xx-header>
        <xx-tabbar v-if="$route.meta.tarbar"></xx-tabbar>
        <router-view id="main" :key="$route.fullPath"></router-view>
    </div>
</template>

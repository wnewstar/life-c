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

        <grid>
            <grid-item link="/bill" label="收支管理"><i slot="icon" :class="iconm.bill"></i></grid-item>
            <grid-item link="/note" label="笔记管理"><i slot="icon" :class="iconm.note"></i></grid-item>
            <grid-item link="/conf" label="配置管理"><i slot="icon" :class="iconm.conf"></i></grid-item>
        </grid>
    </div>
</template>

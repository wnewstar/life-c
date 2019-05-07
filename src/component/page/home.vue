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

<template>
    <div>
        <div class="user-image">
            <img src="../../static/logo.jpg">
            <br>
            <span>{{ name }}</span>
        </div>

        <grid style="background: #FFF;">
            <grid-item link="/bill" label="收支管理"><i slot="icon" :class="iconm.bill"></i></grid-item>
            <grid-item link="/note" label="笔记管理"><i slot="icon" :class="iconm.note"></i></grid-item>
            <grid-item link="/conf" label="配置管理"><i slot="icon" :class="iconm.conf"></i></grid-item>
        </grid>
    </div>
</template>

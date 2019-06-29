<script>
import { Group, Grid, GridItem } from 'vux'

export default {
    components: {
        Group,
        Grid,
        GridItem
    }
}
</script>

<template>
    <div>
        <group>
            <div class="user-image">
                <img src="../../static/logo.jpg"><br><span>{{ $localdata.uname }}</span>
            </div>
        </group>
        <br>
        <grid :cols="3" style="background: #FFF;">
            <grid-item v-for="(item, key) in $confmenu.homegrids" :key="key" :link="item.link">
                <span slot="icon"><i :class="item.icon" :style="item.style"></i></span><span slot="label">{{ item.name }}</span>
            </grid-item>
        </grid>
    </div>
</template>

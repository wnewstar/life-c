<script>
import { Group, CellBox } from 'vux'

export default {
    components: {
        Group,
        CellBox
    },
    props: { groups: null }
}
</script>

<template>
    <div>
        <group v-for="(cells, kg) in groups" :key="kg">
            <cell-box v-for="(item, kc) in cells" :key="kc" :link="item.link">
                <i :class="item.icon"></i><span style="margin-left: 10px;">{{ item.name }}</span>
            </cell-box>
        </group>
    </div>
</template>

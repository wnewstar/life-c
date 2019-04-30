<script>
import { Group, CellBox } from 'vux'

export default {
    components: { Group, CellBox },
    data () {
        return {
            iconm: {
                list: 'fa fa-fw fa-list',
                create: 'fa fa-fw fa-plus'
            }
        }
    }
}
</script>

<template>
    <div>
        <group><cell-box link="/conf/list"><i :class="iconm.list"></i>&nbsp;配置列表</cell-box></group>
        <group><cell-box link="/conf/create"><i :class="iconm.create"></i>&nbsp;配置新增</cell-box></group>
    </div>
</template>

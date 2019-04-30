<script>
import { Group, CellBox } from 'vux'

export default {
    components: { Group, CellBox },
    data () {
        return {
            iconm: {
                list: 'fa fa-fw fa-list',
                create: 'fa fa-fw fa-plus',
                statistics: 'fa fa-fw fa-bar-chart'
            }
        }
    }
}
</script>

<template>
    <div>
        <group><cell-box link="/bill/list"><i :class="iconm.list"></i>&nbsp;收支列表</cell-box></group>
        <group><cell-box link="/bill/create"><i :class="iconm.create"></i>&nbsp;收支新增</cell-box></group>
        <group><cell-box link="/bill/statistics"><i :class="iconm.statistics"></i>&nbsp;收支统计</cell-box></group>
    </div>
</template>

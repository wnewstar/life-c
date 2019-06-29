<script>
import BaseHome from '@/component/model/base/home'

export default {
    components: {
        BaseHome
    }
}
</script>

<template>
    <div><base-home :groups="$menuconf.bill"></base-home></div>
</template>

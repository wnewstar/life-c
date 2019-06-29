<script>
import Home from '@/component/model/base/home'

export default {
    components: {
        Home
    }
}
</script>

<template>
    <div><home :groups="$menuconf.conf"></home></div>
</template>

<template>
    <div class="dialog-wrapper" v-if="visible">
        <div class="dialog bg shadow">
            <component v-if="component" :is="component" />
        </div>
        <div class="mask" @click="$emit('close')"/>
    </div>
</template>

<script>
export default {
    name: 'app-dialog',
    props: ['component', 'visible'],
    methods: {
    }
}
</script>

<style lang="less" scoped>
@import url('../assets/less/variables.less');

.dialog-wrapper {
    position: fixed;
    z-index: 10;
    top: @header-h;
    bottom: 0;
    left: 0;
    right: 0;
    .dialog {
        position: absolute;
        z-index: 1;
        top: 40px;
        left: 0;
        width: 100vw;
        min-height: 200px;
    }
    .mask {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #0003;
    }
}

</style>

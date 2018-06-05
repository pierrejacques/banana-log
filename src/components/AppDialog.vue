<template>
    <div id="dialog-wrapper" v-if="visible">
        <dialog id="dialog">
            <component v-if="component" :is="component" />
        </dialog>
        <div id="mask" @click="onClose"/>
    </div>
</template>

<script>
export default {
    name: 'app-dialog',
    props: ['component', 'visible'],
    methods: {
        onClose() {

        }
    }
}
</script>

<style lang="less" scoped>
@import url('../assets/less/variables.less');

#dialog-wrapper {
    position: fixed;
    top: @header-h;
    left: 0;
    width: 100vw;
    height: calc(100vh - @header-h);
    #dialog {

    }
    #mask {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #0003;
    }
}

</style>

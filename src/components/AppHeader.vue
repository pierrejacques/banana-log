<template>
    <header class="header shadow main-bg">
        <h1>{{title || '香蕉日记'}}</h1>
    </header> 
</template>

<script>
export default {
    name: 'app-header',
    props: ['title'],
}
</script>

<style lang="less" scoped>
.header {
    font-size: 20px;
    font-weight: bolder;
}
</style>


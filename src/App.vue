<template>
    <div id="app">
        <app-header id="app-header"/>
        <main class="main">
            <record-list />
        </main>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import RecordList from '@/components/RecordList';

export default {
    name: 'App',
    components: {
        'app-header': AppHeader,
        'record-list': RecordList,
    },
}
</script>

<style>
@import url(./assets/less/index.less);
@import url(./assets/iconfont/iconfont.css);

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
</style>

<style lang="less" scoped>
@header-h: 50px;
#app-header {
    position: fixed;
    height: @header-h;
    line-height: @header-h;
    width: 100vw;
}
.main {
    padding-top: @header-h;
}
</style>

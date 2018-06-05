<template>
    <div id="app">
        <app-header id="app-header" :title="title"/>
        <main class="main">
            <router-view @changeTitle="(t) => { title = t }"/>
        </main>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';

export default {
    name: 'App',
    components: {
        'app-header': AppHeader,
    },
    data() {
        return {
            title: '',
        };
    },
}
</script>

<style lang="less">
@import url(./assets/less/styles.less);
@import url(./assets/iconfont/iconfont.css);
@import url(./assets/less/variables.less);

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

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

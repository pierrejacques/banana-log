<template>
    <div id="app">
        <header>
            <h1>Banana log</h1>
        </header>
        <main>
            <record-list />
        </main>
        <a class="add">
        
        </a>
    </div>
</template>

<script>
import RecordList from './components/RecordList.vue';

export default {
    name: 'App',
    components: {
        'record-list': RecordList,
    },
}
</script>

<style>
body {
    margin: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

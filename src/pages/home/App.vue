<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
    export default {
        name: "app",
        components: {},

        mounted() {
            // console.log('process.env', process.env)
        }
    };
</script>
<style lang="less">
    @import './assets/less/common.less';

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
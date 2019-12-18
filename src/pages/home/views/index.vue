<template>
    <div class="index">
        <com-header></com-header>
        <router-link to="/about">go about</router-link>
        <com-footer></com-footer>
    </div>
</template>

<script>
    import ComFooter from '../components/Footer'
    import ComHeader from '../components/Header'

    export default {
        name: 'index',
        components: {
            ComFooter,
            ComHeader
        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="less">
    .index {
        color: red
    }
</style>
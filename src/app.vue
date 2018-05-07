<template>
    <div id="app">
        <div id="cover">
            <Header></Header>
            <todo></todo>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import Header from "./todo/header.vue"
    import Footer from "./todo/footer.jsx"
    import todo from "./todo/todo.vue"
    export default {
        components: {
            Header,
            Footer,
            todo,
        }
    }
</script>

<style lang="stylus" scoped>
    #app{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
    #cover{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background #999
        opacity .6
        z-index 1
    }
</style>


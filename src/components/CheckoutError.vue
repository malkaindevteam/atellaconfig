<template>
    <div>
        <div class="mb-40">
           
        
            <button    class="button-primary br-32 btn-md scale-in" >Try again</button>
        </div>
      
      
    </div>

    
</template>
<script>
export default {
    name: 'CheckoutError',
    
    
    methods: {
        setPage() {
            const data = { page: 4, title: 'Payment faild', sub_title: 'Click on try again' }
            this.$store.commit('setConfigTab', data)
        },
       
    },
    mounted() {
        this.setPage()
    }
}
</script>

<style lang="scss" scoped>

</style>
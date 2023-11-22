<template>
    <div>
    
       
        <PaymentForm />
    

    </div>


    
    
</template>
<script>

import PaymentForm from '../components/PaymentForm.vue';

export default {
    name: 'CheckoutSuccess',
    components:{
    
     PaymentForm,
    },
    data(){
    this.publishableKey ='pk_test_51NSSJwCuOvqvm7g1PNnpxkG5K7TuEmcLI651LAVJ7544MglXSxRgpCD3EDHEFNmRkwOKKB3h0DQKexxHNr2DdS5u00F4wk0s7x'
    return{
        loading:false,
        lineItems:[{
            price:'price_1NtwoFCuOvqvm7g1Kv5UqrGv',
            quantity:1   
        }],
        successUrl:'https://configure.atella.ca/#/book-appointment',
        cancelUrl:'https://configure.atella.ca/#/checkouterror'
    }
    },
    methods: {
        setPage() {
            const data = { page: 4, title: 'Make your payment', sub_title: 'Click on Pay now' }
            this.$store.commit('setConfigTab', data)
        },
        submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
    
    },
    mounted() {
        this.setPage()
    
        
    }
}
</script>

<style  scoped>

</style>
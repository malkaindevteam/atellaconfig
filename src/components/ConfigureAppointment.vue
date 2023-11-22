<template>
    <div class="calendly-inline-widget" data-url="https://calendly.com/liveatella/30min" style="min-width:90%;height:1000px;"></div>
</template>
<script>

export default {
    name: 'ConfigureAppointment',
    methods: {
        setPage() {
            const data = { page: 4, title: 'Book an appointment', sub_title: 'Congratulations, your payment was successful.' }
            this.$store.commit('setConfigTab', data)
        }
    },
    mounted() {
        this.setPage()
        // Load the Calendly widget script.
        const script = document.createElement('script');
        script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
        document.head.appendChild(script);
    }
}
</script>

<style lang="scss" scoped>

</style>
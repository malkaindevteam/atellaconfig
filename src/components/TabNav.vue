<template>
    <section class="">
  
    <div class="container d-flex justify-content-between   mb-4">
           
            <div class=" col-12" >
              <ul v-if="hide_tab" class="flx gap-8 mag">
                <li v-for="tab in tabs"  :key="tab" class="br-32 ">
                 <a class="br-32" :class="{ active: (tab) ===  selected}" @click="setTab(tab)">
                  {{ tab }}
                 </a>
                </li>
                
              </ul>

              <slot></slot>
            </div>

          </div>
      </section>
</template>

<script>

    export default {
        props:{
          tabs:{
            type: Array,
            required: true,
          },
          selected:{
            type:String,
            required: true,
            
          },
          hide_tab:{
            type:Boolean,
            default:true

          }
        },
        methods:{
          setTab(tab){
            this.$emit('selected',tab);
          }
        },
    }
</script>

<style lang="scss" scoped >
ul {
  flex-wrap: wrap;
}
li {
  a {
      color: #8F8F8F;
      padding: 8px 16px;
      border: 1px solid #8F8F8F;
      height: 40px;
      display: inline-block;
      cursor: pointer;
  }
  .active {
      border: 1px solid #8F8F8F;
      background: #D2B486;
      color: white;
  }
}
.flx {
  display: flex;
}

.mag{
  margin-bottom: 20px;
}
.gray {
  color: var(--gray);
}
</style>
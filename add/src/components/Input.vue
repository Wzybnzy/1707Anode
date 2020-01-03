<template>
  <div>
      <input type="text" :placeholder="placeh" :value="value" @input="changeInput">
  </div>
</template>

<script>
export default {
    props:{
        placeh:String,
        value:String
    },
    methods:{
        changeInput(e){
            this.$emit('input',e.target.value);
        }
    }
}
</script>

<style>

</style>
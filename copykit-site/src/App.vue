<template>
  
  <router-view />
  
</template>
<script>
import { defineComponent } from 'vue';
import { configCloud } from "src/services/cloud";
export default defineComponent({
  name: 'App',
  mounted() {
    configCloud();
  },
})
</script>

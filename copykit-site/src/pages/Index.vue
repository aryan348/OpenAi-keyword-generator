<template>

  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
      v-if="inputScreen"
    >
      <q-input
        filled
        v-model="word"
        placeholder="Enter Keyword *"
        hint="Example Coffee"
        counter maxlength="32"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div>
        <q-btn label="Submit" type="submit" glossy color="primary"/>
      </div>
    </q-form>

    <q-item v-if="resultScreen">
        <q-item-section>
          <q-item-label caption>{{snippet}}</q-item-label>
          <q-list v-for="keyword in keywords" :key="keyword">
              <q-item-section>
                {{keyword}}
              </q-item-section>
          </q-list>
          <q-btn label="Back" type="submit" glossy color="primary" @click="nav"/>
        </q-item-section>
    </q-item>
    <!-- <q-btn label="login" href="https://myaiwriter.auth.us-east-1.amazoncognito.com/login?client_id=46rmlk5703afedoct5gg70hom3&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:8080/callback" glossy color="primary"/> -->
  </div>
  
</template>

<script>
import { defineComponent } from 'vue';
import { api } from 'boot/axios';


export default defineComponent({
  name: 'PageIndex',
  data(){
    return{
        word: '',
        // loading:false,
        snippet: null,
        keywords: [
        ],
        inputScreen: true,
        resultScreen: false,
    }
  },
  methods:{
     onSubmit() {
       this.inputScreen = false
       let mykey = this.word
        api.get('/generate_snippet_and_keyword',{
          params:{
            prompt : mykey
          }
        })
          .then((response) => {
            const apiResponse = response.data
            console.log(apiResponse)
            this.snippet = apiResponse['snippet']
            this.keywords = apiResponse['keywords']
            conosle.log(f`keywords are ${this.keywords}`)    
      })
      this.resultScreen = true
    },
    nav(){
      this.resultScreen = false
      this.inputScreen = true
    }
  },
})
</script>

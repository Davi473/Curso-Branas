<script setup lang="ts">
  import { inject, ref } from "vue";
import type AccountGateway from "./AccountGateway";
import SignupForm from "./SignupForm";

  const form = ref(new SignupForm());
  const accountGateway = inject("accountGateway") as AccountGateway;

  form.value.register("signup", async (input: any) => {
    const output = await accountGateway.save(input);
    if (output.accountId) {
      form.value.accountId = output.accountId;
      form.value.message = "success";
    } else {
      form.value.message = output.message;
    }
  })
  
</script>

<template>
  <div>
    <span>Step</span>
    <span class="span-step">{{ form.step }}</span>
  </div>
  <div>
    <span>Progress</span>
    <span class="span-progress">{{ form.getProgress() }}%</span>
  </div>
  <div>
    <div v-if="form.step === 1">
      <div>
        <input class="input-name" type="text" v-model="form.name" placeholder="Name" />
      </div>
      <div>
        <input class="input-email" type="text" v-model="form.email" placeholder="Email" />
      </div>
      <div>
        <input class="input-document" type="text" v-model="form.document" placeholder="Document" />
      </div>
    </div>
    <div v-if="form.step === 2">
      <div>
        <input class="input-password" type="text" v-model="form.password" placeholder="Password" />
      </div>
      <div>
        <input class="input-confirm-password" type="text" v-model="form.confirmPassword" placeholder="Confirm Password" />
      </div>
    </div>
    <button v-if="form.step === 2" class="button-signup" @click="form.signup()">Signup</button>
    <button v-if="form.step === 2" class="button-previous" @click="form.previous()">Previous</button>
    <button v-if="form.step === 1" class="button-next" @click="form.next()">Next</button>
    <button class="button-signup" @click="form.populate()">Populate</button>
    <span class="span-account-id">{{ form.accountId }}</span>
    <span class="span-message">{{ form.message }}</span>
  </div>
</template>

<style scoped>
</style>

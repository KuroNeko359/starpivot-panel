<script setup lang="ts">

import NavBar from "@/components/navigation/NavBar.vue";
import Card from "@/components/common/Card.vue";
</script>

<template>
  <div class="w-full h-full bg-base-200">
    <div class="grid grid-cols-3">
      <div class="col-span-3 h-20">
      </div>
      <div class="col-span-1">
      </div>
      <div class="col-span-1">
        <card title="Register">
          <label class="label">Email</label>
          <input type="email" class="input w-full" placeholder="Email"/>

          <label class="label">Password</label>
          <input type="password" class="input w-full" placeholder="Password"/>

          <label class="label">Confirm Password</label>
          <input type="password" class="input w-full" placeholder="Confirm Password"/>

          <button class="btn btn-primary mt-4">Register</button>
          <router-link to="login" class="label">I'm already have an account.</router-link>
        </card>
      </div>
      <div class="col-span-1">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
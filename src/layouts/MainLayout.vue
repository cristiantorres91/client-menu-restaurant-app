<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="las la-bars"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Menú Restaurante</q-toolbar-title>

        <q-btn
          flat
          icon="las la-shopping-cart"
          to="/shoppingCart"
          :label="shoppingStore.orderedQuantity"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          /*border-right: 1px solid rgb(255, 255, 255);*/
        "
      >
        <q-list padding>
          <q-item-label header> Menú Restaurante</q-item-label>

          <EssentialLink
            v-for="link in linksList"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
      <!-- <q-img
        class="absolute-top"
        src="https://www.periodicoequilibrium.com/wp-content/uploads/2019/10/0406.jpg"
        style="height: 150px"
      >
      </q-img> -->
      <q-img
        alt="logo menu app"
        class="absolute-top q-mt-md"
        src="~assets/logo.svg"
        style="height: 140px"
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import EssentialLink from "components/EssentialLink.vue";
import { linksList } from "../router/link-list";

import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useShoppingStore } from "src/stores/shoppingCart";

const leftDrawerOpen = ref(false);

const $q = useQuasar();
const router = useRouter();
const shoppingStore = useShoppingStore();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style lang="scss">
// .q-drawer__content {
//   //  background: #ffffff !important;
// }
</style>

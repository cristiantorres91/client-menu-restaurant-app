<template>
  <q-card class="my-card">
    <q-img v-if="products.picture" :src="products.picture" :ratio="16 / 9" />
    <q-img
      v-else
      src="https://plantillasdememes.com/img/plantillas/imagen-no-disponible01601774755.jpg"
      :ratio="16 / 9"
    />

    <q-card-section>
      <q-btn
        v-if="products.available"
        fab
        color="primary"
        icon="las la-cart-plus"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
        @click="detailProduct(products)"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">{{ products.name }}</div>
        <div
          class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
        >
          ${{ products.price ? products.price.toFixed(2) : 0.0 }}
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">
        ${{ products.price ? products.price.toFixed(2) : 0.0 }}
      </div>
      <div class="text-subtitle1 text-grey">
        {{ products.description }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="around">
      <q-btn
        v-if="products.available"
        color="info"
        flat
        round
        icon="las la-cart-plus"
        @click="detailProduct(products)"
      />
      <div
        :class="[
          'text-h6',
          products.available ? 'text-primary' : 'text-danger',
        ]"
      >
        {{ products.available ? "Disponible" : "Agotado" }}
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  products: {
    type: [],
    required: true,
  },
});

const emit = defineEmits(["detailProduct"]);

const detailProduct = (product) => {
  emit("detailProduct", product);
};
</script>

<style lang="scss" scoped>
.my-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px;
}
</style>

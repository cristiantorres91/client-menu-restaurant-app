<template>
  <q-page class="q-pa-md">
    <q-spinner
      v-if="isLoading"
      size="1px"
      class="flex flex-center text-center"
    />
    <div v-else>
      <div v-if="config.isWorkDay">
        <div>
          <q-card class="no-border no-shadow bg-transparent">
            <q-card-section class="q-pa-sm">
              <q-input
                rounded
                v-model="filterText"
                outlined
                placeholder="Buscar"
              >
                <template v-slot:append>
                  <q-icon v-if="filterText === ''" name="las la-search" />
                  <q-icon
                    v-else
                    name="las la-trash"
                    class="cursor-pointer"
                    @click="filterText = ''"
                  />
                </template>
              </q-input>
            </q-card-section>
          </q-card>
        </div>

        <div class="row q-col-gutter-md">
          <div
            class="col-md-4 col-lg-4 col-sm-12 col-xs-12"
            v-for="(item, item_index) in filterProducts"
            :key="item_index"
          >
            <CardProduct
              :products="item"
              @detailProduct="detailProduct"
            ></CardProduct>
          </div>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn
            fab
            icon="las la-sync-alt"
            color="secondary"
            @click="getAllProducts()"
          />
        </q-page-sticky>

        <!-- modal order -->
        <q-dialog v-model="modalAdd">
          <q-card style="width: 700px; max-width: 80vw">
            <q-toolbar>
              <q-avatar>
                <q-icon name="las la-utensils" />
              </q-avatar>

              <q-toolbar-title
                ><span class="text-weight-bold">Pedir Plato</span>
              </q-toolbar-title>

              <q-btn flat round dense icon="las la-times" @click="closeModal" />
            </q-toolbar>

            <q-separator />

            <q-form @submit="onSubmit" class="q-gutter-sm">
              <q-card-section>
                <div class="col-12">
                  <q-input
                    readonly
                    v-model="name"
                    label="Plato *"
                    lazy-rules
                    no-error-icon
                    :rules="[(val) => (val && val.length > 0) || 'Requerido']"
                  />
                </div>

                <div class="col-12">
                  <q-input
                    readonly
                    v-model="price"
                    prefix="$"
                    label="Precio *"
                    mask="#.##"
                    fill-mask="0"
                    reverse-fill-mask
                  />
                </div>
                <div class="col-12">
                  <q-input
                    color="secondary"
                    autofocus
                    label="Número de Platos *"
                    v-model.number="orderedQuantity"
                    min="1"
                    type="number"
                    lazy-rules
                    no-error-icon
                    :rules="[(val) => !!val || 'Requerido']"
                  />
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn
                  flat
                  icon="las la-times"
                  color="accent"
                  @click="closeModal"
                />
                <q-btn flat icon="las la-save" color="positive" type="submit" />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <!-- end modal order-->
      </div>
      <div
        v-else
        class="flex flex-center text-center bg-secondary q-pa-md"
        style="opacity: 0.6"
      >
        <h4>
          En este momento no estamos atendiendo, gracias por tu comprensión
        </h4>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import CardProduct from "components/CardProduct.vue";
import { getProducts } from "src/services/productsServices";
import { getConfig } from "src/services/configServices";

import { useQuasar } from "quasar";
import { useShoppingStore } from "src/stores/shoppingCart";

const filterText = ref("");
const data = ref([]);
const config = ref([]);
const modalAdd = ref(false);
const name = ref("");
const orderedQuantity = ref("");
const price = ref(0);
const productId = ref("");
const isLoading = ref(true);

const $q = useQuasar();

const shoppingStore = useShoppingStore();

const getAllProducts = async () => {
  try {
    $q.loading.show();
    data.value = [];
    const response = await getProducts();
    //convert array data firebase
    for (let id of Object.keys(response)) {
      data.value.push({ id, ...response[id] });
    }

    $q.loading.hide();
  } catch (error) {
    console.log(error);
    $q.loading.hide();
  }
};

const getConfigs = async () => {
  try {
    $q.loading.show();
    config.value = await getConfig();
  } catch (error) {
    console.log(error);
    $q.notify({
      type: "negative",
      position: "top-right",
      message: "Error Interno, Intente mas Tarde",
      actions: [{ icon: "las la-times-circle", color: "white" }],
    });
  } finally {
    $q.loading.hide();
    isLoading.value = false;
  }
};

onMounted(async () => {
  await getAllProducts();
  await getConfigs();
});

const detailProduct = async (product) => {
  productId.value = product.id;
  name.value = product.name;
  price.value = product.price.toFixed(2);
  modalAdd.value = true;
};

const closeModal = () => {
  name.value = "";
  price.value = "";
  orderedQuantity.value = "";
  productId.value = "";
  modalAdd.value = false;
};

const filterProducts = computed(() => {
  let filter = filterText.value;
  if (!filter.length) return data.value;
  return data.value.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );
});

const onSubmit = async () => {
  shoppingStore.addItemCart({
    id: productId.value,
    name: name.value,
    price: price.value,
    quantity: orderedQuantity.value,
  });

  $q.notify({
    type: "positive",
    position: "top-right",
    icon: "las la-check-circle",

    message: "Plato agregado",
    actions: [{ icon: "las la-times-circle", color: "white" }],
  });

  closeModal();
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
}
</style>

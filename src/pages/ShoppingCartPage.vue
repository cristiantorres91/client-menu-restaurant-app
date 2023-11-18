<template>
  <q-page class="q-pa-md">
    <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
      <q-table
        :dense="$q.screen.lt.md"
        title="Pedido"
        :rows="dataOrder"
        :columns="columns"
        row-key="id"
        rows-per-page-label="Ver"
        loading-label="Cargando.."
        :visible-columns="['actions', 'quantity', 'name', 'price']"
        separator="cell"
        no-data-label="No tiene productos en el carrito"
        bordered
        flat
        square
        hide-pagination
      >
        <!-- Dialogo para editar Registros -->
        <template v-slot:top>
          <div class="row q-col-gutter-md">
            <q-dialog v-model="show_dialog">
              <div>
                <q-form ref="formOrder" autocomplete="off">
                  <q-card>
                    <q-card-section>
                      <div class="text-h6 text-center">Editar</div>
                    </q-card-section>
                    <q-card-section>
                      <div class="row">
                        <div class="col-12">
                          <q-item>
                            <q-input
                              readonly
                              v-model="editedItem.name"
                              label="Plato"
                              lazy-rules
                              :rules="[
                                (val) => (val && val.length > 0) || 'Requerido',
                              ]"
                            ></q-input>
                          </q-item>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <q-item>
                            <q-input
                              readonly
                              v-model="editedItem.price"
                              label="Precio"
                              lazy-rules
                              :rules="[
                                (val) => (val && val.length > 0) || 'Requerido',
                              ]"
                            ></q-input>
                          </q-item>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <q-item>
                            <q-input
                              autofocus
                              v-model="editedItem.quantity"
                              color="secondary"
                              label="Cantidad"
                              lazy-rules
                              :rules="[
                                (val) =>
                                  /^\d+$/.test(val) || 'Cantidad requerida',
                              ]"
                            ></q-input>
                          </q-item>
                        </div>
                      </div>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn
                        flat
                        icon="las la-times"
                        color="accent"
                        @click="closeModalEdit()"
                      />
                      <q-btn
                        flat
                        icon="las la-save"
                        color="positive"
                        @click="saveItemEdit()"
                      ></q-btn>
                    </q-card-actions>
                  </q-card>
                </q-form>
              </div>
            </q-dialog>
          </div>
        </template>
        <!-- Dialogo para agregar y editar Registros -->

        <!-- Renderiza data en tabla -->
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="actions" :props="props">
              <q-btn
                icon="las la-edit"
                size="sm"
                flat
                dense
                color="info"
                @click="editItem(props.row)"
              />
              <q-btn
                icon="las la-trash"
                size="sm"
                class="q-ml-sm"
                flat
                dense
                color="secondary"
                @click="deleteItem(props.row)"
              />
            </q-td>
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="quantity" :props="props">
              {{ props.row.quantity }}
            </q-td>
            <q-td key="name" :props="props">
              <div class="text-pre-wrap">{{ props.row.name }}</div>
            </q-td>
            <q-td key="price" :props="props">
              <div class="text-pre-wrap">{{ props.row.price }}</div>
            </q-td>
          </q-tr>
        </template>
        <!-- Renderiza data en tabla -->

        <!-- Pie de tabla total -->
        <template v-slot:bottom-row>
          <q-tr>
            <q-td class="text-right" colspan="100%">
              <q-badge class="text-h6" outline color="info">
                Total ${{ total }}
              </q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <!-- Pie de tabla total -->
      <!-- Formulario de pedido -->
      <q-form @submit="onSubmit" class="row q-col-gutter-md q-pt-md">
        <div class="col-12 col-sm-6">
          <q-input
            color="secondary"
            rounded
            outlined
            v-model="name"
            label="Nombre"
            hint="Ingrese su nombre"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Requerido']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            color="secondary"
            rounded
            outlined
            v-model="phone"
            label="Telefono"
            hint="Ingrese su # telefono"
            mask="####-####"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Requerido']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            color="secondary"
            rounded
            outlined
            v-model="email"
            label="Correo electrónico"
            hint="Ingrese su correo electrónico"
            lazy-rules
            :rules="[(val) => !!val || 'Requerido', isValidEmail]"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            color="secondary"
            rounded
            outlined
            type="textarea"
            v-model="comments"
            label="Comentarios adicionales"
            hint="Aquí puede indicar instrucciones adicionales de su pedido"
          />
        </div>
        <div class="col-12 col-sm-12 text-center">
          <!-- Agrega la clase text-center aquí -->
          <q-btn
            icon="las la-paper-plane"
            label="Hacer Pedido"
            stack
            glossy
            color="secondary"
            type="submit"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { nextTick } from "vue";
import { ref, computed, onMounted, watchEffect } from "vue";
import { addOrder } from "src/services/ordersServices";
import { useQuasar, date } from "quasar";
import { useRouter } from "vue-router";
import { useShoppingStore } from "stores/shoppingCart";
import emailjs from "@emailjs/browser";

const total = ref("");
const name = ref("");
const phone = ref("");
const email = ref("");
const comments = ref("");
const dataOrder = ref([]);
const formOrder = ref(null);
const show_dialog = ref(false);
const editedItem = ref({
  id: null,
  quantity: null,
  name: null,
  price: null,
});

const shoppingStore = useShoppingStore();
const $q = useQuasar();
const router = useRouter();

const columns = [
  {
    name: "id",
    align: "center",
    label: "Id",
    field: "id",
  },
  {
    name: "actions",
    label: "Acciones",
    field: "actions",
    align: "center",
  },
  {
    name: "quantity",
    align: "center",
    label: "Cantidad",
    field: "quantity",
  },

  {
    name: "name",
    align: "center",
    label: "Plato",
    field: "name",
  },
  {
    name: "price",
    align: "center",
    label: "Precio",
    field: "price",
  },
];

onMounted(async () => {
  dataOrder.value = shoppingStore.shoppingCart;
});

watchEffect(() => {
  const totalPrice = shoppingStore.shoppingCart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  total.value = totalPrice.toFixed(2);
});
const isValidEmail = (val) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || "Correo electrónico invalido";
};

const editItem = (item) => {
  editedItem.value = Object.assign({}, item);
  show_dialog.value = true;
};

const closeModalEdit = () => {
  show_dialog.value = false;
  nextTick(() => {
    //editedItem.value = { ...defaultItem };
    editedItem.value = Object.assign({}, {});
  });

  formOrder.value.resetValidation();
};

const saveItemEdit = async () => {
  //valido formulario
  var validate = await formOrder.value.validate();
  if (!validate) {
    return;
  }

  // Encuentra el índice del artículo editado en el array dataOrder
  const indexEdit = dataOrder.value.findIndex(
    (item) => item.id === editedItem.value.id
  );

  if (indexEdit !== -1) {
    // Actualiza la cantidad del artículo editado
    dataOrder.value[indexEdit].quantity = parseInt(editedItem.value.quantity);
  }

  closeModalEdit();
};

const deleteItem = async (item) => {
  $q.dialog({
    title: "Confirmar",
    dark: true,
    message: "Seguro que quieres Eliminar El Registro?",
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      shoppingStore.deleteItemCart(item);
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      console.log(">>>> Cancel");
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const onSubmit = async () => {
  try {
    let orderCustomer = dataOrder.value.map((o) => o.quantity + " " + o.name);

    const timeStamp = Date.now();
    const formattedDate = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm:ss");

    let order = {
      delivered: false,
      name: name.value,
      phone: phone.value,
      email: email.value,
      comments: comments.value,
      order: orderCustomer.join(", "),
      total: parseFloat(total.value).toFixed(2),
      status: "p",
      statusDescription: "pending",
      date: formattedDate,
    };

    await addOrder(order);

    $q.notify({
      type: "positive",
      position: "top-right",
      icon: "las la-check-circle",

      message: "Su pedido se realizó con éxito.",
      actions: [{ icon: "las la-times-circle", color: "white" }],
    });
    shoppingStore.$reset();
    router.push({ name: "index" });
  } catch (error) {
    console.log(error);
    $q.notify({
      type: "negative",
      position: "top-right",
      message: "Error Interno, Intente más Tarde",
      actions: [{ icon: "las la-times-circle", color: "white" }],
    });
  } finally {
    $q.loading.hide();
  }
};
</script>
<style lang="scss" scoped></style>

<template>
  <q-item :to="link" exact active-class="my-menu-link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-h6 ellipsis">{{ title }}</q-item-label>
      <q-item-label caption class="text-subtitle1">
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "#",
  },
  icon: {
    type: String,
    default: "",
  },
});

const router = useRouter();
</script>

<style lang="scss">
.my-menu-link {
  color: white;
  background: $secondary;
}
</style>

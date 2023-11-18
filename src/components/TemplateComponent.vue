<template>
  <div></div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["change", "delete"]);
</script>

<style lang="scss" scoped></style>

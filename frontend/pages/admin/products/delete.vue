<template>
  <admin-container>
    <admin-header-buttons
      has-button
      button-title="مشاهده لیست محصولات"
      button-icon="list-check-solid"
      button-path="/admin/products/all"
    ></admin-header-buttons>
    <admin-delete-product></admin-delete-product>
  </admin-container>
</template>

<script>
export default {
  name: "AdminDeleteProductPage",
  layout: "admin",
};
</script>

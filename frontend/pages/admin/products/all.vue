<template>
  <admin-container>
    <admin-header-buttons
      has-button
      button-title="ثبت محصول جدید"
      button-icon="plus-solid"
      button-path="/admin/products/add"
    ></admin-header-buttons>
    <admin-all-products></admin-all-products>
  </admin-container>
</template>

<script>
export default {
  name: "AdminAllProductsPage",
  layout: "admin",
};
</script>

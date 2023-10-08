<template>
  <admin-container>
    <admin-header-buttons
      has-button
      button-title="ثبت کاربر جدید"
      button-icon="plus-solid"
      button-path="/admin/users/add"
    ></admin-header-buttons>
    <admin-all-users></admin-all-users>
  </admin-container>
</template>

<script>
export default {
  name: "AdminAllUsersPage",
  layout: "admin",
};
</script>

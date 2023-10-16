<template>
  <div class="w-full h-44 flex flex-col items-center justify-center gap-2">
    <p>این قابلیت به زودی اضافه خواهد شد</p>
    <p>
      در صورت نیاز با پشتیبانی تماس بگیرید:
      <span class="text-primary font-bold">09021029245</span>
    </p>
    <nuxt-link to="/auth/login">
      <span class="text-sm text-blue-700 underline">بازگشت به صفحه ورود</span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "AuthForgetPasswordPage",
};
</script>

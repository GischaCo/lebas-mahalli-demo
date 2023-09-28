import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, min, max } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "تکمیل این فیلد الزمی است.",
});

extend("mobile_min", {
  ...min,
  message: "شماره موبایل باید شامل 11 رقم باشد.",
});

extend("mobile_max", {
  ...max,
  message: "ارقام شماره موبایل بیشتر از حد مجاز است.",
});

extend("password", {
  ...min,
  message: "رمز عبور باید حداقل 8 کاراکتر باشد.",
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

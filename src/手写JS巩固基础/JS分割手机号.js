// 手机号3-4-4分割
const splitMobilePhone = phoneNum => {
  return phoneNum.replace(/(?=(\d{4})+$)/g, '-');
};

splitMobilePhone('13387645444');

// 千分位格式化数字
const formatPrice = number => {
  return String(number).replace(/\B(?=(\d{3})+$)/g, ',');
};

formatPrice(123123123);

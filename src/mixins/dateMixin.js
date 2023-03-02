export default {
  methods: {
    // 轉換時間
    timeDate(time){
      const localDate = new Date(time * 1000); //換成毫秒
      return localDate.toLocaleDateString();
    },
  },
 
};

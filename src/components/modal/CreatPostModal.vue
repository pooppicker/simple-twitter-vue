<template>
  <div id="modal-overlay" @click="onClose">
    <div id="modal-container">
      <div id="modal">
        <h4>this is a post modal</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onClose: {
      types: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss">
#modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
}
#modal-container {
  position: relative;
  display: grid;
  place-items: start center;
  width: 100%;
  height: 100%;
}
#modal {
  padding: 14px 0;
  background-color: #fff;
  border-radius: 14px;
  min-height: 657px;
  min-width: 600px;
  margin: 2%;
  animation: scale-in 0.1s linear;
}
@keyframes scale-in {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}
@import "/src/assets/scss/efficientSetting.scss";
</style>
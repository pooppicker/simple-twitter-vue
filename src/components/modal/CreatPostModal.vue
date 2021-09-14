<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal">
        <form>
          <slot name="head">
            <div class="create-title-area">
              <div class="go-close" @click="onClose">
                <IconCloseOrange class="icon-close" />
              </div>
              <hr />
            </div>
          </slot>
          <slot name="body">
            <div class="create-tweet-area">
              <div class="img-create-area">
                <img
                  class="create-user-avatar"
                  src="https://source.unsplash.com/1600x1200/?man/?random=38.46792589859454"
                />
              </div>
              <div class="input-create">
                <label class="create-label" for="txtarea-input"></label>
                <textarea
                  name="text"
                  row="5"
                  type="text"
                  class="txtarea-input"
                  maxLength="140"
                  autofocus
                  required
                  placeholder="有什麼新鮮事?"
                />
              </div>
            </div>
          </slot>
          <slot name="footer">
            <div class="create-tweet-btn">
              <button class="click-to-create" type="submit">推文</button>
            </div>
          </slot>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import IconCloseOrange from "./../icons/IconClose.vue";

export default {
  components: {
    IconCloseOrange,
  },
  props: {
    onClose: {
      types: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
}
.modal-container {
  position: relative;
  display: grid;
  place-items: start center;
  width: 100%;
  height: 100%;
}
.modal {
  padding: 14px 0;
  background-color: #fff;
  border-radius: 14px;
  // min-height: 300px;
  min-width: 600px;
  margin: 2%;
  animation: scale-in 0.1s linear;
}
.create-title-area {
  width: 100%;
  // outline: 1px solid black;
  .go-close {
    padding-left: 0.7rem;
    cursor: pointer;
  }
}
.create-tweet-area {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  // outline: 1px solid black;
  padding: 0 1rem;
  .create-user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  .txtarea-input {
    width: 400px;
    height: 150px;
    font-size: 18px;
    resize: none;
    margin-top: .7rem;
    margin-left: .7rem;
    // outline: 1px solid black;
  }
}
.create-tweet-btn {
  // outline: 1px solid black;
  display: flex;
  justify-content: end;
  .click-to-create {
    width: 66px;
    height: 38px;
    background: #FF6600;
    border-radius: 100px;
    color: #FFFFFF;
    font-size: 18px;
    margin-right: 0.7rem;
  }
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
<template>
  <div id="modal-overlay">
    <div id="modal-container">
      <div id="modal">
        <form class="d-flex flex-column align-items-center">
          <slot name="head">
            <div class="modal-title-area">
              <div class="modal-user-title">
                <div class="go-close" @click="onClose">
                  <IconCloseOrange class="icon-close" />
                </div>
                <h4 class="modal-profile-name">編輯個人資料</h4>
              </div>
              <button type="submit" class="modal-save-btn">儲存</button>
            </div>
          </slot>
          <slot name="body">
            <div class="modal-cover-area">
              <img
                class="modal-cover-photo"
                src="https://source.unsplash.com/1600x900/?nature/?random=79.00129583279121"
                alt="cover"
              />
              <img
                class="modal-user-avatar"
                src="https://source.unsplash.com/1600x1200/?man/?random=38.46792589859454"
                alt="avatar"
              />
            </div>
          </slot>
          <slot name="footer">
            <div class="modal-input-area">
              <div class="input-style mb-2">
                <label class="edit-label" for="name">名稱</label>
                <input class="edit-input" id="name" type="text" autofocus />
              </div>
              <div class="modal-txt limit">8/50</div>
              <div class="modal-input-style mb-2">
                <label class="edit-label" for="name">自我介紹</label>
                <textarea
                  class="edit-input"
                  id="name"
                  type="text"
                  rows="8"
                  cols="60"
                  autofocus
                />
              </div>
              <div class="modal-txt limit">0/160</div>
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
/* .modal {
  width: 600px;
  height: 657px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
button {
  padding: 7px;
  margin-top: 10px;
  background-color: green;
  color: white;
  font-size: 1.1rem;
} */

#modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  animation: background-color-in 0.1s linear;
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
  margin: 5%;
  // animation: scale-in 0.1s linear;
}
.modal-title-area {
  z-index: 3;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 0.7rem .7rem;
  .modal-user-title {
    display: flex;
    .go-close {
      cursor: pointer;
    }
    .modal-profile-name {
      margin-left: 2rem;
      font-size: 19px;
    }
  }
  .modal-save-btn {
    width: 66px;
    height: 28px;
    border-radius: 100px;
    background: #ff6600;
    color: #ffffff;
    font-size: 18px;
  }
}
.modal-cover-area {
  height: 200px;
  width: 100%;
  position: relative;
  cursor: pointer;
  img {
    object-fit: cover;
  }
  .modal-user-avatar {
    position: absolute;
    top: 70%;
    left: 2%;
    width: 140px;
    height: 140px;
    border: 4px solid #ffffff;
    border-radius: 50%;
  }
}
</style>
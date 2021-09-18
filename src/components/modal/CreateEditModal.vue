<template>
  <div id="modal-overlay">
    <div id="modal-container">
      <div id="modal">
        <form
          class="d-flex flex-column align-items-center"
          @submit.stop.prevent="handleSubmit"
        >
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
              <!-- Images area -->
              <label for="cover"
                ><IconUploadPhoto class="upload-cover"
              /></label>
              <img
                v-if="!deleteClick"
                class="modal-cover-photo"
                :src="profile.cover"
                alt="cover"
              />
              <img
                v-else
                class="remove-cover-photo"
                src="https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"
                alt=""
              />
              <input
                id="cover"
                style="display: none"
                type="file"
                name="cover"
                accept="image/*"
                @change="handleCoverChange"
              />
              <div @click="handleCoverDelete">
                <IconCloseWhite class="delete-cover" />
              </div>

              <label for="avatar"
                ><IconUploadPhoto class="upload-avatar"
              /></label>
              <img
                class="modal-user-avatar"
                :src="profile.avatar"
                alt="avatar"
              />
              <input
                id="avatar"
                style="display: none"
                type="file"
                name="avatar"
                accept="image/*"
                @change="handleAvatarChange"
              />
            </div>
          </slot>
          <slot name="footer">
            <div class="modal-input-area">
              <div class="name-input-style mb-2">
                <label class="edit-label" for="name">名稱</label>
                <input
                  v-model="profile.name"
                  class="edit-input"
                  id="name"
                  name="name"
                  type="text"
                  maxlength="50"
                  autofocus
                />
              </div>

              <div class="modal-txt-limit">
                <span v-if="profile.name.length >= 50" class="name-error"
                  >字數不可超過50字</span
                >
                {{ profile.name.length }}/50
              </div>
              <div class="modal-input-style mb-2">
                <label class="edit-label" for="introduction">自我介紹</label>
                <textarea
                  v-model="profile.introduction"
                  class="edit-input"
                  id="introduction"
                  name="introduction"
                  type="text"
                  rows="4"
                  maxlength="160"
                  autofocus
                />
              </div>

              <div class="modal-txt-limit">
                <span v-if="profile.introduction.length >= 160" class="typing-error"
                  >字數不可超過160字</span
                >
                {{ profile.introduction.length }}/160
              </div>
            </div>
          </slot>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import IconCloseOrange from "./../icons/IconClose.vue";
import IconCloseWhite from "./../icons/IconCloseWhite.vue";
import IconUploadPhoto from "./../icons/IconUploadPhoto.vue";
import { mapState } from "vuex";

export default {
  components: {
    IconCloseOrange,
    IconCloseWhite,
    IconUploadPhoto,
  },
  props: {
    onClose: {
      types: Function,
      required: true,
    },
  },
  data() {
    return {
      profile: {
        id: -1,
        cover: "",
        avatar: "",
        name: "",
        introduction: "",
      },
      deleteClick: false,
    };
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    fetchProfile() {
      const { id, cover, avatar, name, introduction } = this.currentUser;
      this.profile = {
        ...this.profile,
        id,
        cover,
        avatar,
        name,
        introduction,
      };
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    },
    handleCoverChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        //user do not select pic
        this.profile.cover = "";
        this.deleteClick = false;
        return;
      } else {
        this.deleteClick = false;
        const imageURL = window.URL.createObjectURL(files[0]);
        this.profile.cover = imageURL;
      }
    },
    handleAvatarChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        //user do not select pic
        this.profile.avatar = "";
        return;
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.profile.avatar = imageURL;
      }
    },
    handleCoverDelete() {
      this.deleteClick = true;
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch: {
    currentUser: {
      handler: function () {
        this.fetchProfile();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: "Noto Sans TC";
}

#modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  .typing-error {
    color: #fc5a5a;
    font-size: 15px;
    margin-right: 68%;
  }
  .name-error {
    color: #fc5a5a;
    font-size: 15px;
    margin-right: 72%;
  }
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
.modal-title-area {
  z-index: 3;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 0.7rem 0.7rem;
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
  img {
    object-fit: cover;
  }
  .upload-cover {
    position: absolute;
    top: 50%;
    left: 42%;
    z-index: 999;
    cursor: pointer;
  }
  .delete-cover {
    position: absolute;
    top: 50%;
    left: 53%;
    z-index: 999;
    cursor: pointer;
  }
  .upload-cover,
  .delete-cover {
    &:hover {
      transform: scale(1.2, 1.2);
    }
  }
  .upload-avatar {
    position: absolute;
    bottom: -5%;
    left: 10%;
    z-index: 999;
    cursor: pointer;
    &:hover {
      transform: scale(1.2, 1.2);
    }
  }
  .modal-cover-photo {
    position: relative;
    filter: opacity(70%);
  }
  .modal-user-avatar {
    position: absolute;
    top: 70%;
    left: 2%;
    width: 120px;
    height: 120px;
    border: 4px solid #ffffff;
    border-radius: 50%;
  }
  .remove-cover-photo {
    filter: opacity(95%);
  }
}
.modal-input-area {
  margin: 5rem 1rem 0;
  display: flex;
  flex-direction: column;
  .edit-label {
    font-size: 13px;
    color: #657786;
    display: block;
  }
  .edit-input {
    font-size: 19px;
    background-color: #f5f8fa;
    width: 570px;
  }
  .name-input-style {
    @extend %input-bottom;
    background-color: #f5f8fa;
    width: 100%;
    height: 55px;
    border-radius: 4px 4px 0px 0px;
  }
  .modal-input-style {
    @extend %input-bottom;
    margin-top: 1rem;
    background-color: #f5f8fa;
    border-radius: 4px 4px 0px 0px;
    width: 100%;
  }
  .modal-txt-limit {
    display: flex;
    justify-content: end;
    font-size: 15px;
    color: #657786;
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
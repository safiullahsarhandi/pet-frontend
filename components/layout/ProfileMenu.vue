<template>
  <ul class="navbar-nav align-items-center actionBtns">
    <li class="nav-item">
      <nuxt-link class="btn" :to="{ name: 'favorites' }"
        ><i class="fa fa-heart"></i
      ></nuxt-link>
    </li>
    <li class="nav-item position-relative">
      <nuxt-link class="btn" :to="{ name: 'notifications' }"
        ><i class="fa fa-bell"></i
      ></nuxt-link>
      <span class="count">3</span>
    </li>
    <li class="nav-item">
      <nuxt-link class="btn" :to="{ name: 'cart' }"
        ><i class="fa fa-shopping-cart"></i
      ></nuxt-link>
    </li>
  </ul>
  <ul class="navbar-nav align-items-center avatar-box">
    <li class="nav-item position-relative">
      <a href="#" class="avatar-image">
        <img
          :src="store.user?.file?.file_url || 'assets/images/profile.png'"
          alt="Avatar"
          class="mw-100"
          draggable="false"
        />
      </a>
      <span class="user-status"></span>
    </li>
    <li class="nav-item">
      <div class="btn-group">
        <button
          class="btn btn-sm dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {{store.user.name}}
        </button>
        <div class="dropdown-menu shadow loginOption">
          <ul class="dropdown-list">
            <li class="nav-item">
              <nuxt-link :to="{ name: 'account' }">
                <img
                  src="/assets/images/profile.png"
                  alt="User Icon"
                  draggable="false"
                  class="mw-100"
                />
                My Profile
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="{ name: 'account-orders-type' }">
                <img
                  src="/assets/images/order.png"
                  alt="Order Icon"
                  draggable="false"
                  class="mw-100"
                />
                My Orders
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="{ name: 'account-ads' }">
                <img
                  src="/assets/images/ads.png"
                  alt="Ad Icon"
                  draggable="false"
                  class="mw-100"
                />
                My Ads
              </nuxt-link>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0)" @click="logoutUser()">
                <img
                  src="/assets/images/logout.png"
                  alt="Logout Icon"
                  draggable="false"
                  class="mw-100"
                />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { logout } from '~~/services/auth';
import { useUserStore } from '~~/stores/user';

const { notification, removeAccessToken } = useHelper();
const store = useUserStore()
const logoutUser = async () => {
  try {
    let { message } = await logout();
    notification(message);
    removeAccessToken();
    setTimeout(() => location.reload(), 1000);
  } catch (error) {
    console.log(error);
    notification(error.message);
  }
};
</script>
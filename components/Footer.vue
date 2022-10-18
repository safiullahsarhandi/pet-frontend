<script lang="ts" setup></script>

<template>
  <footer>
    <div class="container py-4">
      <div class="row">
        <div class="col-md-8 m-auto text-center">
          <div class="footerLogo">
            <a href="#">
              <img
                src="/assets/images/logo.png"
                alt="Logo"
                class="mw-100"
                draggable="false"
              />
            </a>
          </div>
          <div class="footerMenu navbar-light py-4">
            <ul class="d-flex flex-md-row justify-content-around navbar-nav">
              <li class="nav-item active">
                <nuxt-link class="nav-link" :to="{name : 'index'}">Home</nuxt-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Other Links</a>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :to="{name : 'privacy-policy'}">Privacy Policy</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :to="{name : 'terms-and-conditions'}"
                  >Terms & Conditions</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :to="{name : 'contact-us'}">Contact Us</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="socialIcons">
            <div
              class="d-flex align-items-center justify-content-center gap-15"
            >
              <div class="facebook">
                <a href="#">
                  <img
                    src="../assets/images/facebook.png"
                    alt="Facebook"
                    class="mw-100"
                    draggable="false"
                  />
                </a>
              </div>
              <div class="twitter">
                <a href="#">
                  <img
                    src="../assets/images/twitter.png"
                    alt="Twitter"
                    class="mw-100"
                    draggable="false"
                  />
                </a>
              </div>
              <div class="linkedin">
                <a href="#">
                  <img
                    src="../assets/images/linkedin.png"
                    alt="Linkedin"
                    class="mw-100"
                    draggable="false"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- copy right  -->
    <div class="copyRight border-top py-3 text-center">
      <p class="mb-0">
        © 2022, <a href="#" class="text-theme-primary">DALPETADOPT</a> All
        Rights Reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped></style>

<template>
  <section class="mainBanner">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <div class="bannerContent text-center text-white">
            <h1 class="f-70">Find The Best</h1>
            <h1 class="f-70">Companion With Us</h1>
            <p>
              Search adoptable pets from shelters, rescues & private owners.
            </p>
          </div>
          <home-search/>
        </div>
      </div>
      <div class="container pet_categories">
          <!-- dog & cat -->
          <client-only>
            <home-navigation-boxes/>
          </client-only>
      </div>
    </div>
  </section>
</template>
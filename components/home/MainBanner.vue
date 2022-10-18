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
          <div class="filterPet">
            <form action="">
              <div class="d-flex justify-content-between align-items-center">
                <div class="flex-md-shrink-0">
                  <div class="form-group mb-0">
                    <input
                      type="text"
                      placeholder="Enter City, State or ZIP"
                      name="city"
                      class="f-14 form-control border-0 rounded-0"
                    />
                  </div>
                </div>
                <div class="flex-md-shrink-0">
                  <div class="form-group mb-0">
                    <input
                      type="text"
                      placeholder="Search Cat, Dog etc"
                      name="search"
                      class="f-14 form-control border-0 rounded-0"
                    />
                  </div>
                </div>
                <div class="flex-md-shrink-0">
                  <div class="form-group mb-0">
                    <select
                      name="adoptPet"
                      id=""
                      class="f-14 form-control border-0 rounded-0"
                    >
                      <option value="">Adopt a Pet</option>
                    </select>
                  </div>
                </div>
                <div class="flex-md-shrink-0">
                  <div class="form-group mb-0">
                    <button
                      type="button"
                      class="bg-theme-primary border-0 rounded-pill text-white"
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
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
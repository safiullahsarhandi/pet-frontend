<template>
  <div class="cart-detail shadow p-3 h-100">
    <table class="table">
      <thead class="bg-theme-primary text-white">
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr :key="itemIndex" v-for="(item, itemIndex) in cartItems">
          <td>
            <div class="product-info">
              <div
                class="
                  d-flex
                  gap-15
                  flex-wrap flex-md-nowrap
                  align-items-center
                "
              >
                <div class="cart-image">
                  <figure class="mb-0">
                    <nuxt-link
                      :to="{
                        name: 'shops-id-products-productid',
                        params: {
                          id: item?.product?.vendor_id,
                          productid: item?.product_id,
                        },
                      }"
                    >
                      <img
                        :src="item?.product?.file?.file_url"
                        :alt="`${item?.product?.name} image`"
                        draggable="false"
                        class="mw-100"
                      />
                    </nuxt-link>
                  </figure>
                </div>
                <div class="product-title">
                  <p class="mb-0">{{ item?.product?.name }}</p>
                </div>
              </div>
            </div>
          </td>
          <td>${{ item?.product?.price }}</td>
          <td>
            <Incrementor
              @input="updateCart($event, item)"
              v-model="item.qty"
            ></Incrementor>
          </td>
          <td>${{ getProductTotal(item?.product?.price, item?.qty) }}</td>
          <td>
            <button @click="removeItem(itemIndex)" class="btn bg-white border-0 shadow removeProduct">
              <i class="fa fa-times"></i>
            </button>
          </td>
        </tr>
        <no-record class="bg-light" :colspan="4" tag="tr" :data="cartItems"></no-record>
      </tbody>
    </table>
  </div>
</template>
<script setup>
const {cartItems, updateCart,deleteCartItem} = useCart();
const {notification} = useHelper(); 
const {confirmPopup} = usePopup();
const getProductTotal = (price,qty)=> {
    return (parseInt(price) * parseInt(qty));
}
const removeItem = async (itemIndex)=>{
    confirmPopup({
            title : 'Confirmation',
            message : 'Are you sure do you want to remove this item?',
            onConfirm : async ()=> {
                try {
                    const {message} = await deleteCartItem(itemIndex);
                    notification(message);
                } catch (error) {
                    notification(error?.message,'error');
                    
                }
            },

        });
}
</script>
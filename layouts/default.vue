<template>
        <div>
            <client-only>
                <navbar/>
            </client-only>
            <slot></slot>
            <client-only>
                <Footer/>
            </client-only>
        </div>
</template>

<script setup>

</script>

<template>
    <div class="text-center d-flex justify-center" style="width: 100%">
        <img src="../assets/images/manopora_logo.png" class="w-image-wrap--has-ratio" alt="manopora.lt logotipas">
    </div>
    <div v-if="!$waveui.breakpoint.sm && !$waveui.breakpoint.xs">
        <h1 class="white dimmed-background pa3 pb0">heading text</h1>
        <p class="white dimmed-background pa3">Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. A ad adipisci aliquid consequatur delectus distinctio dolor ea et exercitationem impedit
            in, laborum molestias nesciunt nobis odio omnis porro provident rem repellendus rerum tempora voluptates
            voluptatibus.</p>
    </div>
</template>
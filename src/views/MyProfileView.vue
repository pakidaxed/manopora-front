<template>
    <main>
        <h1 class="mb5"><span class="mp-color">@</span>pakidaxed_undersocre23</h1>
        <div class="my-profile-pictures d-flex xs-column sm-column">
            <div class="my-profile-main-picture md6">
                <div class="my-profile-image">
                    <img src="../assets/images/login_face.jpg" alt="" class="w-image-wrap--has-ratio" ratio="22 / 43">

                </div>
            </div>
            <div class="spacer px2"></div>
            <div class="my-profile-info md-ml12 md6">

                <div class="my-profile-info-fields column">
                    <div class="my-profile-info-field bd1 d-flex">
                        <div class="viens">Vardas:</div>
                        <input type="text" value="Tomas">
                    </div>
                    <div class="my-profile-info-field d-flex">
                        <div class="viens">Gimimo metai:</div>
                        <input type="date" value="1988-05-27" />
                    </div>
                    <div class="my-profile-info-field d-flex">
                        <div class="viens">Lytis:</div>
                        <select name="male" id="">
                            <option value="vyras" selected>Vyras</option>
                            <option value="moteris">Moteris</option>
                            <option value="pora">Pora</option>
                            <option value="kita">Kita</option>
                        </select>
                    </div>
                    <div class="my-profile-info-field d-flex">
                        <div class="viens">Ieskau:</div>
                        <select name="male" id="">
                            <option value="vyras" selected>Vyro</option>
                            <option value="moteris">Moters</option>
                            <option value="pora">Poros</option>
                            <option value="kita">Kitko</option>
                        </select>
                    </div>
                    <div class="my-profile-info-field d-flex">
                        <div class="viens">Aprasymas:</div>
                        <textarea></textarea>
                    </div>


                </div>

            </div>
        </div>


        <p>Lorem ipsum sit amet, consectetur adipisicing elit. Animi aperiam dolorem ducimus eligendi enim fugit iste
            laborum minus molestiae, neque omnis quibusdam sint sit. Ab ad aliquam commodi deserunt dignissimos eos
            eveniet excepturi fuga fugit impedit inventore labore libero modi officiis, quo recusandae reiciendis
            repellendus rerum ullam veniam voluptas voluptatem.</p>

    </main>
</template>
<script setup>
</script>
<style scoped>
.my-profile-image {
    border: 1px solid rgb(241, 82, 126);
}

h1 {
    width: 100%;
}

.all-pictures-block {
    width: 110px;
    height: 110px;
    object-fit: cover;
    margin-right: 5px;
}
</style>
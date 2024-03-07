<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>

    <div class="d-flex">
        <h5>In development</h5>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import {AuthUtil} from "@/auth/misc/AuthUtil";
import {AlertMessageShared} from "@/shared/util/AlertMessageShared";
import {AlertMessageAuth} from "@/auth/misc/AlertMessageAuth";

export default {
    name: "NutritionPage",

    setup() {
        useMeta({
            title: "Nutrition",
            htmlAttrs: {
                lang: "en"
            }
        })
    },

    async created() {
        this.$store.commit("setCurrentUrl", "nutrition");
        const token = await AuthUtil.getAndValidateToken(this);

        if (token) {
            this.$store.commit("setLogged", true);
        } else {
            this.$store.commit("setLogged", false);
            this.messageType = AlertMessageShared.SECONDARY;
            this.message = AlertMessageAuth.YOUR_ARE_UNLOGGED;
        }
    }
}
</script>

<template>
    <default-modal v-if="src && title">
        <div slot="header">{{title}}</div>
        <div slot="body" ref="mypdf">
            <vue-element-loading :active="loader" spinner="spinner" color="#CE4169"></vue-element-loading>
            <pdf @loaded="onLoad"
                 v-for="i in numPages"
                 :key="i"
                 :src="src"
                 :page="i"
            ></pdf>
        </div>
        <div slot="footer">
            <button class="btn btn-rounded btn-primary" @click="closePdfView()">Cerrar</button>
            <button class="btn btn-rounded btn-outline-primary" v-if="localurl" @click="shareLocalFile()">Compartir</button>

        </div>
    </default-modal>
</template>

<script>
    import pdf from 'vue-pdf';
    import DefaultModal from '@/components/Modal/DefaultModal';
    import { Share } from '@capacitor/share';
    import panzoom from 'panzoom';

    export default {
        name: 'PDFview',
        components: {
            DefaultModal,
            pdf,
        },
        props: ['url', 'title', 'localuri'],
        data() {
            return {
                src: null,
                numPages: null,
                loader: false,
                localurl: null,
            };
        },
        computed: {},
        methods: {
            closePdfView() {
                if (this.src !== null) {
                    URL.revokeObjectURL(this.src);
                    this.src = null;
                    this.numPages = null;
                }
            },
            setSrc() {
                this.loader = true;
                this.src = pdf.createLoadingTask(this.url);
                this.localurl = this.localuri;
                this.src.promise.then(PDF => {
                    this.numPages = PDF.numPages;
                    this.loader = false;
                });
            },
            onLoad() {
                panzoom(this.$refs.mypdf);
            },
            async shareLocalFile() {

                console.log(this.localuri);

                return Share.share({
                    title: this.title,
                    text: 'Te envío este documento desde la aplicación de siwca - Community',
                    url: `${this.localuri}`,
                    dialogTitle: 'Compartelo con tus contactos',
                });

            },
        },
        watch: {
            url() {
                this.setSrc();
            },
        },
        async mounted() {
            this.loader = true;
            this.src = null;
            if (this.url) {
                await this.setSrc();
            }
            this.loader = false;
        },
    };
</script>

<style lang='scss'>

    @media screen and (min-height:800px){
        .modal-body {
            margin: 20px 0;
            height: 40rem;
            overflow-y: auto;
        }
    }
    @media screen and (min-height:600px) and (max-height:800px){
        .modal-body {
            margin: 20px 0;
            height: 20rem;
            overflow-y: auto;
        }

    }

    @media screen and (max-height:600px){
        .modal-body {
            height: 20rem;
            overflow-y: auto;
        }
        .modal-container{
            width: 100%;
        }
    }

    @media screen and (max-width: 500px){
        .modal-body {
            height: 20rem;
            overflow-y: auto;
        }
    }
</style>

<template>
    <div id="app">
        <main-nav :display="user.token"/>
        <router-view/>

        <site-footer copyright="2020 siwca"/>

    </div>
</template>

<style lang="scss">
    @import 'src/assets/sass/styles.scss';
</style>

<style>
    .emojione {
        font-size: inherit;
        height: 3ex;
        width: 3.1ex;
        min-height: 20px;
        min-width: 20px;
        display: inline-block;
        margin: -.2ex .15em .2ex;
        line-height: normal;
        vertical-align: middle
    }

    img.emojione {
        width: auto
    }
</style>

<script>

    import MainNav from '@/components/MainNav';
    import SiteFooter from '@/components/SiteFooter';
    import SendRequest from '@/components/sendRequest';
    import {Capacitor, Plugins, AppState} from '@capacitor/core';
    import {PushNotifications} from '@capacitor/push-notifications';
    import {Network} from '@capacitor/network';
    import axios from 'axios';

    const {App} = Plugins;

    export default {
        name: 'app',
        data: function () {
            return {
                isSending: false,
                // fcm: new FCM()
            }
        },
        components:
            {
                MainNav,
                SiteFooter,
                SendRequest
            },
        computed:
            {
                newUser() {
                    return this.$store.getters.loading != 'y' &&
                        this.user.token &&
                        !this.services_association.id;
                },
                services_association() {
                    return this.$store.getters.servicesAssociation;
                },
                services_associations() {
                    return this.$store.getters.servicesAssociations;
                },
                isLoading() {
                    return this.$store.getters.loading == 'y';
                },
                user() {
                    return this.$store.getters.user;
                }
            },
        created: async function () {

            try {

                await this.$store.dispatch('runFirstLoad');
                if ((Capacitor.getPlatform() === 'android') || (Capacitor.getPlatform() === 'ios')) {
                    this.$store.dispatch('runFirstLoad');

                } else {
                    if (process.env.NODE_ENV != 'mobile') {
                        this.$fbmessaging.requestPermission()
                            .then(() => {
                                return this.$fbmessaging.getToken();
                            })
                            .then(token => {
                                console.log(token);
                                this.$store.dispatch('subscribeWebPushNotifications', token);
                            })
                            .catch(function (err) {
                            });

                    }
                }

                if (process.env.VUE_APP_MODE === 'native') {
                    this.$store.dispatch('runFirstLoad');
                }
                if ((Capacitor.getPlatform() === 'android') || (Capacitor.getPlatform() === 'ios')) {
                    await this.checkNetworkStatus();
                    Network.addListener('networkStatusChange', status => {
                        if ((`${status.connectionType}` === 'wifi') || (`${status.connectionType}` === 'cellular')) {
                            axios.get('https://siwca.com.ar').then(result => {
                                if (this.$route.name === 'sin-conexion') {
                                    this.setBackButton();
                                    this.$router.push({name: 'servicios'});
                                } else {
                                    return true;
                                }
                            }).catch(error => {
                                if (this.$route.name === 'sin-conexion') {
                                    return true;
                                }
                                this.unSetBackButton();
                                this.$router.push({name: 'sin-conexion'});

                            });
                        } else if (`${status.connectionType}` === 'unknown') {
                            this.unSetBackButton();
                            this.$router.push({name: 'sin-conexion'});
                        } else {
                            this.unSetBackButton();
                            this.$router.push({name: 'sin-conexion'});
                        }

                        console.log('Network status changed', status);
                    });

                }


            } catch (err) {
                console.log(err);
            }

        },
        methods:
            {
                setBackButton() {
                    App.addListener('backButton', ({canGoBack}) => {
                        if (!canGoBack) {
                            App.exitApp();
                        } else {
                            window.history.back();
                        }
                        console.log('BackButton enabled');

                    });
                },
                unSetBackButton() {
                    App.addListener('backButton', ({canGoBack}) => {
                        if (!canGoBack) {
                            window.history.back();
                        } else {
                            App.exitApp();
                        }
                        console.log('BackButton disabled');
                    });
                },
                async checkNetworkStatus() {
                    const status = await Network.getStatus();
                    if (`${status.connectionType}` === 'wifi' || `${status.connectionType}` === 'cellular') {
                        axios.get('https://siwca.com.ar').then(result => {
                            if (this.$route.name === 'sin-conexion') {
                                this.setBackButton();
                                this.$router.push({name: 'servicios'});
                            } else {
                                return true;
                            }
                        }).catch(error => {
                            if (this.$route.name === 'sin-conexion') {
                                return true;
                            }
                            this.unSetBackButton();
                            this.$router.push({name: 'sin-conexion'});
                        });
                    } else if (`${status.connectionType}` === 'unknown') {
                        this.unSetBackButton();
                        this.$router.push({name: 'sin-conexion'});
                    } else {
                        this.unSetBackButton();
                        this.$router.push({name: 'sin-conexion'});
                    }
                    console.log('Network status:', `${status.connectionType}`);
                },

                sendRequestOn: async function (eventData) {

                    this.isSending = true;

                },
            },
        mounted() {
            //console.log(PushNotifications);
            // Check the device with Capacitor
            const device = Capacitor.getPlatform();
            console.log("Capacitor platform is: " + device);


            const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

            if (isPushNotificationsAvailable) {

                if ((Capacitor.getPlatform() === 'android') || (Capacitor.getPlatform() === 'ios')) {

                    if (Capacitor.getPlatform() === 'ios') {
                        // Request permission to use push notifications
                        // iOS will prompt user and return if they granted permission or not
                        // Android and web will just grant without prompting
                        PushNotifications.requestPermissions().then((result) => {
                        });

                    }
                    // Add registration error if there are.
                    PushNotifications.addListener('registrationError', (error) => {
                        console.log(`error on register ${JSON.stringify(error)}`);
                    }),
                        // Add Notification received
                        PushNotifications.addListener(
                            'pushNotificationReceived',
                            (notification) => {
                                console.log(`notification ${JSON.stringify(notification)}`);
                            },
                        ),
                        // Add Action performed
                        PushNotifications.addListener(
                            'pushNotificationActionPerformed',
                            async (notification) => {
                                console.log('notification succeeded');
                            },
                        ),
                        PushNotifications.addListener('registration', (token) => {
                            console.log(`Push registration success, token: ${token.value}`);

                            this.subscribePush(token.value).then((result) => {
                                console.log(result);
                            });
                        });
                    // Initialize the registration with FMC Token
                    PushNotifications.register();
                }

            }
        },
    }
</script>

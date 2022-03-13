import Vue from 'vue'
import Router from 'vue-router';
import auth from '@/mixins/auth';
import store from '@/store';
import GettingStarted from '@/pages/GettingStarted';
import Login from '@/pages/Login';
import Help from '@/pages/Help';
import LoginUp from '@/pages/LoginUp';
import ResetPassword from '@/pages/ResetPassword';
import ConfirmPassword from '@/pages/ConfirmPassword';
import NotFound from '@/pages/NotFound';
import ServicesAssociations from '@/pages/ServicesAssociations';
import Notifications from '@/pages/Notifications';
import Home from '@/pages/ServicesAssociation/Home';
import Documents from '@/pages/ServicesAssociation/Documents'
import DocumentsAll from '@/pages/ServicesAssociation/DocumentsAll'
import Settlements from '@/pages/ServicesAssociation/Settlements';
import NewsDetail from '@/pages/ServicesAssociation/NewsDetail';
import DocumentsDetail from '@/pages/ServicesAssociation/DocumentsDetail';
import Contact from '@/pages/ServicesAssociation/Contact';
import PaymentNotification from '@/pages/ServicesAssociation/PaymentNotification';
import PaymentAccount from '@/pages/ServicesAssociation/PaymentAccount';
import Advertising from '@/pages/ServicesAssociation/Advertising';
import AdvertisingList from '@/pages/ServicesAssociation/AdvertisingList';

import PaymentBill from '@/pages/ServicesAssociation/PaymentBill';
import News from '@/pages/ServicesAssociation/News';
import NoConnection from '@/pages/NoConnection';

import AmenitiesList 	   from '@/pages/ServicesAssociation/Amenities/AmenitiesList';
import AmenityDetail	   from '@/pages/ServicesAssociation/Amenities/AmenityDetail';
import BookAmenity	       from '@/pages/ServicesAssociation/Amenities/BookAmenity';

import NotificationsPaymentList from '@/pages/ServicesAssociation/NotificationsPayment/NotificationsPaymentList';
import NotificationsPaymentDetail from '@/pages/ServicesAssociation/NotificationsPayment/NotificationsPaymentDetail';
import AccountOverview from '@/pages/Account/AccountOverview';
import EditProfile from '@/pages/Account/EditProfile';
import ChangePassword from '@/pages/Account/ChangePassword';
import MessagesList from '@/pages/Chats/MessagesList';
import CooperativeChat from '@/pages/Chats/CooperativeChat';

// General

// Owner association

// Account

// Chats

Vue.use(Router)
const AuthGuard = (to, from, next) => {
    if (!auth.methods.isLogged()) {
        console.log("Redirecting to login");
        return next({path: '/ingresar', query: {redirect_to: to.path}});
    }


    next();
}

const resetRouteScroll = (to, from, savedPosition) => {
    return {x: 0, y: 0};
};

const router = new Router({

    // Si estamos en mobile, usamos hash.

    mode: process.env.NODE_ENV == 'mobile' ? 'hash' : 'history',
    linkExactActiveClass: 'active',
    scrollBehavior: resetRouteScroll,
    routes: [

        // Services association views

        {
            name: 'servicios',
            path: '/',
            meta:
                {
                    title: 'Servicios',
                    check_new: true,
                    validate_onboarding: true
                },
            component: ServicesAssociations,
            beforeEnter: AuthGuard
        },
        {
            name: 'inicio',
            path: '/servicios/:services_association_id',
            meta:
                {
                    title: 'Inicio',
                    validate_onboarding: true
                },
            component: Home,
            beforeEnter: AuthGuard
        },
        {
            name: 'contacto',
            meta:
                {
                    title: 'Contacto',
                    validate_onboarding: true
                },
            path: '/servicios/:services_association_id/contacto',
            component: Contact,
            beforeEnter: AuthGuard
        },
        {
            name: 'noticias',
            meta:
                {
                    title: 'Noticias',
                    validate_onboarding: true
                },
            path: '/servicios/:services_association_id/noticias',
            component: News,
            beforeEnter: AuthGuard
        },
        {
            name: 'documentos',
            meta:
                {
                    title: 'Documentos',
                    validate_onboarding: true
                },
            path: '/servicios/:services_association_id/documentos',
            component: Documents,
            beforeEnter: AuthGuard
        },
        {
            name: 'documentos-categoria',
            meta:
                {
                    title: 'Documentos por Categoria',
                    validate_onboarding: true
                },
            path: '/servicios/:services_association_id/documentos-categoria/:category',
            component: DocumentsAll,
            beforeEnter: AuthGuard
        },
        {
            name: 'detalle-noticia',
            meta:
                {
                    title: 'Noticia',
                    validate_onboarding: true
                },
            path: '/servicios/:services_association_id/noticias/:id',
            component: NewsDetail,
            beforeEnter: AuthGuard
        },
        {
            name: 'detalle-documento',
            meta:
                {
                    title: 'Documento',
                    validate_onboarding: true
                },
            path: '/servicios/:services_association_id/documentos/:id',
            component: DocumentsDetail,
            beforeEnter: AuthGuard
        },
        {
            name: 'facturas',
            meta:
                {
                    title: 'Mis Facturas',
                    validate_onboarding: true
                },
            path: '/servicios/:services_association_id/facturas',
            component: Settlements,
            beforeEnter: AuthGuard
        },
        {
            name: 'procesar-pago',
            meta:
                {
                    title: 'Procesar Pago',
                    validate_onboarding: true
                },
            path: '/servicios/:services_association_id/facturas/procesar-pago',
            component: PaymentBill,
            beforeEnter: AuthGuard
        },
        {
            name: 'notificar-pago',
            meta:
                {
                    title: 'Notificar pago',
                    validate_onboarding: true
                },
            path: '/servicios/:services_association_id/facturas/notificar-pago',
            component: PaymentNotification,
            beforeEnter: AuthGuard
        },
        {
            name: 'pago-acuenta',
            meta:
                {
                    title: 'Pago a cuenta',
                    validate_onboarding: true
                },
            path: '/servicios/:services_association_id/facturas/pago-acuenta',
            component: PaymentAccount,
            beforeEnter: AuthGuard
        },
        {
            name: 'listado-pagos',
            meta:
                {
                    title: 'Notificaciones de Pago',
                    validate_onboarding: true
                },
            path: '/pagos',
            component: NotificationsPaymentList,
            beforeEnter: AuthGuard
        },
        {
            name: 'detalle-pago',
            meta:
                {
                    title: 'Detalle Pago',
                    validate_onboarding: true
                },
            path: '/pagos/:id',
            component: NotificationsPaymentDetail,
            beforeEnter: AuthGuard
        },
        {
            name: 'listado-amenities',
            meta:
            {
                title: 'Amenities',
                validate_onboarding: true
            },
            path: '/servicios/:services_association_id/amenities',
            component: AmenitiesList,
            beforeEnter: AuthGuard
        },
        {
            name: 'detalle-amenity',
            meta:
            {
                title: 'Detalle alquiler',
                validate_onboarding: true
            },
            path: '/servicios/:services_association_id/amenities/:amenity_id',
            component: AmenityDetail,
            beforeEnter: AuthGuard
        },
        {
            name: 'reservar-amenity',
            meta:
            {
                title: 'Reservar alquiler',
                validate_onboarding: true
            },
            path: '/servicios/:services_association_id/amenities/:amenity_id/reservar',
            component: BookAmenity,
            beforeEnter: AuthGuard
        },
        // General

        {
            name: 'empezar',
            meta:
                {
                    title: 'Empezar'
                },
            path: '/empezar',
            component: GettingStarted,
            beforeEnter: AuthGuard
        },
        {
            name: 'ingresar',
            meta:
                {
                    title: 'Ingresar'
                },
            path: '/ingresar',
            component: Login,
            props: true
        },
        {
            name: 'asistencia',
            meta:
                {
                    title: 'Asistencia'
                },
            path: '/asistencia',
            component: Help,
            props: true
        },
        {
            name: 'ingreso_temporal',
            meta:
                {
                    title: 'Ingreso Temporal'
                },
            path: '/ingreso_temporal/username/:username/tempassword/:tempassword',
            component: LoginUp,
            props: true
        },
        {
            name: 'resetear-clave',
            meta:
                {
                    title: 'Resetear clave'
                },
            path: '/resetear-clave',
            component: ResetPassword
        },
        {
            name: 'confirmar-clave',
            meta:
                {
                    title: 'Confirmar clave'
                },
            path: '/confirmar-clave/username/:username',
            component: ConfirmPassword
        },
        {
            name: 'notificaciones',
            meta:
                {
                    title: 'Notificaciones'
                },
            path: '/notificaciones',
            component: Notifications,
            beforeEnter: AuthGuard
        },
        {
            name: 'ajustes',
            meta:
                {
                    title: 'Ajustes'
                },
            path: '/ajustes',
            component: AccountOverview,
            props: true,
            beforeEnter: AuthGuard
        },
        {
            name: 'editar-perfil',
            meta:
                {
                    title: 'Editar perfil',
                },
            path: '/ajustes/editar-perfil',
            component: EditProfile,
            beforeEnter: AuthGuard
        },
        {
            name: 'cambiar-clave',
            meta:
                {
                    title: 'Cambiar clave'
                },
            path: '/ajustes/cambiar-clave',
            component: ChangePassword,
            beforeEnter: AuthGuard
        },
        {
            name: 'mensajes',
            meta:
                {
                    title: 'Mensajes'
                },
            path: '/mensajes',
            component: MessagesList,
            beforeEnter: AuthGuard
        },
        {
            name: 'sugerencias',
            meta:
                {
                    title: 'Sugerencia'
                },
            path: '/servicios/:services_association_id/sugerencias/:advertising_id',
            component: Advertising,
            beforeEnter: AuthGuard
        },
        {
            name: 'listado-sugerencias',
            meta:
                {
                    title: 'Sugerencias'
                },
            path: '/servicios/:services_association_id/sugerencias',
            component: AdvertisingList,
            beforeEnter: AuthGuard
        },
        {
            name: 'mensajes-cooperativa',
            meta:
                {
                    title: 'Mensajes con cooperativa',
                    bodyClass: "page-chat"
                },
            path: '/mensajes/cooperativa/:cooperative_id/canal/:channel_id',
            component: CooperativeChat,
            beforeEnter: AuthGuard
        },
        {
            name: 'sin-conexion',
            meta:
                {
                    title: 'Sin Conexión'
                },
            path: '/sin-conexion',
            component: NoConnection
        },
        {
            name: '404',
            meta:
                {
                    title: 'No encontrado'
                },
            path: '/404',
            component: NotFound
        }
    ]
});

router.beforeEach((to, from, next) => {

    // Handling 404 errors

    if (to.matched[0] && to.matched[0].path == '*') {
        return next('/404');
    }

    next();

});

router.afterEach((to, from) => {

    // Set title

    document.title = `${to.meta.title} – siwca`;


    // Update VUEX

    if (to.params.services_association_id) {
        store.dispatch('setServicesAssociation', to.params.services_association_id);
    }


    // Set classes

    let className = to.meta.bodyClass || to.meta.title;
    className = className.replace(' ', '-').toLowerCase();

    document.getElementsByTagName("body")[0].className = className;
    document.getElementsByTagName("html")[0].className = className;

});

export default router;

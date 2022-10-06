import Home from '@/components/Home.vue';

const routes = [

    {
        path: '/',
        component: Home
    },
    {
        path: '*',
        redirect: '/'
    }

];

export default { routes };

import { createApp } from 'vue'
import App from './App.vue'
import { AccountGatewayHttp } from './AccountGateway';
import { FetchAdapter } from './HttpClient';

const app = createApp(App);
const httpClient = new FetchAdapter();
app.provide("accountGateway", new AccountGatewayHttp(httpClient));
app.mount('#app')

import './before-create-app'

import { createApp } from 'vue'
import Root from '@/root.vue'
const app = createApp(Root)

import { afterCreateApp } from './after-create-app'
afterCreateApp(app)

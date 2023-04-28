// import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

import dotenv from 'dotenv';
dotenv.config();

export const pb = new PocketBase(process.env['PUBLIC_POCKETBASE_URL']);

export const currentUser = writable(pb.authStore.model);

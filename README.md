# ANZLLAA Spinner — Vercel + Upstash Redis

## Environment Variables Vercel
- ADMIN_PASSWORD = password admin kamu
- SESSION_SECRET = string acak panjang
- UPSTASH_REDIS_REST_URL = dari Upstash
- UPSTASH_REDIS_REST_TOKEN = dari Upstash

Jangan taruh password atau token Redis di HTML/JS.

## Deploy
Import repository ini ke Vercel. Pastikan preset Other/Node serverless, lalu hubungkan Upstash Redis dan redeploy.

Admin: /admin.html

Kode redeem dibuat otomatis dari panel admin dengan format SPIN-XXXXXXXX dan disimpan di Redis. Setiap kode hanya bisa digunakan sekali.

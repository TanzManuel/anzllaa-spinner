# ANZLLAA Spinner

## Environment Variables
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- ADMIN_PASSWORD
- SESSION_SECRET

Deploy ke Vercel. `vercel.json` sengaja kosong agar Vercel otomatis menangani folder `api/`.

Admin: `/admin.html`

Di Admin Panel, bagian **Pengaturan Hadiah** dapat mengubah nama hadiah dan peluang. Total peluang wajib 100%. Pengaturan disimpan di Redis sehingga spinner memakai daftar yang sama.

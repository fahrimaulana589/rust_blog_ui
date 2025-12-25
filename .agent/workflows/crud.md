---
description: Panduan pembuatan CRUD standar
---

# Workflow Pembuatan CRUD

Workflow ini menjelaskan standar pembuatan fitur CRUD (Create, Read, Update, Delete) di proyek ini, menggunakan arsitektur Proxy Server Nuxt ke Backend Rust.

## 1. Persiapan Tipe Data (DTO)
Buat file definisi tipe di `app/types/dto/nama_fitur.dto.ts`.
Sesuaikan dengan response dari backend API Rust.

```typescript
export interface NamaFiturDto {
  id: number
  // field lainnya...
  created_at: string
  updated_at: string
}

export interface CreateNamaFiturDto {
  // field yang diperlukan saat create
}

export interface UpdateNamaFiturDto {
  // field yang diperlukan saat update (biasanya partial)
}
```

## 2. Implementasi Backend Proxy (Server API)
Buat folder baru di `server/api/app/nama_fiturs` (gunakan bentuk jamak).
Implementasikan 5 file standar berikut:

### a. `index.get.ts` (List Data)
Mengambil list data dengan pagination.
```typescript
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const authHeader = getHeader(event, 'Authorization')

  try {
    return await $fetch('http://localhost:8080/app/nama_fiturs', {
      method: 'GET',
      headers: { 'Authorization': authHeader || '' },
      query
    })
  } catch (err: any) {
    throw err
  }
})
```

### b. `index.post.ts` (Create Data)
Membuat data baru.
```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const authHeader = getHeader(event, 'Authorization')

  return await $fetch('http://localhost:8080/app/nama_fiturs', {
    method: 'POST',
    headers: { 'Authorization': authHeader || '' },
    body
  })
})
```

### c. `[id].get.ts`, `[id].put.ts`, `[id].delete.ts`
Implementasikan endpoint detail, update, dan delete dengan pola serupa, menambahkan `event.context.params.id` ke URL backend.

## 3. Pembuatan Composable
Buat file `app/composables/useNamaFiturs.ts` untuk memusatkan logika API call dari frontend ke Nuxt Server.

```typescript
export const useNamaFiturs = () => {
  const loading = ref(false)

  const getNamaFiturs = async (page = 1, limit = 10) => {
    loading.value = true
    try {
      return await $fetch('/api/app/nama_fiturs', { params: { page, limit } })
    } finally {
      loading.value = false
    }
  }

  // Implementasi create, update, delete, getOne...

  return {
    loading,
    getNamaFiturs,
    // export lainnya...
  }
}
```

## 4. Implementasi UI Halaman Admin
Buat file `app/pages/admin/nama_fiturs/index.vue`.
Ikuti struktur berikut:

1.  **Setup & Meta**:
    ```typescript
    definePageMeta({ middleware: 'auth', name: 'admin-nama-fiturs' })
    useHead({ title: 'Admin Nama Fiturs' })
    ```
2.  **Imports**: Import DTO, Composable, dan Valibot untuk validasi.
3.  **State**:
    *   `columns` untuk `UTable`.
    *   `state` reactive object untuk form.
    *   `isModalOpen`, `isDeleteModalOpen`, `isEditMode`.
4.  **Komponen UI**:
    *   `UTable` untuk menampilkan data.
    *   `UPagination` untuk navigasi halaman.
    *   `UButton` untuk aksi tambah, edit, hapus.
    *   `UModal` + `UForm` untuk form Create/Edit.
    *   `UModal` untuk konfirmasi hapus.
5.  **Validasi**: Gunakan `valibot` (`v.object`, `v.string`, `v.nonEmpty`, dll).
6.  **Fungsi**:
    *   `fetchData()`: panggil `getNamaFiturs`.
    *   `onSubmit()`: handle create/update berdasarkan `isEditMode`.
    *   `confirmDelete()` & `handleDelete()`: logika hapus.

Pastikan UI konsisten dengan halaman lain (misalnya Projects), menggunakan `UCard` sebagai container tabel dan layout standar `admin`.

## 5. Menambahkan Navigasi
Update file `app/layouts/admin.vue` untuk menambahkan link ke sidebar.

```typescript
const item_sidebars = ref([
  // ...menu lain
  {
    label: 'Nama Fiturs',
    icon: 'i-lucide-box', // Pilih icon yang sesuai
    to: { name: 'admin-nama-fiturs' }
  }
])
```

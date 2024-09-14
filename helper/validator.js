import * as yup from "yup";

export const assetSchema = yup.object().shape({
  skpd_id: yup.number().required("SKPD wajib diisi"),
  kecamatan_id: yup.number().required("Kecamatan wajib diisi"),
  penggunaan: yup.string().required("Penggunaan wajib diisi"),
  no_kib: yup.string().required("No. KIB wajib diisi"),
  kode_barang: yup.string().required("Kode Barang wajib diisi"),
  uraian: yup.string().required("Uraian wajib diisi"),
  tanggal_perolehan: yup.string().required("Tanggal Perolehan wajib diisi"),
  luas: yup.number().required("Luas wajib diisi"),
  alamat: yup.string().required("Alamat wajib diisi"),
  legalitas: yup.string().notRequired(),
  tanggal_legalitas: yup.string().notRequired(),
  nomor_legalitas: yup.string().notRequired(),
  asal_usul: yup.string().required("Asal Usul wajib diisi"),
  harga: yup.number().required("Harga wajib diisi"),
  keterangan: yup.string().required("Keterangan wajib diisi"),
  kategori: yup.string().required("Kategori wajib diisi"),
  desa: yup.string().required("Desa wajib diisi"),
  kasus: yup.boolean().required("Kasus wajib diisi"),
  uraian_kasus: yup.string().required("Uraian Kasus wajib diisi"),
  pemanfaatan: yup.boolean().required("Pemanfaatan wajib diisi"),
  keterangan_lainnya: yup.string().required("Keterangan Lainnya wajib diisi"),
  foto_1: yup.string().notRequired(),
  foto_2: yup.string().notRequired(),
  pdf_legalitas: yup.string().notRequired(),
});



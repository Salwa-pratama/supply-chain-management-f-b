// Data contoh katalog kasir (POS). Ganti dengan hasil pemanggilan API backend (Go) nanti.

export type Category = "makanan" | "minuman" | "snack" | "paket";

export type Product = {
  id: string | number;
  name: string;
  desc: string;
  price: number;
  stock: number;
  stockLabel: string;
  category: Category;
  categoryLabel: string;
  img: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "750c77ce-5350-4fc9-b7e2-aa01f0ad2560",
    name: "Kopi Kenangan Mantan (Aren Latte)",
    desc: "Espresso house blend BAPER, susu segar pasteurisasi & gula aren organik murni",
    price: 22000,
    stock: 45,
    stockLabel: "Stok 45 porsi",
    category: "minuman",
    categoryLabel: "Minuman",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuArbfMVKSnV8tmJn5z_gFsT5WyDvoZCgzhWXwfh7nevl03Mgth1EVIdC2O3o6SfjmCtXaib8CIXfRiwdII0bRUI-ySSj_Gs5c8sqxlfPzOf9gSTVyk2FCIHCp0UnMQ0ZtY8BwtcJrnKbPdEroumPcKBiIv14Tms1Kk6r5N9b7N8Bx99dAtng0wxi2soPXlDCDtlGjy8BfjMZrI6SxiiHqcblZFXkE7NR-hOE8RGbwIJgy7DkWPHmeE-",
  },
  {
    id: "271202cc-525c-4097-958a-d6b0476ff904",
    name: "Caramel Macchiato",
    desc: "Espresso bold dengan sirup karamel Prancis, steamed fresh milk & saus karamel legit",
    price: 28000,
    stock: 25,
    stockLabel: "Stok 25 porsi",
    category: "minuman",
    categoryLabel: "Minuman",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe81_TB2IS37uYZqSdjUu1o1PWoqPJqGObZd9Mkl_lo2Q35HnWss__CGB4SIi1T6iIuI1zCJAqqB_glDtOpvrAfaq3jEIcIkbFECsjJ01yJMtHhUKjk2V_DrzzwX2D1cOJK1d8-Y-YFkV9SDBlR6apoG4_cknaVLXQB8HasB2bguDDUObKpdtE6x0k6vX1Iepfp75o5PZmd0fmhnCUEeIJM5E9V6b6bs3zo_MoKwHQkM9b3fOPHugh",
  },
  {
    id: "f4c8f79f-c1d5-4024-bbb3-9547506b91bb",
    name: "Roti Toast Cokelat Crunchy",
    desc: "Roti brioche tebal bakar mentega dengan lumeran pasta cokelat crunchy premium",
    price: 18000,
    stock: 30,
    stockLabel: "Stok 30 porsi",
    category: "snack",
    categoryLabel: "Snack",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4yEpmCmqDDfStxbqji6UVXYZPEiUJgMmqMCXKuLDHraeTaDhLlNteX0M014Dj2LyWySd2T_XzIVNRHTk_Mo-CO5aT9D82Nvq-GAeNq5oHdlfTmIKjwRSNUHVtH1kg4ufUb4kmKUnF3k8NhsbIO6Go6eBywwPbo0yEz_RHPYLhRiUx6yYVhuZTKt0l0Twd57YFsCbZnSuscaetupKZwoaZ2wzzt7kx80fgrHbHTwQVlpgW8P2FJwC3",
  },
  {
    id: "ccec788f-a370-47fa-9df1-3af1e98c4a77",
    name: "Paket Hemat: Aren Latte + Toast",
    desc: "Kombinasi hemat Kopi Kenangan Mantan dingin segar dan 1 porsi Roti Toast Cokelat Crunchy hangat",
    price: 35000,
    stock: 20,
    stockLabel: "Stok 20 paket",
    category: "paket",
    categoryLabel: "Paket",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIic6egenLOMn_AzrmoL2ckKVKwKccGuUFAQTrjcvc8macYmw0_OawG8RHTNrUadOLPHRDzvNXVEnReNW7TELnyAkQzCqWuVVfBHeJnMEL8QlcopQ8RqrG2IezxhkmMRiqv-e1CUVhPYhO8u-awuRE6WYG43tKJzgrSYLFMORmxebN_D0XUIaknFBxQ0bE9UpQNMOg6M6DO4LRF87gUYco8k74UVxa_5UeSwz_2tJy6zaGFr4RQox0",
  },
  {
    id: "6ab7f288-ee06-4a0e-afc2-9b0836008473",
    name: "Avocado Coffee Float",
    desc: "Perpaduan alpukat mentega creamy dengan float es krim vanila dan single origin espresso",
    price: 32000,
    stock: 0,
    stockLabel: "Habis / Nonaktif",
    category: "minuman",
    categoryLabel: "Minuman",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOYt-3le39HEhoC2o9yhSe_wPIqbVoDTdc0Eh1OWVvYDoVPoiZDicuUZeDBrNs4VU3reSqR9DdsGhRROljFosxP_UvGfafcdUJayMaYlL_CFyicm24bxZiuO-CeXcKvKpN95HER6uY-pTYerpinF974AmwOtsn3jlx59ffLzyqCf1NiGjBkb3fdPT4rIKNxFD_kTdHufiUlBNY3OoxztzNvIQ4eThSziCdhR5fsPFMVJq1qEv7jC6u",
  },
  {
    id: "dummy-6",
    name: "Es Teh Manis Jumbo",
    desc: "Seduhan teh melati wangi khas BAPER ukuran jumbo 650ml",
    price: 8000,
    stock: 100,
    stockLabel: "Stok Melimpah",
    category: "minuman",
    categoryLabel: "Minuman",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCg0MZRcMVJpAKKHrg5zzuUWup3kjN2X6vLhMMUcXc10DPS4BFopdU72oiSItYibjZKEM64agBX5ma0APv4mU1qpP8S1lECN6BA58Ln9dADe308WQIgoEKx6lfNA2tCp4f4bsk3hsnI6cb1Z3PPCAH3UEmpz9FbSUYhBnNNGIgN-39YL5tb0gFcRFHWidNn35h05cpvIkBqP9slzs3yxNYXAA8NhTceSLnHT-BUfYqQQE1yJqoGqmq",
  },
];

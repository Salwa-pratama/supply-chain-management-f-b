// Data contoh katalog kasir (POS). Ganti dengan hasil pemanggilan API backend (Go) nanti.

export type Category = "makanan" | "minuman" | "snack" | "paket";

export type Product = {
  id: number;
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
    id: 1,
    name: "Nasi Goreng Spesial BAPER",
    desc: "Telur mata sapi, suwir ayam, acar, kerupuk udang",
    price: 28000,
    stock: 18,
    stockLabel: "Stok 18 porsi",
    category: "makanan",
    categoryLabel: "Makanan",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3WQ4KDj0GSmrKXHDWBY3rUSuTI2enmEcSMaSWzjkoIpd5pDlCTcQoeEPsCrsq50M5mT2b_2vgbJ3zaez0la3vHWHto7czZe0dP8MTk2PKGreqREp5WlcA_BR6BmmLm71jvhCH_f6WAw73B60aj4wha6ksgsc8fClz0zzwwDsaTB33JQoUF3sNa2ssLYKWtQi7_d-wKWxVY5CmlO5uk9GzAPIxwdyggIMzUey0qxDTWsIN2Fds1HVl",
  },
  {
    id: 2,
    name: "Ayam Geprek Sambal Korek",
    desc: "Ayam krispi gurih dengan ulekan cabai rawit segar",
    price: 25000,
    stock: 14,
    stockLabel: "Stok 14 porsi",
    category: "makanan",
    categoryLabel: "Makanan",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnVquRUiZs4nuVPQ2UrMctnQsaZsjapKFyfnljuADRi2eK6EQHqYwJ7q8tUoSXV4UPFFKog1aORtjIj59AYVx0qKXbr4maQicH6pQxKGavbTIrkm8mzR7vstgV8iNCsXwOmdKz1joqdPZQtHRvrSvaifERFORYJBn4PltHNpyyTG0XwGaQMSmSQ6DpDqad6yji8Gva4-3flAYVYeLxHGbToECYEbW0LZzFpB8pfkYwmP3_XwcIjY6C",
  },
  {
    id: 3,
    name: "Mie Goreng Kampung",
    desc: "Bumbu rempah tradisional, sawi hijau, bakso sapi",
    price: 24000,
    stock: 20,
    stockLabel: "Stok 20 porsi",
    category: "makanan",
    categoryLabel: "Makanan",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0fQYM1PxjPzlsoA22UB66Io_SWbicugxx0b-aRMeWS71kNehAAz6Quip4NqhLg3D07CUYauww2hdsRCmyXmumSDAxaCUTaem6mH52Kiv6u8eyQvy6sLhsLKycvb-YoK7pFwPr2llerVFZxOKu4eeLlf3TbDHxAmbsLi1CPqLr-x_YFsbI3qOOMTVplqEiA6e9wFx_6biCTYMGsVo8x8l1WIblx356r2KS01cf6nr-9C7-Zq60qYnm",
  },
  {
    id: 4,
    name: "Kopi Susu Aren BAPER",
    desc: "Espresso house-blend BAPER & gula aren organik",
    price: 22000,
    stock: 45,
    stockLabel: "Stok 45 cup",
    category: "minuman",
    categoryLabel: "Minuman",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuArbfMVKSnV8tmJn5z_gFsT5WyDvoZCgzhWXwfh7nevl03Mgth1EVIdC2O3o6SfjmCtXaib8CIXfRiwdII0bRUI-ySSj_Gs5c8sqxlfPzOf9gSTVyk2FCIHCp0UnMQ0ZtY8BwtcJrnKbPdEroumPcKBiIv14Tms1Kk6r5N9b7N8Bx99dAtng0wxi2soPXlDCDtlGjy8BfjMZrI6SxiiHqcblZFXkE7NR-hOE8RGbwIJgy7DkWPHmeE-",
  },
  {
    id: 5,
    name: "Es Teh Manis Jumbo",
    desc: "Seduhan teh melati wangi, porsi 650ml",
    price: 8000,
    stock: 100,
    stockLabel: "Stok Melimpah",
    category: "minuman",
    categoryLabel: "Minuman",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCg0MZRcMVJpAKKHrg5zzuUWup3kjN2X6vLhMMUcXc10DPS4BFopdU72oiSItYibjZKEM64agBX5ma0APv4mU1qpP8S1lECN6BA58Ln9dADe308WQIgoEKx6lfNA2tCp4f4bsk3hsnI6cb1Z3PPCAH3UEmpz9FbSUYhBnNNGIgN-39YL5tb0gFcRFHWidNn35h05cpvIkBqP9slzs3yxNYXAA8NhTceSLnHT-BUfYqQQE1yJqoGqmq",
  },
  {
    id: 6,
    name: "Jus Jeruk Murni",
    desc: "Perasan jeruk peras Medan tanpa pemanis buatan",
    price: 18000,
    stock: 12,
    stockLabel: "Stok 12 cup",
    category: "minuman",
    categoryLabel: "Minuman",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe81_TB2IS37uYZqSdjUu1o1PWoqPJqGObZd9Mkl_lo2Q35HnWss__CGB4SIi1T6iIuI1zCJAqqB_glDtOpvrAfaq3jEIcIkbFECsjJ01yJMtHhUKjk2V_DrzzwX2D1cOJK1d8-Y-YFkV9SDBlR6apoG4_cknaVLXQB8HasB2bguDDUObKpdtE6x0k6vX1Iepfp75o5PZmd0fmhnCUEeIJM5E9V6b6bs3zo_MoKwHQkM9b3fOPHugh",
  },
  {
    id: 7,
    name: "Kentang Goreng Crispy",
    desc: "Potongan kentang renyah, saus keju & sambal",
    price: 16000,
    stock: 22,
    stockLabel: "Stok 22 porsi",
    category: "snack",
    categoryLabel: "Snack",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIic6egenLOMn_AzrmoL2ckKVKwKccGuUFAQTrjcvc8macYmw0_OawG8RHTNrUadOLPHRDzvNXVEnReNW7TELnyAkQzCqWuVVfBHeJnMEL8QlcopQ8RqrG2IezxhkmMRiqv-e1CUVhPYhO8u-awuRE6WYG43tKJzgrSYLFMORmxebN_D0XUIaknFBxQ0bE9UpQNMOg6M6DO4LRF87gUYco8k74UVxa_5UeSwz_2tJy6zaGFr4RQox0",
  },
  {
    id: 8,
    name: "Croissant Butter Warm",
    desc: "Mentega Elle & Vire Prancis, flaky dan renyah",
    price: 18000,
    stock: 8,
    stockLabel: "Stok 8 pcs",
    category: "snack",
    categoryLabel: "Snack",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4yEpmCmqDDfStxbqji6UVXYZPEiUJgMmqMCXKuLDHraeTaDhLlNteX0M014Dj2LyWySd2T_XzIVNRHTk_Mo-CO5aT9D82Nvq-GAeNq5oHdlfTmIKjwRSNUHVtH1kg4ufUb4kmKUnF3k8NhsbIO6Go6eBywwPbo0yEz_RHPYLhRiUx6yYVhuZTKt0l0Twd57YFsCbZnSuscaetupKZwoaZ2wzzt7kx80fgrHbHTwQVlpgW8P2FJwC3",
  },
  {
    id: 9,
    name: "Avocado Coffee Float",
    desc: "",
    price: 28000,
    stock: 0,
    stockLabel: "Stok Habis",
    category: "minuman",
    categoryLabel: "Minuman",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOYt-3le39HEhoC2o9yhSe_wPIqbVoDTdc0Eh1OWVvYDoVPoiZDicuUZeDBrNs4VU3reSqR9DdsGhRROljFosxP_UvGfafcdUJayMaYlL_CFyicm24bxZiuO-CeXcKvKpN95HER6uY-pTYerpinF974AmwOtsn3jlx59ffLzyqCf1NiGjBkb3fdPT4rIKNxFD_kTdHufiUlBNY3OoxztzNvIQ4eThSziCdhR5fsPFMVJq1qEv7jC6u",
  },
];

<template>
  <div class="max-w-6xl mx-auto px-4 pt-12">

    <!-- TITULO -->
    <header class="text-center mb-10">
      <h1 class="text-3xl font-bold text-gray-900">Restaurantes Disponibles</h1>
      <p class="text-gray-500 mt-1">
        Descubre nuestros restaurantes y sus deliciosos menús
      </p>
    </header>

    <!-- BANNER YALA -->
    <section
      class="relative overflow-hidden rounded-3xl px-8 pt-10 pb-10 text-white shadow-lg 
             bg-linear-to-r from-red-600 to-red-400 mb-10">

      <!-- LOGO + TEXTO -->
      <div class="flex items-center gap-4 mx-4 relative z-10">
        <img src="/img/logo-yala.png" class="w-24 h-24 rounded-2xl shadow-lg" />
        <div>
          <h3 class="text-2xl font-extrabold tracking-tight">YALA Delivery</h3>
          <p class="text-sl opacity-90">Tu comida favorita al instante</p>
        </div>
      </div>

      <!-- ONDA SUPERIOR -->
      <svg
        class="absolute top-0 left-0 w-full opacity-20 pointer-events-none"
        viewBox="0 0 500 150"
        preserveAspectRatio="none">
        <path
          d="M0.00,49.98 C150.00,150.00 349.56,-49.98 500.00,49.98 L500.00,00.00 L0.00,0.00 Z"
          fill="#ffffff" />
      </svg>
    </section>

    <!-- BUSCADOR -->
    <section class="mb-4">
      <SearchBar v-model="searchQuery" />
    </section>

    <!-- FILTROS -->
    <section class="mb-12">
      <FiltersSection
        :categorias="uniqueCategorias"
        :filtro-categoria="filtroCategoria"
        @update:filtro-categoria="filtroCategoria = $event"
      />
    </section>

    <!-- DESTACADOS -->
    <section class="mb-16">
      <RestaurantsCarousel
        titulo="Destacados para ti"
        :restaurantes="restaurantesFiltrados.slice(0, 10)"
        @ver-menu="verMenu"
      />
    </section>

    <!-- TODOS -->
    <section>
      <h2 class="text-xl font-bold mb-6">Todos los Restaurantes</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        <RestaurantCard
          v-for="r in restaurantesFiltrados"
          :key="r.id"
          :restaurante="r"
          @click="verMenu(r.id)"
        />
      </div>
    </section>

  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getRestaurantes } from '@/services/catalogoService';

import HeaderSection from '@/components/cliente/HederSection.vue';
import SearchBar from '@/components/cliente/SearchBar.vue';
import FiltersSection from '@/components/cliente/FiltersSection.vue';
import LoadingSpinner from '@/components/cliente/LoadingSpinner.vue';
import ErrorMessage from '@/components/cliente/ErrorMessage.vue';
import RestaurantsCarousel from '@/components/cliente/RestaurantsCarousel.vue';
import RestaurantCard from '@/components/cliente/RestaurantCard.vue';
import EmptyState from '@/components/cliente/EmptyState.vue';

const router = useRouter();

const restaurantes = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const filtroCategoria = ref(null);

const uniqueCategorias = computed(() => {
  const cats = new Set();
  restaurantes.value.forEach(r => {
    if (r.categorias) r.categorias.forEach(c => cats.add(c.nombre));
  });
  return Array.from(cats);
});

const restaurantesFiltrados = computed(() => {
  return restaurantes.value.filter(r => {
    const matchesSearch =
      r.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      r.direccion.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesCategoria =
      filtroCategoria.value === null ||
      r.categorias?.some(c => c.nombre === filtroCategoria.value);

    return matchesSearch && matchesCategoria && r.estado === 'Abierto';
  });
});

onMounted(fetchRestaurantes);

async function fetchRestaurantes() {
  loading.value = true;
  error.value = null;
  try {
    const response = await getRestaurantes();
    restaurantes.value = response.data;
  } catch (err) {
    console.error('Error al cargar:', err);
    error.value = 'No se pudieron cargar los restaurantes.';
  } finally {
    loading.value = false;
  }
}

function verMenu(restauranteId) {
  router.push({
    name: 'RestauranteMenu',
    params: { id: restauranteId }
  });
}
</script>

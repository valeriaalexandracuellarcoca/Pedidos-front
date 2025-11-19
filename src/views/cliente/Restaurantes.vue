<template>
  <div class="restaurantes-container">
    <div class="header">
      <h1>Restaurantes Disponibles</h1>
      <p class="subtitle">Descubre nuestros restaurantes y sus deliciosos menús</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Cargando restaurantes...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <span class="error-icon">⚠️</span>
      <p>{{ error }}</p>
      <button @click="fetchRestaurantes" class="btn-retry">Reintentar</button>
    </div>

    <!-- Restaurantes Grid -->
    <div v-else class="restaurantes-grid">
      <div 
        v-for="restaurante in restaurantes" 
        :key="restaurante.id" 
        class="restaurante-card"
        :class="{ 'cerrado': restaurante.estado === 'Cerrado' }"
      >
        <!-- Estado Badge -->
        <div class="estado-badge" :class="restaurante.estado === 'Abierto' ? 'abierto' : 'cerrado'">
          <span class="status-dot"></span>
          {{ restaurante.estado }}
        </div>

        <!-- Información del Restaurante -->
        <div class="card-content">
          <h2 class="restaurante-nombre">{{ restaurante.nombre }}</h2>
          
          <div class="info-item">
            <span class="icon">📍</span>
            <span>{{ restaurante.direccion }}</span>
          </div>
          
          <div class="info-item">
            <span class="icon">📞</span>
            <span>{{ restaurante.telefono }}</span>
          </div>

          <!-- Estadísticas -->
          <div class="stats">
            <div class="stat-item">
              <span class="stat-number">{{ restaurante.categorias?.length || 0 }}</span>
              <span class="stat-label">Categorías</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">{{ restaurante.productos?.length || 0 }}</span>
              <span class="stat-label">Productos</span>
            </div>
          </div>

          <!-- Botón Ver Menú -->
          <button 
            @click="verMenu(restaurante.id)" 
            class="btn-menu"
            :disabled="restaurante.estado === 'Cerrado'"
          >
            <span class="btn-icon">🍽️</span>
            Ver Menú
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="restaurantes.length === 0" class="empty-state">
        <span class="empty-icon">🏪</span>
        <h3>No hay restaurantes disponibles</h3>
        <p>Vuelve pronto para ver nuestros restaurantes</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getRestaurantes } from '@/services/catalogoService';

export default {
  name: 'RestaurantesLista',
  data() {
    return {
      restaurantes: [],
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchRestaurantes();
  },
  methods: {
    async fetchRestaurantes() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await getRestaurantes();
        this.restaurantes = response.data;
      } catch (error) {
        console.error('Error al cargar restaurantes:', error);
        this.error = 'No se pudieron cargar los restaurantes. Por favor, intenta de nuevo.';
      } finally {
        this.loading = false;
      }
    },
    verMenu(restauranteId) {
      this.$router.push({ 
        name: 'RestauranteMenu', 
        params: { id: restauranteId } 
      });
    }
  }
};
</script>

<style scoped>
.restaurantes-container {
   /* Aumentado de 1200px */
  margin: 0 auto;
  padding: 1.5rem; /* Reducido para dar más espacio a las tarjetas */
}

.header {
  text-align: center;
  margin-bottom: 2.5rem; /* Reducido para dar más espacio */
}

.header h1 {
  font-size: 2.8rem; /* Aumentado */
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.2rem; /* Aumentado */
}

/* Loading State */
.loading-container {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  
  border: 5px solid #f3f3f3; /* Aumentado */
  border-top: 5px solid #3498db; /* Aumentado */
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-container {
  text-align: center;
  padding: 3rem;
  background: #fee;
  border-radius: 12px;
  color: #c33;
  margin: 0 1rem; /* Añadido margen lateral */
}

.error-icon {
  font-size: 3.5rem; /* Aumentado */
  display: block;
  margin-bottom: 1rem;
}

.btn-retry {
  margin-top: 1rem;
  padding: 0.85rem 1.75rem; /* Aumentado */
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem; /* Aumentado */
  transition: background 0.3s;
}

.btn-retry:hover {
  background: #c0392b;
}

/* Restaurantes Grid - CAMBIOS PRINCIPALES */
.restaurantes-grid {
  display: grid;
  /* Cambiado a 2 columnas en pantallas grandes para tarjetas más anchas */
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 2.5rem; /* Aumentado el espacio entre tarjetas */
}

.restaurante-card {
  background: white;
  border-radius: 20px; /* Aumentado */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Aumentada la sombra */
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  min-height: 320px; /* Altura mínima aumentada */
  display: flex;
  flex-direction: column;
}

.restaurante-card:hover {
  transform: translateY(-8px); /* Aumentado el efecto hover */
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15); /* Aumentada la sombra en hover */
}

.restaurante-card.cerrado {
  opacity: 0.7;
}

.estado-badge {
  position: absolute;
  top: 1.2rem; /* Ajustado */
  right: 1.2rem; /* Ajustado */
  padding: 0.6rem 1.2rem; /* Aumentado */
  border-radius: 20px;
  font-size: 1rem; /* Aumentado */
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
}

.estado-badge.abierto {
  background: #d4edda;
  color: #155724;
}

.estado-badge.cerrado {
  background: #f8d7da;
  color: #721c24;
}

.status-dot {
  width: 10px; /* Aumentado */
  height: 10px; /* Aumentado */
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.card-content {
  padding: 2.5rem; /* Aumentado */
  padding-top: 3.5rem; /* Aumentado */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.restaurante-nombre {
  font-size: 1.8rem; /* Aumentado */
  color: #2c3e50;
  margin-bottom: 1.5rem; /* Aumentado */
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.85rem; /* Aumentado */
  margin-bottom: 1rem; /* Aumentado */
  color: #555;
  font-size: 1.1rem; /* Aumentado */
}

.icon {
  font-size: 1.4rem; /* Aumentado */
}

.stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2rem 0; /* Aumentado */
  padding: 1.2rem; /* Aumentado */
  background: #f8f9fa;
  border-radius: 12px; /* Aumentado */
  flex-grow: 1;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2rem; /* Aumentado */
  font-weight: bold;
  color: #3498db;
}

.stat-label {
  font-size: 1rem; /* Aumentado */
  color: #7f8c8d;
  margin-top: 0.5rem; /* Aumentado */
}

.stat-divider {
  width: 2px; /* Aumentado */
  height: 50px; /* Aumentado */
  background: #ddd;
}

.btn-menu {
  width: 100%;
  padding: 1.2rem; /* Aumentado */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px; /* Aumentado */
  font-size: 1.1rem; /* Aumentado */
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem; /* Aumentado */
  transition: transform 0.2s, box-shadow 0.3s;
  margin-top: auto; /* Para posicionar al final de la tarjeta */
}

.btn-menu:hover:not(:disabled) {
  transform: scale(1.03); /* Aumentado ligeramente */
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4); /* Aumentada la sombra */
}

.btn-menu:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-icon {
  font-size: 1.4rem; /* Aumentado */
}

/* Empty State */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 5rem 2rem; /* Aumentado */
}

.empty-icon {
  font-size: 5rem; /* Aumentado */
  display: block;
  margin-bottom: 1.5rem; /* Aumentado */
}

.empty-state h3 {
  color: #2c3e50;
  margin-bottom: 1rem; /* Aumentado */
  font-size: 2rem; /* Aumentado */
}

.empty-state p {
  color: #7f8c8d;
  font-size: 1.2rem; /* Aumentado */
}

/* Responsive */
@media (max-width: 1200px) {
  .restaurantes-grid {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
}

@media (max-width: 900px) {
  .restaurantes-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}

@media (max-width: 768px) {
  .restaurantes-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2.3rem; /* Ajustado para móvil */
  }

  .restaurantes-grid {
    grid-template-columns: 1fr;
    gap: 2rem; /* Aumentado para móvil */
  }
  
  .restaurante-card {
    min-height: 300px; /* Ajustado para móvil */
  }
  
  .card-content {
    padding: 2rem;
    padding-top: 3rem;
  }
}

@media (max-width: 480px) {
  .restaurantes-grid {
    gap: 1.5rem;
  }
  
  .card-content {
    padding: 1.5rem;
    padding-top: 2.5rem;
  }
  
  .restaurante-nombre {
    font-size: 1.6rem;
  }
}
</style>
## Estructura del Proyecto

Este proyecto está desarrollado con **Next.js (App Router)**.
Para mantener el código organizado y escalable, se separan las **rutas**, **componentes** y **lógica de acceso a datos**.

## Estructura principal

```
src/
│
├── app/                # Rutas del proyecto (Next.js App Router)
│   ├── layout.tsx
│   ├── page.tsx
│   └── productos/
│       └── page.tsx
│
├── components/         # Componentes reutilizables de la interfaz
│   ├── Navbar.tsx
│   └── ProductoCard.tsx
│
├── hooks/              # Custom hooks con lógica reutilizable
│   └── useProductos.ts
│
├── services/           # Servicios para comunicación con APIs
│   └── productosService.ts
│
├── lib/                # Configuraciones externas (ej: Supabase, Axios)
│   └── supabaseClient.ts
│
├── types/              # Tipos de TypeScript
│   └── producto.ts
│
└── utils/              # Funciones auxiliares
    └── formatPrice.ts
```

---

# Estructura del proyecto.

## 1. Carpeta `app`

Contiene **únicamente las rutas del proyecto**.

Ejemplo:

```
app/productos/page.tsx
```

Esto representa la ruta:

```
/productos
```

No se deben colocar aquí:

* servicios
* hooks
* lógica de negocio compleja

---

## 2. Carpeta `components`

Contiene **componentes reutilizables de UI**.

Ejemplo:

```tsx
<ProductoCard />
<Navbar />
```

Estos componentes deben encargarse principalmente de **mostrar información**.

---

## 3. Carpeta `services`

Contiene las funciones encargadas de **comunicarse con APIs o bases de datos**.

El objetivo es **no hacer llamadas a APIs directamente desde los componentes**.

Ejemplo:

```ts
import axios from "axios";

const API_URL = "http://localhost:3001/productos";

export const getProductos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
```

---

## 4. Uso en componentes

Los componentes deben importar las funciones desde `services`.

Ejemplo:

```tsx
import { useEffect, useState } from "react";
import { getProductos } from "@/services/productosService";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      const data = await getProductos();
      setProductos(data);
    };

    cargarProductos();
  }, []);

  return (
    <div>
      {productos.map((p) => (
        <div key={p.id}>{p.nombre}</div>
      ))}
    </div>
  );
}
```

---

# Objetivo de esta arquitectura

Separar responsabilidades:

| Capa       | Responsabilidad     |
| ---------- | ------------------- |
| app        | rutas               |
| components | interfaz            |
| hooks      | lógica reutilizable |
| services   | acceso a datos      |
| lib        | configuraciones     |

Esto permite:

* código más limpio
* reutilización de funciones
* mantenimiento más sencillo
* mayor escalabilidad del proyecto

## 🚀 Ejecución del proyecto

Para ejecutar el proyecto en entorno de desarrollo:

1. Instalar las dependencias:
```
npm i
```
2. Iniciar el servidor en desarrollo:
```
npm run dev
```
## Tipos de TypeScript.

Los tipos e interfaces del proyecto deben crearse dentro de la carpeta types.

```
/types
```

Ahí se definen las estructuras de datos utilizadas en el proyecto para poder reutilizarlas en **componentes, hooks y servicios**, manteniendo el código más organizado y tipado correctamente.


## Los estilos de la aplicacións

Para mantener una interfaz consistente y fácil de mantener, en este proyecto usamos **Tailwind CSS** como base para todos los estilos.

### No usar

- CSS puro (`.css`, `.module.css`)
- Otras librerías de estilos
- Estilos inline extensos
- Estilos con style = {}, usar className

### Usar

- Clases de Tailwind para los estilos
- Componentes reutilizables cuando aplique
- Las utilidades de Tailwind para mantener coherencia visual

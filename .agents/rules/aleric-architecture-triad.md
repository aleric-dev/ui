# Regla Maestra: Tríada de Ingeniería Aleric Dev (@aleric.dev/ui + TanStack Query v5 + Arquitectura Hexagonal)

En TODO proyecto del ecosistema **Aleric Dev** (`admin`, `crm`, `web`, `ui` y nuevos desarrollos), ANTIGRAVITY DEBE cumplir obligatoriamente estos **3 pilares arquitectónicos** sin excepción:

## 1. Sistema de Diseño y Formularios con `@aleric.dev/ui`
- **PROHIBIDO escribir controles de formulario, botones o modales con HTML crudo**: No uses `<input>`, `<textarea>`, `<select>`, `<button>` ni modales artesanales (`ProtectedModal` casero) al construir vistas, paneles o formularios en React.
- **Uso Obligatorio de `@aleric.dev/ui`**: Importa y utiliza siempre los átomos, moléculas y organismos oficiales de `@aleric.dev/ui` (`Button`, `Input`, `PasswordInput`, `OtpInput`, `Textarea`, `Select`, `Toggle`, `StatusToggle`, `FormField`, `Modal`, `ModalHeader`, `ModalBody`, `ModalFooter`, `Card`, `CardHeader`, `CardContent`, `CardFooter`, `Badge`, `Tabs`, `SearchInput`, `EmptyState`, `ConfirmDialog`, `Table`, `Spinner`).
- **Protección de Modales con `isDirty`**: Todo modal que contenga un formulario de creación o edición debe usar `<Modal isDirty={isDirty}>` de `@aleric.dev/ui` para impedir el cierre accidental sin guardar.
- **Evolución en `@aleric.dev/ui`**: Si una vista o formulario requiere una capacidad que aún no existe en `@aleric.dev/ui`, primero se implementa en `c:\Users\RICARDO\Documents\Code\aleric-dev\ui` siguiendo su protocolo de ramas SemVer (`feat/vX.Y.Z-...`), se compila con `npm run build:lib`, y luego se consume en la aplicación.

## 2. Estado de Servidor y Consultas con `@tanstack/react-query` v5 (`/tanstack-query-state`)
- **PROHIBIDO `useEffect` + `fetch`/`useState` manual para Server State**: Toda lectura asíncrona de APIs (`/api/*`), Cloudflare KV o Supabase debe implementarse con `useQuery` dentro de `hooks/use<Modulo>Queries.ts`.
- **PROHIBIDO mutar datos sin `useMutation`**: Todo formulario de creación, edición, borrado, login, cambio de contraseña o actualización debe usar `useMutation` en `hooks/use<Modulo>Mutations.ts`, sincronizando la caché mediante `queryClient.setQueryData` y `queryClient.invalidateQueries`.

## 3. Arquitectura Hexagonal Estricta (Ports & Adapters + Vertical Slices)
Cada módulo de negocio en `src/modules/<modulo>/` DEBE estructurarse en 4 capas concéntricas desacopladas:
1. **`domain/` (Núcleo Puro)**: Entidades, Value Objects y Puertos (`*RepositoryPort`). Cero dependencias de React, Astro, Cloudflare KV o Supabase.
2. **`application/` (Casos de Uso)**: Casos de Uso (`*UseCase`) y Facades que orquestan la lógica de negocio invocando únicamente los puertos de dominio.
3. **`infrastructure/` (Adaptadores Secundarios)**: Implementaciones concretas de los puertos (`EdgeKv*Repository`, `Supabase*Repository`, clientes HTTP) y Mappers (`*Mapper`).
4. **`presentation/` o `ui/` (Adaptadores Primarios)**:
   - `hooks/`: `use<Modulo>Queries.ts` y `use<Modulo>Mutations.ts` (con `@tanstack/react-query` v5).
   - `components/` y `pages/` (o `views/`): Construidos exclusivamente con componentes de `@aleric.dev/ui` y siguiendo las directrices del skill `/frontend-design`.

# 📊 Documentación Completa del Schema de Prisma

## Aplicación de Gestión Financiera - Straumix

---

## 🎯 **Descripción General**

Este schema de Prisma define la estructura completa de la base de datos para una aplicación de gestión financiera que implementa la metodología 50/30/20. La aplicación permite a usuarios individuales, parejas y organizaciones gestionar sus gastos, presupuestos y metas financieras.

---

## 🏗️ **Arquitectura del Sistema**

### **Flujo de Autenticación**

1. **Registro**: Usuario se autentica con Google (NextAuth)
2. **Configuración**: Usuario configura su rol (PERSONA, PAREJA, ORGANIZACIÓN)
3. **Cuenta**: Se crea automáticamente una cuenta del tipo correspondiente
4. **Acceso**: Usuario accede a funcionalidades según su rol

### **Sistema de Roles**

- **PERSONA**: Gestión individual de finanzas
- **PAREJA**: Gestión compartida entre dos usuarios
- **ORGANIZACIÓN**: Gestión empresarial con múltiples usuarios

---

## 📋 **Modelos del Sistema**

---

### 🔐 **1. MODELOS DE AUTENTICACIÓN Y USUARIOS**

#### **User (Usuario)**

**Propósito**: Almacena información de todos los usuarios del sistema

**Campos Principales**:

- `id`: Identificador único UUID
- `email`: Email único del usuario (requerido)
- `password`: Contraseña (opcional, para futuros registros tradicionales)
- `firstName`: Nombre del usuario
- `lastName`: Apellido del usuario
- `profileImage`: URL de la imagen de perfil de Google
- `emailVerified`: Fecha de verificación del email
- `role`: Rol del usuario (PERSONA, PAREJA, ORGANIZACIÓN)
- `isActive`: Estado activo/inactivo del usuario

**Relaciones**:

- `accounts`: Cuentas a las que pertenece el usuario
- `expenses`: Gastos registrados por el usuario
- `goals`: Metas financieras del usuario
- `notifications`: Notificaciones recibidas
- `userSessions`: Sesiones activas del usuario
- `accountInvites`: Invitaciones enviadas a cuentas
- `accountRequests`: Solicitudes de acceso a cuentas
- `accountRoles`: Roles específicos en cada cuenta

**Funcionalidades**:

- Autenticación social con Google
- Gestión de perfiles de usuario
- Control de acceso basado en roles
- Historial de actividades

---

#### **Account (Cuenta)**

**Propósito**: Representa las cuentas compartidas para diferentes tipos de usuarios

**Campos Principales**:

- `id`: Identificador único UUID
- `name`: Nombre de la cuenta
- `type`: Tipo de cuenta (PERSONAL, COUPLE, ORGANIZATION)
- `description`: Descripción opcional de la cuenta
- `isActive`: Estado activo/inactivo de la cuenta

**Relaciones**:

- `users`: Usuarios que pertenecen a la cuenta
- `expenses`: Gastos asociados a la cuenta
- `budgets`: Presupuestos mensuales
- `goals`: Metas financieras de la cuenta
- `categories`: Categorías de gastos
- `subscriptions`: Plan de suscripción activo
- `accountRoles`: Roles de usuarios en la cuenta
- `invites`: Invitaciones pendientes
- `requests`: Solicitudes de acceso
- `transactions`: Transacciones financieras
- `reports`: Reportes generados
- `employees`: Empleados (solo para organizaciones)

**Funcionalidades**:

- Gestión de usuarios múltiples
- Control de acceso granular
- Sistema de invitaciones
- Auditoría de actividades

---

### 🔑 **2. MODELOS DE ROLES Y PERMISOS**

#### **AccountUserRole (Rol de Usuario en Cuenta)**

**Propósito**: Define los permisos específicos de cada usuario en una cuenta

**Campos Principales**:

- `id`: Identificador único UUID
- `userId`: ID del usuario
- `accountId`: ID de la cuenta
- `role`: Rol específico (OWNER, ADMIN, MEMBER, VIEWER)
- `isActive`: Estado activo del rol

**Roles Disponibles**:

- **OWNER**: Propietario con control total
- **ADMIN**: Administrador (solo para organizaciones)
- **MEMBER**: Miembro con permisos completos
- **VIEWER**: Solo lectura

**Restricciones**:

- Un usuario solo puede tener un rol por cuenta
- Relación única entre usuario y cuenta

---

#### **AccountInvite (Invitación a Cuenta)**

**Propósito**: Sistema de invitaciones para agregar usuarios a cuentas

**Campos Principales**:

- `id`: Identificador único UUID
- `email`: Email del usuario invitado
- `accountId`: ID de la cuenta destino
- `invitedBy`: ID del usuario que envía la invitación
- `status`: Estado de la invitación (PENDING, ACCEPTED, DECLINED, EXPIRED)
- `expiresAt`: Fecha de expiración de la invitación

**Funcionalidades**:

- Invitaciones por email
- Sistema de expiración automática
- Seguimiento del estado de invitaciones

---

#### **AccountRequest (Solicitud de Acceso)**

**Propósito**: Permite a usuarios solicitar acceso a cuentas existentes

**Campos Principales**:

- `id`: Identificador único UUID
- `userId`: ID del usuario solicitante
- `accountId`: ID de la cuenta solicitada
- `message`: Mensaje opcional de la solicitud
- `status`: Estado de la solicitud (PENDING, APPROVED, REJECTED)

**Funcionalidades**:

- Solicitudes de acceso a cuentas
- Sistema de aprobación/rechazo
- Comunicación entre usuarios

---

### 💰 **3. MODELOS DE GASTOS Y PRESUPUESTOS**

#### **Expense (Gasto)**

**Propósito**: Registra cada gasto individual con categorización

**Campos Principales**:

- `id`: Identificador único UUID
- `amount`: Monto del gasto (Decimal con 2 decimales)
- `description`: Descripción opcional del gasto
- `date`: Fecha del gasto
- `type`: Tipo de gasto (NEEDS, WANTS, SAVINGS)
- `categoryId`: ID de la categoría
- `userId`: ID del usuario que registró el gasto
- `accountId`: ID de la cuenta asociada
- `isRecurring`: Indica si es un gasto recurrente
- `recurringType`: Tipo de recurrencia (DAILY, WEEKLY, MONTHLY, YEARLY)

**Tipos de Gasto (Metodología 50/30/20)**:

- **NEEDS (50%)**: Necesidades básicas (vivienda, comida, servicios)
- **WANTS (30%)**: Deseos y entretenimiento
- **SAVINGS (20%)**: Ahorro e inversiones

**Funcionalidades**:

- Categorización automática
- Gastos recurrentes
- Seguimiento temporal
- Auditoría de usuarios

---

#### **Budget (Presupuesto)**

**Propósito**: Define el presupuesto mensual con la metodología 50/30/20

**Campos Principales**:

- `id`: Identificador único UUID
- `month`: Mes del presupuesto (1-12)
- `year`: Año del presupuesto
- `totalIncome`: Ingreso neto total
- `needsAmount`: 50% para necesidades
- `wantsAmount`: 30% para deseos
- `savingsAmount`: 20% para ahorro
- `accountId`: ID de la cuenta asociada

**Restricciones**:

- Solo un presupuesto por mes/año por cuenta
- Los montos se calculan automáticamente según el ingreso total

**Funcionalidades**:

- Cálculo automático de porcentajes
- Seguimiento mensual
- Comparación con gastos reales

---

#### **Category (Categoría)**

**Propósito**: Organiza los gastos por categorías personalizables

**Campos Principales**:

- `id`: Identificador único UUID
- `name`: Nombre de la categoría
- `type`: Tipo de gasto (NEEDS, WANTS, SAVINGS)
- `icon`: Icono de la categoría
- `color`: Color de la categoría
- `accountId`: ID de la cuenta asociada
- `isDefault`: Indica si es una categoría por defecto

**Restricciones**:

- Nombre único por cuenta
- Categorías predefinidas para nuevos usuarios

**Funcionalidades**:

- Personalización visual
- Categorías por defecto
- Organización por tipo de gasto

---

### 🎯 **4. MODELOS DE METAS Y OBJETIVOS**

#### **Goal (Meta)**

**Propósito**: Permite establecer y seguir metas financieras

**Campos Principales**:

- `id`: Identificador único UUID
- `name`: Nombre de la meta
- `description`: Descripción opcional
- `targetAmount`: Meta a alcanzar
- `currentAmount`: Progreso actual (por defecto 0)
- `targetDate`: Fecha objetivo opcional
- `type`: Tipo de meta (SAVINGS, INVESTMENT, PURCHASE, TRAVEL, EMERGENCY, DEBT_PAYOFF, OTHER)
- `priority`: Prioridad de la meta (LOW, MEDIUM, HIGH, URGENT)
- `userId`: ID del usuario propietario
- `accountId`: ID de la cuenta asociada
- `isShared`: Indica si es una meta compartida

**Tipos de Meta**:

- **SAVINGS**: Ahorro general
- **INVESTMENT**: Inversiones
- **PURCHASE**: Compra de bienes
- **TRAVEL**: Viajes
- **EMERGENCY**: Fondo de emergencia
- **DEBT_PAYOFF**: Pago de deudas
- **OTHER**: Otros objetivos

**Funcionalidades**:

- Seguimiento de progreso
- Metas compartidas para parejas/organizaciones
- Sistema de prioridades
- Fechas objetivo

---

### 💳 **5. MODELOS DE SUSCRIPCIONES Y PAGOS**

#### **Subscription (Suscripción)**

**Propósito**: Gestiona los planes de suscripción de los usuarios

**Campos Principales**:

- `id`: Identificador único UUID
- `planType`: Tipo de plan (BASIC, PRO, PREMIUM, ENTERPRISE)
- `status`: Estado de la suscripción (ACTIVE, CANCELLED, EXPIRED, PENDING, TRIAL)
- `startDate`: Fecha de inicio
- `endDate`: Fecha de finalización
- `amount`: Precio de la suscripción
- `currency`: Moneda (por defecto USD)
- `billingCycle`: Ciclo de facturación (MONTHLY, QUARTERLY, YEARLY)
- `accountId`: ID de la cuenta asociada

**Planes Disponibles**:

- **BASIC**: Funcionalidades básicas para personas
- **PRO**: Funcionalidades avanzadas para personas
- **PREMIUM**: Funcionalidades para parejas
- **ENTERPRISE**: Funcionalidades para organizaciones

**Funcionalidades**:

- Diferentes ciclos de facturación
- Estados de suscripción
- Relación 1:1 con cuentas

---

#### **Payment (Pago)**

**Propósito**: Registra cada transacción de pago de suscripción

**Campos Principales**:

- `id`: Identificador único UUID
- `amount`: Monto del pago
- `currency`: Moneda del pago
- `status`: Estado del pago (PENDING, COMPLETED, FAILED, REFUNDED, CANCELLED)
- `paymentMethod`: Método de pago utilizado
- `transactionId`: ID de la transacción bancaria
- `subscriptionId`: ID de la suscripción asociada

**Estados de Pago**:

- **PENDING**: Pago pendiente
- **COMPLETED**: Pago completado
- **FAILED**: Pago fallido
- **REFUNDED**: Pago reembolsado
- **CANCELLED**: Pago cancelado

**Funcionalidades**:

- Seguimiento de transacciones
- Múltiples métodos de pago
- Historial de pagos

---

### 📊 **6. MODELOS DE TRANSACCIONES Y REPORTES**

#### **Transaction (Transacción)**

**Propósito**: Registra transacciones financieras generales

**Campos Principales**:

- `id`: Identificador único UUID
- `type`: Tipo de transacción (INCOME, EXPENSE, TRANSFER, REFUND)
- `amount`: Monto de la transacción
- `description`: Descripción opcional
- `date`: Fecha de la transacción
- `accountId`: ID de la cuenta asociada

**Tipos de Transacción**:

- **INCOME**: Ingresos
- **EXPENSE**: Gastos
- **TRANSFER**: Transferencias
- **REFUND**: Reembolsos

**Funcionalidades**:

- Registro de movimientos financieros
- Categorización por tipo
- Historial de transacciones

---

#### **Report (Reporte)**

**Propósito**: Almacena reportes generados automáticamente

**Campos Principales**:

- `id`: Identificador único UUID
- `type`: Tipo de reporte
- `title`: Título del reporte
- `content`: Contenido en formato JSON
- `accountId`: ID de la cuenta asociada
- `generatedBy`: ID del usuario que generó el reporte

**Tipos de Reporte**:

- **MONTHLY_SUMMARY**: Resumen mensual
- **EXPENSE_ANALYSIS**: Análisis de gastos
- **BUDGET_VS_ACTUAL**: Presupuesto vs. real
- **GOAL_PROGRESS**: Progreso de metas
- **EMPLOYEE_PERFORMANCE**: Rendimiento de empleados
- **CUSTOM**: Reportes personalizados

**Funcionalidades**:

- Reportes automáticos
- Almacenamiento en JSON
- Historial de reportes

---

### 🔔 **7. MODELOS DE NOTIFICACIONES Y SESIONES**

#### **Notification (Notificación)**

**Propósito**: Sistema de alertas y notificaciones para usuarios

**Campos Principales**:

- `id`: Identificador único UUID
- `title`: Título de la notificación
- `message`: Mensaje de la notificación
- `type`: Tipo de notificación
- `isRead`: Indica si fue leída
- `userId`: ID del usuario destinatario
- `accountId`: ID de la cuenta asociada (opcional)

**Tipos de Notificación**:

- **BUDGET_ALERT**: Alertas de presupuesto
- **GOAL_REMINDER**: Recordatorios de metas
- **EXPENSE_LIMIT**: Límites de gasto alcanzados
- **PAYMENT_DUE**: Pagos próximos a vencer
- **ACCOUNT_INVITE**: Invitaciones a cuentas
- **ACCOUNT_REQUEST**: Solicitudes de acceso
- **SYSTEM**: Notificaciones del sistema
- **ACHIEVEMENT**: Logros alcanzados

**Funcionalidades**:

- Sistema de notificaciones en tiempo real
- Marcado de leídas/no leídas
- Notificaciones específicas por cuenta

---

#### **UserSession (Sesión de Usuario)**

**Propósito**: Gestiona las sesiones activas de los usuarios

**Campos Principales**:

- `id`: Identificador único UUID
- `sessionToken`: Token de sesión único
- `expiresAt`: Fecha de expiración de la sesión
- `userId`: ID del usuario asociado

**Funcionalidades**:

- Control de sesiones activas
- Tokens únicos por sesión
- Expiración automática
- Seguridad de autenticación

---

### 👥 **8. MODELOS DE EMPLEADOS (ROL ORGANIZACIÓN)**

#### **Employee (Empleado)**

**Propósito**: Gestiona información de empleados para organizaciones

**Campos Principales**:

- `id`: Identificador único UUID
- `firstName`: Nombre del empleado
- `lastName`: Apellido del empleado
- `email`: Email del empleado
- `position`: Cargo del empleado
- `salary`: Salario del empleado (opcional)
- `hireDate`: Fecha de contratación
- `accountId`: ID de la cuenta de la organización

**Restricciones**:

- Email único por organización
- Relación con cuentas de tipo ORGANIZATION

**Funcionalidades**:

- Gestión de personal
- Control de salarios
- Historial de empleados
- Organización empresarial

---

## 🎨 **ENUMS DEL SISTEMA**

---

### **UserRole**

Define los roles principales de los usuarios:

- `PERSONA`: Usuario individual
- `PAREJA`: Usuario en relación de pareja
- `ORGANIZACION`: Usuario empresarial

### **AccountType**

Define los tipos de cuenta disponibles:

- `PERSONAL`: Cuenta individual
- `COUPLE`: Cuenta compartida entre dos usuarios
- `ORGANIZATION`: Cuenta empresarial

### **AccountRole**

Define los roles específicos dentro de una cuenta:

- `OWNER`: Propietario con control total
- `ADMIN`: Administrador (solo organizaciones)
- `MEMBER`: Miembro con permisos completos
- `VIEWER`: Solo lectura

### **ExpenseType**

Implementa la metodología 50/30/20:

- `NEEDS`: Necesidades básicas (50%)
- `WANTS`: Deseos y entretenimiento (30%)
- `SAVINGS`: Ahorro e inversiones (20%)

### **GoalType**

Tipos de metas financieras:

- `SAVINGS`: Ahorro general
- `INVESTMENT`: Inversiones
- `PURCHASE`: Compra de bienes
- `TRAVEL`: Viajes
- `EMERGENCY`: Fondo de emergencia
- `DEBT_PAYOFF`: Pago de deudas
- `OTHER`: Otros objetivos

### **GoalPriority**

Prioridades de las metas:

- `LOW`: Baja prioridad
- `MEDIUM`: Prioridad media
- `HIGH`: Alta prioridad
- `URGENT`: Urgente

### **SubscriptionPlan**

Planes de suscripción disponibles:

- `BASIC`: Plan básico para personas
- `PRO`: Plan profesional para personas
- `PREMIUM`: Plan premium para parejas
- `ENTERPRISE`: Plan empresarial

### **SubscriptionStatus**

Estados de las suscripciones:

- `ACTIVE`: Activa
- `CANCELLED`: Cancelada
- `EXPIRED`: Expirada
- `PENDING`: Pendiente
- `TRIAL`: En período de prueba

### **PaymentStatus**

Estados de los pagos:

- `PENDING`: Pendiente
- `COMPLETED`: Completado
- `FAILED`: Fallido
- `REFUNDED`: Reembolsado
- `CANCELLED`: Cancelado

### **BillingCycle**

Ciclos de facturación:

- `MONTHLY`: Mensual
- `QUARTERLY`: Trimestral
- `YEARLY`: Anual

### **NotificationType**

Tipos de notificaciones:

- `BUDGET_ALERT`: Alertas de presupuesto
- `GOAL_REMINDER`: Recordatorios de metas
- `EXPENSE_LIMIT`: Límites de gasto
- `PAYMENT_DUE`: Pagos próximos
- `ACCOUNT_INVITE`: Invitaciones
- `ACCOUNT_REQUEST`: Solicitudes
- `SYSTEM`: Sistema
- `ACHIEVEMENT`: Logros

### **InviteStatus**

Estados de las invitaciones:

- `PENDING`: Pendiente
- `ACCEPTED`: Aceptada
- `DECLINED`: Rechazada
- `EXPIRED`: Expirada

### **RequestStatus**

Estados de las solicitudes:

- `PENDING`: Pendiente
- `APPROVED`: Aprobada
- `REJECTED`: Rechazada

### **RecurringType**

Tipos de recurrencia para gastos:

- `DAILY`: Diario
- `WEEKLY`: Semanal
- `MONTHLY`: Mensual
- `YEARLY`: Anual

### **TransactionType**

Tipos de transacciones:

- `INCOME`: Ingresos
- `EXPENSE`: Gastos
- `TRANSFER`: Transferencias
- `REFUND`: Reembolsos

### **ReportType**

Tipos de reportes:

- `MONTHLY_SUMMARY`: Resumen mensual
- `EXPENSE_ANALYSIS`: Análisis de gastos
- `BUDGET_VS_ACTUAL`: Presupuesto vs. real
- `GOAL_PROGRESS`: Progreso de metas
- `EMPLOYEE_PERFORMANCE`: Rendimiento de empleados
- `CUSTOM`: Personalizados

---

## 🚀 **FUNCIONALIDADES POR ROL**

---

### **👤 Rol PERSONA**

- **Cuenta personal** con gestión individual
- **Presupuesto mensual** con metodología 50/30/20
- **Categorización de gastos** personalizada
- **Metas financieras** individuales
- **Reportes básicos** de gastos y ahorros
- **Notificaciones** de límites y recordatorios

### **💕 Rol PAREJA**

- **Cuenta compartida** entre dos usuarios
- **Gastos y presupuestos** compartidos
- **Metas comunes** con seguimiento conjunto
- **Transparencia financiera** total
- **Sistema de invitaciones** para agregar pareja
- **Reportes compartidos** de finanzas conjuntas

### **🏢 Rol ORGANIZACIÓN**

- **Cuenta empresarial** con múltiples usuarios
- **Gestión de empleados** con roles y permisos
- **Presupuestos por departamento** o área
- **Reportes avanzados** con análisis detallado
- **Sistema de invitaciones** para empleados
- **Auditoría completa** de actividades
- **Exportación de datos** para contabilidad

---

## 💡 **CASOS DE USO PRINCIPALES**

---

### **1. Registro y Configuración**

1. Usuario se autentica con Google
2. Selecciona su rol (PERSONA, PAREJA, ORGANIZACIÓN)
3. Se crea automáticamente una cuenta del tipo correspondiente
4. Usuario configura categorías y presupuesto inicial

### **2. Gestión de Gastos**

1. Usuario registra un gasto
2. Selecciona categoría y tipo (NEEDS, WANTS, SAVINGS)
3. Sistema actualiza presupuesto disponible
4. Se generan notificaciones si se exceden límites

### **3. Invitaciones a Cuentas**

1. Usuario propietario envía invitación por email
2. Usuario invitado recibe notificación
3. Al aceptar, se agrega a la cuenta con rol específico
4. Acceso inmediato a funcionalidades compartidas

### **4. Seguimiento de Metas**

1. Usuario crea meta financiera
2. Sistema calcula progreso automáticamente
3. Notificaciones de recordatorios y logros
4. Reportes de progreso detallados

### **5. Gestión de Suscripciones**

1. Usuario selecciona plan según su rol
2. Sistema procesa pago y activa suscripción
3. Acceso a funcionalidades del plan
4. Renovación automática según ciclo de facturación

---

## 🔧 **CONSIDERACIONES TÉCNICAS**

---

### **Base de Datos**

- **PostgreSQL** como base de datos principal
- **UUIDs** para todos los identificadores
- **Timestamps** automáticos para auditoría
- **Soft deletes** con campo `isActive`

### **Relaciones**

- **Many-to-Many** entre usuarios y cuentas
- **One-to-Many** para gastos, presupuestos y metas
- **Cascading deletes** controlado
- **Integridad referencial** garantizada

### **Seguridad**

- **Roles granulares** por cuenta
- **Validación de permisos** en cada operación
- **Auditoría completa** de cambios
- **Sesiones seguras** con expiración

### **Escalabilidad**

- **Índices** en campos de búsqueda frecuente
- **Particionamiento** por cuenta para grandes volúmenes
- **Relaciones optimizadas** para consultas eficientes
- **Soft deletes** para mantener historial

---

## 📱 **INTEGRACIÓN CON NEXT.JS**

---

### **NextAuth.js**

- **Provider de Google** para autenticación social
- **JWT tokens** para sesiones
- **Callbacks personalizados** para creación de usuarios
- **Middleware** para protección de rutas

### **Prisma Client**

- **Generación automática** del cliente
- **Transacciones** para operaciones complejas
- **Relaciones optimizadas** para consultas
- **Migrations** para cambios de esquema

### **API Routes**

- **RESTful endpoints** para operaciones CRUD
- **Validación** con Zod o similar
- **Autenticación** en cada endpoint
- **Manejo de errores** estandarizado

---

## 🎯 **PRÓXIMOS PASOS**

---

### **1. Implementación**

- Configurar NextAuth.js con Google provider
- Crear migraciones de Prisma
- Implementar API routes básicas
- Crear componentes de UI para cada funcionalidad

### **2. Funcionalidades Avanzadas**

- Sistema de notificaciones en tiempo real
- Reportes automáticos programados
- Integración con APIs bancarias
- App móvil nativa

### **3. Monetización**

- Sistema de pagos con Stripe
- Planes de suscripción diferenciados
- Pruebas gratuitas por rol
- Descuentos por suscripciones largas

---

## 📚 **RECURSOS ADICIONALES**

---

### **Documentación**

- [Prisma Documentation](https://www.prisma.io/docs/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### **Herramientas Recomendadas**

- **Prisma Studio** para gestión visual de datos
- **Postman** para testing de APIs
- **DBeaver** para consultas SQL directas
- **Lucidchart** para diagramas de base de datos

---

_Esta documentación debe actualizarse conforme evolucione el schema y se implementen nuevas funcionalidades._

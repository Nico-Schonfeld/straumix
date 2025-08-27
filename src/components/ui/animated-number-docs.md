# AnimatedNumber Component

Un componente React que anima números con soporte para formato de moneda internacional y decimales.

## Características

- ✅ Animación suave de números usando Framer Motion
- ✅ Soporte para decimales con animación fluida
- ✅ Formato de moneda internacional usando `Intl.NumberFormat`
- ✅ Configuración de locale y moneda
- ✅ Control de dígitos decimales
- ✅ Componente dinámico (puede renderizar como cualquier elemento HTML)

## Props

| Prop                    | Tipo                | Default   | Descripción                                                  |
| ----------------------- | ------------------- | --------- | ------------------------------------------------------------ |
| `value`                 | `number`            | -         | El valor numérico a animar                                   |
| `className`             | `string`            | -         | Clases CSS adicionales                                       |
| `springOptions`         | `SpringOptions`     | -         | Opciones de animación de Framer Motion                       |
| `as`                    | `React.ElementType` | `"span"`  | Elemento HTML a renderizar                                   |
| `currency`              | `string`            | `"USD"`   | Código de moneda (USD, EUR, MXN, etc.)                       |
| `locale`                | `string`            | `"es-ES"` | Locale para formato (es-ES, en-US, es-MX, etc.)              |
| `showCurrency`          | `boolean`           | `false`   | Si mostrar el símbolo de moneda                              |
| `decimals`              | `number`            | `2`       | Número de decimales (deprecated, usar minimumFractionDigits) |
| `minimumFractionDigits` | `number`            | `2`       | Mínimo de dígitos decimales                                  |
| `maximumFractionDigits` | `number`            | `2`       | Máximo de dígitos decimales                                  |

## Ejemplos de Uso

### Moneda Europea (EUR)

```tsx
<AnimatedNumber
  value={1123.45}
  showCurrency={true}
  currency="EUR"
  locale="es-ES"
  minimumFractionDigits={2}
  maximumFractionDigits={2}
/>
// Resultado: 1.123,45 €
```

### Moneda Estadounidense (USD)

```tsx
<AnimatedNumber
  value={1123.45}
  showCurrency={true}
  currency="USD"
  locale="en-US"
  minimumFractionDigits={2}
  maximumFractionDigits={2}
/>
// Resultado: $1,123.45
```

### Moneda Mexicana (MXN)

```tsx
<AnimatedNumber
  value={1123.45}
  showCurrency={true}
  currency="MXN"
  locale="es-MX"
  minimumFractionDigits={2}
  maximumFractionDigits={2}
/>
// Resultado: $1,123.45
```

### Solo Números (sin moneda)

```tsx
<AnimatedNumber
  value={1123.45}
  showCurrency={false}
  locale="es-ES"
  minimumFractionDigits={2}
  maximumFractionDigits={2}
/>
// Resultado: 1.123,45
```

### Con Animación Personalizada

```tsx
<AnimatedNumber
  value={1123.45}
  showCurrency={true}
  currency="EUR"
  springOptions={{
    bounce: 0.2,
    duration: 1500,
    damping: 15,
    stiffness: 100,
  }}
/>
```

## Locales Soportados

- `es-ES` - Español (España)
- `es-MX` - Español (México)
- `en-US` - Inglés (Estados Unidos)
- `en-GB` - Inglés (Reino Unido)
- `fr-FR` - Francés (Francia)
- `de-DE` - Alemán (Alemania)
- `it-IT` - Italiano (Italia)
- `pt-BR` - Portugués (Brasil)
- `ja-JP` - Japonés (Japón)
- `ko-KR` - Coreano (Corea del Sur)
- `zh-CN` - Chino (China)
- `ru-RU` - Ruso (Rusia)

## Monedas Soportadas

- `USD` - Dólar estadounidense
- `EUR` - Euro
- `MXN` - Peso mexicano
- `GBP` - Libra esterlina
- `JPY` - Yen japonés
- `CAD` - Dólar canadiense
- `AUD` - Dólar australiano
- `CHF` - Franco suizo
- `CNY` - Yuan chino
- `BRL` - Real brasileño
- `ARS` - Peso argentino
- `CLP` - Peso chileno
- `COP` - Peso colombiano
- `PEN` - Sol peruano

## Notas

- El componente usa `Intl.NumberFormat` para el formato, que es compatible con todos los navegadores modernos
- La animación es suave y fluida, incluso para valores decimales
- El formato respeta las convenciones locales de cada país
- Se puede usar sin formato de moneda para mostrar solo números con separadores de miles

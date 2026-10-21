/**
 * Lógica de la calculadora "¿Cuánto te rinde?", separada del componente
 * visual para poder reusarla (Home, /calculadora, y más adelante la ficha
 * de producto) y para poder conectarla a precios reales sin tocar la UI.
 */

export interface CalculatorInput {
  /** Precio de venta por kilogramo del ingrediente. */
  pricePerKg: number;
  /** Dosis que se usa en cada aplicación, en gramos. */
  doseGrams: number;
  /** Cantidad de aplicaciones que se quieren calcular. */
  applicationsCount: number;
}

export interface CalculatorResult {
  /** Costo de una sola aplicación. */
  costPerApplication: number;
  /** Costo de 100 aplicaciones, para comparar rendimiento entre productos. */
  costPer100Applications: number;
  /** Cuántas aplicaciones rinde 1 kg del ingrediente. */
  applicationsPerKg: number;
  /** Costo total para la cantidad de aplicaciones ingresada. */
  totalCost: number;
}

const isValid = (n: number) => Number.isFinite(n) && n >= 0;

export function calculateApplicationCost({
  pricePerKg,
  doseGrams,
  applicationsCount,
}: CalculatorInput): CalculatorResult {
  if (!isValid(pricePerKg) || !isValid(doseGrams) || !isValid(applicationsCount)) {
    return {
      costPerApplication: 0,
      costPer100Applications: 0,
      applicationsPerKg: 0,
      totalCost: 0,
    };
  }

  const costPerApplication = (pricePerKg / 1000) * doseGrams;

  return {
    costPerApplication,
    costPer100Applications: costPerApplication * 100,
    applicationsPerKg: doseGrams > 0 ? 1000 / doseGrams : 0,
    totalCost: costPerApplication * applicationsCount,
  };
}

export function formatArs(value: number): string {
  return `$ ${value.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;
}

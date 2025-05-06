export interface Plan {
  name: string;
  planId: string;
  testPlanId: string;
  description: string;
  price: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface ProductProps {
  result: {
    items: Product[];
  };
}

export type OpenAIBackground = "transparent" | "opaque" | "auto";

interface Product {
  id: string;
  name: string;
  description: string | null;
  prices: Price[];
  benefits: Benefit[];
  isRecurring?: boolean;
  isArchived?: boolean;
  organizationId?: string;
  createdAt?: Date;
  modifiedAt?: Date | null;
  metadata?: Record<string, any>;
  medias?: any[];
  attachedCustomFields?: any[];
}

interface Price {
  id: string;
  priceAmount: number;
  priceCurrency: string;
  recurringInterval: "month" | "year";
  productId?: string;
}

interface Benefit {
  description: string;
}

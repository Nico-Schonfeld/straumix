"use client";

import React from "react";
import { AnimatedNumber } from "@/components/ui/animated-numer";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WebAppPageClient = () => {
  const [value, setValue] = React.useState<number>(0);

  React.useEffect(() => {
    setValue(20300.74);
  }, []);

  return (
    <section className="w-full min-h-screen">
      <div className="w-full flex flex-col items-center justify-center gap-6  py-16 px-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start justify-center gap-1">
              <h3 className="text-4xl font-medium tracking-tight">
                <AnimatedNumber
                  springOptions={{
                    bounce: 0,
                    duration: 2000,
                  }}
                  value={value}
                  showCurrency={true}
                  currency="EUR"
                  locale="es-ES"
                  minimumFractionDigits={2}
                  maximumFractionDigits={2}
                />
              </h3>
              <p className="text-sm text-gray-400">
                Julio - Ahorros (20%) - EUR
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default WebAppPageClient;

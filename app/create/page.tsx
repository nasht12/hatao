"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import CreateCampaign from "./components/create-campaign-form";
import { AddToCampaign } from "./components/add-campaign-items";
import UseArrayFieldComponent from "./components/use-array-fields";

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
}

export default function CreatePage() {
  return (
    // <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <CreateCampaign />
    // </div>
  );
}

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
    <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 overflow-auto h-screen">
      {/* {!isCampaignCreated ? ( */}
      <DemoContainer className="overflow-auto">
        <CreateCampaign />
      </DemoContainer>
    </div>
  );
}

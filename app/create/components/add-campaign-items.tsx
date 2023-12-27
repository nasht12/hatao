"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@//components/ui/card";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";

const itemSchema = z.object({
  itemname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const formSchema = z.object({
  items: z.array(itemSchema),
});

type CampaignData = {
    // Define the shape of your campaign data here
    campaignName: string;
    category: string;
    subcategory: string;
    items: string[];
  };

type AddToCampaignProps = {
  campaignData: CampaignData | null;
  // ...other props...
};

export const AddToCampaign: React.FC<AddToCampaignProps> = ({
  campaignData,
}) => {
  const [addedItems, setAddedItems] = useState<{ itemname: string }[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [{ itemname: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "items",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function handleAddItem() {
    form.handleSubmit((values) => {
      setAddedItems([...addedItems, values.items[0]]);
      form.reset({ items: [{ itemname: "" }] });
    })();
  }

  console.log('campaign', campaignData);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{campaignData?.campaignName}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`items.${index}.itemname`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="button" onClick={handleAddItem}>
                <FaPlus className="h-5 w-5" />
              </Button>
            </form>
            {/* Display list of added items */}
          </Form>
        </CardContent>
      </Card>
      <div className="mt-4">
        <ul className="list-disc list-inside space-y-2">
          {addedItems.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item.itemname}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

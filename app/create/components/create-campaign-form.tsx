"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";
import { subcategories } from "@/data/subcategories";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@//components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

const formSchema = z.object({
  category: z.string().nonempty({ message: "Category is required." }),
  subcategory: z.string().nonempty({ message: "Subcategory is required." }),
  campaignName: z.string().min(1, "Campaign name cannot be empty"),
  urls: z.string().nonempty({ message: "Category is required." }),
  items: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
    })
  ),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateCampaign() {
  const [campName, setCampName] = useState("");
  const [isAddClicked, setIsAddClicked] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      subcategory: "",
      campaignName: "",
      urls: "",
      items: [{ name: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (data: FormData) => {
    // Handle form submission here
    console.log(data);
    setCampName(data.campaignName);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="items-center">
          {isAddClicked ? campName : "Create Campaign"}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {!isAddClicked && (
              <>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-2">Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-2">Topic</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subcategories.map((subcategory) => (
                            <SelectItem key={subcategory} value={subcategory}>
                              {subcategory}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="campaignName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-2">Campaign Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="p-2 border rounded-md"
                          placeholder="Enter campaign name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  onClick={() => {
                    setIsAddClicked(true);
                    setCampName(form.getValues().campaignName);
                  }}
                >
                  Create Campaign
                </Button>
              </>
            )}
            {/* ...similarly for subcategory, item, and image */}
            {isAddClicked && (
              <>
                <Button
                  type="button"
                  onClick={() => append({ name: "", url: "" })}
                  className="flex-1 mr-4"
                >
                  Add
                </Button>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex mr-4">
                    <FormItem className="mr-2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register(
                            `items[${index}].name` as `items.${number}.name`
                          )}
                          className="p-2 border rounded-md"
                          placeholder="Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem className="mr-2">
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register(
                            `items[${index}].url` as `items.${number}.url`
                          )}
                          className="p-2 border rounded-md"
                          placeholder="URL"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      className="mt-8 "
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => setIsAddClicked(false)}
                  title="Back"
                  className="focus:outline-none"
                >
                  <IoIosArrowRoundBack className="w-6 h-6 hover:w-8 transition-all duration-200" />
                </Button>
              </>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

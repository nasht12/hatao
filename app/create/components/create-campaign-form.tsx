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
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";
import { topics } from "@/data/topics";
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
import { DrawerDemo } from "@/app/create/components/image-drawer";
import { MinusIcon, PlusIcon, Cross2Icon, Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import createListFromDb from '../../actions';
import { toast } from "sonner";

const formSchema = z.object({
  category: z.string().min(2, {
    message: "category must be at least 2 characters.",
  }),
  topic: z.string().min(2, {
    message: "topic must be at least 2 characters.",
  }),
  campaignName: z.string().min(2, {
    message: "campaignname must be at least 2 characters.",
  }),
  campaignUrl: z.string().min(2, {
    message: "campaignname must be at least 2 characters.",
  }),
  items: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
    })
  ),
});

export default function CreateCampaign() {
  const [campName, setCampName] = useState("");
  const [topic, setTopic] = useState('');
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isUrlSelected, setIsUrlSelected] = useState<boolean[]>([false]);
  const [isCampUrlSelected, setIsCampUrlSelected] = useState(false);
  const [campUrl, setCampUrl] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      topic: "",
      campaignName: "",
      campaignUrl: "",
      items: [{ name: "", url: "" }],
    },
  });

  const { register, control, watch, handleSubmit } = form;

  const { fields, append, prepend, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await createListFromDb(data);
    if (result && result.errors) {
      // Handle validation errors
      console.error(result.errors);
    } else {
      // Handle successful form submission
      console.log("Form submitted successfully");
      toast("Form submitted", {
        description: "List created successfully.",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="items-center">
          {isAddClicked ? campName : "Create Campaign"}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 overflow-auto">
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
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-2">Topic</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setTopic(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {topics.map((topic) => (
                            <SelectItem key={topic} value={topic}>
                              {topic}
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
                <FormField
                  control={form.control}
                  name="campaignUrl"
                  render={({ field }) => (
                    <FormItem className="ml-2">
                      <FormControl>
                        {isCampUrlSelected ? (
                          <Button
                            onClick={() => {
                              setIsCampUrlSelected(false);
                            }}
                          >
                            <Image
                              src={campUrl}
                              alt="Selected"
                              width="20"
                              height="20"
                            />
                          </Button>
                        ) : (
                          <DrawerDemo
                            inputText={topic}
                            onUrlSelect={(url) => {
                              setCampUrl(url);
                              setIsCampUrlSelected(true);
                              form.setValue("campaignUrl", url); // set the campaignUrl field value
                            }}
                          />
                        )}
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
                  onClick={() => setIsAddClicked(false)}
                  title="Back"
                  className="focus:outline-none w-14 h-10"
                >
                  <IoIosArrowRoundBack className="w-8 h-8 hover:w-10 transition-all duration-200" />
                </Button>
                {fields.map((field, index) => {
                  const itemName = watch(`items.${index}.name`);
                  return (
                    <div key={field.id} className="flex items-center ">
                      <div>
                        <FormItem className="mr-2">
                          {/* <FormLabel>Name</FormLabel> */}
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
                      </div>
                      <div>
                        <FormItem className="ml-2">
                          <FormControl>
                            {isUrlSelected[index] ? (
                              <>
                                {/* <Input value={selectedUrls[index]} readOnly /> */}
                                <Button
                                  onClick={() => {
                                    const newIsUrlSelected = [...isUrlSelected];
                                    newIsUrlSelected[index] = false;
                                    setIsUrlSelected(newIsUrlSelected);
                                  }}
                                >
                                  <Image
                                    src={selectedUrls[index]}
                                    alt="Selected"
                                    width="20"
                                    height="20"
                                  />
                                </Button>
                              </>
                            ) : (
                              <DrawerDemo
                                inputText={itemName}
                                onUrlSelect={(url) => {
                                  const newUrls = [...selectedUrls];
                                  newUrls[index] = url;
                                  setSelectedUrls(newUrls);
                                  const newIsUrlSelected = [...isUrlSelected];
                                  newIsUrlSelected[index] = true;
                                  setIsUrlSelected(newIsUrlSelected);

                                  form.setValue(
                                    `items.${index as number}.url`,
                                    url
                                  );
                                }}
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                      <div className="relative">
                        <Button
                          type="button"
                          onClick={() => {
                            remove(index);
                            const newUrls = [...selectedUrls];
                            newUrls.splice(index, 1);
                            setSelectedUrls(newUrls);
                            const newIsUrlSelected = [...isUrlSelected];
                            newIsUrlSelected.splice(index, 1);
                            setIsUrlSelected(newIsUrlSelected);
                          }}
                          className="ml-2 focus:outline-none w-14 h-10"
                          disabled={fields.length === 1}
                          title="Remove"
                        >
                          <Cross2Icon className="hover:w-6 h-6" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                <div className="flex flex-col gap-4">
                  <Button
                    type="button"
                    onClick={() => {
                      append({ name: "", url: "" }),
                        setSelectedUrls([...selectedUrls, ""]);
                      setIsUrlSelected([...isUrlSelected, false]);
                    }}
                    className="focus:outline-none w-14 h-10"
                    title="Add"
                  >
                    <PlusIcon className="hover:w-6 h-6" />
                    {/* Add */}
                  </Button>

                  <Button
                    type="submit"
                    title="Create"
                    className="hover:bg-green-200 text-white hover:text-black"
                  >
                    Create
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

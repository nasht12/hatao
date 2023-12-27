import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  items: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
  })),
});

type FormValues = z.infer<typeof formSchema>;

const UseArrayFieldComponent = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      items: [{ name: "", url: "" }],
    },
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  return (
    <form onSubmit={form.handleSubmit(data => console.log(data))}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <Controller
            control={form.control}
            name={`items[${index}].name` as `items.${number}.name`}
            render={({ field }) => <input {...field} placeholder="Name" />}
          />
          <Controller
            control={form.control}
            name={`items[${index}].url` as `items.${number}.url`}
            render={({ field }) => <input {...field} placeholder="URL" />}
          />
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "", url: "" })}>Add</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UseArrayFieldComponent;
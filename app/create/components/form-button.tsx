import React from 'react'
import { useFormStatus } from "react-dom";
import { Button } from '@/components/ui/button';
import { ButtonLoading } from './loading-button';

export default function FormButton() {
    const { pending } = useFormStatus();

    return pending ? (
      <ButtonLoading />
    ) : (
      <Button
        type="submit"
        title="Create"
        className="hover:bg-green-200 text-white hover:text-black"
        disabled={pending}
      >
        Create
      </Button>
    );
}

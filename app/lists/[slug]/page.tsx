"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import PicksDisplay from "@/app/lists/components/pickdisplay";
import { fetchListFromDb } from '@/app/actions';
import { slugToNoSpace, slugToOriginal } from '@/lib/utils';

interface Item {
  name: string;
  url: string;
}

export default function Ranque() {
  const [lists, setLists] = useState<Item[]>([]);
  const pathname = usePathname();
  const orgPathname = slugToOriginal(pathname.replace('/lists/', ''));

  // useEffect(() => {
  //   fetchListFromDb(noSpacePathname)
  //     .then(items => {
  //       setLists(items);
  //     })
  //     .catch(error => console.error(error));
  // }, [noSpacePathname]);
  useEffect(() => {
    fetch(`/api/campaigns?campaignName=${orgPathname}`)
  .then((response) => {
    console.log(response); // Log the response
    return response.json();
  })
  .then((data) => {
    setLists(data[0].items);
  })
  .catch((error) => console.error(error));
  }, [orgPathname]);

  console.log('lists', lists);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row gap-4">
      {lists && lists.length > 0 && <PicksDisplay lists={lists}/>}
      </div>
    </main>
  );
}

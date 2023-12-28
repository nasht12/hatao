import PicksDisplay from "@/components/pickdisplay";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Announcement } from "@/components/announcement";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row gap-4">
        {/* <PicksDisplay /> */}
        <PageHeader>
          {/* <Announcement /> */}
          <PageHeaderHeading>Create, Rank, and Share Lists</PageHeaderHeading>
          <PageHeaderDescription>
            Whether you&apos;re trying to decide on the best movies of all time,
            comparing different products, our platform makes it easy. 
          </PageHeaderDescription>
          <PageActions>
            <Link href="/explore" className={cn(buttonVariants())}>
              Explore
            </Link>
            <Link href="/create" className={cn(buttonVariants())}>
              Create a List
            </Link>
          </PageActions>
          <Announcement />
        </PageHeader>
      </div>
    </main>
  );
}

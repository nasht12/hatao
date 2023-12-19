import Pick from '@/components/pick'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-row gap-4'>
        <Pick />
        <Pick />
      </div>
    </main>
  );
}

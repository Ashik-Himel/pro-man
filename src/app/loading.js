import Image from "next/image";
import loadingGif from '@/assets/images/loading.gif';

export default function Loading() {
  return (
    <main>
      <div className="container">
        <div className="h-screen flex justify-center items-center">
          <Image src={loadingGif} alt="Loading Animation GIF" className="w-full max-w-[200px]" />
        </div>
      </div>
    </main>
  );
}

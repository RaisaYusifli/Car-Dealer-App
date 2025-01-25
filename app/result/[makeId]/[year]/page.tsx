import Loading from "@/app/components/Loading";
import VehicleList from "@/app/components/VehicleList";
import { VehicleMake } from "@/app/types/vehicle";
import { Suspense } from "react";

interface ResultPageProps {
  params: {
    makeId: string;
    year: string;
  };
}

export async function generateStaticParams() {
  const makes = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  ).then((res) => res.json());

  const years = Array.from(
    { length: new Date().getFullYear() - 2014 },
    (_, i) => 2015 + i
  );

  const paths: { makeId: string; year: string }[] = [];
  makes.Results.forEach((make: VehicleMake) => {
    years.forEach((year: number) => {
      paths.push({
        makeId: make.MakeId.toString(),
        year: year.toString(),
      });
    });
  });

  return paths;
}

export default function ResultPage({ params }: ResultPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loading />}>
          <VehicleList makeId={params.makeId} year={params.year} />
        </Suspense>
      </main>
    </div>
  );
}

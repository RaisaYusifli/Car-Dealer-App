import { VehicleMake, VehicleModel } from "../types/vehicle";
import Image from "next/image";

interface VehicleListProps {
  makeId: string;
  year: string;
}

interface ApiResponse {
  Results?: VehicleModel[];
  Message?: string;
}

function getCarImageUrl(make: string, model: string) {
  const imaginApiKey = "hrjavascript-mastery";
  const baseUrl = "https://cdn.imagin.studio/getimage";

  return `${baseUrl}?customer=${imaginApiKey}&make=${make}&modelFamily=${
    model.split(" ")[0]
  }&zoomType=fullscreen&angle=23`;
}

async function VehicleList({ makeId, year }: VehicleListProps) {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data: ApiResponse = await response.json();

  // Get make name for image URL
  const makeResponse = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`
  );
  const makeData = await makeResponse.json();
  const makeName =
    makeData.Results.find(
      (make: VehicleMake) => make.MakeId.toString() === makeId
    )?.MakeName || "";

  if (!data.Results?.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">
          No vehicles found
        </h2>
        <p className="text-gray-500 mt-2">
          Try selecting a different make or year
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {makeName} Models - {year}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.Results.map((vehicle) => (
          <div
            key={vehicle.Model_ID}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="relative h-48 w-full bg-gray-200">
              <Image
                src={getCarImageUrl(makeName, vehicle.Model_Name)}
                alt={`${vehicle.Model_Name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {vehicle.Model_Name}
              </h2>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {year}
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehicleList;

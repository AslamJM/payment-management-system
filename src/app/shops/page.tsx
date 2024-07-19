import CreateRegionForm from "./_components/region/CreateRegionForm";
import RegionsTable from "./_components/region/RegionsTable";
import CreateShopForm from "./_components/shop/CreateShopForm";

const ShopsPage = () => {
  return (
    <main className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <CreateRegionForm />
        <RegionsTable />
      </div>
      <div>
        <CreateShopForm />
      </div>
    </main>
  );
};

export default ShopsPage;

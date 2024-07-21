import CollectorsTable from "./_components/CollectorTable";
import CreateCollectorForm from "./_components/CreateCollectorForm";

const CollectorsPage = () => {
  return (
    <main className="space-y-4">
      <CreateCollectorForm collector={null} />
      <CollectorsTable />
    </main>
  );
};

export default CollectorsPage;

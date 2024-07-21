import CompanyTable from "./_components/CompanyTable";
import CreateCompanyForm from "./_components/CreateCompanyForm";

const CompaniesPage = () => {
  return (
    <main className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <CreateCompanyForm />
        <CompanyTable />
      </div>
      <div className="space-y-4"></div>
    </main>
  );
};

export default CompaniesPage;

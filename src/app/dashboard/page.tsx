import Dashboard from "@/components/Dashboard";
import withAuth from "@/hoc/withAuth";

function DashboardPage() {
  return (
    <div className="mt-20">
      <Dashboard />
    </div>
  );
}

export default withAuth(DashboardPage);

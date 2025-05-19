export default function DashboardLayout({
  children,
  navbar,
  sidebar,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {navbar}
      <div className="flex">
        {sidebar}
        {children}
      </div>
    </div>
  );
}

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
    <>
      {navbar}
      {sidebar}
      {children}
    </>
  );
}

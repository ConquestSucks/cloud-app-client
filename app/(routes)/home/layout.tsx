export default function HomeLayout({
  children,
  navbar
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
}) {
  return (
    <>
      {navbar}
      {children}
    </>
  );
}

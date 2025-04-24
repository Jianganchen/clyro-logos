export default async function Success({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  const checkoutId = params.checkoutId as string;

  return (
    <div>
      <h1>success</h1>
      <p>Checkout ID: {checkoutId}</p>
    </div>
  );
}

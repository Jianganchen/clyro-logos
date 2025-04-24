export default function Success({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const checkoutId = searchParams.checkoutId as string;

  return (
    <div>
      <h1>success</h1>
      <p>Checkout ID: {checkoutId}</p>
    </div>
  );
}

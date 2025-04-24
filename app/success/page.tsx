export default async function Page(props: {
  searchParams?: Promise<{
    checkoutId?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const checkoutId = searchParams?.checkoutId || null;
  // Checkout has been confirmed
  // Now, make sure to capture the Checkout.updated webhook event to update the order status in your system

  return (
    <div>
      <h1>Thank you! Your checkout is now being processed.</h1>
      <p>checkoutId: {checkoutId}</p>
    </div>
  );
}

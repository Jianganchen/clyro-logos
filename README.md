## Under Construction

- [ ] Add unsubscribe session for users (code below)

```
export const getUserDashboardUrl = action({
    handler: async (ctx, args: { customerId: string }) => {
        const polar = new Polar({
            server: "sandbox",
            accessToken: process.env.POLAR_ACCESS_TOKEN,
        });

        try {
            const result = await polar.customerSessions.create({
                customerId: args.customerId,
            });

            // Only return the URL to avoid Convex type issues
            return { url: result.customerPortalUrl };
        } catch (error) {
            console.error("Error creating customer session:", error);
            throw new Error("Failed to create customer session");
        }
    }
});
```

-- basic flow: in dashboard page, user can navigate to finance page -> user can cick on buttons like "manage subscriptions" -> Takes user to polar-hosted session site -> cancel subscription

- [ ] Add switch between text-only input and text-and-sketch input

- [ ] Add image download, background removal functionality

- [ ] Add model selection functionality

- [ ] Re-design the pricing (possibly)

- [ ] Add dark mode (possibly)

- [ ] Security checklist
